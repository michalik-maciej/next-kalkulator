import prisma from '@/lib/prisma'

export const getProducts = async () => {
  const products = await prisma.product.findMany({
    orderBy: [
      { height: 'asc' },
      { width: 'asc' },
      { depth: 'asc' },
      { label: 'asc' },
    ],
  })
  return products
}
