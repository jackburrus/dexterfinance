export interface NewsResponseType {
  body: string
  categories: string
  downvotes: string
  guid: string
  id: string
  imageurl: string
  lang: string
  published_on: string
  source: string
  source_info: {
    img: string
    lang: string
    name: string
  }
  tags: string
  title: string
  upvotes: string
  url: string
}

export interface NewsCardTypes {
  title: string
  image: string
  categories: string
  sourceURI: string
}

export interface NewsBlockProps {
  uuid: string
}
