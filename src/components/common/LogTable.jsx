import React, { memo } from 'react'
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  VStack,
  Text,
  Box,
  Tooltip,
  useColorModeValue,
  HStack,
  Icon,
} from '@chakra-ui/react'
import { ExternalLink, Shield, Clock, Globe, User, Activity } from 'lucide-react'
import { formatTimestamp, formatRelativeTime, getDecisionColor, getConfidenceColor, getStatusColor, truncateText } from '../../utils/helpers'

const LogTable = memo(({ logs, isLoading }) => {
  const bgColor = useColorModeValue('white', 'cyber.darker')
  const borderColor = useColorModeValue('gray.200', 'cyber.blue')

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
    <Box
      bg={bgColor}
      borderWidth="1px"
      borderColor={borderColor}
      borderRadius="lg"
      overflow="hidden"
      boxShadow="sm"
    >
      <Table variant="cyber" size="sm">
        <Thead>
          <Tr>
            <Th>Timestamp</Th>
            <Th>IP Address</Th>
            <Th>Method</Th>
            <Th>URL</Th>
            <Th>Status</Th>
            <Th>Decision</Th>
            <Th>Confidence</Th>
            <Th>User Agent</Th>
            <Th>Reasoning</Th>
          </Tr>
        </Thead>
        <Tbody>
          {logs.map((log) => (
            <Tr key={log.id}>
              <Td>
                <VStack align="start" spacing={1}>
                  <HStack>
                    <Icon as={Clock} boxSize={3} color="gray.500" />
                    <Text fontSize="xs" fontWeight="medium">
                      {formatTimestamp(log.timestamp)}
                    </Text>
                  </HStack>
                  <Text fontSize="xs" color="gray.500">
                    {formatRelativeTime(log.timestamp)}
                  </Text>
                </VStack>
              </Td>
              
              <Td>
                <HStack>
                  <Icon as={Globe} boxSize={3} color="gray.500" />
                  <Text fontSize="sm" fontFamily="mono">
                    {log.ip_address || 'N/A'}
                  </Text>
                </HStack>
              </Td>
              
              <Td>
                <HStack>
                  <Icon as={Activity} boxSize={3} color="gray.500" />
                  <Badge
                    colorScheme={log.method === 'GET' ? 'green' : log.method === 'POST' ? 'blue' : 'orange'}
                    variant="subtle"
                  >
                    {log.method}
                  </Badge>
                </HStack>
              </Td>
              
              <Td>
                <Tooltip label={log.url} hasArrow>
                  <HStack>
                    <Icon as={ExternalLink} boxSize={3} color="gray.500" />
                    <Text fontSize="sm" fontFamily="mono">
                      {truncateText(log.url, 40)}
                    </Text>
                  </HStack>
                </Tooltip>
              </Td>
              
              <Td>
                <Badge colorScheme={getStatusColor(log.status)} variant="solid">
                  {log.status}
                </Badge>
              </Td>
              
              <Td>
                <HStack>
                  <Icon as={Shield} boxSize={3} color="gray.500" />
                  <Badge colorScheme={getDecisionColor(log.decision)} variant="solid">
                    {log.decision}
                  </Badge>
                </HStack>
              </Td>
              
              <Td>
                <Badge colorScheme={getConfidenceColor(log.confidence)} variant="outline">
                  {log.confidence}
                </Badge>
              </Td>
              
              <Td>
                <Tooltip label={log.user_agent} hasArrow>
                  <HStack>
                    <Icon as={User} boxSize={3} color="gray.500" />
                    <Text fontSize="sm">
                      {truncateText(log.user_agent, 30)}
                    </Text>
                  </HStack>
                </Tooltip>
              </Td>
              
              <Td>
                <Tooltip label={log.reasoning} hasArrow>
                  <Text fontSize="sm" color="gray.600">
                    {truncateText(log.reasoning, 50)}
                  </Text>
                </Tooltip>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  )
})

LogTable.displayName = 'LogTable'

export default LogTable