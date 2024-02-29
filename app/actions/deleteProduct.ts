"use server"
import prisma from "@/lib/prisma"

export const deleteProduct = async (formData: FormData) => {
  //  const product = await prisma.products.findUnique({ where: { id } })

  console.log("delete", formData.get("id"))
  return { message: "ok" }
}
