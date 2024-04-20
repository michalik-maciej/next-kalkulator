'use client'

import { Separator } from '@/components/ui/separator'

import { EditCollection } from '../EditCollection'
import { EditGroup } from '../EditGroup'
import { EditShelves } from '../EditShelves'
import { EditStand } from '../EditStand'

interface Props {
  collectionIndex: number
  groupIndex: number
  standIndex: number
}

export const EditWrapper = ({
  collectionIndex,
  groupIndex,
  standIndex,
}: Props) => (
  <>
    <EditCollection collectionIndex={collectionIndex} />
    <EditGroup collectionIndex={collectionIndex} groupIndex={groupIndex} />
    <EditStand
      collectionIndex={collectionIndex}
      groupIndex={groupIndex}
      standIndex={standIndex}
    />
    <Separator className="my-2" />
    <EditShelves
      collectionIndex={collectionIndex}
      groupIndex={groupIndex}
      standIndex={standIndex}
    />
    <Separator className="my-2" />
  </>
)
