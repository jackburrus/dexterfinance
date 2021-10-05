import { useColorMode } from '@chakra-ui/color-mode'
import { SearchIcon } from '@chakra-ui/icons'
import {
  chakra,
  HStack,
  HTMLChakraProps,
  Kbd,
  Text,
  useColorModeValue,
  useEventListener,
  VisuallyHidden,
} from '@chakra-ui/react'
import Link from 'next/link'
import * as React from 'react'

const ACTION_KEY_DEFAULT = ['Ctrl', 'Control']
const ACTION_KEY_APPLE = ['⌘', 'Command']

function Hit(props: any) {
  const { hit, children } = props
  return (
    <Link href={hit.url} passHref>
      <a>{children}</a>
    </Link>
  )
}

export const SearchButton = React.forwardRef(function SearchButton(
  props: HTMLChakraProps<'button'>,
  ref: React.Ref<HTMLButtonElement>
) {
  const [actionKey, setActionKey] = React.useState<string[]>(ACTION_KEY_APPLE)
  React.useEffect(() => {
    if (typeof navigator === 'undefined') return
    const isMac = /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform)
    if (!isMac) {
      setActionKey(ACTION_KEY_DEFAULT)
    }
  }, [])
  const { colorMode } = useColorMode()

  useEventListener('keydown', (event) => {
    const isMac = /(Mac|iPhone|iPod|iPad)/i.test(navigator?.platform)
    const hotkey = isMac ? 'metaKey' : 'ctrlKey'
    if (event?.key?.toLowerCase() === 'k' && event[hotkey]) {
      event.preventDefault()
      console.log('Magic keys pressed!!')
    }
  })

  return (
    <chakra.button
      flex="1"
      type="button"
      role="search"
      //   mx="6"
      ref={ref}
      lineHeight="1.2"
      w="100%"
      bg={useColorModeValue('#DEE7F4', 'gray.700')}
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
      <SearchIcon color={colorMode === 'light' ? '#989FAE' : 'white'} />
      <HStack w="full" ml="3" spacing="4px">
        <Text
          color={colorMode === 'light' ? '#989FAE' : 'white'}
          textAlign="left"
          flex="1"
        >
          Search the blocks
        </Text>
        <HStack spacing="4px">
          <VisuallyHidden>Press </VisuallyHidden>
          <Kbd color="gray.500" rounded="2px">
            <chakra.div
              as="abbr"
              title={actionKey[1]}
              textDecoration="none !important"
              color={colorMode === 'light' ? '#989FAE' : 'white'}
            >
              {actionKey[0]}
            </chakra.div>
          </Kbd>
          <VisuallyHidden> and </VisuallyHidden>
          <Kbd
            color={colorMode === 'light' ? '#989FAE' : 'white'}
            rounded="2px"
          >
            K
          </Kbd>
          <VisuallyHidden> to search</VisuallyHidden>
        </HStack>
      </HStack>
    </chakra.button>
  )
})
