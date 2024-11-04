import { BrowserRouter as Router } from 'react-router-dom'
import AppRoutes from './components/AppRoutes'
import { ThemeProvider } from '@mui/material'
import theme from './assets/styles/theme'
import { SnackbarAlertProvider } from './components/SnackbarAlertProvider'
function App() {


  return (
      <ThemeProvider theme={theme}>
        <SnackbarAlertProvider>
          <Router>
            <AppRoutes />
          </Router>
        </SnackbarAlertProvider>
      </ThemeProvider>
  )
}

export default App
