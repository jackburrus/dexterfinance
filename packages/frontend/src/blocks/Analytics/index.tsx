import { gql, useQuery } from '@apollo/client'
import { Box, Flex } from '@chakra-ui/layout'
import { Select, Text } from '@chakra-ui/react'
import CloseButton from '@components/CloseButton'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import { useEffect, useState } from 'react'
import { formatDollarAmount } from 'src/utils/numbers'
import BarChart from './BarChart'
import { useDataClient } from './hooks/useClient'
import LineChart from './LineChart'
import ProtocolDropDown from './ProtocolDropDown'
import TopTokens from './TopTokens'
import { formatChartData } from './utils'
import ValueAndDate from './ValueAndDate'
import { useColorMode } from '@chakra-ui/color-mode'
import { CustomBox } from '@components/CustomBox'

export function unixToDate(unix: number, format = 'YYYY-MM-DD'): string {
  return dayjs.unix(unix).utc().format(format)
}

dayjs.extend(utc)
dayjs.extend(weekOfYear)

const UniswapQuery = gql`
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

const SushiswapQuery = gql`
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

const startTimestamp = 1619170975

const UniswapDataOptions = [
  {
    id: 0,
    dataType: 'Total Volume Locked',
    abbreviation: 'TVL',
  },
  {
    id: 1,
    dataType: 'Volume 24H',
    abbreviation: 'VOL',
  },
  {
    id: 2,
    dataType: 'Top Tokens',
    abbreviation: 'TPTK',
  },
]

const SushiswapDataOptions = [
  {
    id: 0,
    dataType: 'Liquidity',
    abbreviation: 'LQT',
  },
  {
    id: 1,
    dataType: 'Volume 24H',
    abbreviation: 'VOL',
  },
  {
    id: 2,
    dataType: 'Top Tokens',
    abbreviation: 'TPTK',
  },
]

const AnalyticsBlock = ({ provided, uuid }) => {
  const { loading, error, data } = useQuery(UniswapQuery, {
    variables: { startTime: startTimestamp },
  })

  const [chartData, setChartData] = useState(null)
  const [latestPrice, setLatestPrice] = useState(null)
  const [value, setValue] = useState<string | undefined>(
    latestPrice ? latestPrice : undefined
  )
  const { colorMode } = useColorMode()
  const [parsedDate, setParsedDate] = useState(null)
  const [selectedProtocol, setSelectedProtocol] = useState('Uniswap')
  const [protocolDataOptions, setProtocolDataOptions] =
    useState(UniswapDataOptions)
  const [activeDataType, setActiveDataType] = useState('Total Volume Locked')

  const client = useDataClient(selectedProtocol)

  const setNewChartData = (newChartData) => {
    setValue(
      formatDollarAmount(
        newChartData['data'][newChartData['data'].length - 1]['tvlUSD']
      )
    )

    // console.log('hello')
    // console.log(
    //   formatDollarAmount(
    //     newChartData['data'][newChartData['data'].length - 1]['VolumeUSD']
    //   )
    // )
    setLatestPrice(
      formatDollarAmount(
        newChartData['data'][newChartData['data'].length - 1]['tvlUSD']
      )
    )

    setChartData(newChartData)
  }

  const changeSelectedDataTypes = (protocol) => {
    switch (protocol) {
      case 'Uniswap':
        setProtocolDataOptions(UniswapDataOptions)
        break
      case 'Sushiswap':
        // console.log(SushiswapDataOptions)
        setProtocolDataOptions(SushiswapDataOptions)
        break
      default:
        setProtocolDataOptions(UniswapDataOptions)
        break
    }
  }

  useEffect(() => {
    const getData = async () => {
      const result = await client.query({
        query: selectedProtocol == 'Uniswap' ? UniswapQuery : SushiswapQuery,
        variables: { startTime: startTimestamp },
        fetchPolicy: 'cache-first',
      })

      return result
    }
    getData().then((res) => {
      // console.log(res)
      if (selectedProtocol === 'Uniswap') {
        const newChartData = formatChartData(res['data'], 'tvlUSD', 'volumeUSD')
        // console.log(newChartData)
        setNewChartData(newChartData)
      } else if (selectedProtocol === 'Sushiswap') {
        const newChartData = formatChartData(
          res['data'],
          'totalLiquidityUSD',
          'dailyVolumeUSD'
        )
        // console.log(newChartData)
        setNewChartData(newChartData)
      }
    })

    changeSelectedDataTypes(selectedProtocol)
  }, [selectedProtocol])

  const handleChange = (e) => {
    console.log(e)
  }

  const handleProtocolChange = (e) => {
    setSelectedProtocol(e.target.value)
  }

  const handleDataTypeChange = (e) => {
    console.log(e.target.value)
    setActiveDataType(e.target.value)
  }

  useEffect(() => {
    if (selectedProtocol === 'Sushiswap' && activeDataType === 'Top Tokens') {
      setActiveDataType('Liquidity')
    }
  }, [selectedProtocol, activeDataType])

  return !chartData ? null : (
    <CustomBox>
      <CloseButton blockID={uuid} />
      <Box
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
        pr={15}
        pt={'10px'}
        pl={15}
        borderRadius={'3xl'}
      >
        {/* <DataTypeSelector /> */}
        <Flex ml={15}>
          <Select
            onChange={handleDataTypeChange}
            fontSize="12px"
            height={30}
            variant="unstyled"
            color={'white'}
          >
            {protocolDataOptions.map((dataOption) => {
              return (
                <option key={dataOption.id} value={dataOption.dataType}>
                  {dataOption.abbreviation}
                </option>
              )
            })}
          </Select>
        </Flex>

        <Flex>
          <ProtocolDropDown
            onProtocolChange={handleProtocolChange}
            selectedProtocol={selectedProtocol}
          />
        </Flex>
      </Box>
      {activeDataType != 'Top Tokens' ? (
        <Box height={'80px'} pl={25}>
          <ValueAndDate value={value} parsedDate={parsedDate} />
        </Box>
      ) : null}

      {(() => {
        if (activeDataType === 'Volume 24H') {
          return (
            <BarChart
              data={chartData['data']}
              setValue={setValue}
              setParsedDate={setParsedDate}
              latestPrice={latestPrice}
              setLatestPrice={setLatestPrice}
              selectedProtocol={selectedProtocol}
            />
          )
        } else if (
          (activeDataType == 'Total Volume Locked') |
          (activeDataType == 'Liquidity')
        ) {
          return (
            <LineChart
              data={chartData['data']}
              setValue={setValue}
              latestPrice={latestPrice}
              setParsedDate={setParsedDate}
              parsedDate={parsedDate}
              selectedProtocol={selectedProtocol}
            />
          )
        } else if (activeDataType == 'Top Tokens') {
          return <TopTokens selectedProtocol={selectedProtocol} />
        } else {
          return <div style={{ color: 'white' }}>catch all</div>
        }
      })()}

      {/* {activeDataType === 'Volume 24H' ? (
        <BarChart
          data={chartData['data']}
          setValue={setValue}
          setParsedDate={setParsedDate}
          latestPrice={latestPrice}
          setLatestPrice={setLatestPrice}
          selectedProtocol={selectedProtocol}
        />
      ) : (
        <LineChart
          data={chartData['data']}
          setValue={setValue}
          latestPrice={latestPrice}
          setParsedDate={setParsedDate}
          parsedDate={parsedDate}
          selectedProtocol={selectedProtocol}
        />
      )} */}
    </CustomBox>
  )
}

export default AnalyticsBlock
