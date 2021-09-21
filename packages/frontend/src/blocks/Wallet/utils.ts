export const getTokenMetadata = async (address: string) => {
  try {
    const tokenMetaData = await fetch(
      `https://eth-kovan.alchemyapi.io/v2/${process.env.ALCHEMYAPIKEY}`,
      {
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
      }
    )
    const tokenMetaDataFulfilled = await tokenMetaData.json()
    // console.log(tokenMetaDataFulfilled)
    return tokenMetaDataFulfilled
  } catch (error) {
    console.log(error)
  }
}
