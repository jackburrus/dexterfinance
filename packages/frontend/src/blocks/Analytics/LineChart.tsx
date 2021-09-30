import React from 'react'
import {
  Line,
  LineChart as LChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from 'recharts'
import { formatDollarAmount } from 'src/utils/numbers'
import { LineChartProps } from './types'

const LineChart: React.FC<LineChartProps> = ({
  data,
  latestPrice,
  setValue,
  setParsedDate,
  selectedProtocol,
}) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LChart
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
          setValue(latestPrice)
          setParsedDate(null)
        }}
        onMouseMove={(chartState) => {
          if (chartState['isTooltipActive']) {
            const tvl = chartState['activePayload']['0']['payload']['tvlUSD']

            setValue(formatDollarAmount(tvl))
            const dateTime =
              chartState['activePayload']['0']['payload']['parsedDate']
            setParsedDate(dateTime)
          }
        }}
      >
        <XAxis axisLine={false} tickLine={false} dataKey="parsedDay" />

        <Tooltip cursor={false} contentStyle={{ display: 'none' }} />

        <Line
          dot={false}
          type="monotone"
          dataKey="tvlUSD"
          stroke={selectedProtocol == 'Uniswap' ? '#FF007A' : '#FF8C24'}
        />
      </LChart>
    </ResponsiveContainer>
  )
}
export default LineChart
