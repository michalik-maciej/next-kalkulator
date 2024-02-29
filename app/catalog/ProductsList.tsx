"use client"

import { keys, groupBy } from "lodash/fp"
import { Product } from "@prisma/client"

import { updateProduct } from "../actions"

const SubmitButton = () => {
  return <button type="submit">Submit</button>
}

export const ProductsList = ({ products }: { products: Product[] }) => {
  return (
    <ul>
      {products.map((item) => (
        <li key={item.id}>
          <form action={updateProduct}>
            <input type="hidden" name="id" value={item.id} />
            <input name="label" defaultValue={item.label} />
            <SubmitButton />
          </form>
        </li>
      ))}
    </ul>
  )
}
