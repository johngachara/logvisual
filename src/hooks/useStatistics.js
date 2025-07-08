import { useState, useEffect, useCallback } from 'react'
import { logService } from '../services/supabase'

export const useStatistics = () => {
  const [statistics, setStatistics] = useState({
    total: 0,
    decisions: {},
    confidence: {},
    methods: {},
    statusCodes: {},
    recentActivity: 0
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchStatistics = useCallback(async () => {
    setLoading(true)
    setError(null)
    
    try {
      const stats = await logService.getStatistics()
      setStatistics(stats)
    } catch (err) {
      setError(err.message)
      console.error('Error fetching statistics:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchStatistics()
  }, [fetchStatistics])

  return {
    statistics,
    loading,
    error,
    refreshStatistics: fetchStatistics,
  }
}