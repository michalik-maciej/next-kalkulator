'use client'

import { indexOf, size } from 'lodash/fp'
import {
  FoldHorizontal,
  MoveLeft,
  MoveRight,
  Plus,
  Trash2,
  UnfoldHorizontal,
} from 'lucide-react'
import { useFieldArray, useFormContext } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { FormField, FormItem } from '@/components/ui/form'
import { Separator } from '@/components/ui/separator'

import { CalculationType } from '../formSchema'

interface Props {
  collectionIndex: number
  groupIndex: number
  standIndex: number
}

export const EditStand = ({
  collectionIndex,
  groupIndex,
  standIndex,
}: Props) => {
  const form = useFormContext<CalculationType>()
  const widthOptions = ['66', '80', '100', '125'] as const

  const stands = useFieldArray({
    control: form.control,
    name: `collections.${collectionIndex}.groups.${groupIndex}.stands`,
  })

  return (
    <>
      <FormField
        control={form.control}
        name={`collections.${collectionIndex}.groups.${groupIndex}.stands.${standIndex}.width`}
        render={({ field }) => {
          const currentWidthIndex = indexOf(field.value, widthOptions)

          return (
            <FormItem>
              <div className="flex justify-between items-center">
                <div>Szerokość: {field.value}</div>
                <div className="flex gap-2">
                  <Button
                    size="icon"
                    variant="ghost"
                    disabled={currentWidthIndex < 1}
                    onClick={() => {
                      form.setValue(
                        field.name,
                        widthOptions[currentWidthIndex - 1],
                      )
                      form.trigger(field.name)
                    }}>
                    <FoldHorizontal />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    disabled={currentWidthIndex >= size(widthOptions) - 1}
                    onClick={() => {
                      form.setValue(
                        field.name,
                        widthOptions[currentWidthIndex + 1],
                      )
                      form.trigger(field.name)
                    }}>
                    <UnfoldHorizontal />
                  </Button>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div>Regał pozycja</div>
                <div className="flex gap-x-2">
                  <Button
                    variant="ghost"
                    disabled={standIndex < 1}
                    size="icon"
                    onClick={() => stands.swap(standIndex, standIndex - 1)}>
                    <MoveLeft />
                  </Button>
                  <Button
                    variant="ghost"
                    disabled={standIndex >= size(stands.fields) - 1}
                    size="icon"
                    onClick={() => stands.swap(standIndex, standIndex + 1)}>
                    <MoveRight />
                  </Button>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div>Regał dodaj/usuń</div>
                <div className="flex gap-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      stands.insert(
                        standIndex + 1,
                        form.getValues(
                          `collections.${collectionIndex}.groups.${groupIndex}.stands.${standIndex}`,
                        ),
                      )
                    }>
                    <Plus />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => stands.remove(standIndex)}>
                    <Trash2 />
                  </Button>
                </div>
              </div>
            </FormItem>
          )
        }}
      />
    </>
  )
}
