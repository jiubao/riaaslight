import { createTheme, ThemeProvider } from '@mui/material/styles'
import React from 'react'
import { createBrowserHistory } from 'history'
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom'
import { MainRouter } from './router'
import './styles/index.scss'
import './styles/utils.scss'

const darkTheme = createTheme({
  palette: {
    mode: 'light',
  },
})

export const history = createBrowserHistory()

function App() {
  return (
    <HistoryRouter history={history}>
      <ThemeProvider theme={darkTheme}>
        <div className="App">
          <MainRouter></MainRouter>
        </div>
      </ThemeProvider>
    </HistoryRouter>
  )
}

export default App
