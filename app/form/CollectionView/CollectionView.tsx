'use client'

import { ReactNode } from 'react'
import { useFormContext } from 'react-hook-form'

import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer'

import { EditWrapper } from '../EditWrapper'
import { CalculationType } from '../formSchema'
import styles from './CollectionView.module.css'

interface Props {
  collectionIndex: number
  children: ReactNode
}

export const CollectionView = ({ collectionIndex, children }: Props) => {
  const form = useFormContext<CalculationType>()
  const collection = form.getValues('collections')[collectionIndex]

  const getContainerDimensions = (height: number, width: number) => {
    const scalingFactor = 2
    return {
      height: `${scalingFactor * height}px`,
      width: `${scalingFactor * width}px`,
    }
  }

  return (
    <div className={styles.layout}>
      {collection.groups.map((group, groupIndex) => (
        <div key={groupIndex} className="flex border-2 border-slate-900">
          {group.stands.map((stand, standIndex) => (
            <Drawer key={standIndex} direction="right">
              <DrawerTrigger
                style={getContainerDimensions(group.foot, stand.width)}
                className={`flex flex-col border-2 transition-width transition-height justify-center items-center`}>
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
              </DrawerContent>
            </Drawer>
          ))}
        </div>
      ))}
      <div className="my-8 min-w-full">{children}</div>
    </div>
  )
}
