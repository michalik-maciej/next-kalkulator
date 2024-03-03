"use server"

import { revalidatePath } from "next/cache"
import { getOr } from "lodash/fp"
import { Product } from "@prisma/client"

import prisma from "@/lib/prisma"

export const updateProduct = async (data: Product) => {
  try {
    await prisma.product.update({
      where: { id: data.id },
      data,
    })
    revalidatePath("/catalog")
    return { message: "Dane zapisane" }
  } catch (error) {
    return { message: getOr("Error", "message", error) }
  }
}
