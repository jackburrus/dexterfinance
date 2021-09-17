import { atom } from 'recoil'
import { Atoms } from '@recoil/constants'

export interface BlockType {
  id?: string
  index: string
  uuid: string
  title: string
  protocol: string
}

export const blocks = atom({
  key: Atoms.Blocks,
  default: [] as BlockType[],
})
