import { Box, Center, Flex, Text } from '@chakra-ui/layout'
import { CryptoIcon } from '@components/CryptoIcon'
import { formatEther } from '@ethersproject/units'
import {
  useBlockNumber,
  useConfig,
  useEtherBalance,
  useEthers,
} from '@usedapp/core'
import { ethers, BigNumber } from '@usedapp/core/node_modules/ethers'
import { utils } from 'ethers'
import React, { useEffect, useState } from 'react'
import { BsDot } from 'react-icons/bs'
import { useQuery } from 'react-query'
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Spinner,
} from '@chakra-ui/react'
import EthAddressInput from './EthAddressInput'
import { truncateHash } from '@components/layout/Layout'
import { getTokenMetadata } from './utils'
import TokenAssetRow from './components/TokenAssetRow'
// import hre, { ethers } from 'hardhat'
interface Props {}

// Example POST method implementation:
async function postData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  })
  return response.json() // parses JSON response into native JavaScript objects
}

const Wallet = (props) => {
  const { provided } = props
  const [walletAmount, setWalletAmount] = useState(null)

  const { account, chainId, library } = useEthers()

  const etherBalance = useEtherBalance(account)
  const blockNumber = useBlockNumber()
  const [USDValue, setUSDValue] = useState(null)
  const config = useConfig()
  const [activeEthAddress, setActiveEthAddress] = useState(account)
  const [tokenBalanceData, setTokenBalanceData] = useState(null)
  // console.log(library)

  // const fetchTokenBalances = async (account: string, addresses: string[]) => {
  //   fetch(`https://eth-kovan.alchemyapi.io/v2/${process.env.ALCHEMYAPIKEY}`, {
  //     method: 'POST',
  //     headers: {
  //       Accept: 'application/json',
  //     },
  // body: JSON.stringify({
  //   jsonrpc: '2.0',
  //   method: 'alchemy_getTokenBalances',
  //   params: [
  //     '0xE35ef95A80839C3c261197B6c93E5765C9A6a31a',
  //     'DEFAULT_TOKENS',
  //   ],
  //   id: 42,
  // }),
  //   }).then((response) => {
  //     if (response.ok) {
  //       response.json().then((json) => {
  //         const arrayOfTokenBalances = json.result.tokenBalances
  //         for (const token of arrayOfTokenBalances) {
  //           if (token.tokenBalance !== '0x') {
  //             // console.log(token)
  //             return getTokenMetadata(token.contractAddress)
  //           }
  //         }
  //       })
  //     }
  //   })
  //   // console.log(balances)
  //   // return balances
  //   // return balances.tokenBalances.map((balance) => balance.tokenBalance)
  // }

  async function fetchTokens() {
    try {
      const response = await fetch(
        `https://eth-kovan.alchemyapi.io/v2/${process.env.ALCHEMYAPIKEY}`,
        {
          method: 'POST',
          body: JSON.stringify({
            jsonrpc: '2.0',
            method: 'alchemy_getTokenBalances',
            params: [
              '0xE35ef95A80839C3c261197B6c93E5765C9A6a31a',
              'DEFAULT_TOKENS',
            ],
            id: 42,
          }),
        }
      )
      const tokens = await response.json()
      return tokens.result.tokenBalances
    } catch (error) {
      console.error(error)
    }
  }

  async function fetchAllTokenData() {
    const tokensWithData = []
    const tokensForProcessing = await fetchTokens()
    tokensForProcessing.map((token) => {
      if (token.tokenBalance !== '0x') {
        const tokenMeta = async () => {
          const meta = await getTokenMetadata(token.contractAddress)

          if (formatEther(token.tokenBalance) > 0.01) {
            const tokenCombined = Object.assign({}, token, meta.result)
            // console.log(tokenCombined)
            tokensWithData.push(tokenCombined)
          }
        }
        tokenMeta()

        // console.log(tokenMeta)
      }
    })
    setTokenBalanceData(tokensWithData)
  }

  useEffect(() => {
    if (library) {
      console.log('fetching')
      fetchAllTokenData()
    }
  }, [])

  return (
    <Box
      w="500px"
      h="350px"
      d="flex"
      margin={'10'}
      justifyContent="flex-start"
      //Text
      flexDirection="column"
      bg={'#181C20'}
      borderRadius={'3xl'}
      // position="relative"
      overflow={'scroll'}
      p={5}
    >
      <EthAddressInput />

      <Flex
        flex={1}
        // border={'1px solid white'}
        flexDirection={'column'}
        align={'center'}
        justify={'center'}
      >
        <Box
          d={'flex'}
          flex={1}
          p={'2'}
          // border={'1px solid white'}
          w={'100%'}
          align={'flex-end'}
          justifyContent={'flex-end'}
        >
          <Text fontSize="8" color={'grey'}>
            {activeEthAddress && truncateHash(activeEthAddress)}
          </Text>
        </Box>
        <CryptoIcon code={'Eth'} />

        {etherBalance && (
          <Box mt={'1'} align={'center'}>
            <Text fontSize={'xl'}>Balance</Text>
            <Text fontSize={'2xl'}>
              {formatEther(etherBalance).substring(0, 5)} ETH
            </Text>

            {/* <Text color={'grey'} opacity={'0.5'}>
              ${USDValue.toFixed(2)} USD
            </Text> */}
          </Box>
        )}
      </Flex>
      <Flex flex={2}>
        <Tabs w={500}>
          <TabList>
            <Tab>Assets</Tab>
            <Tab>Activity</Tab>
            <Tab>NFT</Tab>
          </TabList>

          <TabPanels>
            <TabPanel
              flex={1}
              height={100}
              // border={'1px solid white'}
            >
              {etherBalance && (
                <TokenAssetRow
                  key={'ETH'}
                  symbol={'ETH'}
                  amount={formatEther(etherBalance).substring(0, 5)}
                />
              )}

              {!tokenBalanceData ? (
                <Center flex={1}>
                  <Spinner color={'white'} />
                </Center>
              ) : (
                tokenBalanceData.map((token) => {
                  return (
                    <TokenAssetRow
                      key={token.symbol}
                      symbol={token.symbol}
                      amount={formatEther(token.tokenBalance).substring(0, 5)}
                    />
                  )
                })
              )}
            </TabPanel>
            <TabPanel>
              <p>two!</p>
            </TabPanel>
            <TabPanel>
              <p>three!</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
      {blockNumber && (
        <Flex
          // border={'1px solid white'}
          display={'flex'}
          justify="flex-end"
          align={'flex-end'}
          // position="absolute"
          // bottom="5"
          // right="10"
        >
          <Flex
            // border={'1px solid orange'}
            flexDirection="row"
            align={'center'}
            justify="flex-end"
          >
            <Text fontSize="8" color={'limegreen'} fontFamily="Inter">
              {blockNumber}
            </Text>
            <BsDot
              size={'18px'}
              style={{ paddingRight: '4px' }}
              color={'limegreen'}
            />
          </Flex>
        </Flex>
      )}
    </Box>
  )
}

export default Wallet
