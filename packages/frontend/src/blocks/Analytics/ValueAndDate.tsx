import { Text } from '@chakra-ui/layout'
import React from 'react'
import dayjs from 'dayjs'
interface Props {
  value: string
  parsedDate: string
}

const ValueAndDate = (props: Props) => {
  const { value, parsedDate } = props
  const monthAndDay = dayjs(parsedDate).format('MMM D, YYYY')
  return (
    <>
      <Text fontSize={32} fontWeight="bold" color={'white'}>
        {!value ? null : value}
      </Text>
      <Text fontSize={14} fontWeight="bold" color={'white'} pb={10}>
        {!parsedDate ? null : monthAndDay + ' UTC'}
      </Text>
    </>
  )
}

export default ValueAndDate
