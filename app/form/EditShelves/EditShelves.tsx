'use client'

import { indexOf, size } from 'lodash/fp'
import {
  ChevronDown,
  ChevronUp,
  FoldVertical,
  Plus,
  Trash2,
  UnfoldVertical,
} from 'lucide-react'
import { useFieldArray, useFormContext } from 'react-hook-form'

import { useEditOptions } from '@/app/utils'
import { Button } from '@/components/ui/button'
import { FormField, FormItem } from '@/components/ui/form'

import { CalculationType } from '../formSchema'

interface Props {
  collectionIndex: number
  groupIndex: number
  standIndex: number
}

export const EditShelves = ({
  collectionIndex,
  groupIndex,
  standIndex,
}: Props) => {
  const rootFieldName =
    `collections.${collectionIndex}.groups.${groupIndex}.stands.${standIndex}` as const

  const form = useFormContext<CalculationType>()
  const currentWidth = form.watch(`${rootFieldName}.width`)
  const { shelfOptions } = useEditOptions(currentWidth)

  const shelves = useFieldArray({
    control: form.control,
    name: `${rootFieldName}.shelves`,
  })

  return (
    <div className="flex rounded-lg gap-2 flex-col border-2 m-8 p-4 items-center">
      Półki
      {shelves.fields.map((field, shelfIndex) => (
        <div key={field.id}>
          <FormField
            control={form.control}
            name={`${rootFieldName}.shelves.${shelfIndex}.amount`}
            render={({ field }) => {
              return (
                <FormItem>
                  <div className="flex">
                    <Button
                      size="icon"
                      disabled={field.value <= 1}
                      variant="ghost"
                      onClick={() => {
                        form.setValue(field.name, field.value - 1)
                        form.trigger(field.name)
                      }}>
                      <ChevronDown />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => {
                        form.setValue(field.name, field.value + 1)
                        form.trigger(field.name)
                      }}>
                      <ChevronUp />
                    </Button>
                  </div>
                </FormItem>
              )
            }}
          />
          <FormField
            control={form.control}
            name={`${rootFieldName}.shelves.${shelfIndex}.depth`}
            render={({ field }) => {
              const currentDepthIndex = indexOf(field.value, shelfOptions)

              return (
                <FormItem>
                  <div className="flex">
                    <Button
                      size="icon"
                      variant="ghost"
                      disabled={currentDepthIndex < 1}
                      onClick={() => {
                        form.setValue(
                          field.name,
                          shelfOptions[currentDepthIndex - 1],
                          { shouldTouch: true },
                        )
                      }}>
                      <FoldVertical />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      disabled={currentDepthIndex >= size(shelfOptions) - 1}
                      onClick={() => {
                        form.setValue(
                          field.name,
                          shelfOptions[currentDepthIndex + 1],
                          { shouldTouch: true },
                        )
                      }}>
                      <UnfoldVertical />
                    </Button>
                  </div>
                </FormItem>
              )
            }}
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => shelves.remove(shelfIndex)}>
            <Trash2 />
          </Button>
        </div>
      ))}
      <Button
        variant="outline"
        size="icon"
        onClick={() => shelves.append({ amount: 3, depth: shelfOptions[1] })}>
        <Plus />
      </Button>
    </div>
  )
}
