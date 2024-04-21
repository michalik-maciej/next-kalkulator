import { Calculation } from './Calculation'
import { CalculationType, GroupType } from './formSchema'

export default function Home() {
  const initialGroup: GroupType = {
    foot: 37,
    stands: [{ width: 80, shelves: [{ amount: 3, depth: 37 }] }],
    variant: 'side',
  }

  const date = new Date()
  const initialData: CalculationType = {
    title: `Kalkulacja ${date.toLocaleString('pl')}`,
    collections: [
      {
        height: 130,
        groups: Array(1).fill(initialGroup),
        variant: 'P',
      },
    ],
  }

  return <Calculation initialData={initialData} />
}
