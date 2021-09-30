import React, { Dispatch, SetStateAction } from 'react'
import LineChart from '../LineChart'

interface Props {
  setValue: Dispatch<SetStateAction<string | undefined>>
  latestPrice: string
  setParsedDate: Dispatch<SetStateAction<string | undefined>>

  selectedProtocol: string
}

const MainChart: React.FC<Props> = (props) => {
  const { setValue, latestPrice, setParsedDate, selectedProtocol } = props
  return (
    <LineChart
      data={chartData['data']}
      setValue={setValue}
      latestPrice={latestPrice}
      setParsedDate={setParsedDate}
      selectedProtocol={selectedProtocol}
    />
  )
}

export default MainChart
