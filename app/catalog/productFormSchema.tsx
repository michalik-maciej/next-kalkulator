"use client"

import { z } from "zod"
import { Category } from "@prisma/client"

export const productFormSchema = z.object({
  category: z.nativeEnum(Category),
  depth: z.coerce.number().int().nullable(),
  height: z.coerce.number().int().nullable(),
  id: z.string().uuid(),
  price: z.coerce.number().positive(">= 0"),
  width: z.coerce.number().int().nullable(),
  label: z.string().min(3, "min. 3 znaki").max(30, "max 30 znaków"),
})
