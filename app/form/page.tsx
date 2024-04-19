import { getProducts } from '../catalog/actions'
import { Calculation } from './Calculation'
import { CalculationType } from './formSchema'

export default async function Home() {
  const products = await getProducts()

  const date = new Date()
  const initialData: CalculationType = {
    title: `Kalkulacja ${date.toLocaleString('pl')}`,
    collections: [
      {
        height: '130',
        groups: Array(4).fill({
          foot: '37',
          stands: [{ width: '80', shelves: [{ amount: 3, depth: '37' }] }],
        }),
        variant: 'G',
      },
    ],
  }

  return <Calculation initialData={initialData} products={products} />
}
