'use client'

import { indexOf, size } from 'lodash/fp'
import {
  BetweenVerticalEnd,
  FoldHorizontal,
  FoldVertical,
  MoveLeft,
  MoveRight,
  Trash2,
  UnfoldHorizontal,
  UnfoldVertical,
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
  const footOptions = ['37', '47', '57'] as const
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

  const getContainerDimensions = () => {
    const scalingFactor = 2
    return {
      height: `${scalingFactor * Number(foot)}px`,
      width: `${scalingFactor * Number(width)}px`,
    }
  }

  return (
    <Popover>
      <PopoverTrigger
        style={getContainerDimensions()}
        className="flex flex-col border-2 border-slate-700 transition-width justify-center items-center">
        <div>{[width, foot, height].join('/')}</div>
        <div>{shelves.join(' + ')}</div>
      </PopoverTrigger>
      <PopoverContent>
        <div>
          <FormField
            control={form.control}
            name={`groups.${groupIndex}.foot`}
            render={({ field }) => {
              const currentFootIndex = indexOf(field.value, footOptions)

              return (
                <FormItem>
                  <div className="flex">
                    stopa
                    <Button
                      size="icon"
                      variant="ghost"
                      disabled={currentFootIndex < 1}
                      onClick={() => {
                        form.setValue(
                          field.name,
                          footOptions[currentFootIndex - 1],
                        )
                        form.trigger(field.name)
                      }}>
                      <FoldVertical />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      disabled={currentFootIndex >= size(footOptions) - 1}
                      onClick={() => {
                        form.setValue(
                          field.name,
                          footOptions[currentFootIndex + 1],
                        )
                        form.trigger(field.name)
                      }}>
                      <UnfoldVertical />
                    </Button>
                  </div>
                </FormItem>
              )
            }}
          />
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
