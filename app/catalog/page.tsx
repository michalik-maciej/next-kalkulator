import { filter, keys } from 'lodash/fp'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { getProducts } from '../actions/getProducts'
import { sortProductsByCategory } from '../utils/sortProductsByCategory'
import { ProductForm } from './ProductForm'

export default async function Catalog() {
  const products = await getProducts()
  const { dictionary, sortedCategories } = sortProductsByCategory()

  return (
    <Tabs defaultValue={keys(dictionary)[0]}>
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
