import { ApolloClient, gql, InMemoryCache, useQuery } from '@apollo/client'
import { Image } from '@chakra-ui/image'
import { Box, SimpleGrid } from '@chakra-ui/layout'
import { useNFTMetadata } from '@zoralabs/nft-hooks'
import { useEffect, useState } from 'react'
import { openInNewTab } from './BAYC'

interface Props {}

const ZoraNftClient = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/ourzora/zora-v1',
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

  useEffect(() => {
    if (data) {
      const shuffled = data['medias'].sort(() => 0.5 - Math.random())
      const selected = shuffled.slice(0, 50)
      setNFTData(selected)
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
      {NFTData.map((NFT) => {
        return <NFTCard key={NFT.id} nftData={NFT} />
      })}
    </SimpleGrid>
  )
}

export default Zora
