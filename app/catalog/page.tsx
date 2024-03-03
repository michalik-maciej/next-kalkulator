import { filter, sortBy } from "lodash/fp"
import { Product } from "@prisma/client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { getProducts } from "../actions"
import { ProductForm } from "./ProductForm"

type Dictionary = {
  [key in Product["category"]]: string
}

export default async function Home() {
  const products = await getProducts()

  const categoriesOrder: Product["category"][] = [
    "leg",
    "foot",
    "baseCover",
    "shelf",
    "support",
    "back",
    "priceStrip",
    "misc",
  ]

  const sortedCategories = sortBy(
    (category) => categoriesOrder.indexOf(category),
    categoriesOrder
  )
  const dictionary: Dictionary = {
    baseCover: "Osłony dolne",
    misc: "Inne",
    foot: "Stopy",
    leg: "Nogi",
    support: "Wsporniki",
    shelf: "Półki",
    back: "Plecy",
    priceStrip: "Listwy cenowe",
  }

  return (
    <Tabs defaultValue={categoriesOrder[0]}>
      <TabsList className="w-full space-x-4">
        {sortedCategories.map((category) => (
          <TabsTrigger key={category} value={category}>
            {dictionary[category]}
          </TabsTrigger>
        ))}
      </TabsList>
      {sortedCategories.map((category) => (
        <TabsContent key={category} value={category}>
          <ul className="pt-8">
            {filter(["category", category], products).map((product, index) => (
              <li key={product.id}>
                <ProductForm product={product} isFirst={index === 0} />
              </li>
            ))}
          </ul>
        </TabsContent>
      ))}
    </Tabs>
  )
}
