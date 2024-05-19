'use client'

import { flatMap } from 'lodash/fp'
import { useFormContext } from 'react-hook-form'

import { elementsInCollection } from '@/app/utils/elementsInCollection'
import { Separator } from '@/components/ui/separator'

import { useProducts } from '../ProductsProvider'
import { CalculationType } from '../formSchema'
import { sumByProductId } from '../utils/sumByProductId'

export default function Order() {
  const products = useProducts()
  const { getValues } = useFormContext<CalculationType>()

  const calculationOrder = sumByProductId(
    flatMap(
      (collection) => elementsInCollection(collection, products),
      getValues('collections'),
    ),
  )

  console.log({ calculationOrder })

  return (
    <ul className="flex flex-col gap-y-1 m-8 w-1/4">
      {calculationOrder.map((element, index) => (
        <>
          <li key={index} className="flex justify-between w-full">
            <div>{element.label}</div>
            <div>{element.amount}</div>
          </li>
          <Separator />
        </>
      ))}
    </ul>
  )
}
