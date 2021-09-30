import { Dispatch, SetStateAction } from 'react'
import { NewsResponseType } from './types'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const fetchNews = async (
  setNewsFeed: Dispatch<SetStateAction<NewsResponseType[] | undefined>>
) => {
  const url = `https://min-api.cryptocompare.com/data/v2/news/?lang=EN`
  const data = await fetch(url, {
    method: 'POST',
    headers: {
      authorization: process.env.CryptoCompareKey,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
  const dataJson = data.json()['Data']

  setNewsFeed(dataJson)
}
