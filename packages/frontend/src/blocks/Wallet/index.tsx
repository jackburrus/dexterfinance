import { Box, Center, Text } from '@chakra-ui/layout'
import React from 'react'

interface Props {}

const Wallet = (props) => {
  const { provided } = props
  return (
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
      <Center>
        <Text>Wallet Block</Text>
      </Center>
    </Box>
  )
}

export default Wallet
