import { Product } from '@prisma/client'
import {
  filter,
  find,
  flatMap,
  flatten,
  isEmpty,
  map,
  merge,
  orderBy,
  pipe,
  size,
} from 'lodash/fp'

import { CollectionType, GroupType, StandType } from '../formSchema'
import { sumByProductId } from './sumByProductId'

export function elementsInCollection(
  collection: CollectionType,
  products: Product[],
) {
  function elementsInGroup(group: GroupType) {
    return flatten([
      feetInGroup(group),
      legsInGroup(group),
      shelvesInGroup(group),
      backsInGroup(group),
    ])
  }

  function feetInGroup(group: GroupType) {
    const foot = find({ category: 'foot', depth: group.foot }, products)

    if (isEmpty(group.stands) || !foot) return []

    return [
      {
        ...foot,
        amount: size(group.stands) + 1,
      },
    ]
  }

  function legsInGroup(group: GroupType) {
    const leg = find({ category: 'leg', height: collection.height }, products)
    if (isEmpty(group.stands || !leg)) return []

    return [
      {
        ...leg,
        amount: size(group.stands) + 1,
      },
    ]
  }

  function shelvesInGroup(group: GroupType) {
    if (isEmpty(group.stands)) return []

    function shelvesInStand(stand: StandType) {
      const baseShelf = find(
        {
          category: 'shelf',
          depth: group.foot,
          width: stand.width,
        },
        products,
      )

      const shelves = map(({ amount, depth }) => {
        const shelf = find(
          {
            category: 'shelf',
            depth,
            width: stand.width,
          },
          products,
        )

        return merge(shelf, { amount })
      }, stand.shelves)

      const supports = map(({ amount, depth }) => {
        const support = find({ category: 'support', depth }, products)

        return merge(support, { amount: 2 * amount })
      }, stand.shelves)

      return [{ ...baseShelf, amount: 1 }, ...shelves, ...supports]
    }

    return flatMap((stand) => shelvesInStand(stand), group.stands)
  }

  function backsInGroup(group: GroupType) {
    if (isEmpty(group.stands)) return []

    function backsInStand({ width }: StandType) {
      const backs = pipe(
        filter({ category: 'back', width }),
        orderBy(['height'], ['desc']),
      )(products) as Product[]

      const order = []
      const BACK_OFFSET = 10
      let remainder = collection.height - BACK_OFFSET

      for (const back of backs) {
        if (back.height && remainder >= back.height) {
          const amount = Math.floor(remainder / back.height)

          order.push(merge(back, { amount }))
          remainder = remainder % back.height
        }
      }
      return order
    }

    return flatMap((stand) => backsInStand(stand), group.stands)
  }

  return sumByProductId(
    flatMap((group) => elementsInGroup(group), collection.groups),
  )
}
