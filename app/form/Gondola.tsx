'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { indexOf, size } from 'lodash/fp'
import {
  ArrowLeftToLine,
  ArrowRightFromLine,
  BetweenVerticalEnd,
  MoveLeft,
  MoveRight,
  Plus,
  Trash2,
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

const FormSchema = z.object({
  foot: z.enum(['37', '47', '57']),
  stands: z.array(z.object({ width: z.enum(['80', '100', '120']) })),
})

export function Gondola() {
  const widthOptions = ['80', '100', '120'] as const

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { foot: '47', stands: [{ width: '100' }] },
  })

  const { append, fields, insert, remove, swap } = useFieldArray({
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
        <div
          className="flex border-2 my-32"
          style={{ height: `${2 * Number(form.getValues('foot'))}px` }}>
          {fields.map((stand, index) => (
            <FormField
              key={stand.id}
              control={form.control}
              name={`stands.${index}.width`}
              render={({ field }) => {
                const currentValueIndex = indexOf(field.value, widthOptions)

                return (
                  <Popover>
                    <PopoverTrigger>
                      <div
                        style={{ width: `${2 * Number(field.value)}px` }}
                        className="p-4 border-2 transition-width h-full">
                        <div className="my-auto">
                          {[field.value, form.getValues('foot')].join('/')}
                        </div>
                      </div>
                    </PopoverTrigger>
                    <PopoverContent>
                      <FormItem>
                        <div className="flex">
                          <Button
                            variant="ghost"
                            disabled={index < 1}
                            size="icon"
                            onClick={() => swap(index, index - 1)}>
                            <MoveLeft />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() =>
                              insert(index + 1, { width: field.value })
                            }>
                            <BetweenVerticalEnd />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            disabled={currentValueIndex < 1}
                            onClick={() =>
                              form.setValue(
                                field.name,
                                widthOptions[currentValueIndex - 1],
                              )
                            }>
                            <ArrowLeftToLine />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            disabled={
                              currentValueIndex >= size(widthOptions) - 1
                            }
                            onClick={() =>
                              form.setValue(
                                field.name,
                                widthOptions[currentValueIndex + 1],
                              )
                            }>
                            <ArrowRightFromLine />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => remove(index)}>
                            <Trash2 />
                          </Button>
                          <Button
                            variant="ghost"
                            disabled={index >= size(fields) - 1}
                            size="icon"
                            onClick={() => swap(index, index + 1)}>
                            <MoveRight />
                          </Button>
                        </div>
                        <FormMessage />
                      </FormItem>
                    </PopoverContent>
                  </Popover>
                )
              }}
            />
          ))}
          {!size(fields) && (
            <Button
              className="my-auto mx-8"
              variant="outline"
              size="icon"
              onClick={() => append({ width: '100' })}>
              <Plus />
            </Button>
          )}
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
