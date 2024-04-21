import { Product } from '@prisma/client'
import { sumBy } from 'lodash/fp'

export const getFormattedPrice = (
  elements: (Partial<Product> & { amount: number })[],
) => {
  const elementsPrice = sumBy(
    ({ amount, price }) => amount * (price || 0),
    elements,
  )

  const format = (number: number) =>
    new Intl.NumberFormat('pl', {
      style: 'currency',
      currency: 'pln',
    }).format(number)

  return format(elementsPrice)
}
