import React, { useState, useCallback, useMemo } from 'react'
import {
  Box,
  Flex,
  VStack,
  HStack,
  Button,
  ButtonGroup,
  useBreakpointValue,
  useToast,
  Spinner,
  Center,
  useColorModeValue,
} from '@chakra-ui/react'
import { Grid, List, BarChart3, RefreshCw } from 'lucide-react'

import Header from '../layout/Header'
import Sidebar from '../layout/Sidebar'
import FilterPanel from '../common/FilterPanel'
import LogTable from '../common/LogTable'
import LogCards from '../common/LogCards'
import StatisticsCharts from '../charts/StatisticsCharts'
import Pagination from '../common/Pagination'

import { useLogData } from '../../hooks/useLogData'
import { useStatistics } from '../../hooks/useStatistics'
import { useDebounce } from '../../hooks/useDebounce'
import { exportToCSV, exportToJSON } from '../../utils/helpers'

const Dashboard = () => {
  const [viewMode, setViewMode] = useState('table')
  const [showCharts, setShowCharts] = useState(false)
  const toast = useToast()
  
  const isMobile = useBreakpointValue({ base: true, md: false })
  const bgColor = useColorModeValue('gray.50', 'cyber.dark')

  const {
    logs,
    loading: logsLoading,
    error: logsError,
    totalCount,
    totalPages,
    currentPage,
    pageSize,
    filters,
    updateFilters,
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

  const debouncedFilters = useDebounce(filters, 300)

  const handleFiltersChange = useCallback((newFilters) => {
    updateFilters(newFilters)
  }, [updateFilters])

  const handleClearFilters = useCallback(() => {
    updateFilters({
      searchTerm: '',
      method: [],
      decision: [],
      confidence: [],
      status: [],
      dateRange: null,
    })
  }, [updateFilters])

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

  const renderContent = useMemo(() => {
    if (showCharts) {
      return <StatisticsCharts statistics={statistics} isLoading={statsLoading} />
    }

    if (viewMode === 'cards' || isMobile) {
      return <LogCards logs={logs} isLoading={logsLoading} />
    }

    return <LogTable logs={logs} isLoading={logsLoading} />
  }, [showCharts, viewMode, isMobile, logs, logsLoading, statistics, statsLoading])

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
      
      <Flex>
        {!isMobile && (
          <Sidebar statistics={statistics} isLoading={statsLoading} />
        )}
        
        <Box flex={1} p={6}>
          <VStack spacing={6} align="stretch">
            <FilterPanel
              filters={filters}
              onFiltersChange={handleFiltersChange}
              onClearFilters={handleClearFilters}
            />

            <HStack justify="space-between">
              <ButtonGroup isAttached variant="outline">
                <Button
                  leftIcon={<List size={16} />}
                  onClick={() => setViewMode('table')}
                  isActive={viewMode === 'table' && !showCharts}
                  size="sm"
                >
                  Table
                </Button>
                <Button
                  leftIcon={<Grid size={16} />}
                  onClick={() => setViewMode('cards')}
                  isActive={viewMode === 'cards' && !showCharts}
                  size="sm"
                >
                  Cards
                </Button>
                <Button
                  leftIcon={<BarChart3 size={16} />}
                  onClick={() => setShowCharts(!showCharts)}
                  isActive={showCharts}
                  size="sm"
                >
                  Charts
                </Button>
              </ButtonGroup>

              {(logsLoading || statsLoading) && (
                <HStack>
                  <Spinner size="sm" />
                  <Box fontSize="sm" color="gray.500">
                    Loading...
                  </Box>
                </HStack>
              )}
            </HStack>

            {renderContent}

            {!showCharts && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalCount={totalCount}
                pageSize={pageSize}
                onPageChange={changePage}
                onPageSizeChange={changePageSize}
              />
            )}
          </VStack>
        </Box>
      </Flex>
    </Box>
  )
}

export default Dashboard