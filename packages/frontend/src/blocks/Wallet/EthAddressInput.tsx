import React, { useEffect, useState } from 'react'
import {
  chakra,
  HStack,
  HTMLChakraProps,
  Kbd,
  Portal,
  Text,
  useColorModeValue,
  VisuallyHidden,
  useEventListener,
  Input,
} from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import { useColorMode } from '@chakra-ui/color-mode'
import { useForm } from 'react-hook-form'
import { ethers } from 'ethers'
import { Alert, AlertIcon, AlertTitle } from '@chakra-ui/alert'
import { AlertDialogInvalidAddress } from './components/AlertDialog'
import { useEthers } from '@usedapp/core'
interface Props {}
const ACTION_KEY_DEFAULT = ['Ctrl', 'Control']
const ACTION_KEY_APPLE = ['⌘', 'Command']
export const EthAddressInput = (props: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const { activeEthAddress, setActiveEthAddress } = props
  const [actionKey, setActionKey] = React.useState<string[]>(ACTION_KEY_APPLE)
  const { colorMode } = useColorMode()
  const [validAddressModalOpen, setValidAddressOpenStatus] = useState(false)
  const { account, chainId, library } = useEthers()
  // React.useEffect(() => {
  //   if (typeof navigator === 'undefined') return
  //   const isMac = /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform)
  //   if (!isMac) {
  //     setActionKey(ACTION_KEY_DEFAULT)
  //   }
  // }, [])

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

    // console.log(activeEthAddress)
  }

  return (
    <chakra.button
      flex="1"
      // type="button"
      role="search"
      //   mx="6"
      //   ref={ref}
      //   lineHeight="1.2"
      h={'6'}
      w="30%"
      minWidth={'20%'}
      position={'absolute'}
      //   h={50}
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
        {/* <Text
          //   color={colorMode === 'light' ? 'black' : 'white'}
          textAlign="left"
          flex="1"
          fontSize="8"
          color={'grey'}
        >
          ETH Address
        </Text> */}
        {/* {validAddressModalOpen ? (
          <Portal>
            <Alert status="error">
              <AlertIcon />
              <AlertTitle mr={2}>Your browser is outdated!</AlertTitle>
            </Alert>
          </Portal>
        ) : // <AlertDialogInvalidAddress
        //   validAddressModalOpen={validAddressModalOpen}
        // />
        null} */}

        <form
          style={{
            display: 'flex',
            // border: '1px solid orange',
            // alignItems: 'center',
            // justifyContent: 'center',
          }}
          onSubmit={handleSubmit(onSubmit)}
          // onChange={(e) => {
          //   console.log()
          //   if (!ethers.utils.isAddress(e.target.value)) {
          //     setValidAddress(false)
          //   }
          // }}
        >
          <Input
            // type="search"

            aria-autocomplete="list"
            autoComplete="off"
            autoCorrect="off"
            spellCheck="false"
            maxLength={64}
            sx={{
              w: '100%',
              h: '68px',
              // pl: '68px',
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
            // border="1px solid green"
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
