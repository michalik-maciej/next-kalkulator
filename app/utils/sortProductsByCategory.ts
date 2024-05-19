import { Product } from '@prisma/client'
import { keys, sortBy } from 'lodash/fp'

export const sortProductsByCategory = () => {
  const dictionary: {
    [key in Product['category']]: string
  } = {
    leg: 'Nogi',
    foot: 'Stopy',
    baseCover: 'Osłony dolne',
    shelf: 'Półki',
    support: 'Wsporniki',
    back: 'Plecy',
    priceStrip: 'Listwy cenowe',
    misc: 'Inne',
  }

  const categoriesOrder = keys(dictionary) as Product['category'][]

  const sortedCategories = sortBy(
    (category) => categoriesOrder.indexOf(category),
    categoriesOrder,
  )

  return { dictionary, sortedCategories }
}
