'use client'

import { indexOf, size } from 'lodash/fp'
import { ArrowDownToLine, ArrowUpFromLine } from 'lucide-react'
import { useFormContext } from 'react-hook-form'

import { useEditOptions } from '@/app/utils'
import { Button } from '@/components/ui/button'
import { FormField, FormItem, FormLabel } from '@/components/ui/form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

import { CalculationType } from '../formSchema'

interface Props {
  collectionIndex: number
}

export const EditCollection = ({ collectionIndex }: Props) => {
  const form = useFormContext<CalculationType>()
  const { heightOptions } = useEditOptions()

  return (
    <>
      <FormField
        control={form.control}
        name={`collections.${collectionIndex}.variant`}
        render={({ field }) => {
          return (
            <FormItem className="flex items-center justify-between h-[35px]">
              <div>Rodzaj ciągu</div>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex space-x-4">
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <RadioGroupItem value="P" />
                  <FormLabel className="font-normal">P</FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <RadioGroupItem value="G" />
                  <FormLabel className="font-normal">G</FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <RadioGroupItem disabled value="I" />
                  <FormLabel className="font-normal">I</FormLabel>
                </FormItem>
              </RadioGroup>
            </FormItem>
          )
        }}
      />
      <FormField
        control={form.control}
        name={`collections.${collectionIndex}.height`}
        render={({ field }) => {
          const currentHeightIndex = indexOf(field.value, heightOptions)

          return (
            <FormItem>
              <div className="flex justify-between items-center">
                <div>Wysokość: {field.value}</div>
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
    </>
  )
}
