import { darken } from 'polished'
import React, { Dispatch, ReactNode, SetStateAction } from 'react'
import {
  Line,
  LineChart as LChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from 'recharts'
import { formatDollarAmount } from 'src/utils/numbers'
const DEFAULT_HEIGHT = 300

export type LineChartProps = {
  data: any[]
  latestPrice: string
  color?: string | undefined
  height?: number | undefined
  minHeight?: number
  setValue?: Dispatch<SetStateAction<string | undefined>>
  setParsedDate?: Dispatch<SetStateAction<string | undefined>>
  setLabel?: Dispatch<SetStateAction<string | undefined>>
  topLeft?: ReactNode | undefined
  topRight?: ReactNode | undefined
  bottomLeft?: ReactNode | undefined
  bottomRight?: ReactNode | undefined
} & React.HTMLAttributes<HTMLDivElement>

const LineChart = ({
  data,
  color = '#56B2A4',
  latestPrice,
  setValue,
  setParsedDate,
  setLabel,
  topLeft,
  topRight,
  bottomLeft,
  bottomRight,
  height = DEFAULT_HEIGHT,
  minHeight = DEFAULT_HEIGHT,
  parsedDate,
  selectedProtocol,
  ...rest
}: LineChartProps): JSX.Element => {
  const handleEnter = ({
    isTooltipActive,
    activePayload,
    activeTooltipIndex,
    activeLabel,
  }) => {
    // console.log(activePayload)
  }
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
        onMouseMove={(chartState, e) => {
          if (chartState['isTooltipActive']) {
            const tvl = chartState['activePayload']['0']['payload']['tvlUSD']

            setValue(formatDollarAmount(tvl))
            const dateTime =
              chartState['activePayload']['0']['payload']['parsedDate']
            setParsedDate(dateTime)
          }
        }}
      >
        {/* <CartesianGrid strokeDasharray="3 3" /> */}
        {/* <defs>
        <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
          <stop
            offset="5%"
            stopColor={darken(0.36, '#82ca9d')}
            stopOpacity={0.5}
          />
          <stop offset="100%" stopColor={'#82ca9d'} stopOpacity={0} />
        </linearGradient>
      </defs> */}
        <XAxis axisLine={false} tickLine={false} dataKey="parsedDay" />
        {/* <YAxis /> */}

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
