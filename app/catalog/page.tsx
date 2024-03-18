import { Product } from '@prisma/client'
import { filter, keys, sortBy } from 'lodash/fp'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { ProductForm } from './ProductForm'
import { getProducts } from './actions'

export default async function Home() {
  const products = await getProducts()

  const dictionary: {
    [key in Product['category']]: string
  } = {
    leg: 'Nogi',
    foot: 'Stopy',
    baseCover: 'Osłony dolne',
    shelf: 'Półki',
    support: 'Wsporniki',
    back: 'Plecy',
    priceStrip: 'Listwy cenowe',
    misc: 'Inne',
  }

  const categoriesOrder = keys(dictionary) as Product['category'][]

  const sortedCategories = sortBy(
    (category) => categoriesOrder.indexOf(category),
    categoriesOrder,
  )

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
            {filter(['category', category], products).map((product, index) => (
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
