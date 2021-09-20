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
