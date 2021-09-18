import { Box, Center, Flex, Text } from '@chakra-ui/layout'
import { formatEther } from '@ethersproject/units'
import {
  useBlockNumber,
  useConfig,
  useEtherBalance,
  useEthers,
} from '@usedapp/core'
import { ethers } from '@usedapp/core/node_modules/ethers'
import { utils } from 'ethers'
import React, { useEffect, useState } from 'react'
import { BsDot } from 'react-icons/bs'
import { useQuery } from 'react-query'
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
  const config = useConfig()
  // const { isLoading, error, data, isFetching } = useQuery('repoData', () =>
  //   fetch('https://api.github.com/repos/tannerlinsley/react-query').then(
  //     (res) => res.json()
  //   )
  // )
  const { isLoading, error, data, isFetching } = useQuery('repoData', () =>
    fetch(`https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD`, {
      method: 'POST',
      headers: {
        authorization: process.env.CryptoCompareKey,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json())
  )
  const valueUSD = parseFloat(formatEther(etherBalance)).toFixed(2) * data.USD
  // console.log(library)

  return isLoading ? null : (
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
      <Flex
        flex={1}
        border={'1px solid white'}
        flexDirection={'column'}
        align={'center'}
        justify={'center'}
      >
        <Text fontSize={'2xl'}>Balance</Text>
        {etherBalance && (
          <Box align={'center'}>
            <Text fontSize={'2xl'}>
              {formatEther(etherBalance).substring(0, 5)} ETH
            </Text>
            {console.log(data)}

            <Text color={'grey'} opacity={'0.5'}>
              ${valueUSD.toFixed(2)} USD
            </Text>
          </Box>
        )}
      </Flex>
      {/* <Text>{blockNumber}</Text>
        <Text>{walletAmount}</Text> */}
      {blockNumber && (
        <Flex border={'1px solid white'} justify="flex-end" align={'center'}>
          <Text fontSize="8" color={'limegreen'} fontFamily="Inter">
            {blockNumber}
          </Text>
          <BsDot
            size={'18px'}
            style={{ paddingRight: '4px' }}
            color={'limegreen'}
          />
        </Flex>
      )}
    </Box>
  )
}

export default Wallet
