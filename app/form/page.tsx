import { getProducts } from '../catalog/actions'
import { Calculation } from './Calculation'
import { StandForm } from './StandForm'

export default async function Home() {
  const products = await getProducts()

  const date = new Date()
  const initialData = {
    title: `Kalkulacja ${date.toLocaleString('pl')}`,
  }

  return <Calculation initialData={initialData} />
}
