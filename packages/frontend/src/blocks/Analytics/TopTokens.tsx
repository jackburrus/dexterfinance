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
import { useDataClient } from './useClient'
import { useColorMode } from '@chakra-ui/color-mode'
import { CryptoIcon } from '@components/CryptoIcon'
import { TopTokenProps, TopTokensResponse } from './types'

const getPercentChange = (
  valueNow: string | undefined,
  value24HoursAgo: string | undefined
): number => {
  if (valueNow && value24HoursAgo) {
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
`

const TopTokens: React.FC<TopTokenProps> = (props) => {
  const { selectedProtocol } = props
  const { colorMode } = useColorMode()
  const client = useDataClient(selectedProtocol)
  const { data } = useQuery<TopTokensResponse>(TOP_TOKENS, {
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
            <Flex align="flex-end" justify="center">
              <Text
                fontWeight={'light'}
                color={colorMode == 'light' ? 'black' : 'white'}
              >
                {props.row.index + 1}
              </Text>
            </Flex>
          )
        },
      },
      {
        Header: 'Name',
        accessor: 'name',

        Cell: (props) => {
          return (
            <Flex align="center" w={275}>
              <CryptoIcon iconSize={20} code={props.row.original.symbol} />
              <Text
                fontWeight={'semibold'}
                color={colorMode == 'light' ? 'black' : 'white'}
              >
                {props.value}
              </Text>
              <Text fontWeight={'semibold'} color={'grey'} pl={2}>
                ({props.row.original.symbol})
              </Text>
            </Flex>
          )
        },
      },

      {
        Header: 'Price',
        accessor: 'tokenDayData[0].priceUSD',

        Cell: (props) => (
          <Text
            fontWeight={'light'}
            color={colorMode == 'light' ? 'black' : 'white'}
          >
            {formatDollarAmount(props.value)}
          </Text>
        ),
      },
      {
        Header: '% Change',
        accessor: 'tokenDayData',

        Cell: (props) => {
          const percentageChange = getPercentChange(
            props.value[0].priceUSD,
            props.value[1].priceUSD
          )
          return (
            <HStack w={20}>
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

        Cell: (props) => <div>{formatDollarAmount(props.value)}</div>,
      },
      {
        Header: 'TVL',
        accessor: 'totalValueLockedUSD',

        Cell: (props) => <div>{formatDollarAmount(props.value)}</div>,
      },
    ],
    [colorMode]
  )
  const { getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    { columns: cols, data: tokens },
    useSortBy
  )

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
      overflowY="scroll"
      overflowX={'auto'}
    >
      <Table size={'sm'} mt={3} cellSpacing={'1px'}>
        <Thead>
          {headerGroups.map((headerGroup, index) => (
            <Tr key={index} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, index) => {
                console.log(column)
                return (
                  <Th
                    key={index}
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
                            <ArrowDownIcon
                              color={colorMode == 'light' ? 'black' : 'white'}
                              w={3}
                              h={3}
                            />
                          ) : (
                            <ArrowUpIcon
                              color={colorMode == 'light' ? 'black' : 'white'}
                              w={3}
                              h={3}
                            />
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
            prepareRow(row)
            return (
              <Tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  console.log(cell)
                  return (
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
