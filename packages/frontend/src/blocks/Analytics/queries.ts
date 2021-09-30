import { gql } from '@apollo/client'

export const UniswapQuery = gql`
  query uniswapDayDatas($startTime: Int!) {
    uniswapDayDatas(
      first: 1000
      where: { date_gt: $startTime }
      orderBy: date
      orderDirection: asc
    ) {
      id
      date
      volumeUSD
      tvlUSD
    }
  }
`

export const SushiswapQuery = gql`
  query uniswapDayDatas($startTime: Int!) {
    uniswapDayDatas(
      first: 1000
      where: { date_gt: $startTime }
      orderBy: date
      orderDirection: asc
    ) {
      id
      date
      totalVolumeUSD
      dailyVolumeUSD
      dailyVolumeETH
      totalLiquidityUSD
      totalLiquidityETH
    }
  }
`
