import { Box, Flex } from '@chakra-ui/layout'
import { Select } from '@chakra-ui/react'
import CloseButton from '@components/CloseButton'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import { useEffect, useState } from 'react'
import { formatDollarAmount } from 'src/utils/numbers'
import BarChart from './BarChart'
import { useDataClient } from './useClient'
import LineChart from './LineChart'
import ProtocolDropDown from './ProtocolDropDown'
import TopTokens from './TopTokens'
import { formatChartData } from './utils'
import ValueAndDate from './ValueAndDate'
import { useColorMode } from '@chakra-ui/color-mode'
import { CustomBox } from '@components/CustomBox'
import { AnalyticsBlockTypes } from './types'
import { SushiswapQuery, UniswapQuery } from './queries'
import { SushiswapDataOptions, UniswapDataOptions } from './constants'

export function unixToDate(unix: number, format = 'YYYY-MM-DD'): string {
  return dayjs.unix(unix).utc().format(format)
}

dayjs.extend(utc)
dayjs.extend(weekOfYear)

const startTimestamp = 1619170975

const AnalyticsBlock: React.FC<AnalyticsBlockTypes> = ({ uuid }) => {
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
        setProtocolDataOptions(SushiswapDataOptions)
        break
      default:
        setProtocolDataOptions(UniswapDataOptions)
        break
    }
  }

  const getData = async () => {
    const result = await client.query({
      query: selectedProtocol == 'Uniswap' ? UniswapQuery : SushiswapQuery,
      variables: { startTime: startTimestamp },
      fetchPolicy: 'cache-first',
    })

    return result
  }

  useEffect(() => {
    getData().then((res) => {
      if (selectedProtocol === 'Uniswap') {
        const newChartData = formatChartData(res['data'], 'tvlUSD', 'volumeUSD')

        setNewChartData(newChartData)
      } else if (selectedProtocol === 'Sushiswap') {
        const newChartData = formatChartData(
          res['data'],
          'totalLiquidityUSD',
          'dailyVolumeUSD'
        )

        setNewChartData(newChartData)
      }
    })

    changeSelectedDataTypes(selectedProtocol)
    console.log('running')
  }, [selectedProtocol])

  const handleProtocolChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        <Flex ml={15}>
          <Select
            onChange={handleDataTypeChange}
            fontSize="12px"
            height={30}
            variant="unstyled"
            color={colorMode == 'light' ? 'grey' : 'white'}
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
          activeDataType == 'Total Volume Locked' ||
          activeDataType == 'Liquidity'
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
    </CustomBox>
  )
}

export default AnalyticsBlock
