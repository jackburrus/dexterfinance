import { Box, Center, Text } from '@chakra-ui/layout'
import { CustomBox } from '@components/CustomBox'
import React, { useCallback, useEffect, useState } from 'react'
import { Blob, NFTStorage, File } from 'nft.storage'
import CloseButton from '@components/CloseButton'
import { Dropzone, FileItem } from 'dropzone-ui'
import { useDropzone } from 'react-dropzone'

const client = new NFTStorage({ token: process.env.NFTStorage })

const NFT_Storage = (props) => {
  const { uuid } = props
  const [files, setFiles] = useState([])
  const [ipfsFiles, setIpfsFiles] = useState([])
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
        fetchData(file)
      })
    }
  }, [files])

  return (
    <CustomBox>
      <CloseButton blockID={uuid} />
      <div
        {...getRootProps()}
        style={{
          border: '1px dotted white',
          height: '200px',
        }}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </div>
      {ipfsFiles.length > 0 && (
        <Box>
          <Text>{ipfsFiles[0].url}</Text>
        </Box>
      )}
    </CustomBox>
  )
}

export default NFT_Storage

// const updateFiles = (incommingFiles) => {
//   // console.log(typeof incommingFiles[0])

//   console.log(incommingFiles)
//   setFiles(incommingFiles)
// }
// <Center>
//         {/* <Text color={'white'}>Storage</Text> */}
//         {/* <Image
//           src={'/images/pinpie.jpeg'}
//           layout={'fill'}
//           objectFit="contain"
//         /> */}
//         <Dropzone
//           backgroundColor={'#181C20'}
//           color={'white'}
//           style={{ borderRadius: '10px' }}
//           style={{
//             backgroundImage: `url(${"data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='black' stroke-width='2' stroke-dasharray='15%2c 19' stroke-dashoffset='0' stroke-linecap='round'/%3e%3c/svg%3e"})`,
//           }}
//           view={'list'}
//           // header={false}
//           footer={false}
//           onChange={updateFiles}
//           value={files}
//         >
//           {files.map((file) => (
//             <FileItem {...file} preview />
//           ))}
//         </Dropzone>
//       </Center>

// const onUpload = async file => {
//     if (file) {
//       setUploadedFile(new File([await file.arrayBuffer()], file.name, { type: file.type }));
//     }
//     return false;
//   };
//   const updateFiles = (incommingFiles) => {
//     console.log(incommingFiles[0]['file']['name'])
// onUpload(incommingFiles[0]['file'])
//     setFiles(incommingFiles)
//   }
//   const { uuid } = props
//   useEffect(() => {
//     fetchData(files[0]['file']['name'])
//   }, [files])

//   const onUpload = async file => {
//     if (file) {
//       setUploadedFile(new File([await file.arrayBuffer()], file.name, { type: file.type }));
//     }
//     return false;
//   };
