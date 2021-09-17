import {
  Box,
  Button,
  Divider,
  Heading,
  Input,
  Text,
  Flex,
} from '@chakra-ui/react'
import { useBlocks } from '@recoil/hooks/useBlocks'
import { ChainId, useEthers, useSendTransaction } from '@usedapp/core'
import { ethers, providers, utils } from 'ethers'
import React, { useReducer } from 'react'
import Wallet from 'src/blocks/Wallet'
import { YourContract as LOCAL_CONTRACT_ADDRESS } from '../artifacts/contracts/contractAddress'
import YourContract from '../artifacts/contracts/YourContract.sol/YourContract.json'
import { Layout } from '../src/components/layout/Layout'
import { YourContract as YourContractType } from '../types/typechain'

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

    default:
      return null
  }
}

function HomeIndex(): JSX.Element {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { account, chainId, library } = useEthers()
  const [blockList, { addBlock, removeBlock, clearAllBlocks, moveBlocks }] =
    useBlocks()

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

  return (
    <Layout>
      <Flex>
        <h1>Hello</h1>
        {blockList.map((block) => (
          <div
            style={{
              width: '100%',
              height: '100%',
            }}
          >
            {getBlockType(block)}
          </div>
        ))}
      </Flex>
    </Layout>
  )
}

export default HomeIndex
