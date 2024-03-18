import { range } from 'lodash/fp'

import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <div className="flex flex-col items-center space-y-2 w-[850px]">
      <Skeleton className="h-10 rounded-md w-full mb-12" />
      {range(0, 6).map((index) => (
        <Skeleton key={index} className="h-10 w-full rounded-md" />
      ))}
    </div>
  )
}
