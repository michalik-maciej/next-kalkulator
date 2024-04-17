import { Product } from '@prisma/client'
import { groupBy, map, pick, pickBy, pipe, sumBy } from 'lodash/fp'

export const sumByProductId = (
  records: Partial<Product> & { amount: number }[],
): Partial<Product> & { amount: number }[] =>
  pipe(
    groupBy('id'),
    map((group) => ({
      ...pick(['id', 'label', 'price'], group[0]),
      amount: sumBy('amount', group),
    })),
    pickBy('amount'),
  )(records)
