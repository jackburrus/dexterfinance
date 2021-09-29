// Sample card from Airbnb
import { useEffect, useState } from 'react'
import { DragHandleIcon, StarIcon } from '@chakra-ui/icons'
import Image from 'next/image'
import {
  Badge,
  Box,
  BoxProps,
  Center,
  Flex,
  SimpleGrid,
  Text,
} from '@chakra-ui/layout'
import { Select } from '@chakra-ui/react'
import PopoverOnBlock from '@components/Popover'
import { ApolloClient, InMemoryCache, useQuery, gql } from '@apollo/client'
import { useColorMode } from '@chakra-ui/color-mode'

import BAYC from './NFTTypes/BAYC'
import NiftyInk from './NFTTypes/NiftyInk'
import CloseButton from '@components/CloseButton'
import Zora from './NFTTypes/Zora'
import { CustomBox } from '@components/CustomBox'

const NFTBlock = (props): BoxProps => {
  const [NFTName, setNFTName] = useState<'BAYC' | 'NiftyInk' | 'Zora'>('BAYC')
  const { uuid } = props
  const onNFTChange = (e) => {
    setNFTName(e.target.value)
  }
  const { colorMode } = useColorMode()

  return (
    <CustomBox>
      <Box overflowX="hidden" overflowY="scroll" padding={2}>
        <CloseButton blockID={uuid} />
        <Flex pr={15} p={15} align="center">
          <Box
            bgColor={colorMode == 'light' ? 'transparent' : '#1F2128'}
            height={30}
            borderRadius={'2xl'}
            pl={'3'}
            position={'absolute'}
            display={'flex'}
            flexDirection={'row'}
            alignItems="center"
            mb={2}
          >
            {NFTName == 'NiftyInk' ? (
              <Flex mr={'8px'}>
                <Image
                  src={require(`./assets/NiftyInk.png`)}
                  // src={require(`../../../../../node_modules/cryptocurrency-icons/svg/color/uni.svg`)}
                  width={20}
                  height={20}
                  alt="crypto-icon"
                />
              </Flex>
            ) : (
              <Flex mr={'8px'}>
                <Image
                  src={require(`./assets/bayc.png`)}
                  // src={require(`../../../../../node_modules/cryptocurrency-icons/svg/color/uni.svg`)}
                  width={20}
                  height={20}
                  alt="crypto-icon"
                />
              </Flex>
            )}

            <Select
              borderRadius={'2xl'}
              onChange={onNFTChange}
              fontSize="12px"
              height={30}
              variant="unstyled"
              // placeholder={'Uniswap'}
              color={colorMode == 'light' ? 'grey' : 'white'}
              // icon={}
            >
              <option value="BAYC">BAYC</option>
              <option value="NiftyInk">Nifty Ink</option>
              <option value="Zora">Zora</option>
            </Select>
          </Box>
        </Flex>
        <Flex
          // border={'1px solid cyan'}
          // display={'flex'}
          // flex={1}
          // h={'250px'}
          align="center"
          justify="center"
        >
          {NFTName == 'BAYC' && <BAYC />}
          {NFTName == 'NiftyInk' && <NiftyInk />}
          {NFTName == 'Zora' && <Zora />}
        </Flex>
      </Box>
    </CustomBox>
  )
}

export default NFTBlock
