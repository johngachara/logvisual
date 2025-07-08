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
  useBreakpointValue,
} from '@chakra-ui/react'
import { ExternalLink, Shield, Clock, Globe, User, Activity } from 'lucide-react'
import { formatTimestamp, formatRelativeTime, getDecisionColor, getConfidenceColor, getStatusColor, truncateText } from '../../utils/helpers'

const LogTable = memo(({ logs, isLoading, onLogClick }) => {
  const bgColor = useColorModeValue('white', 'cyber.darker')
  const borderColor = useColorModeValue('gray.200', 'cyber.blue')
  const hoverBg = useColorModeValue('gray.50', 'rgba(0, 212, 255, 0.05)')
  
  const isMobile = useBreakpointValue({ base: true, md: false })
  const isTablet = useBreakpointValue({ base: false, md: true, lg: false })

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
        <Text color="gray.500">No logs found.</Text>
      </Box>
    )
  }

  return (
    <Box
      bg={bgColor}
      borderWidth="1px"
      borderColor={borderColor}
      borderRadius="lg"
      overflow="auto"
      boxShadow="sm"
    >
      <Table variant="cyber" size={isMobile ? "sm" : "md"}>
        <Thead>
          <Tr>
            <Th>Time</Th>
            <Th>IP Address</Th>
            {!isMobile && <Th>Method</Th>}
            <Th>URL</Th>
            {!isMobile && <Th>Status</Th>}
            <Th>Decision</Th>
            {!isTablet && !isMobile && <Th>Confidence</Th>}
            {!isTablet && !isMobile && <Th>User Agent</Th>}
          </Tr>
        </Thead>
        <Tbody>
          {logs.map((log) => (
            <Tr 
              key={log.id}
              cursor="pointer"
              _hover={{ bg: hoverBg }}
              onClick={() => onLogClick(log)}
              transition="background-color 0.2s"
            >
              <Td>
                <VStack align="start" spacing={1}>
                  <HStack>
                    <Icon as={Clock} boxSize={3} color="gray.500" />
                    <Text fontSize="xs" fontWeight="medium">
                      {formatTimestamp(log.timestamp)}
                    </Text>
                  </HStack>
                  {!isMobile && (
                    <Text fontSize="xs" color="gray.500">
                      {formatRelativeTime(log.timestamp)}
                    </Text>
                  )}
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
              
              {!isMobile && (
                <Td>
                  <HStack>
                    <Icon as={Activity} boxSize={3} color="gray.500" />
                    <Badge
                      colorScheme={log.method === 'GET' ? 'green' : log.method === 'POST' ? 'blue' : 'orange'}
                      variant="subtle"
                      size="sm"
                    >
                      {log.method}
                    </Badge>
                  </HStack>
                </Td>
              )}
              
              <Td>
                <Tooltip label={log.url} hasArrow>
                  <HStack>
                    <Icon as={ExternalLink} boxSize={3} color="gray.500" />
                    <Text fontSize="sm" fontFamily="mono">
                      {truncateText(log.url, isMobile ? 20 : 40)}
                    </Text>
                  </HStack>
                </Tooltip>
              </Td>
              
              {!isMobile && (
                <Td>
                  <Badge colorScheme={getStatusColor(log.status)} variant="solid" size="sm">
                    {log.status}
                  </Badge>
                </Td>
              )}
              
              <Td>
                <HStack>
                  <Icon as={Shield} boxSize={3} color="gray.500" />
                  <Badge colorScheme={getDecisionColor(log.decision)} variant="solid" size="sm">
                    {log.decision}
                  </Badge>
                </HStack>
              </Td>
              
              {!isTablet && !isMobile && (
                <Td>
                  <Badge colorScheme={getConfidenceColor(log.confidence)} variant="outline" size="sm">
                    {log.confidence}
                  </Badge>
                </Td>
              )}
              
              {!isTablet && !isMobile && (
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
              )}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  )
})

LogTable.displayName = 'LogTable'

export default LogTable