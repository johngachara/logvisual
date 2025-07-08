import React from 'react'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import theme from './theme'
import Dashboard from './components/dashboard/Dashboard'

function App() {
  return (
    <>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ChakraProvider theme={theme}>
        <Dashboard />
      </ChakraProvider>
    </>
  )
}

export default App