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
  // console.log(library)

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
