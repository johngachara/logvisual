import { useState, useEffect, useCallback } from 'react'
import { logService } from '../services/supabase'

export const useLogData = (initialFilters = {}) => {
  const [logs, setLogs] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [totalCount, setTotalCount] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(50)
  const [filters, setFilters] = useState(initialFilters)

  const fetchLogs = useCallback(async (page = currentPage, size = pageSize, currentFilters = filters) => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await logService.getLogs(currentFilters, page, size)
      setLogs(result.data)
      setTotalCount(result.count)
      setTotalPages(result.totalPages)
    } catch (err) {
      setError(err.message)
      console.error('Error fetching logs:', err)
    } finally {
      setLoading(false)
    }
  }, [currentPage, pageSize, filters])

  const updateFilters = useCallback((newFilters) => {
    setFilters(newFilters)
    setCurrentPage(1) // Reset to first page when filters change
  }, [])

  const changePage = useCallback((page) => {
    setCurrentPage(page)
  }, [])

  const changePageSize = useCallback((size) => {
    setPageSize(size)
    setCurrentPage(1) // Reset to first page when page size changes
  }, [])

  const refreshLogs = useCallback(() => {
    fetchLogs(currentPage, pageSize, filters)
  }, [fetchLogs, currentPage, pageSize, filters])

  useEffect(() => {
    fetchLogs()
  }, [fetchLogs])

  return {
    logs,
    loading,
    error,
    totalCount,
    totalPages,
    currentPage,
    pageSize,
    filters,
    updateFilters,
    changePage,
    changePageSize,
    refreshLogs,
  }
}