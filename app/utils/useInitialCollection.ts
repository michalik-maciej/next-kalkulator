import {
  CollectionType,
  GroupType,
  ShelfType,
  StandType,
} from '../form/formSchema'
import { useEditOptions } from './useEditOptions'

export const useInitialCollection = () => {
  const { footOptions, shelfOptions, widthOptions } = useEditOptions()

  const initialShelf: ShelfType = { amount: 3, depth: shelfOptions[0] }
  const initialStand: StandType = {
    width: widthOptions[0],
    shelves: [initialShelf],
  }

  const initialGroup: GroupType = {
    foot: footOptions[0],
    variant: 'side',
    stands: [initialStand],
  }

  const groupSideGondola: GroupType = {
    ...initialGroup,
    variant: 'side-gondola',
  }

  const groupPeak: GroupType = {
    ...initialGroup,
    variant: 'peak',
  }

  const setCollectionGroups = (variant: CollectionType['variant']) => {
    if (variant === 'I') {
      return [initialGroup]
    }

    if (variant === 'G') {
      return [...Array(2).fill(groupSideGondola), ...Array(2).fill(groupPeak)]
    }

    return [initialGroup]
  }

  return { setCollectionGroups }
}
