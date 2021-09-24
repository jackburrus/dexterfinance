import { Box, Center, Flex, Heading, Text } from '@chakra-ui/layout'
import React, { useState, useEffect } from 'react'
import {
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
  Spinner,
} from '@chakra-ui/react'
import Image from 'next/image'
import { openInNewTab } from '../NFT/NFTTypes/BAYC'
import CloseButton from '@components/CloseButton'
interface Props {}

const CryptoNewsIDs = [
  {
    id: 1,
    coinID: 'ETH',
    coinName: 'ethereum',
  },
  {
    id: 2,
    coinID: 'UNI',
    coinName: 'uniswap',
  },
  {
    id: 3,
    coinID: 'SUSHI',
    coinName: 'Ethereum',
  },
]

interface NewsCardTypes {
  title: string
  image: string
  categories: string
  sourceURI: string
}

const NewsArticleCard = (props: NewsCardTypes) => {
  const { title, image, categories, sourceURI } = props
  // console.log(categories)
  // if (categories) {
  //   const mainCategory = categories.split('|')[0]
  //   console.log(mainCategory)
  // }
  const mainCategory = categories.split('|')[0]
  return (
    <Flex
      style={{ cursor: 'pointer' }}
      as={'a'}
      mt={2}
      mb={5}
      onClick={() => openInNewTab(sourceURI)}
    >
      <Box
        w="75px"
        maxWidth="75px"
        minWidth="75px"
        h="75px"
        mr={5}
        position={'relative'}
        // border={'1px solid red'}
        display="flex"
        borderRadius={'2xl'}
      >
        <Image src={image} layout={'fill'} objectFit="contain" />
      </Box>
      <Box
        // border={'1px solid red'}
        display={'flex'}
        flexDirection="column"
        // alignItems="center"
        justifyContent="center"
      >
        <Text color={'GrayText'} fontSize="small">
          {mainCategory}
        </Text>
        <Text fontWeight={'semibold'} color={'white'}>
          {title}
        </Text>
      </Box>
    </Flex>
  )
}

// TODO: #10 create news block with category options
const NewsBlock = (props: Props) => {
  const [newsFeed, setNewsFeed] = useState([])
  const {uuid} = props
  useEffect(() => {
    if (CryptoNewsIDs) {
      const url = `https://min-api.cryptocompare.com/data/v2/news/?lang=EN`

      fetch(url, {
        method: 'POST',
        headers: {
          authorization: process.env.CryptoCompareKey,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log('Inside Fetch to STATUS_UPDATES: ', data)
          const statusUpdates = data['Data']
          setNewsFeed(statusUpdates)
        })
    }
  }, [])

  useEffect(() => {
    console.log(newsFeed)
  }, [newsFeed])
  return !newsFeed ? null : (
    <Box
      w="500px"
      h="350px"
      d="flex"
      margin={'10'}
      justifyContent="flex-start"
      //Text
      flexDirection="column"
      bg={'#181C20'}
      borderRadius={'3xl'}
      position="relative"
      overflow={'scroll'}
      p={5}
    >
      <CloseButton blockID={uuid} />
      <Heading fontWeight={'bold'} color={'white'} m={2} size={'md'} mb={5}>
        Crypto News
      </Heading>
      {!newsFeed.length ? (
        <Center flex={1}>
          <Spinner />
        </Center>
      ) : (
        <List ml={2} spacing={3}>
          {newsFeed.map((news) => {
            return (
              <NewsArticleCard
                title={news.title}
                image={news.imageurl}
                categories={news.categories}
                sourceURI={news.url}
              />
              // <ListItem key={news.id} color={'white'}>
              //   {/* <ListIcon as={MdCheckCircle} color="green.500" /> */}
              //   {news.title}
              // </ListItem>
            )
          })}
        </List>
      )}
    </Box>
  )
}

export default NewsBlock
