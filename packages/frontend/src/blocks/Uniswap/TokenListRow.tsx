import { Flex, Text } from '@chakra-ui/layout'
import { useSelectedTokens } from '@recoil/hooks/useSelectedTokens'
import React from 'react'
import { CryptoIcon } from './CryptoIcon'

interface Props {
  coinLogoUri: string
  code: string
  name: string
  tokenOrder: string
}

const TokenListRow = (props: Props) => {
  const { coinLogoUri, code, name, tokenOrder, onClose } = props
  const [tokens, { setSelectedTokens }] = useSelectedTokens()
  const handleTokenUpdate = (code) => {
    if (tokenOrder === 'token0') {
      setSelectedTokens({ ...tokens, token0: code })
    } else {
      setSelectedTokens({ ...tokens, token1: code })
    }
  }
  return (
    <Flex
      // key={index}
      align="center"
      //   justify="center"
      bg={'#181C20'}
      borderRadius="xl"
      // border={'0.5px solid white'}
      //   borderWidth={'0.1em'}
      mt={'1'}
      mb={1}
      mr={1}
      p={1}
      pb={2}
      pt={2}
      as={'button'}
      onClick={() => {
        handleTokenUpdate(code)
        onClose()
      }}
    >
      <CryptoIcon iconSize={25} code={code} />
      <Flex
        alignItems="flex-start"
        flexDirection="column"
        // border={'1px solid orange'}
        ml={2}
      >
        <Text color={'white'}>{code}</Text>
        <Text fontSize="10" color={'GrayText'}>
          {name}
        </Text>
      </Flex>
    </Flex>
  )
}

export default TokenListRow
