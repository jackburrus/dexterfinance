import { ethers } from '@usedapp/core/node_modules/ethers'
import { useEthers, getChainName } from '@usedapp/core'

const apiEndpoint = (networkName) =>
  networkName == 'kovan'
    ? `https://eth-kovan.alchemyapi.io/v2/${process.env.ALCHEMYAPIKEY}`
    : `https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMYAPIKEYMAINNET}`

export const getTokenMetadata = async (address: string, library) => {
  const networkName = await library.getNetwork().name

  try {
    const tokenMetaData = await fetch(apiEndpoint(networkName), {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'alchemy_getTokenMetadata',
        params: [address],
        id: 42,
      }),
    })
    const tokenMetaDataFulfilled = await tokenMetaData.json()
    // console.log(tokenMetaDataFulfilled)
    return tokenMetaDataFulfilled
  } catch (error) {
    console.log(error)
  }
}

interface FetchTokenProps {
  provider: ethers.providers.JsonRpcProvider
}

interface TokenReturnTypes {
  name: string
  logoURI: string
}

export const fetchTokens = async (
  provider: ethers.providers.JsonRpcProvider,
  activeEthAddress: string,
  tokenBalanceData: any,
  setTokenBalanceData: any
): Promise<TokenReturnTypes[]> => {
  // const { provider } = props
  const networkName = (await provider.getNetwork()).name
  try {
    const response = await fetch(apiEndpoint(networkName), {
      method: 'POST',
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'alchemy_getTokenBalances',
        params: [activeEthAddress, 'DEFAULT_TOKENS'],
        id: 42,
      }),
    })
    const tokens = await response.json()
    tokens.result.tokenBalances.map(async (token) => {
      // console.log(token.contractAddress)
      if (token.tokenBalance !== '0x') {
        const meta = await getTokenMetadata(token.contractAddress, provider)
        console.log(meta)
        if (
          meta.result &&
          token.tokenBalance &&
          parseFloat(ethers.utils.formatEther(token.tokenBalance)) > 0.01
        ) {
          const exists = tokenBalanceData.find((t) => t.symbol === token.symbol)
          if (exists) return
          setTokenBalanceData((prevArray) => [
            ...prevArray,
            Object.assign({}, meta.result, token),
          ])
        }
      }
    })
  } catch (error) {
    console.log(error)
  }

  return []
}
