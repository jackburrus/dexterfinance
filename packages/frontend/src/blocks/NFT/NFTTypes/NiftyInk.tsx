import { ApolloClient, InMemoryCache, gql, useQuery } from '@apollo/client'
import { Flex, SimpleGrid } from '@chakra-ui/layout'
import React from 'react'
import { getRandomColor } from './BAYC'
import { useEffect, useState } from 'react'

interface Props {}

interface NFTCardTypes {
  imageURI: string
  name: string
  content: any
}

const NiftyInkClient = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/azf20/nifty-ink',
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

const NFTInkQuery = gql`
  query nftInkQuery {
    inks(first: 500) {
      id
      inkNumber
      jsonUrl
    }
  }
`

const fetchURIs = async (data) => {
  const contentURI = 'https://ipfs.io/ipfs/' + data['jsonUrl']
  const ipfsData = await fetch(contentURI)
    // const ipfsData = await fetch('https://pokeapi.co/api/v2/pokemon/ditto')
    .then((res) => {
      return res.json()
    })
  // .then((res) => console.log(res))
  return ipfsData
}

const openInNewTab = (url) => {
  const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
  if (newWindow) newWindow.opener = null
}

const NFTCard = ({ imageURI, name, content }: NFTCardTypes) => {
  // console.log(imageURI.replace('ipfs://', 'https://ipfs.io/ipfs/'))
  return (
    <Flex
      h={'100px'}
      w={'90px'}
      bg={'white'}
      borderRadius={'lg'}
      as={'a'}
      _hover={{
        transform: `scale(1.02)`,
      }}
      onClick={() => openInNewTab(content.external_url)}
      style={{ cursor: 'pointer' }}
      overflow={'hidden'}
    >
      <img
        src={imageURI.replace('ipfs://', 'https://ipfs.io/ipfs/')}
        style={{ width: 100, height: 100 }}
      />
    </Flex>
  )
}

const NiftyInk = (props: Props) => {
  const { loading, error, data } = useQuery(NFTInkQuery, {
    client: NiftyInkClient,
  })
  const [NFTData, setNFTData] = useState([])

  useEffect(() => {
    if (data) {
      const shuffled = data['inks'].sort(() => 0.5 - Math.random())
      const selected = shuffled.slice(0, 50)
      selected.map(async (ink) => {
        // console.log(ink)
        const newData = await fetchURIs(ink)

        const newTokenData = { ink, ...newData }
        // console.log(newTokenData)
        setNFTData((oldArray) => [...oldArray, newTokenData])
      })
    }
  }, [data])

  return (
    <SimpleGrid
      // border={'1px solid orange'}
      d={'flex'}
      mt={2}
      flexWrap={'wrap'}
      justifyContent={'center'}
      columns={4}
      spacing={5}
    >
      {NFTData.map((card, index) => {
        return (
          <NFTCard
            key={index}
            // name={card.name}
            content={card}
            imageURI={card.image}
          />
        )
      })}
    </SimpleGrid>
  )
}

export default NiftyInk
