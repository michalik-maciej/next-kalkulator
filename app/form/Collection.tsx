'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { indexOf, size } from 'lodash/fp'
import { ArrowDownToLine, ArrowUpFromLine } from 'lucide-react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Form, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { toast } from '@/components/ui/use-toast'

import { CollectionGroup } from './CollectionGroup'
import { CollectionType, collectionSchema } from './formSchema'

export function Collection() {
  const heightOptions = ['90', '110', '150', '170', '210'] as const

  const form = useForm<CollectionType>({
    resolver: zodResolver(collectionSchema),
    defaultValues: {
      height: '150',
      foot: '47',
      stands: [{ width: '100', shelves: [{ amount: 3, depth: '47' }] }],
    },
  })

  function onSubmit(data: CollectionType) {
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
          <CollectionGroup />
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  )
}
