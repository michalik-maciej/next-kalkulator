"use server"

import { revalidatePath } from "next/cache"
import { getOr } from "lodash/fp"

import prisma from "@/lib/prisma"

export const deleteProduct = async (id: string) => {
  try {
    await prisma.product.delete({ where: { id } })
    revalidatePath("/catalog")
    return { message: "Produkt usunięty" }
  } catch (error) {
    return { message: getOr("Error", "message", error) }
  }
}
