import React from 'react'
import {
  Box,
  VStack,
  Text,
  Divider,
  useColorModeValue,
  HStack,
  Badge,
  Icon,
  Skeleton,
} from '@chakra-ui/react'
import { Shield, TrendingUp, AlertTriangle, CheckCircle, XCircle, Eye } from 'lucide-react'

const StatCard = ({ icon, label, value, color = 'blue', isLoading }) => (
  <Box
    p={4}
    bg={useColorModeValue('white', 'cyber.darker')}
    borderRadius="md"
    borderWidth="1px"
    borderColor={useColorModeValue('gray.200', 'cyber.blue')}
    boxShadow="sm"
    transition="all 0.2s"
    _hover={{
      boxShadow: 'md',
      transform: 'translateY(-2px)',
    }}
  >
    <HStack spacing={3}>
      <Icon as={icon} boxSize={6} color={`${color}.500`} />
      <VStack align="start" spacing={1}>
        <Text fontSize="sm" color="gray.500">
          {label}
        </Text>
        {isLoading ? (
          <Skeleton height="20px" width="60px" />
        ) : (
          <Text fontSize="xl" fontWeight="bold">
            {value}
          </Text>
        )}
      </VStack>
    </HStack>
  </Box>
)

const Sidebar = ({ statistics, isLoading }) => {
  const bgColor = useColorModeValue('white', 'cyber.darker')
  const borderColor = useColorModeValue('gray.200', 'cyber.blue')

  const getDecisionStats = () => {
    const decisions = statistics.decisions || {}
    return [
      { key: 'allowed', label: 'Allowed', icon: CheckCircle, color: 'green' },
      { key: 'blocked', label: 'Blocked', icon: XCircle, color: 'red' },
      { key: 'monitor', label: 'Monitor', icon: Eye, color: 'yellow' },
    ].map(item => ({
      ...item,
      value: decisions[item.key] || 0,
    }))
  }

  const getConfidenceStats = () => {
    const confidence = statistics.confidence || {}
    return [
      { key: 'high', label: 'High Confidence', value: confidence.high || 0 },
      { key: 'medium', label: 'Medium Confidence', value: confidence.medium || 0 },
      { key: 'low', label: 'Low Confidence', value: confidence.low || 0 },
    ]
  }

  const getTopMethods = () => {
    const methods = statistics.methods || {}
    return Object.entries(methods)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([method, count]) => ({ method, count }))
  }

  return (
    <Box
      w="320px"
      bg={bgColor}
      borderRight="1px"
      borderColor={borderColor}
      p={6}
      h="100vh"
      overflowY="auto"
    >
      <VStack spacing={6} align="stretch">
        <Box>
          <HStack mb={4}>
            <Icon as={Shield} boxSize={5} color="cyber.blue" />
            <Text fontSize="lg" fontWeight="bold">
              Dashboard Overview
            </Text>
          </HStack>
          
          <StatCard
            icon={TrendingUp}
            label="Total Logs"
            value={statistics.total || 0}
            color="blue"
            isLoading={isLoading}
          />
        </Box>

        <Divider />

        <Box>
          <HStack mb={4}>
            <Icon as={AlertTriangle} boxSize={5} color="cyber.blue" />
            <Text fontSize="lg" fontWeight="bold">
              Security Decisions
            </Text>
          </HStack>
          
          <VStack spacing={3}>
            {getDecisionStats().map((stat) => (
              <StatCard
                key={stat.key}
                icon={stat.icon}
                label={stat.label}
                value={stat.value}
                color={stat.color}
                isLoading={isLoading}
              />
            ))}
          </VStack>
        </Box>

        <Divider />

        <Box>
          <Text fontSize="lg" fontWeight="bold" mb={4}>
            Confidence Levels
          </Text>
          
          <VStack spacing={3} align="stretch">
            {getConfidenceStats().map((stat) => (
              <HStack key={stat.key} justify="space-between">
                <Text fontSize="sm">{stat.label}</Text>
                <Badge colorScheme={stat.key === 'high' ? 'green' : stat.key === 'medium' ? 'yellow' : 'red'}>
                  {isLoading ? <Skeleton height="16px" width="30px" /> : stat.value}
                </Badge>
              </HStack>
            ))}
          </VStack>
        </Box>

        <Divider />

        <Box>
          <Text fontSize="lg" fontWeight="bold" mb={4}>
            Top HTTP Methods
          </Text>
          
          <VStack spacing={2} align="stretch">
            {getTopMethods().map((item) => (
              <HStack key={item.method} justify="space-between">
                <Text fontSize="sm">{item.method}</Text>
                <Badge variant="outline">
                  {isLoading ? <Skeleton height="16px" width="30px" /> : item.count}
                </Badge>
              </HStack>
            ))}
          </VStack>
        </Box>
      </VStack>
    </Box>
  )
}

export default Sidebar