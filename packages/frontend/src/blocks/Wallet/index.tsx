import { Box, Center, Flex, Text } from '@chakra-ui/layout'
import { CryptoIcon } from '@components/CryptoIcon'
import { formatEther } from '@ethersproject/units'
import {
  useBlockNumber,
  useConfig,
  useEtherBalance,
  useEthers,
} from '@usedapp/core'
import { ethers, BigNumber } from '@usedapp/core/node_modules/ethers'
import { utils } from 'ethers'
import React, { useEffect, useState } from 'react'
import { BsDot } from 'react-icons/bs'
import { useQuery } from 'react-query'
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Spinner,
} from '@chakra-ui/react'
import EthAddressInput from './EthAddressInput'
import { truncateHash } from '@components/layout/Layout'
import { getTokenMetadata } from './utils'
import TokenAssetRow from './components/TokenAssetRow'
import AssetsPanel from './components/AssetsPanel'
import TransactionsPanel from './components/TransactionsPanel'
import CloseButton from '@components/CloseButton'
import { CustomBox } from '@components/CustomBox'
// import hre, { ethers } from 'hardhat'
interface Props {}

const Wallet = (props) => {
  const { provided, uuid } = props
  const [walletAmount, setWalletAmount] = useState(null)

  const { account, chainId, library } = useEthers()

  const etherBalance = useEtherBalance(account)
  const [updatedEtherBlanace, setUpdatedEtherBalance] = useState(null)
  const [USDValue, setUSDValue] = useState(null)
  const config = useConfig()
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
    // setActiveEthAddress('0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266')
  }, [])

  useEffect(() => {
    if (activeEthAddress) {
      getEnsName(activeEthAddress)
    }
    console.log('running')
  }, [library, chainId])

  const getBal = async (address) => {
    // If account balance is 1 ETH
    const balance = await library.getBalance(address)
    // prints 100000000000... 18 zeros

    const stringBalance = balance.toString()
    // console.log(ethers.utils.formatEther(stringBalance))
    // to format the value in a readable format
    return ethers.utils.formatEther(stringBalance) // prints 1.0
  }

  useEffect(() => {
    if (library && activeEthAddress) {
      // async function getBalance() {
      //   const bal = await getBal(activeEthAddress)
      //   setUpdatedEtherBalance(bal)
      // }
      // getBalance()
      getBal(activeEthAddress).then((res) => setUpdatedEtherBalance(res))
      console.log('running')
    }
  }, [activeEthAddress])

  return !activeEthAddress ? null : (
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

        {etherBalance && (
          <Box mt={'1'} align={'center'}>
            <Text fontSize={'xl'}>Balance</Text>
            <Text fontSize={'2xl'}>
              {updatedEtherBlanace
                ? updatedEtherBlanace.substring(0, 5)
                : formatEther(etherBalance).substring(0, 5)}{' '}
              ETH
            </Text>

            {/* <Text color={'grey'} opacity={'0.5'}>
              ${USDValue.toFixed(2)} USD
            </Text> */}
          </Box>
        )}
      </Flex>
      <Flex flex={2}>
        <Tabs w={500}>
          <TabList>
            <Tab>Assets</Tab>
            <Tab>Activity</Tab>
            {/* <Tab>NFT</Tab> */}
          </TabList>

          <TabPanels>
            <AssetsPanel
              updatedEtherBlanace={updatedEtherBlanace}
              activeEthAddress={activeEthAddress}
            />
            <TransactionsPanel activeEthAddress={activeEthAddress} />
            {/* <TabPanel>
              <p>three!</p>
            </TabPanel> */}
          </TabPanels>
        </Tabs>
      </Flex>
    </CustomBox>
  )
}

export default Wallet
