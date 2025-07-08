import { format, formatDistance } from 'date-fns'

export const formatTimestamp = (timestamp) => {
  if (!timestamp) return 'N/A'
  const date = new Date(timestamp)
  return format(date, 'yyyy-MM-dd HH:mm:ss')
}

export const formatRelativeTime = (timestamp) => {
  if (!timestamp) return 'N/A'
  const date = new Date(timestamp)
  return formatDistance(date, new Date(), { addSuffix: true })
}

export const getDecisionColor = (decision) => {
  switch (decision?.toLowerCase()) {
    case 'allow':
    case 'allowed':
      return 'success'
    case 'block':
    case 'blocked':
    case 'deny':
    case 'denied':
      return 'error'
    case 'monitor':
    case 'suspicious':
      return 'warning'
    default:
      return 'gray'
  }
}

export const getConfidenceColor = (confidence) => {
  const conf = parseFloat(confidence)
  if (conf >= 90) return 'success'
  if (conf >= 60) return 'warning'
  return 'error'
}

export const getStatusColor = (status) => {
  const statusCode = parseInt(status)
  if (statusCode >= 200 && statusCode < 300) return 'success'
  if (statusCode >= 300 && statusCode < 400) return 'warning'
  if (statusCode >= 400) return 'error'
  return 'gray'
}

export const truncateText = (text, maxLength = 50) => {
  if (!text) return 'N/A'
  if (text.length <= maxLength) return text
  return `${text.substring(0, maxLength)}...`
}

export const exportToCSV = (data, filename = 'log-data') => {
  if (!data || data.length === 0) return

  const headers = Object.keys(data[0]).join(',')
  const csvContent = data.map(row => 
    Object.values(row).map(value => 
      typeof value === 'string' ? `"${value.replace(/"/g, '""')}"` : value
    ).join(',')
  ).join('\n')

  const csv = `${headers}\n${csvContent}`
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `${filename}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
}

export const exportToJSON = (data, filename = 'log-data') => {
  if (!data || data.length === 0) return

  const jsonContent = JSON.stringify(data, null, 2)
  const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' })
  const link = document.createElement('a')
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `${filename}.json`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
}

export const getUniqueValues = (data, field) => {
  if (!data || data.length === 0) return []
  return [...new Set(data.map(item => item[field]).filter(Boolean))]
}