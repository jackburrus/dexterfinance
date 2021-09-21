import { Box, Text } from '@chakra-ui/layout'
import { truncateHash } from '@components/layout/Layout'
import { hexDataSlice } from '@ethersproject/bytes'
import { formatEther } from '@ethersproject/units'
import { useEthers } from '@usedapp/core'
import { ethers } from '@usedapp/core/node_modules/ethers'
import React, { useEffect, useState } from 'react'
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
            <Box flex={1}>
              <Text color={'white'}>Receive from: {truncateHash(tx.from)}</Text>
              <Text color={'white'}>Amount: {formatEther(tx.value)}</Text>
            </Box>
          )
        } else if (
          tx.from.toLowerCase() === activeEthAddress.toLowerCase() &&
          tx.value !== '0'
        ) {
          return (
            <Box flex={1}>
              <Text color={'white'}>Send To: {truncateHash(tx.to)}</Text>
              <Text color={'white'}>Amount: {formatEther(tx.value)}</Text>
            </Box>
          )
        } else if (tx.hex === '0x00') {
          return null
        }
      })}
    </PanelComponent>
  )
}

export default TransactionsPanel
