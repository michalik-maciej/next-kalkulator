import { countBy, uniq } from 'lodash/fp'
import { useFormContext } from 'react-hook-form'

import { CalculationType } from '../formSchema'

export const useCollectionDescription = (collectionIndex: number) => {
  const form = useFormContext<CalculationType>()

  const { variant, groups, height } = form.watch(
    `collections.${collectionIndex}`,
  )

  const collectionVariants = {
    P: 'przyściennych',
    G: 'dwustronnych',
    I: 'impulsów',
  }

  const mapShelves = groups[0].stands[0]?.shelves
    .map(({ depth, amount }) => ` ${amount}x${depth}`)
    .join(', ')

  const countStands = countBy('width', groups[0].stands)
  const mapStands = uniq(
    groups[0].stands.map(({ width }) => ` ${countStands[width]}x${width}`),
  ).join(', ')

  const descriptionSegments = [
    `Ciąg regałów ${collectionVariants[variant]}`,
    mapStands,
    `baza ${groups[0].foot}`,
    `h-${height}`,
    `półki ${mapShelves}`,
  ]

  return descriptionSegments.join(' / ')
}
