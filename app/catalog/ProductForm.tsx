"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, SubmitHandler, Controller } from "react-hook-form"
import { z } from "zod"
import { Product } from "@prisma/client"
import {
  Loader2,
  SaveIcon,
  RotateCcwIcon,
  CopyPlusIcon,
  Trash2Icon,
} from "lucide-react"
import { get } from "lodash/fp"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormLabel,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"

import { deleteProduct, updateProduct, createProduct } from "../actions"
import { productFormSchema } from "./productFormSchema"

type FormType = z.infer<typeof productFormSchema>

interface Props {
  product: Product
  isFirst?: boolean
}

export const ProductForm = ({ product, isFirst }: Props) => {
  const { toast } = useToast()
  const form = useForm<FormType>({
    resolver: zodResolver(productFormSchema),
    defaultValues: product,
  })

  const {
    control,
    reset,
    formState: { isDirty, isSubmitting, dirtyFields },
    handleSubmit,
  } = form

  const onSubmit: SubmitHandler<FormType> = async (data) => {
    const response = await updateProduct(data)
    toast({
      title: response.message,
      description: product.label,
    })
    reset(data)
  }

  const onDelete = async () => {
    const response = await deleteProduct(product.id)
    toast({
      title: response.message,
      description: product.label,
    })
  }

  const onCreate = async () => {
    const response = await createProduct(product)
    toast({
      title: response.message,
      description: product.label,
    })
  }

  const fieldNames = ["label", "height", "width", "depth", "price"] as const
  type Dictionary = {
    [key in (typeof fieldNames)[number]]: string
  }

  const fieldDictionary: Dictionary = {
    label: "Opis",
    height: "Wysokość [cm]",
    width: "Szerokość [cm]",
    depth: "Głębokość [cm]",
    price: "Cena [zł]",
  }

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative group flex gap-8 m-2 items-end"
      >
        <Controller
          control={control}
          name="id"
          defaultValue={product.id}
          render={({ field }) => <input type="hidden" {...field} />}
        />
        <Controller
          control={control}
          name="category"
          defaultValue={product.category}
          render={({ field }) => <input type="hidden" {...field} />}
        />
        {fieldNames.map((fieldName) => (
          <FormField
            key={fieldName}
            disabled={isSubmitting}
            control={control}
            defaultValue={get(fieldName, product)}
            name={fieldName}
            render={({ field }) => (
              <FormItem
                className={`${fieldName === "label" ? "w-64" : "w-28"} ${
                  isFirst ? "space-y-4" : ""
                }`}
              >
                {isFirst && <FormLabel>{fieldDictionary[fieldName]}</FormLabel>}
                <FormControl>
                  <Input
                    {...field}
                    value={field.value || undefined}
                    className={`group-hover:border-slate-300 ${
                      get(fieldName, dirtyFields) ? "border-red-300" : ""
                    }`}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <div className="absolute flex space-x-2 translate-x-full -right-6">
          <Button
            disabled={isSubmitting}
            className={`transition-all ${
              isDirty || isSubmitting ? "opacity-100" : "opacity-0"
            } group-hover:opacity-100`}
            size="icon"
            variant="outline"
            type="submit"
          >
            {isSubmitting ? <Loader2 className="animate-spin" /> : <SaveIcon />}
          </Button>
          <Button
            disabled={isSubmitting}
            className={`transition-all ${
              isDirty || isSubmitting ? "opacity-100" : "opacity-0"
            } group-hover:opacity-100`}
            variant="outline"
            size="icon"
            type="button"
            onClick={() => form.reset(product)}
          >
            <RotateCcwIcon />
          </Button>
          <Button
            className={`transition-all ${
              isDirty || isSubmitting ? "opacity-100" : "opacity-0"
            } group-hover:opacity-100`}
            size="icon"
            variant="outline"
            type="button"
            onClick={onCreate}
          >
            {isSubmitting ? (
              <Loader2 className="animate-spin" />
            ) : (
              <CopyPlusIcon />
            )}
          </Button>
          <Button
            className={`transition-all ${
              isDirty || isSubmitting ? "opacity-100" : "opacity-0"
            } group-hover:opacity-100`}
            size="icon"
            variant="outline"
            type="button"
            onClick={onDelete}
          >
            {" "}
            {isSubmitting ? (
              <Loader2 className="animate-spin" />
            ) : (
              <Trash2Icon />
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}
