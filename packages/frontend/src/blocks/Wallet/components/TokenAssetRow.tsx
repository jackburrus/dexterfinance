import { Flex, Text } from '@chakra-ui/layout'
import { CryptoIcon } from '@components/CryptoIcon'
import React from 'react'

interface Props {
  symbol: string
  amount: string
}

const TokenAssetRow = (props: Props) => {
  const { symbol, amount } = props
  return (
    <Flex mt={4}>
      <CryptoIcon code={symbol} iconSize={24} />
      <Flex flex={1} ml={2}>
        <Text ml={2}>{amount}</Text>
        <Text ml={2}>{symbol}</Text>
      </Flex>
    </Flex>
  )
}

export default TokenAssetRow
