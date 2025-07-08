import React, { useMemo } from 'react'
import {
  Box,
  SimpleGrid,
  Text,
  useColorModeValue,
  VStack,
  HStack,
  Icon,
} from '@chakra-ui/react'
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { TrendingUp, Shield, Activity, Target } from 'lucide-react'

const StatisticsCharts = ({ statistics, isLoading }) => {
  const bgColor = useColorModeValue('white', 'cyber.darker')
  const borderColor = useColorModeValue('gray.200', 'cyber.blue')
  const textColor = useColorModeValue('gray.700', 'gray.200')

  const decisionData = useMemo(() => {
    const decisions = statistics.decisions || {}
    return Object.entries(decisions).map(([key, value]) => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      value: value,
      color: key === 'allow' ? '#4caf50' : key === 'block' ? '#f44336' : '#ffc107'
    }))
  }, [statistics.decisions])

  const methodData = useMemo(() => {
    const methods = statistics.methods || {}
    return Object.entries(methods)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 8)
      .map(([key, value]) => ({
        name: key,
        value: value,
      }))
  }, [statistics.methods])

  const confidenceData = useMemo(() => {
    const confidence = statistics.confidence || {}
    return Object.entries(confidence).map(([key, value]) => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      value: value,
    }))
  }, [statistics.confidence])

  const statusData = useMemo(() => {
    const statusCodes = statistics.statusCodes || {}
    return Object.entries(statusCodes)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([key, value]) => ({
        name: key,
        value: value,
      }))
  }, [statistics.statusCodes])

  const ChartContainer = ({ title, icon, children }) => (
    <Box
      bg={bgColor}
      borderWidth="1px"
      borderColor={borderColor}
      borderRadius="lg"
      p={6}
      boxShadow="sm"
      transition="all 0.2s"
      _hover={{
        boxShadow: 'md',
        transform: 'translateY(-2px)',
      }}
    >
      <HStack mb={4}>
        <Icon as={icon} boxSize={5} color="cyber.blue" />
        <Text fontSize="lg" fontWeight="bold" color={textColor}>
          {title}
        </Text>
      </HStack>
      {children}
    </Box>
  )

  if (isLoading) {
    return (
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        {[1, 2, 3, 4].map((i) => (
          <ChartContainer key={i} title="Loading..." icon={TrendingUp}>
            <Box h="300px" display="flex" alignItems="center" justifyContent="center">
              <Text color="gray.500">Loading chart data...</Text>
            </Box>
          </ChartContainer>
        ))}
      </SimpleGrid>
    )
  }

  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
      <ChartContainer title="Security Decisions" icon={Shield}>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={decisionData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {decisionData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </ChartContainer>

      <ChartContainer title="HTTP Methods" icon={Activity}>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={methodData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#00d4ff" />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>

      <ChartContainer title="Confidence Levels" icon={Target}>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={confidenceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#39ff14" />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>

      <ChartContainer title="Status Codes" icon={TrendingUp}>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={statusData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#ff7b00" />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </SimpleGrid>
  )
}

export default StatisticsCharts