'use client'

import { indexOf, size } from 'lodash/fp'
import { ArrowDownToLine, ArrowUpFromLine } from 'lucide-react'
import { useFormContext } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { FormField, FormItem } from '@/components/ui/form'
import { Separator } from '@/components/ui/separator'

import { CollectionEditGroup } from '../CollectionEditGroup'
import { CollectionEditGroupStand } from '../CollectionEditGroupStand'
import { CollectionEditGroupStandShelves } from '../CollectionEditGroupStandShelves'
import { CalculationType } from '../formSchema'

interface Props {
  collectionIndex: number
  groupIndex: number
  standIndex: number
}

export const CollectionEdit = ({
  collectionIndex,
  groupIndex,
  standIndex,
}: Props) => {
  const form = useFormContext<CalculationType>()
  const heightOptions = ['90', '130', '170', '180', '210'] as const

  return (
    <>
      <FormField
        control={form.control}
        name={`collections.${collectionIndex}.height`}
        render={({ field }) => {
          const currentHeightIndex = indexOf(field.value, heightOptions)

          return (
            <FormItem>
              <div className="flex justify-between items-center">
                <div>Wysokość {field.value}</div>
                <div className="flex gap-2">
                  <Button
                    size="icon"
                    variant="ghost"
                    disabled={currentHeightIndex < 1}
                    onClick={() => {
                      form.setValue(
                        field.name,
                        heightOptions[currentHeightIndex - 1],
                      )
                      form.trigger(field.name)
                    }}>
                    <ArrowDownToLine />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    disabled={currentHeightIndex >= size(heightOptions) - 1}
                    onClick={() => {
                      form.setValue(
                        field.name,
                        heightOptions[currentHeightIndex + 1],
                      )
                      form.trigger(field.name)
                    }}>
                    <ArrowUpFromLine />
                  </Button>
                </div>
              </div>
            </FormItem>
          )
        }}
      />
      <Separator className="my-2" />

      <CollectionEditGroup
        collectionIndex={collectionIndex}
        groupIndex={groupIndex}
      />
      <Separator className="my-2" />

      <CollectionEditGroupStand
        collectionIndex={collectionIndex}
        groupIndex={groupIndex}
        standIndex={standIndex}
      />
      <Separator className="my-2" />

      <CollectionEditGroupStandShelves
        collectionIndex={collectionIndex}
        groupIndex={groupIndex}
        standIndex={standIndex}
      />
    </>
  )
}
