import { ProductsCatalog } from "./ProductsCatalog"
import { getProducts } from "../actions"

export default async function Home() {
  const products = await getProducts()

  return <ProductsCatalog products={products} />
}
