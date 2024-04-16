'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Product } from '@prisma/client'
import { indexOf, size } from 'lodash/fp'
import { ArrowDownToLine, ArrowUpFromLine } from 'lucide-react'
import { useFieldArray, useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Form, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { toast } from '@/components/ui/use-toast'

import { CollectionGroup } from '../CollectionGroup'
import { Order } from '../Order'
import { CollectionType, collectionSchema } from '../formSchema'
import styles from './CollectionGondola.module.css'

export function CollectionGondola({ products }: { products: Product[] }) {
  const heightOptions = ['90', '130', '170', '180', '210'] as const

  const form = useForm<CollectionType>({
    resolver: zodResolver(collectionSchema),
    defaultValues: {
      height: '130',
      groups: [
        {
          foot: '47',
          stands: [{ width: '100', shelves: [{ amount: 3, depth: '47' }] }],
        },
      ],
      variant: 'G',
    },
  })
  const groups = useFieldArray({
    control: form.control,
    name: 'groups',
  })

  function onSubmit(data: CollectionType) {
    console.log(data)
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="m-8">
          <FormField
            control={form.control}
            name="height"
            render={({ field }) => {
              const currentHeightIndex = indexOf(field.value, heightOptions)

              return (
                <FormItem>
                  <div className="flex">
                    <FormLabel>wysokość</FormLabel>
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
                </FormItem>
              )
            }}
          />
          <div className={styles.layout}>
            {groups.fields.map((group, index) => (
              <div key={group.id} className={`border-2 border-slate-900`}>
                <CollectionGroup groupIndex={index} />
              </div>
            ))}
          </div>
          <Button type="submit">Submit</Button>
        </div>
        <Order products={products} />
      </form>
    </Form>
  )
}
