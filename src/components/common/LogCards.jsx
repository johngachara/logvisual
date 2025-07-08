import React, { memo } from 'react'
import {
  SimpleGrid,
  Box,
  Text,
  Badge,
  VStack,
  HStack,
  Divider,
  useColorModeValue,
  Icon,
  Tooltip,
} from '@chakra-ui/react'
import { Clock, Globe, Activity, ExternalLink, Shield, User, FileText } from 'lucide-react'
import { formatTimestamp, formatRelativeTime, getDecisionColor, getConfidenceColor, getStatusColor, truncateText } from '../../utils/helpers'

const LogCard = memo(({ log }) => {
  const bgColor = useColorModeValue('white', 'cyber.darker')
  const borderColor = useColorModeValue('gray.200', 'cyber.blue')

  return (
    <Box
      bg={bgColor}
      borderWidth="1px"
      borderColor={borderColor}
      borderRadius="lg"
      p={4}
      boxShadow="sm"
      transition="all 0.2s"
      _hover={{
        boxShadow: 'md',
        transform: 'translateY(-2px)',
      }}
    >
      <VStack spacing={3} align="stretch">
        <HStack justify="space-between">
          <HStack>
            <Icon as={Clock} boxSize={4} color="gray.500" />
            <Text fontSize="sm" fontWeight="medium">
              {formatTimestamp(log.timestamp)}
            </Text>
          </HStack>
          <Text fontSize="xs" color="gray.500">
            {formatRelativeTime(log.timestamp)}
          </Text>
        </HStack>

        <Divider />

        <HStack justify="space-between">
          <HStack>
            <Icon as={Globe} boxSize={4} color="gray.500" />
            <Text fontSize="sm" fontFamily="mono">
              {log.ip_address || 'N/A'}
            </Text>
          </HStack>
          <HStack>
            <Icon as={Activity} boxSize={4} color="gray.500" />
            <Badge
              colorScheme={log.method === 'GET' ? 'green' : log.method === 'POST' ? 'blue' : 'orange'}
              variant="subtle"
            >
              {log.method}
            </Badge>
          </HStack>
        </HStack>

        <Box>
          <HStack mb={2}>
            <Icon as={ExternalLink} boxSize={4} color="gray.500" />
            <Text fontSize="sm" fontWeight="medium">URL</Text>
          </HStack>
          <Tooltip label={log.url} hasArrow>
            <Text fontSize="sm" fontFamily="mono" color="gray.600">
              {truncateText(log.url, 60)}
            </Text>
          </Tooltip>
        </Box>

        <HStack justify="space-between">
          <VStack align="start" spacing={1}>
            <Text fontSize="xs" color="gray.500">Status</Text>
            <Badge colorScheme={getStatusColor(log.status)} variant="solid">
              {log.status}
            </Badge>
          </VStack>
          <VStack align="start" spacing={1}>
            <Text fontSize="xs" color="gray.500">Decision</Text>
            <HStack>
              <Icon as={Shield} boxSize={3} color="gray.500" />
              <Badge colorScheme={getDecisionColor(log.decision)} variant="solid">
                {log.decision}
              </Badge>
            </HStack>
          </VStack>
          <VStack align="start" spacing={1}>
            <Text fontSize="xs" color="gray.500">Confidence</Text>
            <Badge colorScheme={getConfidenceColor(log.confidence)} variant="outline">
              {log.confidence}
            </Badge>
          </VStack>
        </HStack>

        <Box>
          <HStack mb={2}>
            <Icon as={User} boxSize={4} color="gray.500" />
            <Text fontSize="sm" fontWeight="medium">User Agent</Text>
          </HStack>
          <Tooltip label={log.user_agent} hasArrow>
            <Text fontSize="sm" color="gray.600">
              {truncateText(log.user_agent, 80)}
            </Text>
          </Tooltip>
        </Box>

        {log.reasoning && (
          <Box>
            <HStack mb={2}>
              <Icon as={FileText} boxSize={4} color="gray.500" />
              <Text fontSize="sm" fontWeight="medium">Reasoning</Text>
            </HStack>
            <Tooltip label={log.reasoning} hasArrow>
              <Text fontSize="sm" color="gray.600">
                {truncateText(log.reasoning, 100)}
              </Text>
            </Tooltip>
          </Box>
        )}
      </VStack>
    </Box>
  )
})

LogCard.displayName = 'LogCard'

const LogCards = memo(({ logs, isLoading }) => {
  if (isLoading) {
    return (
      <Box p={8} textAlign="center">
        <Text>Loading logs...</Text>
      </Box>
    )
  }

  if (!logs || logs.length === 0) {
    return (
      <Box p={8} textAlign="center">
        <Text color="gray.500">No logs found matching your criteria.</Text>
      </Box>
    )
  }

  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
      {logs.map((log) => (
        <LogCard key={log.id} log={log} />
      ))}
    </SimpleGrid>
  )
})

LogCards.displayName = 'LogCards'

export default LogCards