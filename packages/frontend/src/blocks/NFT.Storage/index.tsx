import { Box, Center, Flex, List, Text } from '@chakra-ui/layout'
import { CustomBox } from '@components/CustomBox'
import React, { useCallback, useEffect, useState } from 'react'
import { Blob, NFTStorage, File } from 'nft.storage'
import CloseButton from '@components/CloseButton'
import { Dropzone, FileItem } from 'dropzone-ui'
import { useDropzone } from 'react-dropzone'
import Image from 'next/image'
import { useColorMode } from '@chakra-ui/color-mode'

import { IoFolderOpen } from 'react-icons/io5'
const client = new NFTStorage({ token: process.env.NFTStorage })

function shortUrl(url, l) {
  var l = typeof l != 'undefined' ? l : 50
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
      image: new File([file], 'mynft.jpeg', { type: 'image/jpeg' }),
    })
    setIpfsFiles((oldArray) => [...oldArray, metadata])
    console.log('metadata', metadata)
  }

  useEffect(() => {
    // console.log(files[0]['file'])
    if (files.length > 0) {
      files.map((file) => {
        setIpfsFiles([])
        fetchData(file)
      })
    }
  }, [files])

  const arr = [
    'Drag & drop your files here, ',
    <br />,
    'or click to select files.',
  ]

  return (
    <CustomBox>
      <CloseButton blockID={uuid} />
      <Flex
        // border={'1px solid green'}
        direction={'column'}
        justify="center"
        align="center"
      >
        <Text
          color={colorMode == 'light' ? 'black' : 'white'}
          fontSize={30}
          fontFamily="Oxygen"
          p={3}
        >
          Upload your files
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
          border: `1px dashed ${colorMode == 'light' ? '#5597FC' : 'white'} `,
          margin: '0 20px',
          height: '240px',
          marginLeft: '20px',
          marginRight: '20px',
          borderRadius: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        {ipfsFiles.length > 0 ? (
          <List>
            {ipfsFiles.map((file) => {
              return (
                <Flex
                  onClick={() => {
                    navigator.clipboard.writeText(file.data.image.href)
                  }}
                >
                  <Text>{shortUrl(file.data.image.href)}</Text>
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
        {/* <input {...getInputProps()} /> */}
      </div>
    </CustomBox>
  )
}

export default NFT_Storage
