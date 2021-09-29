import { Flex, Text } from '@chakra-ui/layout'
import { useBlockNumber } from '@usedapp/core'
import React from 'react'
import { BsDot } from 'react-icons/bs'

interface Props {}

const BlockNumber = (props: Props) => {
  const blockNumber = useBlockNumber()

  return (
    <Flex
      // border={'1px solid orange'}
      flexDirection="row"
      align={'center'}
      justify="flex-end"
    >
      <Text fontSize="8" color={'limegreen'} fontFamily="Inter">
        {blockNumber}
      </Text>
      <BsDot
        size={'18px'}
        style={{ paddingRight: '4px' }}
        color={'limegreen'}
      />
    </Flex>
  )
}

export default BlockNumber
