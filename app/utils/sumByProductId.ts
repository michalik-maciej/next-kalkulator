import { Product } from '@prisma/client'
import { groupBy, map, pick, pipe, reject, sumBy } from 'lodash/fp'

export const sumByProductId = (
  records: Partial<Product> & { amount: number }[],
): (Partial<Product> & { amount: number })[] =>
  pipe(
    groupBy('id'),
    map((group) => ({
      ...pick(['id', 'label', 'price', 'category'], group[0]),
      amount: sumBy('amount', group),
    })),
    reject(['amount', 0]),
  )(records)
