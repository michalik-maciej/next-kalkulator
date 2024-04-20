'use client'

import { indexOf, size } from 'lodash/fp'
import { FoldVertical, UnfoldVertical } from 'lucide-react'
import { useFormContext } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { FormField, FormItem } from '@/components/ui/form'

import { CalculationType } from '../formSchema'

interface Props {
  collectionIndex: number
  groupIndex: number
}

export const EditGroup = ({ collectionIndex, groupIndex }: Props) => {
  const form = useFormContext<CalculationType>()
  const footOptions = ['37', '47', '57'] as const

  return (
    <FormField
      control={form.control}
      name={`collections.${collectionIndex}.groups.${groupIndex}.foot`}
      render={({ field }) => {
        const currentFootIndex = indexOf(field.value, footOptions)

        return (
          <FormItem className="flex justify-between items-center">
            <div>Stopa: {field.value}</div>
            <div className="flex gap-2">
              <Button
                size="icon"
                variant="ghost"
                disabled={currentFootIndex < 1}
                onClick={() => {
                  form.setValue(field.name, footOptions[currentFootIndex - 1])
                  form.trigger(field.name)
                }}>
                <FoldVertical />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                disabled={currentFootIndex >= size(footOptions) - 1}
                onClick={() => {
                  form.setValue(field.name, footOptions[currentFootIndex + 1])
                  form.trigger(field.name)
                }}>
                <UnfoldVertical />
              </Button>
            </div>
          </FormItem>
        )
      }}
    />
  )
}
