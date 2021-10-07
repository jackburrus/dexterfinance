import { useColorMode } from '@chakra-ui/color-mode'
import { Box, BoxProps, Flex } from '@chakra-ui/layout'
import { Select } from '@chakra-ui/react'
import CloseButton from '@components/CloseButton'
import { CustomBox } from '@components/CustomBox'
import Image from 'next/image'
import { useState } from 'react'
import BAYC from './NFTTypes/BAYC'
import NiftyInk from './NFTTypes/NiftyInk'
import Zora from './NFTTypes/Zora'

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
                  width={20}
                  height={20}
                  alt="crypto-icon"
                />
              </Flex>
            ) : (
              <Flex mr={'8px'}>
                <Image
                  src={require(`./assets/bayc.png`)}
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
              color={colorMode == 'light' ? 'grey' : 'white'}
            >
              <option value="BAYC">BAYC</option>
              <option value="NiftyInk">Nifty Ink</option>
              <option value="Zora">Zora</option>
            </Select>
          </Box>
        </Flex>
        <Flex align="center" justify="center">
          {NFTName == 'BAYC' && <BAYC />}
          {NFTName == 'NiftyInk' && <NiftyInk />}
          {NFTName == 'Zora' && <Zora />}
        </Flex>
      </Box>
    </CustomBox>
  )
}

export default NFTBlock
