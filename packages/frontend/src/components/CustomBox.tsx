import { useColorMode } from '@chakra-ui/color-mode'
import { Box } from '@chakra-ui/layout'
import React from 'react'

export const CustomBox = ({ children }) => {
  const { colorMode } = useColorMode()
  return (
    <Box
      variant={'with-card'}
      w="500px"
      h="350px"
      d="flex"
      margin={'10'}
      justifyContent="flex-start"
      // border={'1px solid orange'}
      flexDirection="column"
      bg={colorMode == 'light' ? 'white' : '#181C20'}
      boxShadow={colorMode == 'light' ? '1px 0 15px 2px #b6bdca' : null}
      borderRadius={'3xl'}
      position="relative"
      overflow={'hidden'}
      p={2}
      // overflowY="auto"
      css={{
        '&::-webkit-scrollbar': {
          display: 'none',
          width: 0 /* Remove scrollbar space */,
          background:
            'transparent' /* Optional: just make scrollbar invisible */,
        },
        '&::-ms-overflow-style': 'none',
        // overflowY: 'hidden',
      }}
    >
      {children}
    </Box>
  )
}
