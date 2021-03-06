import { DownloadIcon, MoonIcon, SunIcon } from '@chakra-ui/icons'
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Container,
  Flex,
  Image as ChakraImage,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  SimpleGrid,
  Text,
  Heading,
} from '@chakra-ui/react'
import Image from 'next/image'
import { useBlocks } from '@recoil/hooks/useBlocks'
import { useColorMode } from '@chakra-ui/color-mode'
// import Logo from '/../../../public/images/site-preview.png'
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
export function truncateHash(hash: string, length = 38): string {
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
            columns={[1, 1, 1, 3]}
            // alignItems="center"
            // justifyContent="space-between"
            // border={'1px solid magenta'}
            py="8"
            display={'flex'}
          >
            <Flex
              // border={'1px solid red'}
              flex={0.8}
              // justify="flex-start"
            >
              <Flex>
                <Image
                  width={'60px'}
                  height={'40px'}
                  // layout={''}
                  src={'/images/Logo.png'}
                />
              </Flex>

              <Text
                ml={3}
                // border={'1px solid green'}
                textStyle={'mono'}
                // fontFamily={'mono'}
                as="h2"
                fontSize={30}
                fontWeight={500}
                alignSelf="flex-end"
              >
                Dexter
              </Text>
            </Flex>
            <Flex
              pl={20}
              pr={20}
              flex={2}
              // border={'1px solid orange'}
            >
              <ModalSearch />
            </Flex>

            {account ? (
              <Flex
                flex={1}
                order={[-1, null, null, 2]}
                alignItems={'center'}
                // border={'1px solid cyan'}
                justifyContent={['flex-start', null, null, 'flex-end']}
              >
                {/* <Button
                  colorScheme="teal"
                  onClick={sendFunds}
                  mr={'12'}
                  background={'green.600'}
                  color={'whiteAlpha.900'}
                >
                  ????
                </Button> */}

                <Balance />

                <Menu placement="bottom-end">
                  <MenuButton as={Button} ml="4" variant={'unstyled'}>
                    {/* {truncateHash(account)} */}
                    <ChakraImage
                      borderRadius={5}
                      ml="4"
                      src={blockieImageSrc}
                      alt="blockie"
                    />
                  </MenuButton>
                  <MenuList>
                    <MenuItem onClick={clearAllBlocks}>Clear</MenuItem>
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

        <Box
          // border={'1px solid red'}
          position={'fixed'}
          bottom={'45'}
          right={'55'}
          display={'flex'}
          alignItems="center"
        >
          <Button
            mr={5}
            // position={'fixed'}
            // bottom={'45'}
            // right={'85'}
            variant={'unstyled'}
            onClick={toggleColorMode}
          >
            {colorMode == 'light' ? <MoonIcon mb={1} /> : <SunIcon mb={1} />}
          </Button>
          <a
            href={`data:text/json;charset=utf-8,${encodeURIComponent(
              JSON.stringify(blockList)
            )}`}
            download={`DexterDashboard-${Math.floor(Math.random() * 100)}.json`}
          >
            <DownloadIcon
              href={`data:text/json;charset=utf-8,${encodeURIComponent(
                JSON.stringify(blockList)
              )}`}
              download={`DexterDashboard-${Math.floor(
                Math.random() * 100
              )}.json`}
              as={'a'}
              w={5}
              h={5}
            />
          </a>
        </Box>
      </main>
      {/* <footer>
        <Container
          position={'absolute'}
          bottom={10}
          left={'10'}
          mt={2}
          maxWidth="container.xl"
        ></Container>
      </footer> */}
    </>
  )
}
