import { createRoot } from 'react-dom/client'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import App from './App.jsx'

export const theme = extendTheme({
  fonts: {
    body: "'Josefin Sans', sans-serif"
  },
  initialColorMode: 'dark',
  useSystemColorMode: false,
});

createRoot(document.getElementById('root')).render(
  <ChakraProvider theme={theme}>
    <App />
  </ChakraProvider>,
)
