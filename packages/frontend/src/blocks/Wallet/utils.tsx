import { ethers } from '@usedapp/core/node_modules/ethers'

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
        // console.log(meta)
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

const transactionApiEndpoint = (networkName, activeEthAddress) =>
  networkName == 'kovan'
    ? `https://api-kovan.etherscan.io/api?module=account&action=txlist&address=${activeEthAddress}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=${process.env.Etherscan}`
    : `https://api.etherscan.io/api?module=account&action=txlist&address=${activeEthAddress}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=${process.env.Etherscan}`

export const fetchTransactions = async (
  provider: ethers.providers.JsonRpcProvider,
  setTransactionList: any,
  activeEthAddress: string
) => {
  const networkName = (await provider.getNetwork()).name
  try {
    const response = await fetch(
      transactionApiEndpoint(networkName, activeEthAddress),
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      }
    )
    console.log(response)
    const transactions = await response.json()
    transactions.result
      .slice(0)
      .reverse()
      .map(async (tx) => {
        const txdata = await provider.getTransaction(tx.hash)
        setTransactionList((prevArray) => [
          ...prevArray,
          Object.assign({}, tx, txdata.value),
        ])
      })
    // console.log(transactions)
  } catch (error) {
    console.log(error)
  }
}
