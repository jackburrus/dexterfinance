import { useColorMode } from '@chakra-ui/color-mode'
import { CopyIcon, ExternalLinkIcon } from '@chakra-ui/icons'
import { Box, Center, Flex, List, Text } from '@chakra-ui/layout'
import { Spinner, useToast } from '@chakra-ui/react'
import CloseButton from '@components/CloseButton'
import { CustomBox } from '@components/CustomBox'
import Image from 'next/image'
import { File, NFTStorage } from 'nft.storage'
import React, { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { FaFile } from 'react-icons/fa'
import { IoFolderOpen } from 'react-icons/io5'
import { openInNewTab } from '../NFT/NFTTypes/BAYC'
const client = new NFTStorage({ token: process.env.NFTStorage })
// Deploy again
function shortUrl(url, l) {
  var l = typeof l != 'undefined' ? l : 30
  const chunk_l = l / 2
  var url = url.replace('http://', '').replace('https://', '')

  if (url.length <= l) {
    return url
  }

  const start_chunk = shortString(url, chunk_l, false)
  const end_chunk = shortString(url, chunk_l, true)
  return start_chunk + '..' + end_chunk
}

function shortString(s, l, reverse) {
  const stop_chars = [' ', '/', '&']
  const acceptable_shortness = l * 0.8 // When to start looking for stop characters
  var reverse = typeof reverse != 'undefined' ? reverse : false
  var s = reverse ? s.split('').reverse().join('') : s
  let short_s = ''

  for (let i = 0; i < l - 1; i++) {
    short_s += s[i]
    if (i >= acceptable_shortness && stop_chars.indexOf(s[i]) >= 0) {
      break
    }
  }
  if (reverse) {
    return short_s.split('').reverse().join('')
  }
  return short_s
}

const NFT_Storage = (props) => {
  const { uuid } = props
  const [files, setFiles] = useState([])
  const [ipfsFiles, setIpfsFiles] = useState([])
  const { colorMode } = useColorMode()
  // const [uploadedFile, setUploadedFile] = useState([])

  const [title, setTitle] = useState('My NFT')
  const [description, setDescription] = useState([])
  const toast = useToast()

  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    if (acceptedFiles.length > 10) {
      toast({
        title: 'Too many files',
        description: 'Please choose fewer than 10 files for uploading',
        status: 'warning',
        duration: 9000,
        isClosable: true,
      })
    } else {
      setFiles(acceptedFiles)
    }
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  const fetchData = async (file) => {
    const metadata = await client.store({
      name: 'NFT',
      description: 'My NFT File!',
      image: new File([file], file.name, { type: file.type }),
    })
    const newObj = Object.assign({}, metadata['data'], file)
    console.log('newObj', newObj)
    setIpfsFiles((oldArray) => [...oldArray, newObj])
    // console.log('metadata', metadata)
  }

  useEffect(() => {
    // console.log(files[0]['file'])
    setIpfsFiles([])
    if (files.length > 0) {
      files.map((file) => {
        fetchData(file)
      })
    }
  }, [files])

  const arr = ['Drop your files here ', <br />, 'to save them to IPFS.']

  const getFileIcon = (file) => {
    const extension = file.path.split('.').pop()
    switch (extension) {
      case 'jpeg':
        return (
          <Box position="relative">
            <FaFile color={'#4F96FF'} size={30}></FaFile>
            <Text
              position="absolute"
              fontSize={6}
              left={'8px'}
              bottom={'8px'}
              zIndex={100}
              color="white"
            >
              JPEG
            </Text>
          </Box>
        )
        break
      case 'png':
        return (
          <Box position="relative">
            <FaFile color={'#FFAB01'} size={30}></FaFile>
            <Text
              position="absolute"
              fontSize={6}
              left={'8px'}
              bottom={'8px'}
              zIndex={100}
              color="white"
            >
              PNG
            </Text>
          </Box>
        )
      default:
        return (
          <Box mr={2} position="relative">
            <FaFile color={'grey'} size={30}></FaFile>
            <Text
              position="absolute"
              fontSize={6}
              left={'8px'}
              bottom={'8px'}
              zIndex={100}
              color="white"
            >
              File
            </Text>
          </Box>
        )
        break
    }
  }

  return (
    <CustomBox>
      <CloseButton blockID={uuid} />
      <Flex direction={'column'} align="center" p={3}>
        <Text
          color={colorMode == 'light' ? 'black' : 'white'}
          fontSize={30}
          fontFamily="Oxygen"
        >
          {ipfsFiles.length == 0 ? 'Upload your files' : 'Pinned to IPFS'}
        </Text>
      </Flex>
      <div
        {...getRootProps()}
        style={{
          border:
            ipfsFiles.length > 0
              ? null
              : `1px dashed ${colorMode == 'light' ? '#5597FC' : 'white'} `,
          margin: '0 20px',
          height: '240px',
          marginLeft: '20px',
          marginRight: '20px',
          borderRadius: '20px',
          paddingTop: '10px',
          display: 'flex',
          alignItems:
            ipfsFiles.length > 0 || files.length > 0 ? null : 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        {files.length > 0 && ipfsFiles.length == 0 ? (
          <Center flex={1}>
            <Spinner color={'white'} />
          </Center>
        ) : null}
        {/* <Box w={300} flexDirection="column">
          {files.length > 0 && ipfsFiles.length == 0
            ? files.map((file) => <Progress size="sm" isIndeterminate />)
            : null}
        </Box> */}
        {ipfsFiles.length > 0 ? (
          <List>
            {ipfsFiles.map((file, index) => {
              return (
                <Flex
                  key={index}
                  direction="column"
                  // border={'1px solid red'}
                  p={3}
                  bgColor={colorMode == 'light' ? 'transparent' : '#1F2128'}
                  boxShadow={
                    colorMode == 'light' ? '2px 1px 9px -1px #b6bdca' : null
                  }
                  borderRadius={10}
                  mb={2}
                >
                  <Flex
                    width={'350px'}
                    justify="space-between"
                    align="flex-end"
                    // border={'1px solid red'}
                  >
                    {getFileIcon(file)}
                    <Text>{shortUrl(file.image.href)}</Text>
                    <Box
                      width={'70px'}
                      display={'flex'}
                      // flex={1}
                      mb={1}
                      alignItems="center"
                      justifyContent="space-evenly"
                      // border={'1px solid cyan'}
                    >
                      <CopyIcon
                        as={'a'}
                        // _hover={{
                        //   transform: `scale(1.02)`,
                        // }}
                        style={{ cursor: 'pointer' }}
                        onClick={() =>
                          navigator.clipboard.writeText(file.image.href)
                        }
                      />
                      <ExternalLinkIcon
                        as={'a'}
                        style={{ cursor: 'pointer' }}
                        onClick={() => openInNewTab(file.image.href)}
                      />
                    </Box>
                  </Flex>
                </Flex>
              )
            })}
          </List>
        ) : isDragActive ? (
          <Text
            fontFamily="Oxygen"
            fontSize={14}
            color={colorMode == 'light' ? 'grey' : 'white'}
          >
            Drop the files here ...
          </Text>
        ) : (
          <>
            {files.length > 0 ? null : (
              <Flex direction={'column'} align={'center'}>
                <Box position="relative">
                  <IoFolderOpen size={50} color={'#5597FC'} />
                  <Box position="absolute" left={'8px'} bottom={'3px'}>
                    <Image
                      src={'/images/ipfs.png'}
                      width={'34px'}
                      height={'22px'}
                    />
                  </Box>
                </Box>

                <Text
                  fontFamily="Oxygen"
                  fontSize={14}
                  color={colorMode == 'light' ? 'grey' : 'white'}
                >
                  {arr}
                </Text>
              </Flex>
            )}
          </>
        )}
      </div>
    </CustomBox>
  )
}

export default NFT_Storage
