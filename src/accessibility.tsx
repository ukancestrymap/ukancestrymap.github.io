// The accessibility statement's page, at /accessibility/: an entry of its own,
// so the statement has a stable address and loads without the map's data.

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AccessibilityStatement } from './components/AccessibilityStatement.tsx'
import { ThemeProvider } from './components/ThemeProvider.tsx'
import './index.css'

const rootElement = document.getElementById('root')
if (!rootElement) {
  throw new Error('Missing #root element in accessibility/index.html')
}

createRoot(rootElement).render(
  <StrictMode>
    <ThemeProvider>
      <AccessibilityStatement />
    </ThemeProvider>
  </StrictMode>,
)
