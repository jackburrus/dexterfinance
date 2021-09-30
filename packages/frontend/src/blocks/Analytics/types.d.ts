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
  setLatestPrice: Dispatch<SetStateAction<string | undefined>>
  selectedProtocol: string
}

export type LineChartProps = {
  data: any[]
  latestPrice: string
  setValue?: Dispatch<SetStateAction<string | undefined>>
  setParsedDate?: Dispatch<SetStateAction<string | undefined>>
  parsedDate: string
  selectedProtocol: string
} & React.HTMLAttributes<HTMLDivElement>

export interface ProtocolDropDownTypes {
  onProtocolChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  selectedProtocol: string
}

export interface TopTokensResponse {
  tokens: {
    id: string
    name: string
    symbol: string
  }[]
}

export interface TopTokenProps {
  selectedProtocol: string
}

export interface AnalyticsBlockTypes {
  uuid: string
}
