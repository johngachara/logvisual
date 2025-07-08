import {extendTheme}  from '@chakra-ui/react'

const colors = {
  primary: {
    50: '#e3f2fd',
    100: '#bbdefb',
    200: '#90caf9',
    300: '#64b5f6',
    400: '#42a5f5',
    500: '#2196f3',
    600: '#1e88e5',
    700: '#1976d2',
    800: '#1565c0',
    900: '#0d47a1',
  },
  secondary: {
    50: '#f3e5f5',
    100: '#e1bee7',
    200: '#ce93d8',
    300: '#ba68c8',
    400: '#ab47bc',
    500: '#9c27b0',
    600: '#8e24aa',
    700: '#7b1fa2',
    800: '#6a1b9a',
    900: '#4a148c',
  },
  success: {
    50: '#e8f5e8',
    100: '#c8e6c9',
    200: '#a5d6a7',
    300: '#81c784',
    400: '#66bb6a',
    500: '#4caf50',
    600: '#43a047',
    700: '#388e3c',
    800: '#2e7d32',
    900: '#1b5e20',
  },
  warning: {
    50: '#fff8e1',
    100: '#ffecb3',
    200: '#ffe082',
    300: '#ffd54f',
    400: '#ffca28',
    500: '#ffc107',
    600: '#ffb300',
    700: '#ffa000',
    800: '#ff8f00',
    900: '#ff6f00',
  },
  error: {
    50: '#ffebee',
    100: '#ffcdd2',
    200: '#ef9a9a',
    300: '#e57373',
    400: '#ef5350',
    500: '#f44336',
    600: '#e53935',
    700: '#d32f2f',
    800: '#c62828',
    900: '#b71c1c',
  },
  cyber: {
    dark: '#0a0e27',
    darker: '#060a1f',
    blue: '#00d4ff',
    green: '#39ff14',
    red: '#ff073a',
    yellow: '#ffff00',
    purple: '#9d4edd',
    orange: '#ff7b00',
  }
}

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

const styles = {
  global: (props) => ({
    body: {
      bg: props.colorMode === 'dark' ? 'cyber.dark' : 'gray.50',
      color: props.colorMode === 'dark' ? 'white' : 'gray.800',
    },
  }),
}

const components = {
  Button: {
    variants: {
      cyber: (props) => ({
        bg: props.colorMode === 'dark' ? 'cyber.blue' : 'primary.500',
        color: props.colorMode === 'dark' ? 'cyber.dark' : 'white',
        _hover: {
          bg: props.colorMode === 'dark' ? 'cyber.blue' : 'primary.600',
          transform: 'translateY(-2px)',
          boxShadow: 'lg',
        },
        _active: {
          transform: 'translateY(0)',
        },
        transition: 'all 0.2s',
      }),
    },
  },
  Card: {
    baseStyle: (props) => ({
      container: {
        bg: props.colorMode === 'dark' ? 'cyber.darker' : 'white',
        borderColor: props.colorMode === 'dark' ? 'cyber.blue' : 'gray.200',
        borderWidth: '1px',
        borderRadius: 'lg',
        boxShadow: props.colorMode === 'dark' ? '0 0 20px rgba(0, 212, 255, 0.1)' : 'lg',
      },
    }),
  },
  Table: {
    variants: {
      cyber: (props) => ({
        table: {
          bg: props.colorMode === 'dark' ? 'cyber.darker' : 'white',
        },
        thead: {
          bg: props.colorMode === 'dark' ? 'cyber.dark' : 'gray.50',
        },
        tbody: {
          tr: {
            _hover: {
              bg: props.colorMode === 'dark' ? 'rgba(0, 212, 255, 0.05)' : 'gray.50',
            },
          },
        },
      }),
    },
  },
}

const theme = extendTheme({
  config,
  colors,
  styles,
  components,
  fonts: {
    heading: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
    body: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
  },
})

export default theme