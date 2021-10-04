import { ApolloClient, InMemoryCache, gql, useQuery } from '@apollo/client'
import { Box, Flex, SimpleGrid } from '@chakra-ui/layout'
import React from 'react'

import { useEffect, useState } from 'react'
import { NFTPreview, MediaConfiguration } from '@zoralabs/nft-components'
import { openInNewTab } from './BAYC'
import { Image } from '@chakra-ui/image'
import { useNFTMetadata } from '@zoralabs/nft-hooks'

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
    medias(first: 500) {
      id
      contentURI
      metadataHash
      metadataURI
    }
  }
`

const NFTCard = ({ nftData }) => {
  const { metadata } = useNFTMetadata(nftData && nftData.metadataURI)
  console.log(metadata && metadata.mimeType)
  return (metadata && metadata.mimeType == 'image/jpeg') ||
    (metadata && metadata.mimeType == 'image/png') ||
    (metadata && metadata.mimeType == 'image/jpg') ? (
    <Box
      borderRadius={'lg'}
      as={'a'}
      _hover={{
        transform: `scale(1.02)`,
      }}
      bg="white"
      onClick={() => openInNewTab(nftData.contentURI)}
      style={{ cursor: 'pointer' }}
      key={nftData.id}
      overflow={'hidden'}
    >
      <Image src={nftData.contentURI} width={100} height={100} />
    </Box>
  ) : null
}

const Zora = (props: Props) => {
  const { loading, error, data } = useQuery(ZoraQuery, {
    client: ZoraNftClient,
  })
  const [NFTData, setNFTData] = useState([])

  //   const getIPFS = async () => {
  //     for await (const chunk of ipfs.cat(ipfsPath)) {
  //         console.info(chunk)
  //       }
  //   }
  useEffect(() => {
    if (data) {
      const shuffled = data['medias'].sort(() => 0.5 - Math.random())
      const selected = shuffled.slice(0, 50)
      setNFTData(selected)
    }
  }, [data])
  return !NFTData ? null : (
    <SimpleGrid
      // border={'1px solid orange'}
      d={'flex'}
      mt={2}
      // pl={1}
      // pr={1}
      flexWrap={'wrap'}
      justifyContent={'center'}
      columns={4}
      spacing={5}
    >
      {NFTData.map((NFT) => {
        return <NFTCard key={NFT.id} nftData={NFT} />
      })}
    </SimpleGrid>
  )
}

export default Zora

//   <Box
//     h={'100px'}
//     w={'90px'}
//     bg={'white'}
//     display={'flex'}
//     flex={1}
//     borderRadius={'lg'}
//     as={'a'}
//     _hover={{
//       transform: `scale(1.02)`,
//     }}
// onClick={() => openInNewTab(NFT.contentURI)}
// style={{ cursor: 'pointer' }}
// key={NFT.id}

// // overflow={'hidden'}
//   >

/* <MediaConfiguration
              style={{
                theme: {
                  previewCard: {
                    height: 'auto',
                    width: 'auto',
                    background: 'transparent',
                  },
                  defaultBorderRadius: 0,
                  borderStyle: 'none',

                  nftProposalCard: {
                    mediaHeight: '0px',
                  },
                },
              }}
            >
              <NFTPreview
                contract={false}
                initialData={false}
                showPerpetual={false}
                showBids={false}
                id={NFT.id}
              />
            </MediaConfiguration> */
//   </Box>
