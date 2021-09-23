import { CloseIcon } from '@chakra-ui/icons'
import { Box } from '@chakra-ui/layout'
import { useBlocks } from '@recoil/hooks/useBlocks'
import React, { useState } from 'react'

interface Props {
  blockID: string
}

const CloseButton = (props: Props) => {
  const { blockID } = props
  const [isHovered, setIsHovered] = useState(false)
  const [blockList, { addBlock, removeBlock, clearAllBlocks, moveBlocks }] =
    useBlocks()
  //   console.log(blockID)
  return (
    <Box
      d={'flex'}
      flex={1}
      justifyContent="center"
      alignItems={'center'}
      // border={'1px solid green'}
    >
      {isHovered ? (
        <CloseIcon
          //   style={{ border: '1px solid orange' }}
          position={'fixed'}
          as={'button'}
          //   onMouseEnter={() => console.log(blockID)}
          top={3}
          left={3}
          color="white"
          margin={3}
          w={'3'}
          h={'3'}
        />
      ) : null}

      <Box
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => removeBlock({}, blockID)}
        position={'fixed'}
        top={0}
        zIndex={1}
        left={-5}
        h={70}
        w={70}
        // border={'1px solid magenta'}
      />
    </Box>
  )
}

export default CloseButton
