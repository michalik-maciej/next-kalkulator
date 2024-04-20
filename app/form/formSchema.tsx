'use client'

import { z } from 'zod'

export const shelfSchema = z.object({
  amount: z.number().int(),
  depth: z.enum(['37', '47', '57']),
})

export const standSchema = z.object({
  width: z.enum(['66', '80', '100', '125']),
  shelves: z.array(shelfSchema),
})

export const groupSchema = z.object({
  foot: z.enum(['37', '47', '57']),
  stands: z.array(standSchema),
  variant: z.enum(['peak', 'side']),
})

export const collectionSchema = z.object({
  groups: z.array(groupSchema),
  height: z.enum(['90', '130', '170', '180', '210']),
  variant: z.enum(['P', 'G', 'I']),
})

export const calculationSchema = z.object({
  title: z.string().max(160),
  collections: z.array(collectionSchema),
})

export type CollectionType = z.infer<typeof collectionSchema>
export type GroupType = z.infer<typeof groupSchema>
export type StandType = z.infer<typeof standSchema>
export type ShelfType = z.infer<typeof shelfSchema>
export type CalculationType = z.infer<typeof calculationSchema>
