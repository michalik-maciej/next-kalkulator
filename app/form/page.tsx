import { getProducts } from '../catalog/actions'
import { Collection } from './Collection'
import { CollectionGondola } from './CollectionGondola'

export default async function Home() {
  const products = await getProducts()

  // const date = new Date()
  // const initialData = {
  //   title: `Kalkulacja ${date.toLocaleString('pl')}`,
  //   stands: [],
  // }

  return <CollectionGondola products={products} />
}
