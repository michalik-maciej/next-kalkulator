'use client'

import { indexOf, size } from 'lodash/fp'
import { FoldVertical, Plus, UnfoldVertical } from 'lucide-react'
import { useFieldArray, useFormContext } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { FormField, FormItem, FormLabel } from '@/components/ui/form'

import { CollectionGroupStand } from './CollectionGroupStand'
import { CollectionType } from './formSchema'

interface Props {
  groupIndex: number
}

export function CollectionGroup({ groupIndex }: Props) {
  const footOptions = ['27', '37', '47', '57', '67'] as const

  const form = useFormContext<CollectionType>()

  const stands = useFieldArray({
    control: form.control,
    name: `groups.${groupIndex}.stands`,
  })

  return (
    <div>
      <FormField
        control={form.control}
        name={`groups.${groupIndex}.foot`}
        render={({ field }) => {
          const currentFootIndex = indexOf(field.value, footOptions)

          return (
            <FormItem>
              <div className="flex">
                <FormLabel>stopa</FormLabel>
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
      <div className="flex my-16">
        {stands.fields.map((stand, index) => (
          <CollectionGroupStand
            key={stand.id}
            groupIndex={groupIndex}
            standIndex={index}
            stands={stands}
          />
        ))}
        {!size(stands.fields) && (
          <Button
            className="my-auto mx-8"
            variant="outline"
            size="icon"
            onClick={() =>
              stands.append({
                width: '100',
                shelves: [{ amount: 3, depth: '37' }],
              })
            }>
            <Plus />
          </Button>
        )}
      </div>
    </div>
  )
}
