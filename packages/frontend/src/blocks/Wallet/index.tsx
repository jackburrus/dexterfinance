import { Box, Center, Text } from '@chakra-ui/layout'
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
  console.log(library)

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
      <Center>
        {/* <Text>{blockNumber}</Text>
        <Text>{walletAmount}</Text> */}
        {etherBalance && (
          <Text>Ether balance: {formatEther(etherBalance)} ETH </Text>
        )}
        {blockNumber && <Text>Block Number: {blockNumber}</Text>}
      </Center>
    </Box>
  )
}

export default Wallet
