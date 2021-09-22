import { Box, Flex, Text } from '@chakra-ui/layout'
import { NumberInput, NumberInputField } from '@chakra-ui/number-input'
import React from 'react'
import { CryptoIcon } from './CryptoIcon'
import { useDisclosure } from '@chakra-ui/hooks'
import CoinListModal from './CoinListModal'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { useState } from 'hoist-non-react-statics/node_modules/@types/react'
import { useSelectedTokens } from '@recoil/hooks/useSelectedTokens'

interface Props {
  tokenOrder: string
}

const FormInput = (props: Props) => {
  const { onOpen, isOpen, onClose } = useDisclosure()
  const {
    tokenOrder,
    token0Amount,
    setToken0Amount,
    token1Amount,
    setToken1Amount,
  } = props
  const [tokens, { setSelectedTokens }] = useSelectedTokens()
  return (
    <Flex
      h={85}
      w={'95%'}
      justify="center"
      align="center"
      mt="2"
      borderRadius={'2xl'}
      bg="#212529"
    >
      <CoinListModal
        onOpen={onOpen}
        isOpen={isOpen}
        onClose={onClose}
        tokenOrder={tokenOrder}
      />
      <Flex width="90%" h="75" align="center" justify="space-between">
        <Flex
          align="center"
          justify="space-evenly"
          bg={'#181C20'}
          borderRadius="xl"
          p="2"
          as={'button'}
          onClick={onOpen}
          _hover={{
            bg: '#2C3035',
          }}
        >
          <CryptoIcon
            code={tokenOrder === 'token0' ? tokens['token0'] : tokens['token1']}
            iconSize={30}
          />
          <Text color={'white'} ml="2">
            {tokenOrder === 'token0' ? tokens['token0'] : tokens['token1']}
          </Text>
          <ChevronDownIcon
            ml={'2'}
            // border={'1px solid orange'}
            color={'white'}
            w="22"
            h="22"
          />
        </Flex>

        <Flex
          alignItems="center"
          alignSelf="center"
          borderRadius="5px"
          w="100%"
          bg="#212529"
          p="0.5rem"
        >
          <NumberInput
            textColor="white"
            w="100%"
            _focus={{ outline: 'none' }}
            onChange={(valueString) => {
              if (tokenOrder === 'token0') {
                setToken0Amount(valueString)
              } else {
                setToken1Amount(valueString)
              }
            }}
            bg="#212529"
          >
            <NumberInputField
              textAlign="right"
              width="100%"
              _focus={{ outline: 'none' }}
              fontSize={['25px', '25px', '25px', '25px']}
              border="none"
              placeholder="0.0"
            ></NumberInputField>
          </NumberInput>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default FormInput
