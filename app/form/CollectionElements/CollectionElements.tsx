import { useFormContext } from 'react-hook-form'

import { useProducts } from '@/app/ProductsProvider'
import { elementsInCollection } from '@/app/utils/elementsInCollection'
import { Separator } from '@/components/ui/separator'

import { CalculationType } from '../formSchema'

interface Props {
  collectionIndex: number
}

export const CollectionElements = ({ collectionIndex }: Props) => {
  const { watch } = useFormContext<CalculationType>()
  const products = useProducts()
  const collection = watch(`collections.${collectionIndex}`)
  const elements = elementsInCollection(collection, products)

  return (
    <ul className="flex flex-col gap-y-1">
      {elements.map((element, index) => (
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
