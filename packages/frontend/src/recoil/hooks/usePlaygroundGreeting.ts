import { useRecoilState } from 'recoil'

import { playgroundGreeting } from '@recoil/atoms'

export const usePlaygroundGreeting: () => [
  greeting: string,
  setGreeting: (g: string) => void
] = () => {
  const [greeting, setGreeting] = useRecoilState(playgroundGreeting)

  return [greeting, setGreeting]
}
