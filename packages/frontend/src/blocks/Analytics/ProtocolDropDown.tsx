import { Box, Flex } from '@chakra-ui/layout'
import { Select } from '@chakra-ui/select'
import Image from 'next/image'
import React from 'react'

const ProtocolDropDown = ({ onProtocolChange, selectedProtocol }) => {
  return (
    <Box
      bgColor="#1F2128"
      height={30}
      borderRadius={'2xl'}
      pl={'3'}
      display={'flex'}
      flexDirection={'row'}
      alignItems="center"
    >
      {selectedProtocol == 'Uniswap' ? (
        <Flex mr={'8px'}>
          <Image
            src={require(`../../../../../node_modules/cryptocurrency-icons/svg/color/uni.svg`)}
            width={20}
            height={20}
            alt="crypto-icon"
          />
        </Flex>
      ) : (
        <Flex mr={'8px'}>
          <Image
            src={require(`../../../../../node_modules/cryptocurrency-icons/svg/color/sushi.svg`)}
            width={20}
            height={20}
            alt="crypto-icon"
          />
        </Flex>
      )}

      <Select
        borderRadius={'2xl'}
        onChange={onProtocolChange}
        fontSize="12px"
        height={30}
        variant="unstyled"
        // placeholder={'Uniswap'}
        color={'white'}
        // icon={}
      >
        <option value="Uniswap"> Uniswap</option>

        <option value="Sushiswap">Sushiswap</option>
      </Select>
    </Box>
  )
}

export default ProtocolDropDown
