import { useRecoilState } from 'recoil'
import { selectedTokens, SelectedTokenType } from '@recoil/atoms'
export const useSelectedTokens: () => [
  SelectedTokenType,
  { setSelectedTokens }
] = () => {
  const [tokens, setSelectedTokens] = useRecoilState(selectedTokens)
  return [tokens, { setSelectedTokens }]
}
