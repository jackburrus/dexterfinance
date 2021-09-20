import { gql, useQuery } from '@apollo/client'
import { ArrowDownIcon, ArrowUpIcon } from '@chakra-ui/icons'
import { Center } from '@chakra-ui/layout'
import {
  Divider,
  Flex,
  HStack,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import React, { useEffect, useMemo, useState } from 'react'
import { useSortBy, useTable } from 'react-table'
import { formatDollarAmount } from 'src/utils/numbers'
import { useDataClient } from './hooks/useClient'
import { useColorMode } from '@chakra-ui/color-mode'
import { CryptoIcon } from '@components/CryptoIcon'
// import { CryptoIcon } from '../Uniswap/CryptoIcon'

const getPercentChange = (
  valueNow: string | undefined,
  value24HoursAgo: string | undefined
): number => {
  if (valueNow && value24HoursAgo) {
    // console.log(valueNow, value24HoursAgo)
    const change =
      ((parseFloat(valueNow) - parseFloat(value24HoursAgo)) /
        parseFloat(value24HoursAgo)) *
      100
    if (isFinite(change)) return change
  }
  return 0
}

const TOP_TOKENS = gql`
  query topTokens($protocol: String!) {
    tokens(
      first: 50
      orderBy: $protocol
      orderDirection: desc
      subgraphError: allow
    ) {
      id
      name
      symbol
      totalValueLockedUSD
      tokenDayData(first: 2, orderBy: date, orderDirection: desc) {
        priceUSD
        date
        volumeUSD
      }
    }
  }

  #   query topPools {
  #     tokens(
  #       first: 50
  #       orderBy: totalValueLockedUSD
  #       orderDirection: desc
  #       subgraphError: allow
  #     ) {
  #       id
  #       name
  #       symbol
  #     }
  #   }
`

interface TopTokensResponse {
  tokens: {
    id: string
    name: string
    symbol: string
  }[]
}

interface Props {
  selectedProtocol: string
}

const TopTokens = (props: Props) => {
  const { selectedProtocol } = props
  const { colorMode } = useColorMode()
  const client = useDataClient(selectedProtocol)
  const { loading, error, data } = useQuery<TopTokensResponse>(TOP_TOKENS, {
    client: client,
    variables: {
      protocol:
        selectedProtocol == 'Uniswap' ? 'totalValueLockedUSD' : 'volume',
    },
  })
  const [tokens, setTokens] = useState([])

  const cols = useMemo(
    () => [
      {
        Header: '#',
        accessor: 'index',

        Cell: (props) => {
          return (
            <Flex
              // pl={2}
              // ml={2}
              align="flex-end"
              justify="center"
            >
              <Text fontWeight={'light'} color={'white'}>
                {props.row.index + 1}
              </Text>
            </Flex>
          )
        },

        // accessor is the "key" in the data
      },
      {
        Header: 'Name',
        accessor: 'name',

        Cell: (props) => {
          // console.log(props)
          return (
            <Flex align="center" w={275}>
              <CryptoIcon iconSize={20} code={props.row.original.symbol} />
              <Text fontWeight={'semibold'} color={'white'}>
                {props.value}
              </Text>
              <Text fontWeight={'semibold'} color={'grey'} pl={2}>
                ({props.row.original.symbol})
              </Text>
            </Flex>
          )
        }, // accessor is the "key" in the data
      },

      {
        Header: 'Price',
        accessor: 'tokenDayData[0].priceUSD',
        // Cell: (props) => <div>{parseInt(props.value).toFixed(2)}</div>,
        // TODO: #3 add Chakra text component so this looks better on darkmode @jackburrus
        Cell: (props) => (
          <Text fontWeight={'light'} color={'white'}>
            {formatDollarAmount(props.value)}
          </Text>
        ),
      },
      {
        Header: '% Change',
        accessor: 'tokenDayData',
        // Cell: (props) => <div>{parseInt(props.value).toFixed(2)}</div>,
        Cell: (props) => {
          const percentageChange = getPercentChange(
            props.value[0].priceUSD,
            props.value[1].priceUSD
          )
          return (
            <HStack>
              {percentageChange >= 0 ? (
                <ArrowUpIcon
                  color={percentageChange >= 0 ? 'green.500' : 'red.500'}
                />
              ) : (
                <ArrowDownIcon
                  color={percentageChange >= 0 ? 'green.500' : 'red.500'}
                />
              )}
              <Text color={percentageChange >= 0 ? 'green.500' : 'red.500'}>
                {percentageChange.toFixed(2)}
              </Text>
            </HStack>
          )
        },
      },
      {
        Header: 'Volume',
        accessor: 'tokenDayData[0].volumeUSD',
        // Cell: (props) => <div>{parseInt(props.value).toFixed(2)}</div>,
        Cell: (props) => <div>{formatDollarAmount(props.value)}</div>,
      },
      {
        Header: 'TVL',
        accessor: 'totalValueLockedUSD',
        // Cell: (props) => <div>{parseInt(props.value).toFixed(2)}</div>,
        Cell: (props) => <div>{formatDollarAmount(props.value)}</div>,
      },
    ],
    []
  )
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns: cols, data: tokens }, useSortBy)

  useEffect(() => {
    if (data) {
      setTokens(data.tokens)
    }
  }, [data])

  return !data ? (
    <Center flex={1}>
      <Spinner />
    </Center>
  ) : (
    <Flex
      variant="simple"
      height={'400px'}
      // border={'1px solid cyan'}
      overflowY="scroll"
      overflowX={'auto'}
    >
      <Table size={'sm'} mt={3} cellSpacing={'1px'}>
        <Thead>
          {headerGroups.map((headerGroup, index) => (
            <Tr key={index} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => {
                console.log(column)
                return (
                  // eslint-disable-next-line react/jsx-key
                  <Th
                    // position="sticky"
                    top={0}
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    flexDirection={'row'}
                  >
                    <Flex
                      direction={'row'}
                      ml={column.Header == '#' ? 4 : null}
                    >
                      {column.render('Header')}
                      <Flex>
                        {column.isSorted ? (
                          column.isSortedDesc ? (
                            <ArrowDownIcon color={'white'} w={3} h={3} />
                          ) : (
                            <ArrowUpIcon color={'white'} w={3} h={3} />
                          )
                        ) : null}
                      </Flex>
                    </Flex>
                  </Th>
                )
              })}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            // console.log(row)
            prepareRow(row)
            return (
              // eslint-disable-next-line react/jsx-key
              <Tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  console.log(cell)
                  return (
                    // eslint-disable-next-line react/jsx-key
                    <Td
                      style={{
                        paddingRight: cell.column.Header === '#' ? '0px' : null,
                        paddingLeft:
                          cell.column.Header === 'Name' ? '0px' : null,
                      }}
                      {...cell.getCellProps()}
                    >
                      {cell.render('Cell')}
                    </Td>
                  )
                })}
                <Divider />
              </Tr>
            )
          })}
          {/* {isValidating && orders.length < 1 && <Spinner m={4} />} */}
        </Tbody>
      </Table>
    </Flex>
  )
}

export default TopTokens
