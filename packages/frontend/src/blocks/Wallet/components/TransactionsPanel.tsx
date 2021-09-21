import { Text } from '@chakra-ui/layout'
import React, { useEffect, useState } from 'react'
import { PanelComponent } from './AssetsPanel'

interface Props {}

const TransactionsPanel = (props: Props) => {
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
        return <Text>{tx.to}</Text>
      })}
    </PanelComponent>
  )
}

export default TransactionsPanel
