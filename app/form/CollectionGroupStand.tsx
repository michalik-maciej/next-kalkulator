'use client'

import { indexOf, size } from 'lodash/fp'
import {
  BetweenVerticalEnd,
  FoldHorizontal,
  MoveLeft,
  MoveRight,
  Trash2,
  UnfoldHorizontal,
} from 'lucide-react'
import {
  FieldValues,
  UseFieldArrayReturn,
  useFormContext,
} from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { FormField, FormItem } from '@/components/ui/form'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

import { CollectionGroupStandShelves } from './CollectionGroupStandShelves'
import { CollectionType } from './formSchema'

interface Props {
  index: number
  stands: UseFieldArrayReturn<FieldValues, 'stands', 'id'>
}

export const CollectionGroupStand = ({ index, stands }: Props) => {
  const widthOptions = ['66', '80', '100', '125'] as const
  const form = useFormContext<CollectionType>()

  const foot = form.getValues('foot')
  const width = form.getValues(`stands.${index}.width`)
  const height = form.getValues('height')
  const shelves = form
    .getValues(`stands.${index}.shelves`)
    .map(({ amount, depth }) => `${amount}x${depth}`)

  return (
    <Popover>
      <PopoverTrigger>
        <div
          style={{
            height: `${2 * Number(foot)}px`,
            width: `${2 * Number(width)}px`,
          }}
          className="flex flex-col border-2 transition-width justify-center">
          <div>{[width, foot, height].join('/')}</div>
          <div>{shelves.join(' + ')}</div>
        </div>
      </PopoverTrigger>
      <PopoverContent>
        <div>
          stand
          <Button
            variant="ghost"
            disabled={index < 1}
            size="icon"
            onClick={() => stands.swap(index, index - 1)}>
            <MoveLeft />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() =>
              stands.insert(index + 1, {
                width,
                shelves: [{ amount: 3, depth: '37' }],
              })
            }>
            <BetweenVerticalEnd />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => stands.remove(index)}>
            <Trash2 />
          </Button>
          <Button
            variant="ghost"
            disabled={index >= size(stands.fields) - 1}
            size="icon"
            onClick={() => stands.swap(index, index + 1)}>
            <MoveRight />
          </Button>
        </div>
        <FormField
          control={form.control}
          name={`stands.${index}.width`}
          render={({ field }) => {
            const currentWidthIndex = indexOf(field.value, widthOptions)

            return (
              <FormItem>
                <div className="flex">
                  width
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
              </FormItem>
            )
          }}
        />
        <CollectionGroupStandShelves standIndex={index} />
      </PopoverContent>
    </Popover>
  )
}
