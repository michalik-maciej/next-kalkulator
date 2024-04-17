'use client'

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
import { useFormContext } from 'react-hook-form'

import { sumByProductId } from '../utils/sumByProductId'
import { CollectionType, GroupType, StandType } from './formSchema'

export const Order = ({ products }: { products: Product[] }) => {
  const form = useFormContext<CollectionType>()
  const collectionHeight = Number(form.getValues().height)

  function feetInGroup(group: GroupType) {
    const groupFoot = Number(form.getValues().groups[0].foot)
    const foot = find({ category: 'foot', depth: groupFoot }, products)

    if (isEmpty(group.stands) || !foot) return []

    return [
      {
        ...foot,
        amount: size(group.stands) + 1,
      },
    ]
  }

  function legsInGroup(group: GroupType) {
    const leg = find({ category: 'leg', height: collectionHeight }, products)

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
          depth: Number(group.foot),
          width: Number(stand.width),
        },
        products,
      )

      const shelves = map(({ amount, depth }) => {
        const shelf = find(
          {
            category: 'shelf',
            depth: Number(depth),
            width: Number(stand.width),
          },
          products,
        )

        return merge(shelf, { amount })
      }, stand.shelves)

      const supports = map(({ amount, depth }) => {
        const support = find(
          { category: 'support', depth: Number(depth) },
          products,
        )

        return merge(support, { amount: 2 * amount })
      }, stand.shelves)

      return [{ ...baseShelf, amount: 1 }, ...shelves, ...supports]
    }

    return flatMap((stand) => shelvesInStand(stand), group.stands)
  }

  function backsInGroup(group: GroupType) {
    if (isEmpty(group.stands)) return []

    function backsInStand(stand: StandType) {
      const backs = pipe(
        filter({ category: 'back', width: Number(stand.width) }),
        orderBy(['height'], ['desc']),
      )(products) as Product[]

      const order = []
      const BACK_OFFSET = 10
      let remainder = collectionHeight - BACK_OFFSET

      for (const back of backs) {
        if (remainder >= Number(back.height)) {
          const amount = Math.floor(remainder / Number(back.height))

          order.push(merge(back, { amount }))
          remainder = remainder % Number(back.height)
        }
      }
      return order
    }

    return flatMap((stand) => backsInStand(stand), group.stands)
  }

  const testGroup = form.getValues().groups[0]

  const groupElements = flatten([
    feetInGroup(testGroup),
    legsInGroup(testGroup),
    shelvesInGroup(testGroup),
    backsInGroup(testGroup),
  ])

  console.log(sumByProductId(groupElements))

  return null
}
