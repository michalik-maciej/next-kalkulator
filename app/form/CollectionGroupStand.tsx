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
  groupIndex: number
  standIndex: number
  stands: UseFieldArrayReturn<FieldValues, 'stands', 'id'>
}

export const CollectionGroupStand = ({
  groupIndex,
  standIndex,
  stands,
}: Props) => {
  const widthOptions = ['66', '80', '100', '125'] as const
  const form = useFormContext<CollectionType>()

  const foot = form.getValues(`groups.${groupIndex}.foot`)
  const width = form.getValues(
    `groups.${groupIndex}.stands.${standIndex}.width`,
  )
  const height = form.getValues('height')
  const shelves = form
    .getValues(`groups.${groupIndex}.stands.${standIndex}.shelves`)
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
            disabled={standIndex < 1}
            size="icon"
            onClick={() => stands.swap(standIndex, standIndex - 1)}>
            <MoveLeft />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() =>
              stands.insert(standIndex + 1, {
                width,
                shelves: [{ amount: 3, depth: '37' }],
              })
            }>
            <BetweenVerticalEnd />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => stands.remove(standIndex)}>
            <Trash2 />
          </Button>
          <Button
            variant="ghost"
            disabled={standIndex >= size(stands.fields) - 1}
            size="icon"
            onClick={() => stands.swap(standIndex, standIndex + 1)}>
            <MoveRight />
          </Button>
        </div>
        <FormField
          control={form.control}
          name={`groups.${groupIndex}.stands.${standIndex}.width`}
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
        <CollectionGroupStandShelves
          groupIndex={groupIndex}
          standIndex={standIndex}
        />
      </PopoverContent>
    </Popover>
  )
}
