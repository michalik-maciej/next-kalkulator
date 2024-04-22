'use client'

import { isEqual } from 'lodash/fp'
import { ReactNode, useState } from 'react'
import { useFormContext } from 'react-hook-form'

import { useProducts } from '@/app/ProductsProvider'
import { elementsInCollection } from '@/app/utils/elementsInCollection'
import { getFormattedPrice } from '@/app/utils/getFormattedPrice'
import { useCollectionDescription } from '@/app/utils/useCollectionDescription'
import { Badge } from '@/components/ui/badge'
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer'
import { Separator } from '@/components/ui/separator'

import { EditWrapper } from '../EditWrapper'
import { CalculationType } from '../formSchema'
import styles from './CollectionView.module.css'

interface Props {
  collectionIndex: number
  children: ReactNode
}

export const CollectionView = ({ collectionIndex, children }: Props) => {
  const [standAddress, setStandAddress] = useState<number[] | null>(null)
  const { watch } = useFormContext<CalculationType>()
  const collection = watch(`collections.${collectionIndex}`)
  const collectionDescription = useCollectionDescription(collectionIndex)

  const products = useProducts()
  const elements = elementsInCollection(collection, products)
  const collectionPrice = getFormattedPrice(elements)

  const getContainerDimensions = (height: number, width: number) => {
    const scalingFactor = 1.6
    return {
      height: `${scalingFactor * height}px`,
      width: `${scalingFactor * width}px`,
    }
  }

  const getStandHighlight = (standIndexes: number[]) =>
    isEqual(standIndexes, standAddress) ? 'border-red-400' : ''

  return (
    <div className="mb-8">
      <div className="flex justify-between">
        <div className="flex gap-x-4">
          <Badge variant="secondary">{collectionIndex + 1}</Badge>
          {collectionDescription}
        </div>
        <div>{collectionPrice}</div>
      </div>
      <Separator className="my-2" />
      <div className={styles.layout}>
        {collection.groups.map((group, groupIndex) => (
          <div key={groupIndex} className="flex border-2 border-slate-900">
            {group.stands.map((stand, standIndex) => (
              <Drawer
                onOpenChange={(bool) =>
                  setStandAddress(bool ? [groupIndex, standIndex] : null)
                }
                key={standIndex}
                direction="right">
                <DrawerTrigger
                  style={getContainerDimensions(group.foot, stand.width)}
                  className={`flex flex-col border-2 transition-width transition-height justify-center items-center ${getStandHighlight([groupIndex, standIndex])}`}>
                  <div>
                    {[stand.width, group.foot, collection.height].join('/')}
                  </div>
                  <div>
                    {stand.shelves
                      .map(({ amount, depth }) => `${amount}x${depth}`)
                      .join(' + ')}
                  </div>
                </DrawerTrigger>
                <DrawerContent className="p-8">
                  <EditWrapper
                    collectionIndex={collectionIndex}
                    groupIndex={groupIndex}
                    standIndex={standIndex}
                  />
                  <div className="my-8 min-w-full">{children}</div>
                </DrawerContent>
              </Drawer>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
