// The privacy policy, at /privacy/: an entry of its own,
// so it has a stable address and loads without the map's data.

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { PrivacyPolicy } from './components/PrivacyPolicy.tsx'
import { ThemeProvider } from './components/ThemeProvider.tsx'
import './index.css'

const rootElement = document.getElementById('root')
if (!rootElement) {
  throw new Error('Missing #root element in privacy/index.html')
}

createRoot(rootElement).render(
  <StrictMode>
    <ThemeProvider>
      <PrivacyPolicy />
    </ThemeProvider>
  </StrictMode>,
)
