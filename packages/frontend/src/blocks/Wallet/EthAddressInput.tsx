import React from 'react'
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
} from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import { useColorMode } from '@chakra-ui/color-mode'
interface Props {}
const ACTION_KEY_DEFAULT = ['Ctrl', 'Control']
const ACTION_KEY_APPLE = ['⌘', 'Command']
export const EthAddressInput = (props: Props) => {
  const [actionKey, setActionKey] = React.useState<string[]>(ACTION_KEY_APPLE)
  const { colorMode } = useColorMode()
  React.useEffect(() => {
    if (typeof navigator === 'undefined') return
    const isMac = /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform)
    if (!isMac) {
      setActionKey(ACTION_KEY_DEFAULT)
    }
  }, [])
  return (
    <chakra.button
      flex="1"
      type="button"
      role="search"
      //   mx="6"
      //   ref={ref}
      //   lineHeight="1.2"
      h={'6'}
      w="20%"
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
        <Text
          //   color={colorMode === 'light' ? 'black' : 'white'}
          textAlign="left"
          flex="1"
          fontSize="8"
          color={'grey'}
        >
          ETH Address
        </Text>
      </HStack>
    </chakra.button>
  )
}

export default EthAddressInput
