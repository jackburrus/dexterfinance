import { useColorMode } from '@chakra-ui/color-mode'
import { SearchIcon } from '@chakra-ui/icons'
import { chakra, HStack, Input, useColorModeValue } from '@chakra-ui/react'
import { useEthers } from '@usedapp/core'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
interface Props {}
const ACTION_KEY_APPLE = ['⌘', 'Command']
export const EthAddressInput = (props: Props) => {
  const { register, handleSubmit } = useForm()
  const { library } = useEthers()
  const { setActiveEthAddress } = props

  const resolveENSName = async (name, setActiveEthAddress) => {
    const address = await library.resolveName(name)
    setActiveEthAddress(address)
  }

  const onSubmit = ({ ethAddress }) => {
    console.log(ethAddress)
    if (ethAddress.includes('.eth')) {
      resolveENSName(ethAddress, setActiveEthAddress)
    } else {
      setActiveEthAddress(ethAddress)
    }
  }

  return (
    <chakra.button
      flex="1"
      role="search"
      h={'6'}
      w="30%"
      minWidth={'20%'}
      ml={2}
      mt={1}
      position={'absolute'}
      bg={useColorModeValue('white', 'gray.700')}
      whiteSpace="nowrap"
      display={{ base: 'none', sm: 'flex' }}
      alignItems="center"
      color="gray.400"
      py="3"
      px="4"
      outline="0"
      _focus={{ shadow: 'outline' }}
      shadow="base"
      rounded="md"
      aria-label="Search the docs"
      {...props}
    >
      <SearchIcon w={3} h={3} color={'grey'} />
      <HStack w="full" ml="3" spacing="4px">
        <form
          style={{
            display: 'flex',
          }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            aria-autocomplete="list"
            autoComplete="off"
            autoCorrect="off"
            spellCheck="false"
            maxLength={64}
            sx={{
              w: '100%',
              h: '68px',

              fontWeight: 'medium',
              outline: 0,
              bg: 'white',
              '.chakra-ui-dark &': { bg: 'gray.700' },
            }}
            id="ethAddress"
            {...register('ethAddress', {
              required: 'This is required',
              minLength: { value: 4, message: 'Minimum length should be 4' },
            })}
            textAlign="left"
            flex="1"
            fontSize="8"
            color={'grey'}
            placeholder="ETH Address"
            variant="unstyled"
          />
        </form>
      </HStack>
    </chakra.button>
  )
}

export default EthAddressInput
