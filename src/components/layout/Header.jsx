import React from 'react'
import {
  Box,
  Flex,
  Heading,
  Spacer,
  Button,
  IconButton,
  useColorMode,
  useColorModeValue,
  HStack,
  Badge,
  Icon,
} from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { Shield, Activity, Download, RefreshCw } from 'lucide-react'

const Header = ({ onRefresh, onExport, isLoading, totalLogs }) => {
  const { colorMode, toggleColorMode } = useColorMode()
  const bgColor = useColorModeValue('white', 'cyber.darker')
  const borderColor = useColorModeValue('gray.200', 'cyber.blue')

  return (
    <Box
      bg={bgColor}
      borderBottom="1px"
      borderColor={borderColor}
      px={6}
      py={4}
      boxShadow="sm"
    >
      <Flex align="center">
        <HStack spacing={3}>
          <Icon as={Shield} boxSize={8} color="cyber.blue" />
          <Heading size="lg" color="cyber.blue">
            CyberGuard
          </Heading>
          <Badge colorScheme="blue" variant="subtle" ml={2}>
            Log Monitor
          </Badge>
        </HStack>

        <Spacer />

        <HStack spacing={4}>
          <HStack spacing={2}>
            <Icon as={Activity} boxSize={4} />
            <Badge colorScheme="green" variant="outline">
              {totalLogs} Total Logs
            </Badge>
          </HStack>

          <Button
            variant="cyber"
            size="sm"
            leftIcon={<RefreshCw size={16} />}
            onClick={onRefresh}
            isLoading={isLoading}
            loadingText="Refreshing"
          >
            Refresh
          </Button>

          <Button
            variant="outline"
            size="sm"
            leftIcon={<Download size={16} />}
            onClick={onExport}
          >
            Export
          </Button>

          <IconButton
            icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            onClick={toggleColorMode}
            variant="ghost"
            size="sm"
            aria-label="Toggle color mode"
          />
        </HStack>
      </Flex>
    </Box>
  )
}

export default Header