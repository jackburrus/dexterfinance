import { useBlocks } from '@recoil/hooks/useBlocks'
import { useEthers, useSendTransaction } from '@usedapp/core'
import { providers } from 'ethers'
import React, { useCallback, useEffect, useReducer, useState } from 'react'
import Wallet from 'src/blocks/Wallet'
import { Layout } from '../src/components/layout/Layout'
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
import NFTBlock from 'src/blocks/NFT'
import AnalyticsBlock from 'src/blocks/Analytics'
import NewBlock from 'src/blocks/News'

import FileDropZone from '@components/FileDropZone'
import { useDisclosure } from '@chakra-ui/hooks'
import NFTStorage from 'src/blocks/NFT.Storage'
import { getBlockType } from 'src/constants/BlockData'
/**
 * Constants & Helpers
 */

const localProvider = new providers.StaticJsonRpcProvider(
  'http://localhost:8545'
)

const ROPSTEN_CONTRACT_ADDRESS = '0x6b61a52b1EA15f4b8dB186126e980208E1E18864'

function HomeIndex(): JSX.Element {
  const { account, chainId, library } = useEthers()
  const [blockList, { moveBlocks }] = useBlocks()
  const [networkName, setNetworkName] = useState(null)
  const size: Size = useWindowSize()
  const { isOpen, onOpen, onClose } = useDisclosure()
  // const url = `https://eth-kovan.alchemyapi.io/v2/${process.env.ALCHEMYAPIKEY}`

  // const customHttpProvider = new ethers.providers.AlchemyProvider

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

  function onChange(sourceId, sourceIndex, targetIndex, targetId) {
    const nextState = swap(blockList, sourceIndex, targetIndex)
    moveBlocks(nextState)
  }

  return networkName &&
    networkName !== 'kovan' &&
    networkName !== 'homestead' ? (
    <Layout>
      <Alert
        status="warning"
        variant="subtle"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        height="200px"
        borderRadius={10}
      >
        <AlertIcon boxSize="40px" mr={0} />
        <AlertTitle mt={4} mb={1} fontSize="lg">
          Wrong Network
        </AlertTitle>
        <AlertDescription maxWidth="sm">
          Dexter currently works on Mainnet and the Kovan Test Network. Please
          switch networks for the best experience.
        </AlertDescription>
      </Alert>
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
