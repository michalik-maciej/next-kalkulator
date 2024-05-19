'use server'

import { Product } from '@prisma/client'
import { getOr } from 'lodash/fp'
import { revalidatePath } from 'next/cache'

import prisma from '@/lib/prisma'

export const updateProduct = async (data: Product) => {
  try {
    await prisma.product.update({
      where: { id: data.id },
      data,
    })
    revalidatePath('/catalog')
    return { message: 'Dane zapisane' }
  } catch (error) {
    return { message: getOr('Error', 'message', error) }
  }
}
