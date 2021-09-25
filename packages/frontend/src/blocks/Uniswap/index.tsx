import { useEffect, useState } from 'react'
import { ArrowDownIcon, SettingsIcon } from '@chakra-ui/icons'
import { Box, Flex, Spacer, Text } from '@chakra-ui/layout'
import PopoverOnBlock from '@components/Popover'
import { useSelectedTokens } from '@recoil/hooks/useSelectedTokens'
import Image from 'next/image'
import FormInput from './FormInput'
import { useEthers } from '@usedapp/core'
import CloseButton from '@components/CloseButton'

const getButtonText = (account, token0Amount, token1Amount) => {
  if (!account) {
    return 'Connect Wallet'
  } else if (!token0Amount && !token1Amount) {
    return 'Please input a value'
  } else {
    return 'SWAP'
  }
}

const UniswapBlock = (props) => {
  const { provided, uuid } = props
  const [tokens, { setSelectedTokens }] = useSelectedTokens()
  const { account, chainId, library } = useEthers()
  const [token0Amount, setToken0Amount] = useState(null)
  const [token1Amount, setToken1Amount] = useState(null)

  // useEffect(() => {
  //   // setSelectedTokens({ token0: 'ALCHI', token1: 'BLIMP' })
  //   console.log(account)
  // }, [tokens])

  return (
    <Box
      w="500px"
      h="350px"
      d="flex"
      justifyContent="center"
      flexDirection="column"
      margin={'10'}
      // mt={'10'}
      // mb={'10'}
      bg={'#181C20'}
      borderRadius={'3xl'}
      position="relative"
    >
      <CloseButton blockID={uuid} />
      <Flex mr={10} ml={5}>
        <Image
          src={require('../../../../../node_modules/cryptocurrency-icons/svg/color/uni.svg')}
          width={30}
          height={30}
        />
        <Text fontWeight="semibold" color={'white'} p={4}>
          Swap
        </Text>
        <Spacer />
        {/* <Flex justify="center" align="center">
          <SettingsIcon w={5} h={5} color="white" />
        </Flex> */}
      </Flex>
      <Flex
        flex={1}
        m={'2'}
        flexDirection="column"
        alignItems="center"
        justify="space-around"
        position="relative"
      >
        <Box
          position="absolute"
          bg={'#212529'}
          borderRadius="xl"
          border="5px solid #181C20"
          onClick={() => {
            setSelectedTokens({
              token0: tokens['token1'],
              token1: tokens['token0'],
            })
          }}
        >
          <ArrowDownIcon margin={1} color="white" />
        </Box>
        <FormInput
          tokenOrder={'token0'}
          token0Amount={token0Amount}
          setToken0Amount={setToken0Amount}
        />
        <FormInput
          tokenOrder={'token1'}
          token1Amount={token0Amount}
          setToken1Amount={setToken0Amount}
        />
      </Flex>
      <Flex
        h={65}
        justify="center"
        align="center"
        m={'2'}
        borderRadius={'2xl'}
        bg="#192A43"
        as="button"
      >
        <Text fontWeight="semibold" color="#448BF0">
          {getButtonText(account, token0Amount, token1Amount)}
        </Text>
      </Flex>

      {/* <PopoverOnBlock /> */}
    </Box>
  )
}

export default UniswapBlock
