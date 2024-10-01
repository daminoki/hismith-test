import { parseStringPromise } from 'xml2js'
import type { RssNews, News } from '@/types/news'
import { parseDate } from '@/utils/formatDate'

export default defineEventHandler(async (event) => {
  const rssUrl = process.env.NEWS_RSS_URL

  if (!rssUrl) {
    throw new Error('NEWS_RSS_URL is not defined')
  }

  const response = await fetch(rssUrl)
  const xml = await response.text()
  const json = await parseStringPromise(xml)

  const newsItems = json.rss.channel[0].item.map((newsItem: RssNews) => {
    const timestampStr = newsItem['rbc_news:newsDate_timestamp'][0]?.trim()
    const timestamp = timestampStr ? Number(timestampStr) : null

    return {
      id: newsItem['rbc_news:news_id'][0],
      title: newsItem.title[0],
      description: newsItem.description[0],
      link: newsItem.link[0],
      anons: newsItem['rbc_news:anons'][0],
      date: newsItem['rbc_news:date'][0],
      timestamp: timestamp ? new Date(timestamp * 1000).getTime() : null,
    }
  })

  const queryParams = getQuery(event)
  const page = Number(queryParams.page) || 1
  const limit = Number(queryParams.limit) || 5
  const query = String(queryParams.query || '').toLowerCase()

  const startDate = queryParams.startDate as string

  const endDate = queryParams.endDate as string

  const sortedNewsItems = newsItems.sort((a: News, b: News) => b.timestamp - a.timestamp)

  const filteredNewsItems = sortedNewsItems.filter((newsItem: News) => {
    const isWithinDateRange = (() => {
      if (!startDate || !endDate) return true
      const newsDate = parseDate(newsItem.date)
      const start = parseDate(startDate)
      const end = parseDate(endDate)

      start.setHours(0, 0, 0, 0)
      end.setHours(23, 59, 59, 999)

      return newsDate >= start && newsDate <= end
    })()

    const matchesQuery = newsItem.title.toLowerCase().trim().includes(query)

    return matchesQuery && isWithinDateRange
  })

  const startIndex = (page - 1) * limit
  const paginatedNews = filteredNewsItems.slice(startIndex, startIndex + limit)

  return {
    total: filteredNewsItems.length,
    news: paginatedNews,
  }
})
