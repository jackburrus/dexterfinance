import { Box, Flex, Text } from '@chakra-ui/layout'
import { openInNewTab } from '../NFT/NFTTypes/BAYC'
import Image from 'next/image'
import { useColorMode } from '@chakra-ui/color-mode'
import { NewsCardTypes } from './types'

export const NewsArticleCard: React.FC<NewsCardTypes> = (props) => {
  const { title, image, categories, sourceURI } = props
  const { colorMode } = useColorMode()

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
        display="flex"
        borderRadius={'2xl'}
        overflow={'hidden'}
      >
        <Image src={image} layout={'fill'} objectFit="contain" />
      </Box>
      <Box display={'flex'} flexDirection="column" justifyContent="center">
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
