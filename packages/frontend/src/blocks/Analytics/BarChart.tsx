import React, { useEffect } from 'react'
import {
  BarChart as BChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { formatDollarAmount } from 'src/utils/numbers'

interface BarChartDataType {
  date: number
  parsedDate: string
  parsedDay: string
  tvlUSD: number
  volumeUSD: number
}

interface Props {
  data: BarChartDataType[]
  setValue: (n: string) => void
  setParsedDate: (s: string) => void
  latestPrice: number
  setLatestPrice: () => void
  selectedProtocol: string
}

const BarChart = (props: Props) => {
  const {
    data,
    setValue,
    setParsedDate,
    latestPrice,
    setLatestPrice,
    selectedProtocol,
  } = props

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
          //   console.log(data)
          setValue(formatDollarAmount(data[data.length - 1]['volumeUSD']))
          setParsedDate(null)
        }}
        onMouseMove={(chartState, e) => {
          if (chartState['isTooltipActive']) {
            const tvl = chartState['activePayload']['0']['payload']['volumeUSD']

            setValue(formatDollarAmount(tvl))
            const dateTime =
              chartState['activePayload']['0']['payload']['parsedDate']
            setParsedDate(dateTime)
          }
        }}
      >
        {/* <CartesianGrid strokeDasharray="3 3" /> */}
        <XAxis dataKey="parsedDay" />
        {/* <YAxis /> */}
        {/* <Tooltip /> */}
        <Tooltip cursor={false} contentStyle={{ display: 'none' }} />
        {/* <Legend /> */}
        <Bar
          dataKey="volumeUSD"
          fill={selectedProtocol == 'Uniswap' ? '#2271E4' : '#82ca9d'}
        />
        {/* <Bar dataKey="uv" fill="#82ca9d" /> */}
      </BChart>
    </ResponsiveContainer>
  )
}

export default BarChart

const mockData = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
]
