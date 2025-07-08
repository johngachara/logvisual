import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Log data service functions
export const logService = {
  // Fetch logs with filtering and pagination
  async getLogs(filters = {}, page = 1, pageSize = 50) {
    let query = supabase
      .from('logagent')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
    console.log(query)
    // Apply filters
    if (filters.searchTerm) {
      query = query.or(`ip_address.ilike.%${filters.searchTerm}%,url.ilike.%${filters.searchTerm}%,user_agent.ilike.%${filters.searchTerm}%`)
    }

    if (filters.method && filters.method.length > 0) {
      query = query.in('method', filters.method)
    }

    if (filters.decision && filters.decision.length > 0) {
      query = query.in('decision', filters.decision)
    }

    if (filters.confidence && filters.confidence.length > 0) {
      query = query.in('confidence', filters.confidence)
    }

    if (filters.status && filters.status.length > 0) {
      query = query.in('status', filters.status)
    }

    if (filters.dateRange) {
      const { start, end } = filters.dateRange
      if (start) query = query.gte('created_at', start)
      if (end) query = query.lte('created_at', end)
    }

    // Apply pagination
    const from = (page - 1) * pageSize
    const to = from + pageSize - 1
    query = query.range(from, to)

    const { data, error, count } = await query
    
    if (error) {
      console.error('Error fetching logs:', error)
      throw error
    }

    return {
      data: data || [],
      count: count || 0,
      totalPages: Math.ceil((count || 0) / pageSize)
    }
  },

  // Get statistics for dashboard
  async getStatistics() {
    const { data, error } = await supabase
      .from('logagent')
      .select('decision, confidence, method, status')

    if (error) {
      console.error('Error fetching statistics:', error)
      throw error
    }

    return this.calculateStatistics(data || [])
  },

  // Calculate statistics from raw data
  calculateStatistics(data) {
    const stats = {
      total: data.length,
      decisions: {},
      confidence: {},
      methods: {},
      statusCodes: {},
      recentActivity: 0
    }

    data.forEach(log => {
      // Decision statistics
      stats.decisions[log.decision] = (stats.decisions[log.decision] || 0) + 1
      
      // Confidence statistics
      stats.confidence[log.confidence] = (stats.confidence[log.confidence] || 0) + 1
      
      // Method statistics
      stats.methods[log.method] = (stats.methods[log.method] || 0) + 1
      
      // Status code statistics
      stats.statusCodes[log.status] = (stats.statusCodes[log.status] || 0) + 1
    })

    return stats
  },

  // Real-time subscription to log updates
  subscribeToLogs(callback) {
    return supabase
      .channel('logagent-changes')
      .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'logagent' },
        callback
      )
      .subscribe()
  }
}