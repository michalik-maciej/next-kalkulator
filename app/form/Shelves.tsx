'use client'

import { Product } from '@prisma/client'
import { filter } from 'lodash/fp'
import { Fragment } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface Props {
  products: Product[]
}

export const Shelves = ({ products }: Props) => {
  const { control, getValues } = useFormContext()
  const options = filter(
    { category: 'shelf', width: Number(getValues().width) },
    products,
  )
  const {
    fields: shelves,
    append,
    remove,
  } = useFieldArray({
    control,
    name: 'shelves',
  })

  return (
    <>
      {shelves.map((field, index) => (
        <Fragment key={field.id}>
          <FormField
            control={control}
            name={`shelves.${index}.depth`}
            render={({ field }) => (
              <FormItem>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Głębokość" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {options.map(({ id, label }) => (
                      <SelectItem key={id} value={id}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            key={field.id}
            name={`shelves.${index}.amount`}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} type="number" />
                </FormControl>
              </FormItem>
            )}
          />
          <Button variant="secondary" size="sm" onClick={() => remove(index)}>
            Usuń półki
          </Button>
        </Fragment>
      ))}
      <Button variant="secondary" size="sm" onClick={append}>
        Dodaj półki
      </Button>
    </>
  )
}
