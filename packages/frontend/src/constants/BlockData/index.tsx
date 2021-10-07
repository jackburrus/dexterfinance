import {
  AnalyticsBlock,
  NewsBlock,
  NFTBlock,
  NFT_Storage,
  Wallet,
} from 'src/blocks/index'

export const BlockData = [
  { index: '0', title: 'Analytics', protocol: 'Analytics' },
  { index: '1', title: 'NFT', protocol: 'Ethereum' },
  { index: '2', title: 'News', protocol: 'Analytics' },
  { index: '3', title: 'Wallet', protocol: 'Analytics' },
  { index: '4', title: 'NFTStorage', protocol: 'Etherum' },
]

export const getBlockType = (block: BlockType, provided): JSX.Element => {
  switch (block.title) {
    case 'Wallet':
      return <Wallet provided={provided} uuid={block.uuid} />
    case 'NFT':
      return <NFTBlock provided={provided} uuid={block.uuid} />
    case 'Analytics':
      return <AnalyticsBlock provided={provided} uuid={block.uuid} />
    case 'News':
      return <NewsBlock provided={provided} uuid={block.uuid} />
    case 'NFTStorage':
      return <NFT_Storage uuid={block.uuid} />

    default:
      return null
  }
}
