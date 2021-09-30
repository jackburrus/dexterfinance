import { Center, Text } from '@chakra-ui/layout'
import { CustomBox } from '@components/CustomBox'
import React, { useEffect } from 'react'
import { NFTStorage } from 'nft.storage'
import CloseButton from '@components/CloseButton'
import Image from 'next/image'

const client = new NFTStorage({ token: process.env.NFTStorage })
;('../../../public/images/logo-metamask.png')
const fetchData = async () => {
  // console.log(client)
  const metadata = await client.store({
    name: 'Pinpie',
    description: 'Pin is not delicious beef!',
    image: new File(
      ['../../../public/images/logo-metamask.png'],
      'logometamask.png',
      {
        type: 'image/png',
      }
    ),
  })
  console.log('metadata', metadata)
}

const NFT_Storage = (props) => {
  const { uuid } = props
  useEffect(() => {
    fetchData()
  }, [])
  return (
    <CustomBox>
      <CloseButton blockID={uuid} />
      <Center>
        <Text color={'white'}>Storage</Text>
        <Image
          src={'/images/logo-metamask.png'}
          layout={'fill'}
          objectFit="contain"
        />
      </Center>
    </CustomBox>
  )
}

export default NFT_Storage
