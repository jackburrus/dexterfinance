import React from 'react'
import LineChart from '../LineChart'

interface Props {}

const MainChart = (props: Props) => {
  const {
    data,
    setValue,
    latestPrice,
    setParsedDate,
    parsedDate,
    selectedProtocol,
  } = props
  return (
    <LineChart
      data={chartData['data']}
      setValue={setValue}
      latestPrice={latestPrice}
      setParsedDate={setParsedDate}
      parsedDate={parsedDate}
      selectedProtocol={selectedProtocol}
    />
  )
}

export default MainChart
