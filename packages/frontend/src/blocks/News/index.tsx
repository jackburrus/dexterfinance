import { useColorMode } from '@chakra-ui/color-mode'
import { Box, Center, Divider, Heading } from '@chakra-ui/layout'
import { List, Spinner } from '@chakra-ui/react'
import CloseButton from '@components/CloseButton'
import { CustomBox } from '@components/CustomBox'
import React, { useEffect, useState } from 'react'
import { fetchNews } from './helpers'
import { NewsArticleCard } from './NewsTitleCard'
import { NewsBlockProps, NewsResponseType } from './types'

const NewsBlock: React.FC<NewsBlockProps> = (props) => {
  const { uuid } = props
  const [newsFeed, setNewsFeed] = useState<NewsResponseType[]>([])
  const { colorMode } = useColorMode()

  useEffect(() => {
    fetchNews(setNewsFeed)
  }, [])

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
          <Center flex={1} h={300}>
            <Spinner />
          </Center>
        ) : (
          <List ml={2} spacing={3}>
            {newsFeed.map((news) => {
              return (
                <Box key={news.id}>
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
