'use client'

import { z } from 'zod'

export const shelfSchema = z.object({
  amount: z.coerce.number().int(),
  depth: z.string().uuid(),
})

export const standSchema = z.object({
  amount: z.coerce.number().int(),
  width: z.enum(['66', '80', '100', '125']),
  shelves: z.array(shelfSchema),
})

export const collectionSchema = z.object({
  amount: z.coerce.number().int(),
  foot: z.coerce.number().int(),
  height: z.coerce.number().int(),
  variant: z.enum(['P', 'G', 'I']),
  stands: z.array(standSchema),
})

export type CollectionType = z.infer<typeof collectionSchema>
export type StandType = z.infer<typeof standSchema>
export type ShelfType = z.infer<typeof shelfSchema>
