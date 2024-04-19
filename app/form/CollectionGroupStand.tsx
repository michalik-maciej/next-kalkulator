'use client'

import { indexOf, size } from 'lodash/fp'
import {
  ArrowDownToLine,
  ArrowUpFromLine,
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
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer'
import { FormField, FormItem } from '@/components/ui/form'
import { Separator } from '@/components/ui/separator'

import { CollectionGroupStandShelves } from './CollectionGroupStandShelves'
import { CollectionType } from './formSchema'

interface Props {
  groupIndex: number
  standDialogOpen: number | null
  setStandDialogOpen: (Arg: number | null) => void
  standIndex: number
  stands: UseFieldArrayReturn<FieldValues, 'stands', 'id'>
}

export const CollectionGroupStand = ({
  groupIndex,
  standDialogOpen,
  setStandDialogOpen,
  standIndex,
  stands,
}: Props) => {
  const footOptions = ['37', '47', '57'] as const
  const heightOptions = ['90', '130', '170', '180', '210'] as const
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
    <Drawer
      direction="right"
      onOpenChange={(isOpen) => setStandDialogOpen(isOpen ? standIndex : null)}>
      <DrawerTrigger
        style={getContainerDimensions()}
        className={`flex flex-col border-2 transition-width justify-center items-center ${standDialogOpen === standIndex ? 'border-red-400' : 'border-slate-700'} border`}>
        <div>{[width, foot, height].join('/')}</div>
        <div>{shelves.join(' + ')}</div>
      </DrawerTrigger>
      <DrawerContent>
        <div className="m-8">
          <FormField
            control={form.control}
            name="height"
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
          <FormField
            control={form.control}
            name={`groups.${groupIndex}.foot`}
            render={({ field }) => {
              const currentFootIndex = indexOf(field.value, footOptions)

              return (
                <FormItem>
                  <div className="flex justify-between items-center">
                    <div>Stopa {field.value}</div>
                    <div className="flex gap-2">
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
                  </div>
                </FormItem>
              )
            }}
          />
          <Separator className="my-2" />

          <FormField
            control={form.control}
            name={`groups.${groupIndex}.stands.${standIndex}.width`}
            render={({ field }) => {
              const currentWidthIndex = indexOf(field.value, widthOptions)

              return (
                <FormItem>
                  <div className="flex justify-between items-center">
                    <div>Szerokość {field.value}</div>
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
                </FormItem>
              )
            }}
          />
          <Separator className="my-2" />
          <div className="flex justify-between items-center">
            <div>Regał</div>
            <div className="flex flex-col">
              <div className="flex gap-x-2">
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
              </div>
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
          </div>
          <Separator className="my-2" />

          <CollectionGroupStandShelves
            groupIndex={groupIndex}
            standIndex={standIndex}
          />
        </div>
      </DrawerContent>
    </Drawer>
  )
}
