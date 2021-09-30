import { Text } from '@chakra-ui/layout'
import React from 'react'
import dayjs from 'dayjs'
import { useColorMode } from '@chakra-ui/color-mode'
interface Props {
  value: string
  parsedDate: string
}

const ValueAndDate: React.FC<Props> = (props) => {
  const { colorMode } = useColorMode()
  const { value, parsedDate } = props
  const monthAndDay = dayjs(parsedDate).format('MMM D, YYYY')
  return (
    <>
      <Text
        fontSize={32}
        fontWeight="bold"
        color={colorMode == 'light' ? '#5B5F69' : 'white'}
      >
        {!value ? null : value}
      </Text>
      <Text
        fontSize={14}
        fontWeight="bold"
        color={colorMode == 'light' ? '#5B5F69' : 'white'}
        pb={10}
      >
        {!parsedDate ? null : monthAndDay + ' UTC'}
      </Text>
    </>
  )
}

export default ValueAndDate
