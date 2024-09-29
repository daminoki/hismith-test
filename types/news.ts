export interface News {
  id: number
  title: string[]
  description: string[]
  link: string[]
  anons: string[]
  date: string[]
}

export interface RssNews {
  'id': number
  'title': string[]
  'description': string[]
  'link': string[]
  'rbc_news:anons': string[]
  'rbc_news:date': string[]
}

export interface NewsResponse {
  total: number
  news: News[]
}
