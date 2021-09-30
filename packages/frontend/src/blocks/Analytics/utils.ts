// import { useState, useEffect } from 'react'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import gql from 'graphql-tag'
import { unixToDate } from '.'
import { ChartDayData } from './types'
dayjs.extend(utc)
dayjs.extend(weekOfYear)

const ONE_DAY_UNIX = 24 * 60 * 60

function unixToDay(unix: number, format = 'DD'): string {
  return dayjs.unix(unix).utc().format(format)
}

export const GLOBAL_CHART = gql`
  query uniswapDayDatas($startTime: Int!, $skip: Int!) {
    uniswapDayDatas(
      first: 1000
      skip: $skip
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
const endTimestamp = dayjs.utc().unix()
const startTimestamp = 1619170975

export const formatChartData = (data, tvlKey, volKey) => {
  const formattedExisting = data['uniswapDayDatas'].reduce(
    (accum: { [date: number]: ChartDayData }, dayData) => {
      const roundedDate = parseInt((dayData.date / ONE_DAY_UNIX).toFixed(0))
      accum[roundedDate] = {
        date: dayData.date,
        // volumeUSD: parseFloat(dayData.volumeUSD),
        volumeUSD: parseFloat(dayData[volKey]),
        // tvlUSD: parseFloat(dayData.tvlUSD),
        tvlUSD: parseFloat(dayData[tvlKey]),
        parsedDate: unixToDate(dayData.date),
        parsedDay: unixToDay(dayData.date),
      }
      return accum
    },
    {}
  )
  const firstEntry =
    formattedExisting[parseInt(Object.keys(formattedExisting)[0])]

  // fill in empty days ( there will be no day datas if no trades made that day )
  let timestamp = firstEntry?.date ?? startTimestamp
  let latestTvl = firstEntry?.tvlUSD ?? 0

  while (timestamp < endTimestamp - ONE_DAY_UNIX) {
    const nextDay = timestamp + ONE_DAY_UNIX
    const currentDayIndex = parseInt((nextDay / ONE_DAY_UNIX).toFixed(0))
    if (!Object.keys(formattedExisting).includes(currentDayIndex.toString())) {
      formattedExisting[currentDayIndex] = {
        date: nextDay,
        volumeUSD: 0,
        tvlUSD: latestTvl,
      }
    } else {
      latestTvl = formattedExisting[currentDayIndex].tvlUSD
    }
    timestamp = nextDay
  }

  const dateMap = Object.keys(formattedExisting).map((key) => {
    return formattedExisting[parseInt(key)]
  })

  return {
    data: dateMap,
    error: false,
  }
}

export const formatSushiChartData = (data) => {
  const formattedExisting = data['uniswapDayDatas'].reduce(
    (accum: { [date: number]: ChartDayData }, dayData) => {
      const roundedDate = parseInt((dayData.date / ONE_DAY_UNIX).toFixed(0))
      accum[roundedDate] = {
        date: dayData.date,
        volumeUSD: parseFloat(dayData.dailyVolumeUSD),
        tvlUSD: parseFloat(dayData.totalLiquidityUSD),
        parsedDate: unixToDate(dayData.date),
        parsedDay: unixToDay(dayData.date),
      }
      return accum
    },
    {}
  )
  const firstEntry =
    formattedExisting[parseInt(Object.keys(formattedExisting)[0])]

  // fill in empty days ( there will be no day datas if no trades made that day )
  let timestamp = firstEntry?.date ?? startTimestamp
  let latestTvl = firstEntry?.tvlUSD ?? 0

  while (timestamp < endTimestamp - ONE_DAY_UNIX) {
    const nextDay = timestamp + ONE_DAY_UNIX
    const currentDayIndex = parseInt((nextDay / ONE_DAY_UNIX).toFixed(0))
    if (!Object.keys(formattedExisting).includes(currentDayIndex.toString())) {
      formattedExisting[currentDayIndex] = {
        date: nextDay,
        volumeUSD: 0,
        tvlUSD: latestTvl,
      }
    } else {
      latestTvl = formattedExisting[currentDayIndex].tvlUSD
    }
    timestamp = nextDay
  }

  const dateMap = Object.keys(formattedExisting).map((key) => {
    return formattedExisting[parseInt(key)]
  })

  return {
    data: dateMap,
    error: false,
  }
}
