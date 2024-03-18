import { getProducts } from "../catalog/actions"
import { StandForm } from "./StandForm"

export default async function Home() {
  const products = await getProducts()

  return <StandForm products={products} />
}
