import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { LazyMotion, MotionConfig, domAnimation } from 'framer-motion'
import './index.css'
import App from './App.tsx'

// LazyMotion + the `domAnimation` feature bundle (with `m` components in place
// of `motion`) keeps Framer Motion's drag/layout features out of the bundle —
// the app uses none of them. `strict` fails fast in dev if a full `motion`
// component ever sneaks back in and silently reinflates the bundle.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <App />
      </MotionConfig>
    </LazyMotion>
  </StrictMode>,
)
