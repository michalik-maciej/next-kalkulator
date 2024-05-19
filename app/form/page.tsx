'use client'

import { Plus } from 'lucide-react'
import { useFieldArray, useFormContext } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { CalculationType } from '../formSchema'
import { CalculationMenu } from './CalculationMenu'
import { CollectionElements } from './CollectionElements'
import { CollectionView } from './CollectionView'

export default function Calculation() {
  const form = useFormContext<CalculationType>()

  const collections = useFieldArray({
    control: form.control,
    name: 'collections',
  })

  return (
    <>
      <div className="flex flex-col">
        <div className="flex m-8 space-x-6 items-start justify-between">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-2/5">
                <FormControl>
                  <Input {...field} type="text" />
                </FormControl>
              </FormItem>
            )}
          />
          {/* <CalculationMenu /> */}
        </div>
        {collections.fields.map((collection, collectionIndex) => (
          <CollectionView key={collection.id} collectionIndex={collectionIndex}>
            <CollectionElements collectionIndex={collectionIndex} />
          </CollectionView>
        ))}
        <Button
          className="mx-auto w-40 gap-2"
          onClick={() => collections.append(form.getValues('collections')[0])}>
          <Plus />
          Dodaj ciąg
        </Button>
      </div>
      <Button type="submit">Submit</Button>
    </>
  )
}
