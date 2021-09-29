import { SearchIcon } from '@chakra-ui/icons'
import {
  Box,
  Text,
  Center,
  chakra,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  useEventListener,
  useUpdateEffect,
  Input,
} from '@chakra-ui/react'
import { useBlocks, uuidv4 } from '@recoil/hooks/useBlocks'
// import searchData from "configs/search-meta.json"
// import { matchSorter } from "match-sorter"
import Link from 'next/link'
import { useRouter } from 'next/router'
import * as React from 'react'
import { BlockData } from 'src/constants/BlockData'
import { SearchButton } from '.'
import { useColorMode, useColorModeValue } from '@chakra-ui/color-mode'

// import MultiRef from "react-multi-ref"
// import scrollIntoView from "scroll-into-view-if-needed"
// import { findAll } from "highlight-words-core"
// import { SearchButton } from "./algolia-search"

function OptionText(props: any) {
  const { searchWords, textToHighlight } = props

  const chunks = findAll({
    searchWords,
    textToHighlight,
    autoEscape: true,
  })

  const highlightedText = chunks.map((chunk) => {
    const { end, highlight, start } = chunk
    const text = textToHighlight.substr(start, end - start)
    if (highlight) {
      return (
        <Box as="mark" bg="transparent" color="teal.500">
          {text}
        </Box>
      )
    } else {
      return text
    }
  })

  return highlightedText
}

function EnterIcon(props) {
  return (
    <chakra.svg
      strokeWidth="2px"
      width="16px"
      height="16px"
      viewBox="0 0 20 20"
      {...props}
    >
      <g
        stroke="currentColor"
        fill="none"
        fillRule="evenodd"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18 3v4c0 2-2 4-4 4H2" />
        <path d="M8 17l-6-6 6-6" />
      </g>
    </chakra.svg>
  )
}

function ModalSearch() {
  const router = useRouter()
  const [query, setQuery] = React.useState('')
  const [active, setActive] = React.useState(0)
  const menu = useDisclosure()
  const modal = useDisclosure()
  //   const [menuNodes] = React.useState(() => new MultiRef<number, HTMLElement>())
  const menuRef = React.useRef<HTMLDivElement>(null)
  const eventRef = React.useRef<'mouse' | 'keyboard'>(null)
  const [blockList, { addBlock, removeBlock }] = useBlocks()
  const [DisplayBlockData, setDisplayBlockData] = React.useState(BlockData)
  const { colorMode } = useColorMode()

  React.useEffect(() => {
    router.events.on('routeChangeComplete', modal.onClose)
    return () => {
      router.events.off('routeChangeComplete', modal.onClose)
    }
  }, [])

  useEventListener('keydown', (event) => {
    const isMac = /(Mac|iPhone|iPod|iPad)/i.test(navigator?.platform)
    const hotkey = isMac ? 'metaKey' : 'ctrlKey'
    if (event?.key?.toLowerCase() === 'k' && event[hotkey]) {
      event.preventDefault()
      setDisplayBlockData(BlockData)
      setActive(
        DisplayBlockData.findIndex((x) => x.title == DisplayBlockData[0].title)
      )
      modal.isOpen ? modal.onClose() : modal.onOpen()
    }
  })

  React.useEffect(() => {
    if (modal.isOpen && query.length > 0) {
      setQuery('')
      setDisplayBlockData(BlockData)
    }
  }, [modal.isOpen])
  // REMOVE THIS
  // React.useEffect(() => {
  //   modal.onToggle()
  //   setActive(0)
  // }, [])

  const results = React.useMemo(
    function getResults() {
      if (query.length < 2) return []
      //   return matchSorter(searchData, query, {
      //     keys: ["hierarchy.lvl1", "hierarchy.lvl2", "hierarchy.lvl3", "content"],
      //   }).slice(0, 20)
    },
    [query]
  )

  const onKeyDown = React.useCallback(
    (e: React.KeyboardEvent) => {
      eventRef.current = 'keyboard'
      switch (e.key) {
        case 'ArrowDown': {
          e.preventDefault()
          if (active + 1 <= DisplayBlockData.length) {
            setActive(active + 1)
            console.log(active)
          }
          break
        }
        case 'ArrowUp': {
          e.preventDefault()
          if (active - 1 >= 0) {
            setActive(active - 1)
          }
          break
        }
        case 'Enter': {
          modal.onClose()
          console.log(DisplayBlockData)
          // if (DisplayBlockData) {
          //   setActive(parseInt(DisplayBlockData[0].index))
          // }
          addBlock(DisplayBlockData[active])
          //   router.push(BlockData[active].url)
          break
        }
      }
    },
    [active, BlockData, router]
  )

  useUpdateEffect(() => {
    setActive(0)
    console.log(active)
  }, [query])

  useUpdateEffect(() => {
    if (!menuRef.current || eventRef.current === 'mouse') return
  }, [active])

  const open = menu.isOpen && BlockData.length > 0

  return (
    <>
      <SearchButton onClick={modal.onOpen} />
      <Modal
        scrollBehavior="inside"
        isOpen={modal.isOpen}
        onClose={modal.onClose}
      >
        <ModalOverlay />
        <ModalContent
          role="combobox"
          aria-expanded="true"
          aria-haspopup="listbox"
          rounded="lg"
          overflow="hidden"
          top="4vh"
          bg="transparent"
          shadow="lg"
          maxW="600px"
        >
          <Flex pos="relative" align="stretch" mb={2}>
            <Input
              variant="main"
              aria-autocomplete="list"
              autoComplete="off"
              autoCorrect="off"
              spellCheck="false"
              maxLength={64}
              sx={{
                w: '100%',
                h: '68px',
                pl: '68px',
                fontWeight: 'medium',
                outline: 0,
                bg: 'white',
                '.chakra-ui-dark &': { bg: 'gray.700' },
              }}
              placeholder="Search Blocks"
              value={query}
              onChange={(e) => {
                const newArray = BlockData.filter((d) => {
                  // console.log(e.target.value)
                  return (
                    d.title
                      .toLowerCase()
                      .indexOf(e.target.value.toLowerCase()) !== -1
                  )
                })

                setQuery(e.target.value)
                setDisplayBlockData(newArray)
                console.log(newArray)
                if (DisplayBlockData.length > 0) {
                  setActive(parseInt(newArray[0].index))
                }
                menu.onOpen()
              }}
              onKeyDown={onKeyDown}
            />
            <Center pos="absolute" left={7} h="68px">
              <SearchIcon color="teal.500" boxSize="20px" />
            </Center>
          </Flex>
          <ModalBody maxH="66vh" p="0" ref={menuRef}>
            <Box
              borderRadius={'10px'}
              sx={{
                px: 4,
                bg: 'white',
                '.chakra-ui-dark &': { bg: 'gray.700' },
              }}
            >
              <Box
                as="ul"
                role="listbox"
                // borderTopWidth="1px"
                pt={2}
                pb={4}
                borderRadius={'10px'}
              >
                {DisplayBlockData.map((item) => {
                  const selected = parseInt(item.index) === active

                  return (
                    <Box
                      key={item.index}
                      id={`search-item-${item.index}`}
                      as="li"
                      aria-selected={selected ? true : undefined}
                      cursor="pointer"
                      onMouseEnter={() => {
                        console.log(item.index)
                        setActive(parseInt(item.index))
                        eventRef.current = 'mouse'
                      }}
                      onClick={() => {
                        modal.onClose()
                        // console.log(BlockData[active])
                        // console.log(blockList)
                        addBlock(BlockData[active])
                      }}
                      //   ref={menuNodes.ref(index)}
                      role="option"
                      // bg={useColorModeValue('#DEE7F4', 'gray.700')}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        minH: 16,
                        // br: '10px',
                        mt: 3,
                        px: 4,
                        py: 2,
                        rounded: 'lg',
                        bg: 'gray.100',
                        '.chakra-ui-dark &': { bg: 'gray.600' },
                        '.chakra-ui-light &': { bg: '#DEE7F4' },
                        _selected: (props) => ({
                          bg: colorMode == 'dark' ? 'teal.500' : '#CBE3F9',

                          mark: {
                            color: 'white',
                            textDecoration: 'underline',
                          },
                        }),
                      }}
                    >
                      <Text color={useColorModeValue('#182C4A', 'white')}>
                        {item.title}
                      </Text>
                      <EnterIcon opacity={0.5} />
                    </Box>
                  )
                })}
              </Box>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ModalSearch
