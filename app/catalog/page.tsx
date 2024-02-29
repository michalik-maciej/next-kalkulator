import { keys, groupBy } from "lodash/fp"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { ProductsList } from "./ProductsList"
import { getProducts } from "../actions"

export default async function Home() {
  const products = await getProducts()
  const groupedProducts = groupBy("category", products)

  return (
    <Tabs className="w-[400px]">
      <TabsList>
        {keys(groupedProducts).map((category) => (
          <TabsTrigger key={category} value={category}>
            {category}
          </TabsTrigger>
        ))}
      </TabsList>
      {keys(groupedProducts).map((category) => (
        <TabsContent key={category} value={category}>
          <ProductsList products={groupedProducts[category]} />
        </TabsContent>
      ))}
    </Tabs>
  )
}
