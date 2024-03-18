'use server'

import { getOr } from 'lodash/fp'
import { revalidatePath } from 'next/cache'

import prisma from '@/lib/prisma'

import { StandType } from '../formSchema'

export const createStand = async (data: StandType) => {
  try {
    await prisma.stand.create({
      data: {
        ...data,
        shelves: { create: data.shelves },
      },
    })
    revalidatePath('/form')
    return { message: 'Regał dodany' }
  } catch (error) {
    return { message: getOr('Error', 'message', error) }
  }
}
