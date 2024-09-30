import { parseStringPromise } from 'xml2js'
import type { RssNews, News } from '@/types/news'

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
    pubDate: newsItem.pubDate[0],
    images: newsItem['rbc_news:image']?.map(image => image['rbc_news:url'][0]) || [],
  }))

  const id = getRouterParam(event, 'id')

  const newsItem = newsItems.find((item: News) => item.id === id)

  if (!newsItem) {
    throw createError({
      statusCode: 404,
      statusMessage: `News with id ${id} not found`,
    })
  }

  return newsItem
})
