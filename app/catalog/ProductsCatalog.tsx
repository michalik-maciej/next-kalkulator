"use client"

import { keys, groupBy } from "lodash/fp"
import { Product } from "@prisma/client"

import { updateProduct } from "../actions"

const SubmitButton = () => {
  return <button type="submit">Submit</button>
}

export const ProductsCatalog = ({ products }: { products: Product[] }) => {
  const groupedProducts = groupBy("category", products)
  console.log(products)
  return (
    <div>
      {keys(groupedProducts).map((category) => (
        <ul key={category}>
          {groupedProducts[category].map((item) => (
            <li key={item.id}>
              <form action={updateProduct}>
                <input type="hidden" name="id" value={item.id} />
                <input name="label" defaultValue={item.label} />
                <SubmitButton />
              </form>
            </li>
          ))}
        </ul>
      ))}
    </div>
  )
}
