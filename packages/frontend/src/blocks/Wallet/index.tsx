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
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import EthAddressInput from './EthAddressInput'
import { truncateHash } from '@components/layout/Layout'
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
  // console.log(library)

  const fetchTokenBalances = async (account: string, addresses: string[]) => {
    const balances = await library.send('eth_getBalance', [
      '0xE35ef95A80839C3c261197B6c93E5765C9A6a31a',
      'latest',
    ])
    console.log(formatEther(balances))
    return balances
    // return balances.tokenBalances.map((balance) => balance.tokenBalance)
  }

  useEffect(() => {
    if (library) {
      fetchTokenBalances()
    }
  }, [])
  // const fetchTokenBalances = async (account: string, addresses: string[]) => {
  //   const balances = await library.send('alchemy_getTokenBalances', [
  //     account,
  //     addresses,
  //   ])
  //   return balances.tokenBalances.map((balance) => balance.tokenBalance)
  // }

  // const KOVAN_PROVIDER = new ethers.providers.AlchemyProvider(
  //   42,
  //   process.env.ALCHEMYAPIKEY
  // )
  // const { isLoading, error, data, isFetching } = useQuery('repoData', () =>
  //   fetch('https://api.github.com/repos/tannerlinsley/react-query').then(
  //     (res) => res.json()
  //   )
  // )
  // const { isLoading, error, data, isFetching } = useQuery('repoData', () =>
  //   fetch(`https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD`, {
  //     method: 'POST',
  //     headers: {
  //       authorization: process.env.CryptoCompareKey,
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //     },
  //   }).then((res) => res.json())
  // )
  // const { isLoading, error, data, isFetching } = useQuery('repoData', () =>
  //   fetch(config.readOnlyUrls[chainId], {
  //     method: 'POST',
  //     headers: {
  //       jsonrpc: '2.0',
  //       method: 'alchemy_getTokenBalances',
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //       params: [
  //         '0x3f5ce5fbfe3e9af3971dd833d26ba9b5c936f0be',
  //         [
  //           '0x607f4c5bb672230e8672085532f7e901544a7375',
  //           '0x618e75ac90b12c6049ba3b27f5d5f8651b0037f6',
  //           '0x63b992e6246d88f07fc35a056d2c365e6d441a3d',
  //           '0x6467882316dc6e206feef05fba6deaa69277f155',
  //           '0x647f274b3a7248d6cf51b35f08e7e7fd6edfb271',
  //         ],
  //       ],
  //       id: 42,
  //     },
  //   }).then((res) => res.json())
  // )

  // useEffect(() => {
  //   const tokenBalances = fetchTokenBalances(
  //     '0x3f5ce5fbfe3e9af3971dd833d26ba9b5c936f0be'
  //   )
  //   console.log(tokenBalances)
  // }, [])

  // useEffect(() => {
  //   console.log(data)
  // }, [data])
  // console.log(config.readOnlyUrls[account])
  // console.log(account)

  // useEffect(() => {
  //   if (data && data.USD) {
  //     if (formatEther(etherBalance)) {
  //       const usdv = parseFloat(formatEther(etherBalance)) * data.USD
  //       console.log(usdv)
  //     }

  //     // const usdv = walletValue
  //     // setUSDValue(usdv)
  //   }
  // }, [data])
  //

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
            <TabPanel>
              <p>one!</p>
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
