import { ApolloClient, InMemoryCache, gql, useQuery } from '@apollo/client'
import { Box, Flex, SimpleGrid } from '@chakra-ui/layout'
import React from 'react'

import { useEffect, useState } from 'react'
import { NFTPreview, MediaConfiguration } from '@zoralabs/nft-components'
import { openInNewTab } from './BAYC'
interface Props {}

const ZoraNftClient = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/ourzora/zora-v1',
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

const ZoraQuery = gql`
  query ZoraQuery {
    medias(first: 50) {
      id
      contentURI
      metadataHash
    }
  }
`

const Zora = (props: Props) => {
  const { loading, error, data } = useQuery(ZoraQuery, {
    client: ZoraNftClient,
  })
  const [NFTData, setNFTData] = useState([])
  useEffect(() => {
    if (data) {
      console.log(data)
      setNFTData(data['medias'])
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
      {NFTData.map((NFT) => {
        return (
          <Box
            // h={'100px'}
            // w={'90px'}
            bg={'blue'}
            display={'flex'}
            flex={1}
            borderRadius={'lg'}
            as={'a'}
            _hover={{
              transform: `scale(1.02)`,
            }}
            onClick={() => openInNewTab(NFT.contentURI)}
            style={{ cursor: 'pointer' }}
            key={NFT.id}
            // overflow={'hidden'}
          >
            <MediaConfiguration
              style={{
                theme: {
                  previewCard: {
                    height: 'auto',
                    width: '200px',
                    background: 'red',
                  },
                  defaultBorderRadius: 0,
                  borderStyle: 'none',

                  nftProposalCard: {
                    mediaHeight: '0px',
                  },
                },
              }}
            >
              <NFTPreview id={NFT.id} />
            </MediaConfiguration>
          </Box>
        )
      })}
    </SimpleGrid>
  )
}

export default Zora
