'use client'

import { z } from 'zod'

export const shelfSchema = z.object({
  amount: z.number().int(),
  depth: z.number(),
})

export const standSchema = z.object({
  width: z.number(),
  shelves: z.array(shelfSchema),
})

export const groupSchema = z.object({
  foot: z.number(),
  stands: z.array(standSchema),
  variant: z.enum(['peak', 'side', 'side-gondola']),
})

export const collectionSchema = z.object({
  groups: z.array(groupSchema),
  height: z.number(),
  variant: z.enum(['P', 'G', 'I']),
})

export const calculationSchema = z.object({
  title: z.string().max(160),
  collections: z.array(collectionSchema),
  // discount: z.number(),
  //   color: {
  //   elements: string
  //   strips: string
  // },
})

export type CollectionType = z.infer<typeof collectionSchema>
export type GroupType = z.infer<typeof groupSchema>
export type StandType = z.infer<typeof standSchema>
export type ShelfType = z.infer<typeof shelfSchema>
export type CalculationType = z.infer<typeof calculationSchema>
