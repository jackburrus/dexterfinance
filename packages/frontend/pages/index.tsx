import {
  Box,
  Button,
  Divider,
  Heading,
  Input,
  Text,
  Flex,
  Center,
} from '@chakra-ui/react'
import { useBlocks } from '@recoil/hooks/useBlocks'
import { ChainId, useEthers, useSendTransaction } from '@usedapp/core'
import { ethers, providers, utils } from 'ethers'
import React, { useCallback, useEffect, useReducer, useState } from 'react'
import Wallet from 'src/blocks/Wallet'
import { YourContract as LOCAL_CONTRACT_ADDRESS } from '../artifacts/contracts/contractAddress'
import YourContract from '../artifacts/contracts/YourContract.sol/YourContract.json'
import { Layout } from '../src/components/layout/Layout'
import { YourContract as YourContractType } from '../types/typechain'
import {
  GridContextProvider,
  GridDropZone,
  GridItem,
  swap,
} from 'react-grid-dnd'
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react'
import { Size, useWindowSize } from 'src/hooks/useWindowSize'
import process from 'process'
import NFTBlock from 'src/blocks/NFT'
import AnalyticsBlock from 'src/blocks/Analytics'
import NewBlock from 'src/blocks/News'
import UniswapBlock from 'src/blocks/Uniswap'
import FileDropZone from '@components/FileDropZone'
import { useDisclosure } from '@chakra-ui/hooks'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
/**
 * Constants & Helpers
 */

const localProvider = new providers.StaticJsonRpcProvider(
  'http://localhost:8545'
)

const ROPSTEN_CONTRACT_ADDRESS = '0x6b61a52b1EA15f4b8dB186126e980208E1E18864'

/**
 * Prop Types
 */
type StateType = {
  greeting: string
  inputValue: string
  isLoading: boolean
}
type ActionType =
  | {
      type: 'SET_GREETING'
      greeting: StateType['greeting']
    }
  | {
      type: 'SET_INPUT_VALUE'
      inputValue: StateType['inputValue']
    }
  | {
      type: 'SET_LOADING'
      isLoading: StateType['isLoading']
    }

/**
 * Component
 */
const initialState: StateType = {
  greeting: '',
  inputValue: '',
  isLoading: false,
}

function reducer(state: StateType, action: ActionType): StateType {
  switch (action.type) {
    // Track the greeting from the blockchain
    case 'SET_GREETING':
      return {
        ...state,
        greeting: action.greeting,
      }
    case 'SET_INPUT_VALUE':
      return {
        ...state,
        inputValue: action.inputValue,
      }
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.isLoading,
      }
    default:
      throw new Error()
  }
}

const getBlockType = (block: BlockType, provided): JSX.Element => {
  switch (block.title) {
    case 'Wallet':
      return <Wallet provided={provided} uuid={block.uuid} />
    case 'NFT':
      return <NFTBlock provided={provided} uuid={block.uuid} />
    case 'Analytics':
      return <AnalyticsBlock provided={provided} uuid={block.uuid} />
    case 'News':
      return <NewBlock provided={provided} uuid={block.uuid} />
    case 'Uniswap':
      return <UniswapBlock provided={provided} uuid={block.uuid} />

    default:
      return null
  }
}

function HomeIndex(): JSX.Element {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { account, chainId, library } = useEthers()
  const [blockList, { addBlock, removeBlock, clearAllBlocks, moveBlocks }] =
    useBlocks()
  const [networkName, setNetworkName] = useState(null)
  const size: Size = useWindowSize()
  const { isOpen, onOpen, onClose } = useDisclosure()
  // const url = `https://eth-kovan.alchemyapi.io/v2/${process.env.ALCHEMYAPIKEY}`

  // const customHttpProvider = new ethers.providers.AlchemyProvider

  const isLocalChain =
    chainId === ChainId.Localhost || chainId === ChainId.Hardhat

  const CONTRACT_ADDRESS =
    chainId === ChainId.Ropsten
      ? ROPSTEN_CONTRACT_ADDRESS
      : LOCAL_CONTRACT_ADDRESS

  // Use the localProvider as the signer to send ETH to our wallet
  const { sendTransaction } = useSendTransaction({
    signer: localProvider.getSigner(),
  })
  const fetchNetworkName = useCallback(async () => {
    const response = await library.getNetwork()

    setNetworkName(response.name)
  }, [library, networkName])

  useEffect(() => {
    if (library) {
      fetchNetworkName()
    }
  }, [networkName, fetchNetworkName, library])

  function sendFunds(): void {
    sendTransaction({
      to: account,
      value: utils.parseEther('0.1'),
    })
  }
  function onChange(sourceId, sourceIndex, targetIndex, targetId) {
    const nextState = swap(blockList, sourceIndex, targetIndex)
    moveBlocks(nextState)
  }

  // useEffect(() => {
  //   if (library) {
  //     console.log(library)
  //   }

  //   // addBlock({ index: '4', title: 'Wallet', protocol: 'Analytics' })
  // }, [library])

  return networkName && networkName !== 'kovan' ? (
    <Layout>
      <Alert
        status="warning"
        variant="subtle"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        height="200px"
      >
        <AlertIcon boxSize="40px" mr={0} />
        <AlertTitle mt={4} mb={1} fontSize="lg">
          Wrong Network
        </AlertTitle>
        <AlertDescription maxWidth="sm">
          Dexter currently works on the Kovan Text Network. Please switch
          networks for the best experience.
        </AlertDescription>
      </Alert>
      {/* <Modal
        isCentered
        onClose={onClose}
        isOpen={true}
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Wrong Network</ModalHeader>
          <ModalBody>
            Dexter currently works on the Kovan Text Network. Please switch
            networks for the best experience.
          </ModalBody>
        </ModalContent>
      </Modal> */}
    </Layout>
  ) : (
    <Layout>
      {blockList.length == 0 ? (
        <FileDropZone />
      ) : (
        <GridContextProvider onChange={onChange}>
          <GridDropZone
            id="items"
            boxesPerRow={size.width > 1900 ? 3 : 2}
            rowHeight={400}
            // rowWidth={200}
            style={{
              // border: '1px solid cyan',
              // position: 'relative',
              // height: 'auto',
              height: '90vh',
              width: '80vw',
              // display: 'flex',
              // flex: 1,
              // justifyContent: 'center',
              // alignItems: 'center',
            }}
          >
            {blockList.map((block) => (
              <GridItem key={block.uuid}>
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                >
                  {getBlockType(block)}
                </div>
              </GridItem>
            ))}
          </GridDropZone>
        </GridContextProvider>
      )}
    </Layout>
  )
}

export default HomeIndex
