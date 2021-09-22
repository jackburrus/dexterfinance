import * as React from 'react'
import Image from 'next/image'
import { Box, Flex } from '@chakra-ui/layout'
export interface CryptoIconProps {
  code: string
  iconSize: number
  children?: React.ReactNode
}

const findIcon = (code: string): string => {
  // console.log(code)
  try {
    return require(`../../../../../node_modules/cryptocurrency-icons/svg/color/${code.toLowerCase()}.svg`)
  } catch (err) {
    // return require('../../../node_modules/cryptocurrency-icons/svg/color/generic.svg')
    return require('../../../../../node_modules/cryptocurrency-icons/svg/color/generic.svg')
  }
}

export const CryptoIcon: React.FunctionComponent<CryptoIconProps> = (props) => {
  const { code, children, iconSize } = props

  return (
    <Flex width="10" justify="center">
      <Image
        src={findIcon(code)}
        width={iconSize}
        height={iconSize}
        alt="crypto-icon"
      />
    </Flex>
  )
}
