import React, { useState } from 'react'
import {
  Box,
  VStack,
  HStack,
  Text,
  Input,
  Select,
  Button,
  Checkbox,
  CheckboxGroup,
  SimpleGrid,
  InputGroup,
  InputLeftElement,
  Collapse,
  IconButton,
  useDisclosure,
  Badge,
  useColorModeValue,
} from '@chakra-ui/react'
import { Search, Filter, X, Calendar, ChevronDown, ChevronUp } from 'lucide-react'

const FilterPanel = ({ filters, onFiltersChange, onClearFilters }) => {
  const { isOpen, onToggle } = useDisclosure()
  const [localFilters, setLocalFilters] = useState(filters)

  const bgColor = useColorModeValue('white', 'cyber.darker')
  const borderColor = useColorModeValue('gray.200', 'cyber.blue')

  const handleFilterChange = (key, value) => {
    const newFilters = { ...localFilters, [key]: value }
    setLocalFilters(newFilters)
    onFiltersChange(newFilters)
  }

  const handleClearFilters = () => {
    const emptyFilters = {
      searchTerm: '',
      method: [],
      decision: [],
      confidence: [],
      status: [],
      dateRange: null,
    }
    setLocalFilters(emptyFilters)
    onClearFilters()
  }

  const getActiveFiltersCount = () => {
    let count = 0
    if (localFilters.searchTerm) count++
    if (localFilters.method?.length > 0) count++
    if (localFilters.decision?.length > 0) count++
    if (localFilters.confidence?.length > 0) count++
    if (localFilters.status?.length > 0) count++
    if (localFilters.dateRange) count++
    return count
  }

  return (
    <Box
      bg={bgColor}
      borderWidth="1px"
      borderColor={borderColor}
      borderRadius="lg"
      p={4}
      mb={6}
    >
      <HStack justify="space-between" mb={4}>
        <HStack>
          <Filter size={20} />
          <Text fontSize="lg" fontWeight="bold">
            Filters
          </Text>
          {getActiveFiltersCount() > 0 && (
            <Badge colorScheme="blue" variant="solid">
              {getActiveFiltersCount()}
            </Badge>
          )}
        </HStack>
        
        <HStack>
          <Button
            size="sm"
            variant="ghost"
            leftIcon={<X size={16} />}
            onClick={handleClearFilters}
            isDisabled={getActiveFiltersCount() === 0}
          >
            Clear All
          </Button>
          <IconButton
            icon={isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            size="sm"
            variant="ghost"
            onClick={onToggle}
            aria-label="Toggle filters"
          />
        </HStack>
      </HStack>

      <VStack spacing={4} align="stretch">
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <Search size={16} />
          </InputLeftElement>
          <Input
            placeholder="Search IP address, URL, or user agent..."
            value={localFilters.searchTerm || ''}
            onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
          />
        </InputGroup>

        <Collapse in={isOpen}>
          <VStack spacing={4} align="stretch">
            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={4}>
              <Box>
                <Text fontSize="sm" fontWeight="medium" mb={2}>
                  HTTP Method
                </Text>
                <CheckboxGroup
                  value={localFilters.method || []}
                  onChange={(value) => handleFilterChange('method', value)}
                >
                  <VStack align="start" spacing={1}>
                    {['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'].map((method) => (
                      <Checkbox key={method} value={method}>
                        {method}
                      </Checkbox>
                    ))}
                  </VStack>
                </CheckboxGroup>
              </Box>

              <Box>
                <Text fontSize="sm" fontWeight="medium" mb={2}>
                  Decision
                </Text>
                <CheckboxGroup
                  value={localFilters.decision || []}
                  onChange={(value) => handleFilterChange('decision', value)}
                >
                  <VStack align="start" spacing={1}>
                    {['allow', 'block', 'monitor', 'suspicious'].map((decision) => (
                      <Checkbox key={decision} value={decision}>
                        {decision.charAt(0).toUpperCase() + decision.slice(1)}
                      </Checkbox>
                    ))}
                  </VStack>
                </CheckboxGroup>
              </Box>

              <Box>
                <Text fontSize="sm" fontWeight="medium" mb={2}>
                  Confidence Level
                </Text>
                <CheckboxGroup
                  value={localFilters.confidence || []}
                  onChange={(value) => handleFilterChange('confidence', value)}
                >
                  <VStack align="start" spacing={1}>
                    {['high', 'medium', 'low'].map((confidence) => (
                      <Checkbox key={confidence} value={confidence}>
                        {confidence.charAt(0).toUpperCase() + confidence.slice(1)}
                      </Checkbox>
                    ))}
                  </VStack>
                </CheckboxGroup>
              </Box>

              <Box>
                <Text fontSize="sm" fontWeight="medium" mb={2}>
                  Status Code
                </Text>
                <CheckboxGroup
                  value={localFilters.status || []}
                  onChange={(value) => handleFilterChange('status', value)}
                >
                  <VStack align="start" spacing={1}>
                    {[200, 201, 301, 302, 400, 401, 403, 404, 500, 502, 503].map((status) => (
                      <Checkbox key={status} value={status.toString()}>
                        {status}
                      </Checkbox>
                    ))}
                  </VStack>
                </CheckboxGroup>
              </Box>
            </SimpleGrid>

            <Box>
              <Text fontSize="sm" fontWeight="medium" mb={2}>
                Date Range
              </Text>
              <HStack>
                <Input
                  type="datetime-local"
                  value={localFilters.dateRange?.start || ''}
                  onChange={(e) => handleFilterChange('dateRange', {
                    ...localFilters.dateRange,
                    start: e.target.value
                  })}
                />
                <Text>to</Text>
                <Input
                  type="datetime-local"
                  value={localFilters.dateRange?.end || ''}
                  onChange={(e) => handleFilterChange('dateRange', {
                    ...localFilters.dateRange,
                    end: e.target.value
                  })}
                />
              </HStack>
            </Box>
          </VStack>
        </Collapse>
      </VStack>
    </Box>
  )
}

export default FilterPanel