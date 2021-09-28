import { Box, Center, Divider, Flex, Heading, Text } from '@chakra-ui/layout'
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
import { CustomBox } from '@components/CustomBox'
import { useColorMode } from '@chakra-ui/color-mode'
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
  const { colorMode } = useColorMode()
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
        overflow={'hidden'}
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
        <Text
          color={colorMode == 'light' ? 'black' : 'GrayText'}
          fontSize="small"
        >
          {mainCategory}
        </Text>
        <Text
          fontWeight={'semibold'}
          color={colorMode == 'light' ? 'black' : 'GrayText'}
        >
          {title}
        </Text>
      </Box>
    </Flex>
  )
}

// TODO: #10 create news block with category options
const NewsBlock = (props: Props) => {
  const [newsFeed, setNewsFeed] = useState([])
  const { colorMode } = useColorMode()

  const { uuid } = props
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
    <CustomBox>
      <Box overflowX="hidden" overflowY="scroll" padding={2}>
        <CloseButton blockID={uuid} />
        <Heading
          fontWeight={'bold'}
          color={colorMode == 'light' ? 'black' : 'white'}
          m={2}
          size={'md'}
          mb={5}
        >
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
                <Box>
                  <NewsArticleCard
                    title={news.title}
                    image={news.imageurl}
                    categories={news.categories}
                    sourceURI={news.url}
                  />
                  <Divider colorScheme="yellow" />
                </Box>
              )
            })}
          </List>
        )}
      </Box>
    </CustomBox>
  )
}

export default NewsBlock
