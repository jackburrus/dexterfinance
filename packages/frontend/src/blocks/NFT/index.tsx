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

import BAYC from './NFTTypes/BAYC'
import NiftyInk from './NFTTypes/NiftyInk'
import CloseButton from '@components/CloseButton'

const NFTBlock = (props): BoxProps => {
  const [NFTName, setNFTName] = useState<'BAYC' | 'NiftyInk'>('BAYC')
  const { uuid } = props
  const onNFTChange = (e) => {
    setNFTName(e.target.value)
  }

  return (
    <Box
      w="500px"
      h="350px"
      d="flex"
      margin={'10'}
      justifyContent="flex-start"
      flexDirection="column"
      bg={'#181C20'}
      borderRadius={'3xl'}
      position="relative"
      overflow={'scroll'}
    >
      <CloseButton blockID={uuid} />
      <Flex pr={15} p={15} align="center">
        <Box
          bgColor="#1F2128"
          height={30}
          borderRadius={'2xl'}
          pl={'3'}
          display={'flex'}
          flexDirection={'row'}
          alignItems="center"
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
            color={'white'}
            // icon={}
          >
            <option value="BAYC">BAYC</option>
            <option value="NiftyInk">Nifty Ink</option>
          </Select>
        </Box>
      </Flex>
      <Flex
        // border={'1px solid cyan'}
        flex={1}
        align="center"
        justify="center"
      >
        {NFTName == 'BAYC' ? <BAYC /> : <NiftyInk />}
      </Flex>

      {/* <PopoverOnBlock /> */}
    </Box>
  )
}

export default NFTBlock
