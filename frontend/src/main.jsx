// This is the absolute starting point of your React frontend application.
// It grabs the main "App" component and injects it into the actual HTML of the web page.

// Import StrictMode: A developer tool from React that highlights potential problems in your code
import { StrictMode } from 'react'
// Import createRoot: The method used to create a "root" to display React components inside a browser DOM node
import { createRoot } from 'react-dom/client'
// Import the global CSS styles (Tailwind CSS gets injected here)
import './index.css'
// Import the main App component, which holds all other components
import App from './App.jsx'
// Import BrowserRouter: This enables routing (navigating between different pages without reloading the whole browser tab)
import { BrowserRouter } from 'react-router-dom'

// Find the HTML element with the ID 'root' (this is in index.html) and render our React app inside it
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* BrowserRouter wraps our entire app, giving all components inside it access to routing features */}
    <BrowserRouter> 
      <App />
    </BrowserRouter>
  </StrictMode>,
)