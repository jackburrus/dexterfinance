import { Box, Text } from '@chakra-ui/layout'
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
      setTransactionList(transactions.result)
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
        console.log('transaction', tx.to)
        console.log('active eth address', activeEthAddress)
        if (tx.to.toLowerCase() === activeEthAddress.toLowerCase()) {
          return (
            <Box flex={1} border={'1px solid orange'}>
              <Text color={'white'}>Receive: {tx.to}</Text>
            </Box>
          )
        } else if (tx.from.toLowerCase() === activeEthAddress.toLowerCase()) {
          return (
            <Box flex={1} border={'1px solid orange'}>
              <Text color={'white'}>From: {tx.to}</Text>
            </Box>
          )
        }
      })}
    </PanelComponent>
  )
}

export default TransactionsPanel
