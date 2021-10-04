import { Box, Center, Flex, List, Text } from '@chakra-ui/layout'
import { CustomBox } from '@components/CustomBox'
import React, { useCallback, useEffect, useState } from 'react'
import { Blob, NFTStorage, File } from 'nft.storage'
import CloseButton from '@components/CloseButton'
import { Dropzone, FileItem } from 'dropzone-ui'
import { useDropzone } from 'react-dropzone'
import Image from 'next/image'
import { useColorMode } from '@chakra-ui/color-mode'
import { Progress, Spinner } from '@chakra-ui/react'
import { IoFolderOpen } from 'react-icons/io5'
import { CopyIcon, ExternalLinkIcon } from '@chakra-ui/icons'
import { openInNewTab } from '../NFT/NFTTypes/BAYC'
import { FaFile } from 'react-icons/fa'
const client = new NFTStorage({ token: process.env.NFTStorage })

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

  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    console.log(acceptedFiles)
    setFiles(acceptedFiles)
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

  const arr = [
    'Drag & drop your files here, ',
    <br />,
    'or click to select files.',
  ]

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
      <Flex
        // border={'1px solid green'}
        direction={'column'}
        // justify="center"
        align="center"
      >
        <Text
          color={colorMode == 'light' ? 'black' : 'white'}
          fontSize={30}
          fontFamily="Oxygen"
          p={3}
        >
          {ipfsFiles.length == 0 ? 'Upload your files' : 'Pinned to IPFS'}
        </Text>

        {/* <Image
          src={'/images/IPFS_Logo.png'}
          width={150}
          height={50}
          layout={'fixed'}
        /> */}
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
                <IoFolderOpen size={50} color={'#5597FC'} />
                <Text
                  fontFamily="Oxygen"
                  fontSize={14}
                  color={colorMode == 'light' ? 'grey' : 'white'}
                >
                  {arr}
                </Text>
                {/* <p style={{color={colorMode == 'light' ? 'black' : 'white'}}} ></p> */}
              </Flex>
            )}
          </>
        )}
        {/* <input {...getInputProps()} /> */}
      </div>
    </CustomBox>
  )
}

export default NFT_Storage
