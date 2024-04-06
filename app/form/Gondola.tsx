'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { indexOf, size } from 'lodash/fp'
import {
  BetweenVerticalEnd,
  FoldHorizontal,
  MoveLeft,
  MoveRight,
  Plus,
  Trash2,
  UnfoldHorizontal,
} from 'lucide-react'
import { useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { toast } from '@/components/ui/use-toast'

import { Shelves } from './Shelves'

export const FormSchema = z.object({
  foot: z.enum(['37', '47', '57']),
  stands: z.array(
    z.object({
      width: z.enum(['80', '100', '120']),
      shelves: z.array(
        z.object({ amount: z.number(), depth: z.enum(['37', '47', '57']) }),
      ),
    }),
  ),
})

export function Gondola() {
  const widthOptions = ['80', '100', '120'] as const

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      foot: '47',
      stands: [{ width: '100', shelves: [{ amount: 3, depth: '47' }] }],
    },
  })

  const stands = useFieldArray({
    control: form.control,
    name: 'stands',
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
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
        <FormField
          control={form.control}
          name="foot"
          render={({ field }) => {
            return (
              <FormItem>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-row space-x-2 m-4">
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="37" />
                      </FormControl>
                      <FormLabel className="font-normal">37</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="47" />
                      </FormControl>
                      <FormLabel className="font-normal">47</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="57" />
                      </FormControl>
                      <FormLabel className="font-normal">57</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )
          }}
        />
        <div className="flex my-16">
          {stands.fields.map((stand, index) => {
            const foot = form.getValues('foot')
            const width = form.getValues(`stands.${index}.width`)
            const shelves = form
              .getValues(`stands.${index}.shelves`)
              .map(({ amount, depth }) => `${amount}x${depth}`)

            return (
              <Popover key={stand.id}>
                <PopoverTrigger>
                  <div
                    style={{
                      height: `${2 * Number(foot)}px`,
                      width: `${2 * Number(width)}px`,
                    }}
                    className="p-4 border-2 transition-width h-full">
                    <div>{[width, foot].join('/')}</div>
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
                      const currentWidthIndex = indexOf(
                        field.value,
                        widthOptions,
                      )

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
                              disabled={
                                currentWidthIndex >= size(widthOptions) - 1
                              }
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
                  <Shelves standIndex={index} />
                </PopoverContent>
              </Popover>
            )
          })}
          {!size(stands.fields) && (
            <Button
              className="my-auto mx-8"
              variant="outline"
              size="icon"
              onClick={() =>
                stands.append({
                  width: '100',
                  shelves: [{ amount: 3, depth: '37' }],
                })
              }>
              <Plus />
            </Button>
          )}
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
