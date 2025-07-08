import React, { useState, useCallback } from 'react'
import {
  Box,
  Flex,
  VStack,
  useToast,
  Spinner,
  Center,
  useColorModeValue,
  useBreakpointValue,
} from '@chakra-ui/react'
import { RefreshCw } from 'lucide-react'

import Header from '../layout/Header'
import Sidebar from '../layout/Sidebar'
import LogTable from '../common/LogTable'
import LogDetailModal from '../common/LogDetailModal'
import StatisticsCharts from '../charts/StatisticsCharts'
import Pagination from '../common/Pagination'

import { useLogData } from '../../hooks/useLogData'
import { useStatistics } from '../../hooks/useStatistics'
import { exportToCSV } from '../../utils/helpers'

const Dashboard = () => {
  const [selectedLog, setSelectedLog] = useState(null)
  const toast = useToast()
  
  const isMobile = useBreakpointValue({ base: true, lg: false })
  const bgColor = useColorModeValue('gray.50', 'cyber.dark')

  const {
    logs,
    loading: logsLoading,
    error: logsError,
    totalCount,
    totalPages,
    currentPage,
    pageSize,
    changePage,
    changePageSize,
    refreshLogs,
  } = useLogData()

  const {
    statistics,
    loading: statsLoading,
    error: statsError,
    refreshStatistics,
  } = useStatistics()

  const handleLogClick = useCallback((log) => {
    setSelectedLog(log)
  }, [])

  const handleCloseModal = useCallback(() => {
    setSelectedLog(null)
  }, [])

  const handleRefresh = useCallback(() => {
    refreshLogs()
    refreshStatistics()
    toast({
      title: 'Data refreshed',
      description: 'Log data has been updated',
      status: 'success',
      duration: 2000,
      isClosable: true,
    })
  }, [refreshLogs, refreshStatistics, toast])

  const handleExport = useCallback(() => {
    if (!logs || logs.length === 0) {
      toast({
        title: 'No data to export',
        description: 'Please ensure there are logs to export',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      })
      return
    }

    const filename = `cybersecurity-logs-${new Date().toISOString().split('T')[0]}`
    exportToCSV(logs, filename)
    
    toast({
      title: 'Export successful',
      description: `${logs.length} logs exported to CSV`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    })
  }, [logs, toast])

  if (logsError || statsError) {
    return (
      <Center h="100vh">
        <VStack spacing={4}>
          <Box color="red.500">
            Error loading dashboard: {logsError || statsError}
          </Box>
          <Button onClick={handleRefresh} leftIcon={<RefreshCw size={16} />}>
            Retry
          </Button>
        </VStack>
      </Center>
    )
  }

  return (
    <Box bg={bgColor} minH="100vh">
      <Header
        onRefresh={handleRefresh}
        onExport={handleExport}
        isLoading={logsLoading || statsLoading}
        totalLogs={totalCount}
      />
      
      <Flex direction={{ base: 'column', lg: 'row' }}>
        {!isMobile && (
          <Sidebar statistics={statistics} isLoading={statsLoading} />
        )}
        
        <Box flex={1} p={{ base: 4, md: 6 }}>
          <VStack spacing={6} align="stretch">
            <LogTable 
              logs={logs} 
              isLoading={logsLoading} 
              onLogClick={handleLogClick}
            />

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalCount={totalCount}
              pageSize={pageSize}
              onPageChange={changePage}
              onPageSizeChange={changePageSize}
            />

            <StatisticsCharts 
              statistics={statistics} 
              isLoading={statsLoading} 
            />
          </VStack>
        </Box>
      </Flex>

      <LogDetailModal 
        log={selectedLog}
        isOpen={!!selectedLog}
        onClose={handleCloseModal}
      />
    </Box>
  )
}

export default Dashboard