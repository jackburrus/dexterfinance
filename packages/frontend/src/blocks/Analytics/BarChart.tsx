import React from 'react'
import {
  BarChart as BChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { formatDollarAmount } from 'src/utils/numbers'
import { BarChartProps } from './types'

const BarChart: React.FC<BarChartProps> = (props) => {
  const { data, setValue, setParsedDate, selectedProtocol } = props

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BChart
        width={500}
        height={200}
        data={data}
        margin={{
          top: 5,
          right: 20,
          left: 20,
          bottom: 5,
        }}
        onMouseLeave={() => {
          setValue(formatDollarAmount(data[data.length - 1]['volumeUSD']))
          setParsedDate(null)
        }}
        onMouseMove={(chartState) => {
          if (chartState['isTooltipActive']) {
            const tvl = chartState['activePayload']['0']['payload']['volumeUSD']

            setValue(formatDollarAmount(tvl))
            const dateTime =
              chartState['activePayload']['0']['payload']['parsedDate']
            setParsedDate(dateTime)
          }
        }}
      >
        <XAxis dataKey="parsedDay" />

        <Tooltip cursor={false} contentStyle={{ display: 'none' }} />

        <Bar
          dataKey="volumeUSD"
          fill={selectedProtocol == 'Uniswap' ? '#2271E4' : '#82ca9d'}
        />
      </BChart>
    </ResponsiveContainer>
  )
}

export default BarChart
