export interface ChartDayData {
  date: number
  volumeUSD: number
  tvlUSD: number
  parsedDate: string
  parsedDay: string
}
export interface ChartResults {
  uniswapDayDatas: {
    date: number
    volumeUSD: string
    tvlUSD: string
  }[]
}
// Remove if can't find need for it anywhere
export interface BarChartDataType {
  date: number
  parsedDate: string
  parsedDay: string
  tvlUSD: number
  volumeUSD: number
}

export interface BarChartProps {
  data: BarChartDataType[]
  setValue: (n: string) => void
  setParsedDate: (s: string) => void
  latestPrice: number
  setLatestPrice: () => void
  selectedProtocol: string
}

export type LineChartProps = {
  data: any[]
  latestPrice: string
  setValue?: Dispatch<SetStateAction<string | undefined>>
  setParsedDate?: Dispatch<SetStateAction<string | undefined>>
  selectedProtocol: string
} & React.HTMLAttributes<HTMLDivElement>

export interface ProtocolDropDownTypes {
  onProtocolChange: () => void
  selectedProtocol: string
}
