import { Box, Center, Flex, Text } from '@chakra-ui/layout'
import { CryptoIcon } from '@components/CryptoIcon'
import { formatEther } from '@ethersproject/units'
import { useEtherBalance, useEthers } from '@usedapp/core'
import { ethers } from '@usedapp/core/node_modules/ethers'
import React, { useEffect, useState } from 'react'
import { Tabs, TabList, TabPanels, Tab } from '@chakra-ui/react'
import EthAddressInput from './EthAddressInput'
import { truncateHash } from '@components/layout/Layout'
import AssetsPanel from './components/AssetsPanel'
import TransactionsPanel from './components/TransactionsPanel'
import CloseButton from '@components/CloseButton'
import { CustomBox } from '@components/CustomBox'

const Wallet = (props) => {
  const { uuid } = props

  const { account, chainId, library } = useEthers()

  const etherBalance = useEtherBalance(account)
  const [updatedEtherBlanace, setUpdatedEtherBalance] = useState(null)

  const [activeEthAddress, setActiveEthAddress] = useState(null)
  const [ensName, setEnsName] = useState(null)

  const getEnsName = async (address) => {
    const networkName = (await library.getNetwork()).name

    if (networkName == 'kovan') {
      setEnsName(null)
    } else {
      const name = await library.lookupAddress(address)
      setEnsName(name)
    }
  }

  useEffect(() => {
    setActiveEthAddress(account)
  }, [])

  useEffect(() => {
    if (activeEthAddress && library) {
      getEnsName(activeEthAddress)
    }
    console.log('running')
  }, [library, chainId, activeEthAddress])

  const getBal = async (address) => {
    const balance = await library.getBalance(address)

    const stringBalance = balance.toString()

    return ethers.utils.formatEther(stringBalance)
  }

  useEffect(() => {
    if (library && activeEthAddress) {
      getBal(activeEthAddress).then((res) => setUpdatedEtherBalance(res))
      console.log('running')
    }
  }, [activeEthAddress, library])

  return !activeEthAddress || !library ? (
    <CustomBox>
      <CloseButton blockID={uuid} />
      <Center flex={1}>
        <Text>Please connect a wallet to use this block</Text>
      </Center>
    </CustomBox>
  ) : (
    <CustomBox>
      <CloseButton blockID={uuid} />
      <EthAddressInput
        activeEthAddress={activeEthAddress}
        setActiveEthAddress={setActiveEthAddress}
      />

      <Flex
        flex={1}
        flexDirection={'column'}
        align={'center'}
        justify={'center'}
      >
        <Box
          d={'flex'}
          flex={1}
          p={'2'}
          w={'100%'}
          align={'flex-end'}
          justifyContent={'flex-end'}
        >
          <Text fontSize="8" color={'grey'}>
            {ensName ? ensName : null}
            {activeEthAddress && !ensName
              ? truncateHash(activeEthAddress)
              : null}
          </Text>
        </Box>

        <CryptoIcon code={'Eth'} />
        {ensName ? <Text mt={'1'}>{ensName}</Text> : null}
        {etherBalance && (
          <Box align={'center'}>
            <Text fontSize={'xl'}>Balance</Text>
            <Text fontSize={'2xl'}>
              {updatedEtherBlanace
                ? updatedEtherBlanace.substring(0, 5)
                : formatEther(etherBalance).substring(0, 5)}{' '}
              ETH
            </Text>
          </Box>
        )}
      </Flex>
      <Flex flex={2}>
        <Tabs w={500}>
          <TabList>
            <Tab>Assets</Tab>
            <Tab>Activity</Tab>
          </TabList>

          <TabPanels>
            <AssetsPanel
              updatedEtherBlanace={updatedEtherBlanace}
              activeEthAddress={activeEthAddress}
            />
            <TransactionsPanel activeEthAddress={activeEthAddress} />
          </TabPanels>
        </Tabs>
      </Flex>
    </CustomBox>
  )
}

export default Wallet
