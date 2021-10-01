import { Center, Text } from '@chakra-ui/layout'
import { CustomBox } from '@components/CustomBox'
import React, { useEffect, useState } from 'react'
import { Blob, NFTStorage, File } from 'nft.storage'
import CloseButton from '@components/CloseButton'
import { Dropzone, FileItem } from 'dropzone-ui'
;('../../../public/images/logo-metamask.png')
const client = new NFTStorage({ token: process.env.NFTStorage })

const NFT_Storage = (props) => {
  const { uuid } = props
  const [files, setFiles] = useState([])
  const [uploadedFile, setUploadedFile] = useState([])

  const [title, setTitle] = useState('My NFT')
  const [description, setDescription] = useState('')
  const updateFiles = (incommingFiles) => {
    // console.log(typeof incommingFiles[0])

    console.log(incommingFiles[0])
    setFiles(incommingFiles)
  }

  const storeFileAsBlob = async (file) => {
    const cid =
      client !== undefined &&
      (await client.storeBlob(new Blob([Array.isArray(file) ? file[0] : file])))
    return cid
  }

  const fetchData = async (file) => {
    // console.log(client)
    // const metadata = await client.store({
    //   name: 'Pinpie',
    //   description: 'Pin is not delicious beef!',
    //   image: new File(
    //     [['../../../public/images/logo-metamask.png'],
    //     'logometamask.png',
    //     {
    //       type: 'image/png',
    //     }
    //   ),
    // })

    const metadata = await client.store({
      name: 'NFT',
      description: 'My NFT File!',
      image: new File([file], 'mynft.jpeg', { type: 'image/jpeg' }),
    })
    console.log('metadata', metadata)
  }

  useEffect(() => {
    // console.log(files[0]['file'])
    if (files.length > 0) {
      fetchData(files[0]['file'])
    }
  }, [files])

  return (
    <CustomBox>
      <CloseButton blockID={uuid} />
      <Center>
        {/* <Text color={'white'}>Storage</Text> */}
        {/* <Image
          src={'/images/pinpie.jpeg'}
          layout={'fill'}
          objectFit="contain"
        /> */}
        <Dropzone
          backgroundColor={'#181C20'}
          color={'white'}
          style={{ borderRadius: '10px' }}
          // style={{
          //   backgroundImage: `url(${"data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%23333' stroke-width='2' stroke-dasharray='15%2c 19' stroke-dashoffset='0' stroke-linecap='round'/%3e%3c/svg%3e"})`,
          //   borderRadius: '10px',
          //   padding: '20px',
          //   display: 'inline-block',
          // }}
          label={'Click or Drag a file to pin to ipfs'}
          header={false}
          footer={false}
          onChange={updateFiles}
          value={files}
        >
          {files.map((file) => (
            <FileItem {...file} preview />
          ))}
        </Dropzone>
      </Center>
    </CustomBox>
  )
}

export default NFT_Storage

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
