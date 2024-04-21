'use client'

import { Product } from '@prisma/client'
import { ReactNode, createContext, useContext } from 'react'

const ProductsContext = createContext<Product[]>([])

interface Props {
  children: ReactNode
  products: Product[]
}

export const useProducts = () => useContext(ProductsContext)
export const ProductsProvider = ({ children, products }: Props) => (
  <ProductsContext.Provider value={products}>
    {children}
  </ProductsContext.Provider>
)
