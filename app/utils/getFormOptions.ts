import { Product } from "@prisma/client"
import { flow, map, uniq, filter } from "lodash/fp"

export const getFormOptions = (products: Product[]) => {
  const widths = flow(
    filter({ category: "back" }),
    map("width"),
    uniq
  )(products) as number[]

  return { widths }
}
