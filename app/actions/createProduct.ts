"use server"

import { revalidatePath } from "next/cache"
import { getOr } from "lodash/fp"
import { Product } from "@prisma/client"

import prisma from "@/lib/prisma"

export const createProduct = async (data: Product) => {
  try {
    await prisma.product.create({
      data: { ...data, id: crypto.randomUUID() },
    })
    revalidatePath("/catalog")
    return { message: "Produkt dodany" }
  } catch (error) {
    return { message: getOr("Error", "message", error) }
  }
}
