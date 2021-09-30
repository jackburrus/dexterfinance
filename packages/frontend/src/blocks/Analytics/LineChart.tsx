import React, { Dispatch, ReactNode, SetStateAction } from 'react'
import {
  Line,
  LineChart as LChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from 'recharts'
import { formatDollarAmount } from 'src/utils/numbers'

export type LineChartProps = {
  data: any[]
  latestPrice: string
  color?: string | undefined
  height?: number | undefined
  minHeight?: number
  setValue?: Dispatch<SetStateAction<string | undefined>>
  setParsedDate?: Dispatch<SetStateAction<string | undefined>>
  setLabel?: Dispatch<SetStateAction<string | undefined>>
  selectedProtocol: string
  parsedDate: string
  topLeft?: ReactNode | undefined
  topRight?: ReactNode | undefined
  bottomLeft?: ReactNode | undefined
  bottomRight?: ReactNode | undefined
} & React.HTMLAttributes<HTMLDivElement>

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
