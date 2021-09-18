import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Container,
  Flex,
  Image,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  SimpleGrid,
  Text,
  Heading,
} from '@chakra-ui/react'
import { useBlocks } from '@recoil/hooks/useBlocks'
import { useColorMode } from '@chakra-ui/color-mode'

import { useEthers, useNotifications } from '@usedapp/core'
import blockies from 'blockies-ts'
import NextLink from 'next/link'
import React from 'react'
import { getErrorMessage } from '../../../lib/utils'
import { Balance } from '../Balance'
import ModalSearch from '../BlockSearch/Modal'
import { ConnectWallet } from '../ConnectWallet'
import { Head, MetaProps } from './Head'

// Extends `window` to add `ethereum`.
declare global {
  interface Window {
    ethereum: any
  }
}

/**
 * Constants & Helpers
 */

// Title text for the various transaction notifications.
const TRANSACTION_TITLES = {
  transactionStarted: 'Local Transaction Started',
  transactionSucceed: 'Local Transaction Completed',
}

// Takes a long hash string and truncates it.
function truncateHash(hash: string, length = 38): string {
  return hash.replace(hash.substring(6, length), '...')
}

/**
 * Prop Types
 */
interface LayoutProps {
  children: React.ReactNode
  customMeta?: MetaProps
}

/**
 * Component!
 */
export const Layout = ({ children, customMeta }: LayoutProps): JSX.Element => {
  const { account, deactivate, error } = useEthers()
  const { notifications } = useNotifications()
  const [blockList, { clearAllBlocks }] = useBlocks()
  const { colorMode, toggleColorMode } = useColorMode()
  let blockieImageSrc
  if (typeof window !== 'undefined') {
    blockieImageSrc = blockies.create({ seed: account }).toDataURL()
  }

  return (
    <>
      <Head customMeta={customMeta} />
      <header>
        <Container maxWidth="container.xl">
          <SimpleGrid
            columns={[1, 1, 1, 2]}
            alignItems="center"
            // justifyContent="space-between"

            py="8"
          >
            <Flex
            // justify="flex-start"
            >
              {/* <NextLink href="/" passHref>
                <Link px="4" py="1">
                  Block Buidler
                </Link>
              </NextLink> */}
              {/* <SearchButton /> */}
              <Button onClick={toggleColorMode}>
                {colorMode == 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>
              <Heading as="h2" mr={12} ml={12} fontWeight={500}>
                Dexter
              </Heading>
              <ModalSearch />
            </Flex>

            {account ? (
              <Flex
                order={[-1, null, null, 2]}
                alignItems={'center'}
                justifyContent={['flex-start', null, null, 'flex-end']}
              >
                {/* <Button
                  colorScheme="teal"
                  onClick={sendFunds}
                  mr={'12'}
                  background={'green.600'}
                  color={'whiteAlpha.900'}
                >
                  🤑
                </Button> */}

                <Button onClick={clearAllBlocks} mr={'12'} colorScheme="blue">
                  Clear
                </Button>
                <Balance />

                <Image ml="4" src={blockieImageSrc} alt="blockie" />
                <Menu placement="bottom-end">
                  <MenuButton as={Button} ml="4">
                    {truncateHash(account)}
                  </MenuButton>
                  <MenuList>
                    <MenuItem
                      onClick={() => {
                        deactivate()
                      }}
                    >
                      Disconnect
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Flex>
            ) : (
              <ConnectWallet />
            )}
          </SimpleGrid>
        </Container>
      </header>
      <main>
        <Container
          maxWidth="fit-content"
          // display={'flex'}
          // flex={1}
          // width={'100vw'}
        >
          {children}
          {notifications.map((notification) => {
            if (notification.type === 'walletConnected') {
              return null
            }
            return (
              <Alert
                key={notification.id}
                status="success"
                position="fixed"
                bottom="8"
                right="8"
                width="400px"
              >
                <AlertIcon />
                <Box>
                  <AlertTitle>
                    {TRANSACTION_TITLES[notification.type]}
                  </AlertTitle>
                  <AlertDescription overflow="hidden">
                    Transaction Hash:{' '}
                    {truncateHash(notification.transaction.hash, 61)}
                  </AlertDescription>
                </Box>
              </Alert>
            )
          })}
        </Container>
      </main>
      {/* <footer>
        <Container mt={2} maxWidth="container.xl">
          <Text>Made with ☕ in Boise, Idaho</Text>
        </Container>
      </footer> */}
    </>
  )
}
