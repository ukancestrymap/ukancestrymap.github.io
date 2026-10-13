// The analytics page, at /analytics/: an entry of its own,
// so it has a stable address and loads without the map's data.

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AnalyticsPage } from './components/AnalyticsPage.tsx'
import { ThemeProvider } from './components/ThemeProvider.tsx'
import './index.css'

const rootElement = document.getElementById('root')
if (!rootElement) {
  throw new Error('Missing #root element in analytics/index.html')
}

createRoot(rootElement).render(
  <StrictMode>
    <ThemeProvider>
      <AnalyticsPage />
    </ThemeProvider>
  </StrictMode>,
)
