import { ApolloClient, InMemoryCache, gql, useQuery } from '@apollo/client'
import { Box, Flex, SimpleGrid, Text } from '@chakra-ui/layout'
import { useEffect, useState } from 'react'
import React from 'react'
import { Spinner } from '@chakra-ui/react'

interface Props {}

interface NFTCardTypes {
  imageURI: string
}

const BAYCClient = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/dabit3/boredapeyachtclub',
  cache: new InMemoryCache({
    typePolicies: {
      Token: {
        // Singleton types that have no identifying field can use an empty
        // array for their keyFields.
        keyFields: false,
      },
      Pool: {
        // Singleton types that have no identifying field can use an empty
        // array for their keyFields.
        keyFields: false,
      },
    },
  }),
  queryDeduplication: true,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache',
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
  },
})

const NFTQuery = gql`
  query nftQuery {
    tokens(first: 50) {
      id
      tokenID
      contentURI
      baseURI
    }
  }
`

const fetchURIs = async (data) => {
  const contentURI = 'https://' + data['contentURI']
  const ipfsData = await fetch(contentURI)
    // const ipfsData = await fetch('https://pokeapi.co/api/v2/pokemon/ditto')
    .then((res) => {
      return res.json()
    })
  // .then((res) => console.log(res))
  return ipfsData
}

export const openInNewTab = (url) => {
  const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
  if (newWindow) newWindow.opener = null
}

const NFTCard = ({ imageURI, id }: NFTCardTypes) => {
  // console.log(imageURI.replace('ipfs://', 'https://ipfs.io/ipfs/'))
  return (
    <Flex
      h={'100px'}
      w={'90px'}
      // bg={getRandomColor()}
      bg={'white'}
      borderRadius={'lg'}
      overflow={'hidden'}
      //   style={{ cursor: 'pointer' }}
      //   as={'a'}
      //   _hover={{
      //     transform: `scale(1.02)`,
      //   }}
      //   onClick={() =>
      //     openInNewTab(
      //       'https://opensea.io/assets/0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D/' +
      //         id.toString()
      //     )
      //   }
    >
      {/* <Image
          src={imageURI.replace('ipfs://', 'https://ipfs.io/ipfs/')}
          width={'90px'}
          height={'100px'}
        /> */}
      <img
        src={imageURI.replace('ipfs://', 'https://ipfs.io/ipfs/')}
        style={{ width: 100, height: 100 }}
      />
    </Flex>
  )
}

export function getRandomColor() {
  const letters = '0123456789ABCDEF'
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

const BAYC = (props: Props) => {
  const { loading, error, data } = useQuery(NFTQuery, {
    client: BAYCClient,
  })
  const [NFTData, setNFTData] = useState([])

  useEffect(() => {
    if (data) {
      //   console.log(data)
      data['tokens'].map(async (token) => {
        const newData = await fetchURIs(token)
        const newTokenData = { token, ...newData }
        // console.log(newTokenData)
        setNFTData((oldArray) => [...oldArray, newTokenData])
      })
    }
  }, [data])
  return !NFTData ? null : (
    <SimpleGrid
      // border={'1px solid orange'}
      d={'flex'}
      mt={2}
      flexWrap={'wrap'}
      justifyContent={'center'}
      columns={4}
      spacing={5}
    >
      {}
      {NFTData.length < 40 ? (
        <Box display={'flex'} flex={1} border={'1px solid orange'}>
          <Spinner />
        </Box>
      ) : (
        NFTData.map((card, index) => {
          return (
            <NFTCard key={index} imageURI={card.image} id={card.token.id} />
          )
        })
      )}
    </SimpleGrid>
  )
}

export default BAYC
