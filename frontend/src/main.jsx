import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* browser router is used to enable routing in our app for example to navigate between home page and product page without refreshing the page */}
    <BrowserRouter> 
      <App />
    </BrowserRouter>
  </StrictMode>,
)