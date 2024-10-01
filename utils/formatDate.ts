export function parseDate(dateString: string) {
  const [day, month, year] = dateString.split('.')
  return new Date(`${year}-${month}-${day}`)
}

export function formatDate(date: Date) {
  return date.toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
}
