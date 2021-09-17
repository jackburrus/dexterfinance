import { atom } from 'recoil'
import { Atoms } from '@recoil/constants'

export interface SelectedTokenType {
  token0: string
  token1: string
  //   setSelectedTokens: () => void
}

export const selectedTokens = atom({
  key: Atoms.SelectedTokens,
  default: { token0: 'WETH', token1: 'CAKE' } as SelectedTokenType,
})
