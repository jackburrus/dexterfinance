import React from 'react'
import LineChart from '../LineChart'

interface Props {
  setValue: () => void
  latestPrice: string
  setParsedDate: () => void
  parsedDate: string
  selectedProtocol: string
}

const MainChart: React.FC<Props> = (props) => {
  const { setValue, latestPrice, setParsedDate, parsedDate, selectedProtocol } =
    props
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
