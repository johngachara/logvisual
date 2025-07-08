import React from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  VStack,
  HStack,
  Text,
  Badge,
  Divider,
  Box,
  Icon,
  useColorModeValue,
  Code,
} from '@chakra-ui/react'
import { 
  Clock, 
  Globe, 
  Activity, 
  ExternalLink, 
  Shield, 
  User, 
  FileText, 
  Target,
  Hash,
  Server
} from 'lucide-react'
import { 
  formatTimestamp, 
  formatRelativeTime, 
  getDecisionColor, 
  getConfidenceColor, 
  getStatusColor 
} from '../../utils/helpers'

const DetailRow = ({ icon, label, children }) => {
  const labelColor = useColorModeValue('gray.600', 'gray.400')
  
  return (
    <VStack align="stretch" spacing={2}>
      <HStack>
        <Icon as={icon} boxSize={4} color="cyber.blue" />
        <Text fontSize="sm" fontWeight="semibold" color={labelColor}>
          {label}
        </Text>
      </HStack>
      <Box pl={6}>
        {children}
      </Box>
    </VStack>
  )
}

const LogDetailModal = ({ log, isOpen, onClose }) => {
  const bgColor = useColorModeValue('white', 'cyber.darker')
  const borderColor = useColorModeValue('gray.200', 'cyber.blue')

  if (!log) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent bg={bgColor} borderColor={borderColor} borderWidth="1px">
        <ModalHeader>
          <HStack>
            <Icon as={FileText} boxSize={5} color="cyber.blue" />
            <Text>Log Details</Text>
          </HStack>
        </ModalHeader>
        <ModalCloseButton />
        
        <ModalBody>
          <VStack spacing={6} align="stretch">
            <DetailRow icon={Clock} label="Timestamp">
              <VStack align="start" spacing={1}>
                <Text fontSize="md" fontWeight="medium">
                  {formatTimestamp(log.timestamp)}
                </Text>
                <Text fontSize="sm" color="gray.500">
                  {formatRelativeTime(log.timestamp)}
                </Text>
              </VStack>
            </DetailRow>

            <Divider />

            <DetailRow icon={Globe} label="IP Address">
              <Code fontSize="md" colorScheme="blue">
                {log.ip_address || 'N/A'}
              </Code>
            </DetailRow>

            <Divider />

            <DetailRow icon={Activity} label="HTTP Method">
              <Badge
                colorScheme={log.method === 'GET' ? 'green' : log.method === 'POST' ? 'blue' : 'orange'}
                variant="solid"
                fontSize="md"
                px={3}
                py={1}
              >
                {log.method}
              </Badge>
            </DetailRow>

            <Divider />

            <DetailRow icon={ExternalLink} label="URL">
              <Code fontSize="sm" wordBreak="break-all" whiteSpace="pre-wrap">
                {log.url}
              </Code>
            </DetailRow>

            {log.query_string && (
              <>
                <Divider />
                <DetailRow icon={Hash} label="Query String">
                  <Code fontSize="sm" wordBreak="break-all" whiteSpace="pre-wrap">
                    {log.query_string}
                  </Code>
                </DetailRow>
              </>
            )}

            <Divider />

            <DetailRow icon={Server} label="Status Code">
              <Badge 
                colorScheme={getStatusColor(log.status)} 
                variant="solid"
                fontSize="md"
                px={3}
                py={1}
              >
                {log.status}
              </Badge>
            </DetailRow>

            <Divider />

            <DetailRow icon={Shield} label="Security Decision">
              <HStack>
                <Badge 
                  colorScheme={getDecisionColor(log.decision)} 
                  variant="solid"
                  fontSize="md"
                  px={3}
                  py={1}
                >
                  {log.decision}
                </Badge>
                {log.decision_maker && (
                  <Text fontSize="sm" color="gray.500">
                    by {log.decision_maker}
                  </Text>
                )}
              </HStack>
            </DetailRow>

            <Divider />

            <DetailRow icon={Target} label="Confidence Level">
              <Badge 
                colorScheme={getConfidenceColor(log.confidence)} 
                variant="outline"
                fontSize="md"
                px={3}
                py={1}
              >
                {log.confidence}
              </Badge>
            </DetailRow>

            <Divider />

            <DetailRow icon={User} label="User Agent">
              <Code fontSize="sm" wordBreak="break-all" whiteSpace="pre-wrap">
                {log.user_agent}
              </Code>
            </DetailRow>

            {log.reasoning && (
              <>
                <Divider />
                <DetailRow icon={FileText} label="Reasoning">
                  <Box 
                    p={4} 
                    bg={useColorModeValue('gray.50', 'gray.700')} 
                    borderRadius="md"
                    borderWidth="1px"
                    borderColor={useColorModeValue('gray.200', 'gray.600')}
                  >
                    <Text fontSize="sm" lineHeight="tall">
                      {log.reasoning}
                    </Text>
                  </Box>
                </DetailRow>
              </>
            )}
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default LogDetailModal