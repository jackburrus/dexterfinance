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
// import hre, { ethers } from 'hardhat'
interface Props {}

const Wallet = (props) => {
  const { provided } = props
  const [walletAmount, setWalletAmount] = useState(null)

  const { account, chainId, library } = useEthers()

  const etherBalance = useEtherBalance(account)
  const blockNumber = useBlockNumber()
  const [USDValue, setUSDValue] = useState(null)
  const config = useConfig()
  const [activeEthAddress, setActiveEthAddress] = useState(null)

  useEffect(() => {
    setActiveEthAddress(account)
    // setActiveEthAddress('0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266')
  }, [])

  return !activeEthAddress ? null : (
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
      <EthAddressInput />

      <Flex
        flex={1}
        // border={'1px solid white'}
        flexDirection={'column'}
        align={'center'}
        justify={'center'}
      >
        <Box
          d={'flex'}
          flex={1}
          p={'2'}
          // border={'1px solid white'}
          w={'100%'}
          align={'flex-end'}
          justifyContent={'flex-end'}
        >
          <Text fontSize="8" color={'grey'}>
            {activeEthAddress && truncateHash(activeEthAddress)}
          </Text>
        </Box>
        <CryptoIcon code={'Eth'} />

        {etherBalance && (
          <Box mt={'1'} align={'center'}>
            <Text fontSize={'xl'}>Balance</Text>
            <Text fontSize={'2xl'}>
              {formatEther(etherBalance).substring(0, 5)} ETH
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
            <AssetsPanel />
            <TransactionsPanel activeEthAddress={activeEthAddress} />
            {/* <TabPanel>
              <p>three!</p>
            </TabPanel> */}
          </TabPanels>
        </Tabs>
      </Flex>
      {blockNumber && (
        <Flex
          // border={'1px solid white'}
          display={'flex'}
          justify="flex-end"
          align={'flex-end'}
          // position="absolute"
          // bottom="5"
          // right="10"
        >
          <Flex
            // border={'1px solid orange'}
            flexDirection="row"
            align={'center'}
            justify="flex-end"
          >
            <Text fontSize="8" color={'limegreen'} fontFamily="Inter">
              {blockNumber}
            </Text>
            <BsDot
              size={'18px'}
              style={{ paddingRight: '4px' }}
              color={'limegreen'}
            />
          </Flex>
        </Flex>
      )}
    </Box>
  )
}

export default Wallet
