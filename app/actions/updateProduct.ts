"use server"
import prisma from "@/lib/prisma"

export const updateProduct = async (formData: FormData) => {
  //  const product = await prisma.products.findUnique({ where: { id } })

  const productId = formData.get("label")

  console.log("update", productId)
  return { message: "ok" }
}
