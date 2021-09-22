import { ArrowUpIcon, DownloadIcon } from '@chakra-ui/icons'
import { Box, Flex, Text } from '@chakra-ui/layout'
import { truncateHash } from '@components/layout/Layout'
import { hexDataSlice } from '@ethersproject/bytes'
import { formatEther } from '@ethersproject/units'
import { useEthers } from '@usedapp/core'
import { ethers } from '@usedapp/core/node_modules/ethers'
import React, { useEffect, useState } from 'react'
import { openInNewTab } from 'src/blocks/NFT/NFTTypes/BAYC'
import { PanelComponent } from './AssetsPanel'

interface Props {
  activeEthAddress: string
}

const getTransactionRow = (tx, activeEthAddress) => {
  return (
    <Box flex={1} border={'1px solid orange'}>
      <Text color={'white'}>Receive: {tx.to}</Text>
    </Box>
  )

  //   console.log(tx)
  //   switch (tx) {
  //     case tx:
  //   return (
  //     <Box flex={1}>
  //       <Text color={'white'}>Receive: {tx.to}</Text>
  //     </Box>
  //   )

  //     case tx.from == activeEthAddress:
  //       return <Text color={'white'}>Send: {tx.to}</Text>
  //     default:
  //       return (
  //         <Box flex={1}>
  //           <Text color={'white'}>Receive: {tx.to}</Text>
  //         </Box>
  //       )
  //   }
}

const TransactionsPanel = (props: Props) => {
  const { activeEthAddress } = props
  const [transactionList, setTransactionList] = useState([])
  const { library } = useEthers()
  async function fetchTransactions() {
    try {
      const response = await fetch(
        `https://api-kovan.etherscan.io/api?module=account&action=txlist&address=0xE35ef95A80839C3c261197B6c93E5765C9A6a31a&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=${process.env.Etherscan}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        }
      )
      const transactions = await response.json()
      transactions.result.map(async (tx) => {
        const txdata = await library.getTransaction(tx.hash)
        setTransactionList((prevArray) => [
          ...prevArray,
          Object.assign({}, tx, txdata.value),
        ])
      })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchTransactions()
  }, [])
  return !transactionList ? null : (
    <PanelComponent {...props}>
      {transactionList.map((tx) => {
        // console.log(
        //   ethers.utils.defaultAbiCoder.decode(
        //     ['bytes', 'string'],
        //     hexDataSlice(tx.hash, 4)
        //   )
        // )
        console.log(tx)
        // ethers.utils.parseTransaction(tx.hash)
        if (
          tx.to.toLowerCase() === activeEthAddress.toLowerCase() &&
          tx.value !== '0'
        ) {
          return (
            <Flex
              style={{ cursor: 'pointer' }}
              as={'a'}
              onClick={() =>
                openInNewTab('https://kovan.etherscan.io/tx/' + tx.hash)
              }
              flex={1}
              flexDirection={'row'}
            >
              <Flex
                align="center"
                justifyContent={'center'}
                p={2}
                // border={'1px solid white'}
                flex={0.2}
              >
                <DownloadIcon />
              </Flex>
              <Flex
                direction={'column'}
                p={2}
                // border={'1px solid white'}
                flex={2}
              >
                <Text color={'white'}>Receive</Text>
                <Text fontSize={'sm'} color={'white'}>
                  {formatEther(tx.value)} ETH
                </Text>
                <Text fontSize={'xs'} color={'grey'}>
                  From: {truncateHash(tx.from)}
                </Text>
              </Flex>
            </Flex>
          )
        } else if (
          tx.from.toLowerCase() === activeEthAddress.toLowerCase() &&
          tx.value !== '0'
        ) {
          return (
            <Flex
              style={{ cursor: 'pointer' }}
              as={'a'}
              onClick={() =>
                openInNewTab('https://kovan.etherscan.io/tx/' + tx.hash)
              }
              flex={1}
              flexDirection={'row'}
            >
              <Flex
                align="center"
                justifyContent={'center'}
                p={2}
                // border={'1px solid white'}
                flex={0.2}
              >
                <ArrowUpIcon />
              </Flex>
              <Flex
                direction={'column'}
                p={2}
                // border={'1px solid white'}
                flex={2}
              >
                <Text color={'white'}>Sent</Text>
                <Text fontSize={'sm'} color={'white'}>
                  {formatEther(tx.value)} ETH
                </Text>
                <Text fontSize={'xs'} color={'grey'}>
                  To: {truncateHash(tx.to)}
                </Text>
              </Flex>
            </Flex>
          )
        } else if (tx.hex === '0x00') {
          return null
        }
      })}
    </PanelComponent>
  )
}

export default TransactionsPanel
