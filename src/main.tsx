import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx'
import { Nav } from './components/ui/nav.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Nav />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
