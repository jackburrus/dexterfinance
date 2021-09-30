import { Center, Text } from '@chakra-ui/layout'
import { CustomBox } from '@components/CustomBox'
import React, { useEffect } from 'react'
import { NFTStorage } from 'nft.storage'
import CloseButton from '@components/CloseButton'
const client = new NFTStorage({ token: process.env.NFTStorage })
const fetchData = async () => {
  // console.log(client)
  const metadata = await client.store({
    name: 'Pinpie',
    description: 'Pin is not delicious beef!',
    image: new File(['/images/logo-metamask.png'], 'Logo.png', {
      type: 'image/png',
    }),
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
      </Center>
    </CustomBox>
  )
}

export default NFT_Storage
