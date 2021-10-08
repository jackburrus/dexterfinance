import { ApolloClient, gql, InMemoryCache, useQuery } from '@apollo/client'
import { Center, Flex, SimpleGrid } from '@chakra-ui/layout'
import { Spinner } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
interface Props {}

interface NFTCardTypes {
  imageURI: string
}

const BAYCClient = new ApolloClient({
  // uri: 'https://api.thegraph.com/subgraphs/name/dabit3/boredapeyachtclub',
  uri: 'https://api.thegraph.com/subgraphs/name/l3xcodes/bayc-subgraph',
  cache: new InMemoryCache({
    typePolicies: {
      Token: {
        keyFields: false,
      },
      Pool: {
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
      uri
    }
  }
`
// const NFTQuery = gql`
//   query nftQuery {
//     tokens(first: 50) {
//       id
//       tokenID
//       contentURI
//       baseURI
//     }
//   }
// `

const fetchURIs = async (data) => {
  // const contentURI = 'https://' + data['contentURI']
  const contentURI = 'https://' + data['uri']
  // console.log(contentURI)
  try {
    const ipfsData = await fetch(data['uri'], {
      headers: { 'Content-Type': 'application/json' },
    }).then((res) => {
      return res.json()
    })

    return ipfsData
  } catch (error) {
    console.warn(error)
  }
}

export const openInNewTab = (url) => {
  const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
  if (newWindow) newWindow.opener = null
}

const NFTCard = ({ imageURI, id }: NFTCardTypes) => {
  return (
    <Flex
      h={'100px'}
      w={'90px'}
      bg={'white'}
      borderRadius={'lg'}
      overflow={'hidden'}
    >
      {imageURI ? (
        <img
          src={imageURI.replace('ipfs://', 'https://ipfs.io/ipfs/')}
          style={{ width: 100, height: 100 }}
        />
      ) : null}
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
      data['tokens'].map(async (token) => {
        const newData = await fetchURIs(token)
        // console.log(newData)
        const newTokenData = { token, ...newData }
        // console.log(newTokenData)
        setNFTData((oldArray) => [...oldArray, newTokenData])
      })
    }
  }, [data])
  return !NFTData ? null : (
    <SimpleGrid
      d={'flex'}
      mt={2}
      flexWrap={'wrap'}
      justifyContent={'center'}
      columns={4}
      spacing={5}
    >
      {}
      {NFTData.length < 40 ? (
        <Center height={300} display={'flex'} flex={1}>
          <Spinner />
        </Center>
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
