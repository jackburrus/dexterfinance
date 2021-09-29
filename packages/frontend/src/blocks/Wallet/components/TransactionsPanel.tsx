import { useColorMode } from '@chakra-ui/color-mode'
import { ArrowUpIcon, DownloadIcon } from '@chakra-ui/icons'
import { Box, Flex, Text } from '@chakra-ui/layout'
import { truncateHash } from '@components/layout/Layout'
import { hexDataSlice } from '@ethersproject/bytes'
import { formatEther } from '@ethersproject/units'
import { useEthers } from '@usedapp/core'
import { ethers } from '@usedapp/core/node_modules/ethers'
import React, { useEffect, useState } from 'react'
import { openInNewTab } from 'src/blocks/NFT/NFTTypes/BAYC'
import { fetchTransactions } from '../utils'
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
}

const TransactionsPanel = (props: Props) => {
  const { activeEthAddress } = props
  const { colorMode } = useColorMode()
  const [transactionList, setTransactionList] = useState([])
  const { library } = useEthers()

  useEffect(() => {
    fetchTransactions(library, setTransactionList, activeEthAddress)
  }, [activeEthAddress, library])
  return !transactionList ? null : (
    <PanelComponent {...props}>
      {transactionList.map((tx) => {
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
                <Text color={colorMode == 'light' ? 'grey' : 'white'}>
                  Receive
                </Text>
                <Text
                  fontSize={'sm'}
                  color={colorMode == 'light' ? 'grey' : 'white'}
                >
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
                <Text color={colorMode == 'light' ? 'grey' : 'white'}>
                  Sent
                </Text>
                <Text
                  fontSize={'sm'}
                  color={colorMode == 'light' ? 'grey' : 'white'}
                >
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
