import { Product } from '@prisma/client'
import { Trash2 } from 'lucide-react'
import { useFormContext } from 'react-hook-form'

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
  field: Record<'id', string>
  options: Product[]
  remove: () => void
}

export const AmountSelect = ({ field, options, remove }: Props) => {
  const { control } = useFormContext()

  return (
    <div className="flex gap-2 w-64 items-center">
      <FormField
        control={control}
        key={field.id}
        name={`${field.id}.amount`}
        render={({ field }) => (
          <FormItem className="w-1/4">
            <FormControl>
              <Input {...field} type="number" />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name={`${field.id}.select`}
        render={({ field }) => (
          <FormItem className="w-1/2">
            <Select onValueChange={field.onChange}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue />
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
      <Button variant="outline" size="icon" onClick={remove}>
        <Trash2 className="h-5 w-5" />
      </Button>
    </div>
  )
}
