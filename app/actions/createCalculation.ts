'use server'

import { Calculation } from '@prisma/client'
import { getOr } from 'lodash/fp'
import { revalidatePath } from 'next/cache'

import prisma from '@/lib/prisma'

import { CalculationType, calculationSchema } from '../formSchema'

export const createCalculation = async (data: Calculation) => {
  try {
    await prisma.calculation.create({
      data: { ...data, createdAt: new Date().toLocaleDateString() },
    })
    revalidatePath('/form')
    return { message: 'Kalkulacja dodana' }
  } catch (error) {
    return { message: getOr('Error', 'message', error) }
  }
}
