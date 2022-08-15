import { createTheme, ThemeProvider } from '@mui/material/styles'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { MainRouter } from './router'

const darkTheme = createTheme({
  palette: {
    mode: 'light',
  },
})

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={darkTheme}>
        <div className="App">
          {/* <MainMenu />
          <header className="App-header">
          </header> */}
          <MainRouter></MainRouter>
        </div>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
