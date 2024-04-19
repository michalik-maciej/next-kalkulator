'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Product } from '@prisma/client'
import { useFieldArray, useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { toast } from '@/components/ui/use-toast'

import { CollectionGroup } from '../CollectionGroup'
import { Order } from '../Order'
import { CollectionType, collectionSchema } from '../formSchema'
import styles from './CollectionGondola.module.css'

export function CollectionGondola({ products }: { products: Product[] }) {
  const form = useForm<CollectionType>({
    resolver: zodResolver(collectionSchema),
    defaultValues: {
      height: '130',
      groups: Array(4).fill({
        foot: '37',
        stands: [{ width: '80', shelves: [{ amount: 3, depth: '37' }] }],
      }),
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
          <div className={styles.layout}>
            {groups.fields.map((group, index) => (
              <div key={group.id} className="border-2 border-slate-900">
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
