import React, { useState } from 'react'
import { Button } from '@chakra-ui/button'
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/modal'
import { useDisclosure } from '@chakra-ui/hooks'
import { Input } from '@chakra-ui/react'
import Select from 'react-select'
import { Box, Flex, List, ListIcon, ListItem, Text } from '@chakra-ui/layout'
import { CryptoIcon } from './CryptoIcon'
import { Divider } from '@chakra-ui/react'
import {
  GeminiTokenList,
  Messari,
  MessariVerifiedTokenList,
  OptimismTokenList,
} from './TokenLists'
import TokenListRow from './TokenListRow'
import { useSelectedTokens } from '@recoil/hooks/useSelectedTokens'
const CommonBases = [
  { code: 'ETH' },
  { code: 'DAI' },
  { code: 'USDC' },
  { code: 'USDT' },
  { code: 'WBTC' },
  { code: 'WETH' },
]

const getTokenList = (selectedTokenList, tokenOrder, onClose) => {
  switch (selectedTokenList) {
    case 'GemeniTokenList': {
      return GeminiTokenList['tokens'].map((token, index) => {
        return (
          <TokenListRow
            key={token.symbol}
            code={token.symbol}
            name={token.name}
            tokenOrder={tokenOrder}
            onClose={onClose}
          />
        )
      })
    }
    case 'MessariVerifiedTokenList': {
      return MessariVerifiedTokenList['tokens'].map((token, index) => {
        return (
          <TokenListRow
            key={token.symbol}
            code={token.symbol}
            name={token.name}
            tokenOrder={tokenOrder}
            onClose={onClose}
          />
        )
      })
    }
    case 'OptimismTokenList': {
      return OptimismTokenList['tokens']
        .filter(
          (v, i, a) =>
            a.findIndex(
              (t) => t.symbol === v.symbol && t.symbol === v.symbol
            ) === i
        )
        .map((token, index) => {
          return (
            <TokenListRow
              key={token.symbol}
              code={token.symbol}
              name={token.name}
              tokenOrder={tokenOrder}
              onClose={onClose}
            />
          )
        })
    }
    default:
      return null
      break
  }
}

function CoinListModal({ isOpen, onOpen, onClose, tokenOrder }) {
  const [scrollBehavior, setScrollBehavior] = useState('inside')
  const [tokens, { setSelectedTokens }] = useSelectedTokens()
  const [selectedTokenList, setSelectedTokenList] = useState('GemeniTokenList')
  const btnRef = React.useRef()

  const handleTokenUpdate = (tok) => {
    if (tokenOrder === 'token0') {
      setSelectedTokens({ ...tokens, token0: tok.code })
    } else {
      setSelectedTokens({ ...tokens, token1: tok.code })
    }
  }

  const options = [
    { value: 'GemeniTokenList', label: 'Gemeni ' },
    { value: 'MessariVerifiedTokenList', label: 'Messari Verified ' },
    { value: 'OptimismTokenList', label: 'Optimism ' },
  ]

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      // borderBottom: '0.5px solid white',
      color: '#C3C5CB',
      backgroundColor: '#101318',
      fontWeight: 'bold',
      fontFamily: 'Inter',
    }),
    control: (provided) => ({
      ...provided,
      marginTop: '5%',
      backgroundColor: '#101318',
      borderWidth: 'none',
    }),
    menuList: (provided) => ({
      ...provided,
      backgroundColor: '#101318',
      borderRadius: '10px',
    }),
    container: (provided) => ({
      ...provided,
      width: '200px',
      height: '30px',
      fontSize: '12px',
      marginBottom: '5%',
      backgroundColor: '#101318',
      fontColor: 'white',
    }),
    placeholder: (provided) => ({
      ...provided,
      color: 'white',
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: '#101318',
      marginTop: '20px',
      width: '200px',
    }),
    // valueContainer: (provided) => ({
    //   ...provided,
    //   backgroundColor: 'orange',
    //   borderRadius: '10px',
    // }),
  }
  return (
    <>
      {/* <Button mt={3} ref={btnRef} onClick={onOpen}>
          Trigger modal
        </Button> */}

      <Modal
        onClose={onClose}
        finalFocusRef={btnRef}
        isOpen={isOpen}
        scrollBehavior={scrollBehavior}
      >
        <ModalOverlay />
        <ModalContent bg={'#191B1F'}>
          <ModalHeader>Select a token</ModalHeader>
          <Flex justify="center">
            <Input
              placeholder="Search name or paste address"
              h={55}
              borderRadius={'2xl'}
              w={'90%'}
              color={'#8F96AC'}
              _placeholder={{
                color: '#8F96AC',
                fontWeight: 'semibold',
              }}
            />
          </Flex>
          <Flex
            // justify="center"
            align="flex-start"
            // w={'90%'}
            ml={6}
            mr={5}
            mt={4}
            // border={'1px solid red'}
            flexDirection="column"
          >
            <Text>Common Bases</Text>
            <Flex mt={2} flexWrap="wrap">
              {CommonBases.map((base, index) => {
                return (
                  <Flex
                    key={index}
                    align="center"
                    justify="center"
                    bg={'#181C20'}
                    borderRadius="xl"
                    // border={'0.5px solid white'}
                    borderWidth={'0.1em'}
                    mt={'1'}
                    mb={1}
                    mr={1}
                    p={1}
                    pb={2}
                    pt={2}
                    as={'button'}
                    onClick={() => {
                      handleTokenUpdate(base)
                      onClose()
                    }}
                  >
                    <CryptoIcon iconSize={25} code={base.code} />
                    <Text color={'white'} mr={1}>
                      {base.code}
                    </Text>
                  </Flex>
                )
              })}
            </Flex>
          </Flex>
          <Divider mt={5} />
          <ModalCloseButton />
          <ModalBody>
            <Select
              onChange={(e) => {
                console.log(e)
                setSelectedTokenList(e.value)
              }}
              options={options}
              styles={customStyles}
              // components={{ Option: CustomOption }}
              // placeholder="Select Token List"
              // borderRadius={'2xl'}
              // fontSize="12px"
              // height={30}
              // variant="unstyled"
              // // style={{ border: '1px solid orange' }}
              // w={'50%'}
              // // placeholder={'Uniswap'}
              // color={'white'}
            >
              {/* <option value="GemeniTokenList">Gemeni Token List</option>
              <option value="MessariVerifiedTokenList">
                Messari Verified Token List
              </option>
              <option value="OptimismTokenList">Optimism Token List</option> */}
            </Select>
            <List spacing={3}>
              {getTokenList(selectedTokenList, tokenOrder, onClose)}
            </List>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
export default CoinListModal
