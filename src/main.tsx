import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// No StrictMode: its dev-only double-invoked effects race Framer Motion's
// scroll-triggered `whileInView` animations, freezing them mid-fade on any
// fast scroll in `npm run dev` (images/text stuck at partial opacity).
// Production builds never double-invoke, so this only ever affected local dev.
createRoot(document.getElementById('root')!).render(<App />)
