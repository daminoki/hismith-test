export interface News {
  id: string
  title: string[]
  description: string[]
  link: string[]
  anons: string[]
  date: string[]
  pubDate: string[]
  images: string[]
}

export interface RssNews {
  'rbc_news:news_id': string[]
  'title': string[]
  'description': string[]
  'link': string[]
  'rbc_news:anons': string[]
  'rbc_news:date': string[]
  'pubDate': string[]
  'rbc_news:image'?: RbcNewsImage[]
}

export interface NewsResponse {
  total: number
  news: News[]
}

export interface RbcNewsImage {
  'rbc_news:url': [string]
  'rbc_news:type': [string]
  'rbc_news:size_nick': [string]
  'rbc_news:copyright': [string]
}
