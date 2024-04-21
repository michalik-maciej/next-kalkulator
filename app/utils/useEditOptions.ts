import { filter, flow, map, uniq } from 'lodash/fp'

import { useProducts } from '../ProductsProvider'

export const useEditOptions = (standWidth?: number) => {
  const products = useProducts()

  const footOptions = flow(
    filter({ category: 'foot' }),
    map('depth'),
    uniq,
  )(products) as number[]

  const heightOptions = flow(
    filter({ category: 'leg' }),
    map('height'),
    uniq,
  )(products) as number[]

  const widthOptions = flow(
    filter({ category: 'back' }),
    map('width'),
    uniq,
  )(products) as number[]

  const shelfOptions = flow(
    filter({ category: 'shelf', width: standWidth || widthOptions[0] }),
    map('depth'),
    uniq,
  )(products) as number[]

  const collectionVariants = ['P', 'G', 'I'] as const

  return {
    collectionVariants,
    footOptions,
    heightOptions,
    shelfOptions,
    widthOptions,
  }
}
