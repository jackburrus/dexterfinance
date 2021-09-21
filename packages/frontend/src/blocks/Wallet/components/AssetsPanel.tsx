import { Box } from '@chakra-ui/layout'
import { forwardRef } from '@chakra-ui/system'
import { TabPanel, TabPanelProps } from '@chakra-ui/tabs'
import { formatEther } from '@ethersproject/units'
import { useEtherBalance, useEthers } from '@usedapp/core'
import React, { useEffect, useState } from 'react'
import { getTokenMetadata } from '../utils'
import TokenAssetRow from './TokenAssetRow'

interface Props {}

export const PanelComponent = forwardRef<TabPanelProps, 'div'>((props, ref) => {
  return (
    <TabPanel
      //   border={'1px solid white'}
      flex={1}
      height={100}
      ref={ref}
      {...props}
    >
      {props.children}
    </TabPanel>
  )
})

export const AssetsPanel = (props) => {
  const [tokenBalanceData, setTokenBalanceData] = useState([])
  const { account } = useEthers()
  const etherBalance = useEtherBalance(account)
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
      tokens.result.tokenBalances.map(async (token) => {
        // console.log(token.contractAddress)
        if (token.tokenBalance !== '0x') {
          const meta = await getTokenMetadata(token.contractAddress)
          console.log(meta)
          if (
            meta.result &&
            parseFloat(formatEther(token.tokenBalance)) > 0.01
          ) {
            const exists = tokenBalanceData.find(
              (t) => t.symbol === token.symbol
            )
            if (exists) return
            setTokenBalanceData((prevArray) => [
              ...prevArray,
              Object.assign({}, meta.result, token),
            ])
          }
        }
      })
      // return tokens.result.tokenBalances
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchTokens()
  }, [])
  return (
    <PanelComponent {...props}>
      {/* <PanelComponent /> */}
      {etherBalance && (
        <TokenAssetRow
          key={'ETH'}
          symbol={'ETH'}
          amount={formatEther(etherBalance).substring(0, 5)}
        />
      )}

      {tokenBalanceData.map((token) => {
        // console.log(token)
        return (
          <TokenAssetRow
            key={token.symbol}
            symbol={token.symbol}
            amount={formatEther(token.tokenBalance).substring(0, 5)}
          />
        )
      })}
    </PanelComponent>
  )
}

export default AssetsPanel
