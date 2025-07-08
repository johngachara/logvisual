import React from 'react'
import {
  HStack,
  Button,
  Text,
  Select,
  Box,
  IconButton,
  useColorModeValue,
} from '@chakra-ui/react'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'

const Pagination = ({
  currentPage,
  totalPages,
  totalCount,
  pageSize,
  onPageChange,
  onPageSizeChange,
}) => {
  const bgColor = useColorModeValue('white', 'cyber.darker')
  const borderColor = useColorModeValue('gray.200', 'cyber.blue')

  const getPageNumbers = () => {
    const delta = 2
    const range = []
    const rangeWithDots = []

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i)
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...')
    } else {
      rangeWithDots.push(1)
    }

    rangeWithDots.push(...range)

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages)
    } else {
      rangeWithDots.push(totalPages)
    }

    return rangeWithDots
  }

  const startItem = (currentPage - 1) * pageSize + 1
  const endItem = Math.min(currentPage * pageSize, totalCount)

  return (
    <Box
      bg={bgColor}
      borderWidth="1px"
      borderColor={borderColor}
      borderRadius="lg"
      p={4}
      mt={6}
    >
      <HStack justify="space-between" align="center">
        <HStack spacing={4}>
          <Text fontSize="sm" color="gray.500">
            Showing {startItem} to {endItem} of {totalCount} results
          </Text>
          
          <HStack>
            <Text fontSize="sm" color="gray.500">
              Rows per page:
            </Text>
            <Select
              size="sm"
              value={pageSize}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
              w="80px"
            >
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
              <option value={200}>200</option>
            </Select>
          </HStack>
        </HStack>

        <HStack spacing={2}>
          <IconButton
            icon={<ChevronsLeft size={16} />}
            size="sm"
            onClick={() => onPageChange(1)}
            isDisabled={currentPage === 1}
            aria-label="First page"
          />
          
          <IconButton
            icon={<ChevronLeft size={16} />}
            size="sm"
            onClick={() => onPageChange(currentPage - 1)}
            isDisabled={currentPage === 1}
            aria-label="Previous page"
          />

          {getPageNumbers().map((page, index) => (
            <React.Fragment key={index}>
              {page === '...' ? (
                <Text px={2} color="gray.500">
                  ...
                </Text>
              ) : (
                <Button
                  size="sm"
                  variant={currentPage === page ? 'solid' : 'ghost'}
                  colorScheme={currentPage === page ? 'blue' : 'gray'}
                  onClick={() => onPageChange(page)}
                >
                  {page}
                </Button>
              )}
            </React.Fragment>
          ))}

          <IconButton
            icon={<ChevronRight size={16} />}
            size="sm"
            onClick={() => onPageChange(currentPage + 1)}
            isDisabled={currentPage === totalPages}
            aria-label="Next page"
          />
          
          <IconButton
            icon={<ChevronsRight size={16} />}
            size="sm"
            onClick={() => onPageChange(totalPages)}
            isDisabled={currentPage === totalPages}
            aria-label="Last page"
          />
        </HStack>
      </HStack>
    </Box>
  )
}

export default Pagination