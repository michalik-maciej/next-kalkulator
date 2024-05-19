'use client'

import { indexOf, size } from 'lodash/fp'
import { ArrowDownToLine, ArrowUpFromLine, ToggleRight } from 'lucide-react'
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'

import { useEditOptions } from '@/app/utils'
import { useInitialCollection } from '@/app/utils/useInitialCollection'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { FormField } from '@/components/ui/form'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

import { CalculationType } from '../../formSchema'

interface Props {
  collectionIndex: number
}

export const EditCollection = ({ collectionIndex }: Props) => {
  const form = useFormContext<CalculationType>()
  const currentCollectionVariant = form.watch(
    `collections.${collectionIndex}.variant`,
  )
  const [presetCollectionVariant, setPresetCollectionVariant] = useState(
    currentCollectionVariant,
  )
  const [dialogOpen, setDialogOpen] = useState(false)

  const { collectionVariants, heightOptions } = useEditOptions()
  const { setCollectionGroups } = useInitialCollection()

  const handleSetCollectionGroups = () => {
    form.setValue(
      `collections.${collectionIndex}.groups`,
      setCollectionGroups(presetCollectionVariant),
      { shouldTouch: true },
    )

    form.setValue(
      `collections.${collectionIndex}.variant`,
      presetCollectionVariant,
      { shouldTouch: true },
    )
    const dialogTimeout = setTimeout(() => setDialogOpen(false), 300)

    return () => clearTimeout(dialogTimeout)
  }

  const collectionVariantLabels = {
    P: 'Przyścienny',
    G: 'Gondola',
    I: 'Impuls',
  }

  return (
    <>
      <div className="flex items-center justify-between h-[35px]">
        <div>Rodzaj ciągu</div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger>
            <Button size="icon" variant="ghost">
              <ToggleRight />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="mx-auto">
                <ToggleRight />
              </DialogTitle>
              <DialogDescription className="mx-auto">
                Zmiana rodzaju spowoduje usunięcie danych ciągu nr{' '}
                {collectionIndex + 1}
              </DialogDescription>
            </DialogHeader>
            <RadioGroup
              onValueChange={(value: typeof currentCollectionVariant) =>
                setPresetCollectionVariant(value)
              }
              defaultValue={currentCollectionVariant}
              className="flex flex-col gap-4 mt-4 mx-24">
              {collectionVariants.map((option) => (
                <div key={option} className="flex gap-4">
                  <RadioGroupItem
                    disabled={option === 'I'}
                    value={option}
                    id={option}
                  />
                  <Label
                    htmlFor={option}
                    className={option === 'I' ? 'opacity-30' : ''}>
                    {collectionVariantLabels[option]}
                  </Label>
                </div>
              ))}
            </RadioGroup>
            <DialogFooter className="mt-4 mx-auto gap-4">
              <Button variant="outline" asChild>
                <DialogClose>Anuluj</DialogClose>
              </Button>
              <Button
                onClick={handleSetCollectionGroups}
                disabled={currentCollectionVariant === presetCollectionVariant}>
                Zmień
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <FormField
        control={form.control}
        name={`collections.${collectionIndex}.height`}
        render={({ field }) => {
          const currentHeightIndex = indexOf(field.value, heightOptions)

          return (
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
                  }}>
                  <ArrowUpFromLine />
                </Button>
              </div>
            </div>
          )
        }}
      />
    </>
  )
}
