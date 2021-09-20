import { Select } from '@chakra-ui/select'
import React from 'react'

interface Props {}

const DataTypeSelector = (props: Props) => {
  return (
    <Select
      w="75px"
      defaultValue="TVL"
      color="white"
      onChange={(event) => {
        console.log(event.target.value)
      }}
      alignContent="flex-start"
      justifyContent="center"
      border={'none'}
    >
      <option value="TVL">TVL</option>
      <option value="LQT">LQT</option>
    </Select>
  )
}

export default DataTypeSelector
