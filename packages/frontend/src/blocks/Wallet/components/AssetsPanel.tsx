import { Box } from '@chakra-ui/layout'
import { forwardRef } from '@chakra-ui/system'
import { TabPanel, TabPanelProps } from '@chakra-ui/tabs'
import { formatEther } from '@ethersproject/units'
import { useEtherBalance, useEthers } from '@usedapp/core'
import React, { useEffect, useState } from 'react'
import { FetchTokens, fetchTokens, getTokenMetadata } from '../utils'
import TokenAssetRow from './TokenAssetRow'
import { useColorMode } from '@chakra-ui/color-mode'

interface Props {}

export const PanelComponent = forwardRef<TabPanelProps, 'div'>((props, ref) => {
  return (
    <TabPanel
      // border={'1px solid white'}
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
  const { activeEthAddress, updatedEtherBlanace } = props
  const [tokenBalanceData, setTokenBalanceData] = useState([])
  const { account, library } = useEthers()
  const etherBalance = useEtherBalance(account)
  const { colorMode } = useColorMode()

  useEffect(() => {
    setTokenBalanceData([])
    if (library) {
      // console.log(library)
      fetchTokens(
        library,
        activeEthAddress,
        tokenBalanceData,
        setTokenBalanceData
      )
    }

    console.log('running fetch tokens')
  }, [activeEthAddress, library])
  return (
    <PanelComponent {...props}>
      {/* <PanelComponent /> */}
      {etherBalance && (
        <TokenAssetRow
          key={'ETH'}
          symbol={'ETH'}
          amount={
            updatedEtherBlanace
              ? updatedEtherBlanace.substring(0, 5)
              : formatEther(etherBalance).substring(0, 5)
          }
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
