import { Product } from '@prisma/client'
import { useFormContext } from 'react-hook-form'

import { elementsInCollection } from '@/app/utils/elementsInCollection'
import { Separator } from '@/components/ui/separator'

import { CalculationType } from '../formSchema'

interface Props {
  collectionIndex: number
  products: Product[]
}

export const CollectionElements = ({ collectionIndex, products }: Props) => {
  const form = useFormContext<CalculationType>()
  const elements = elementsInCollection(
    form.getValues('collections')[collectionIndex],
    products,
  )

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
