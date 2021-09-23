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
import React, { useEffect, useReducer } from 'react'
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
import { Size, useWindowSize } from 'src/hooks/useWindowSize'
import process from 'process'
import NFTBlock from 'src/blocks/NFT'
import AnalyticsBlock from 'src/blocks/Analytics'
import NewBlock from 'src/blocks/News'
import UniswapBlock from 'src/blocks/Uniswap'
import FileDropZone from '@components/FileDropZone'
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
      return <Wallet provided={provided} />
    case 'NFT':
      return <NFTBlock provided={provided} uuid={block.uuid} />
    case 'Analytics':
      return <AnalyticsBlock provided={provided} />
    case 'News':
      return <NewBlock provided={provided} />
    case 'Uniswap':
      return <UniswapBlock provided={provided} />

    default:
      return null
  }
}

function HomeIndex(): JSX.Element {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { account, chainId, library } = useEthers()
  const [blockList, { addBlock, removeBlock, clearAllBlocks, moveBlocks }] =
    useBlocks()
  const size: Size = useWindowSize()
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

  useEffect(() => {
    // addBlock({ index: '4', title: 'Wallet', protocol: 'Analytics' })
  }, [])

  return (
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
