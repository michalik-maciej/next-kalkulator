import { get, groupBy, map, pipe, sumBy } from 'lodash/fp'

export const sumByProductId = (records: { id: string; number: number }[]) =>
  pipe(
    groupBy('id'),
    map((group) => ({
      id: get('id', group[0]),
      number: sumBy('number', group),
    })),
  )(records)
