import { parseStringPromise } from 'xml2js'
import type { RssNews } from '@/types/news'

export default defineEventHandler(async (event) => {
  const rssUrl = process.env.NEWS_RSS_URL

  if (!rssUrl) {
    throw new Error('NEWS_RSS_URL is not defined')
  }

  const response = await fetch(rssUrl)
  const xml = await response.text()
  const json = await parseStringPromise(xml)

  const newsItems = json.rss.channel[0].item.map((newsItem: RssNews) => ({
    id: newsItem['rbc_news:news_id'][0],
    title: newsItem.title[0],
    description: newsItem.description[0],
    link: newsItem.link[0],
    anons: newsItem['rbc_news:anons'][0],
    date: newsItem['rbc_news:date'][0],
  }))

  const query = getQuery(event)
  const page = Number(query.page) || 1
  const limit = Number(query.limit) || 10

  const startIndex = (page - 1) * limit
  const paginatedNews = newsItems.slice(startIndex, startIndex + limit)

  return {
    total: newsItems.length,
    news: paginatedNews,
  }
})
