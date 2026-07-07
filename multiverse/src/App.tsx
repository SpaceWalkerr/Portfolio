import { lazy, Suspense, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Cinematic, wasIntroSkipped } from './components/intro/Cinematic'
import { MultiverseHub } from './components/hub/MultiverseHub'

const About = lazy(() =>
  import('./components/about/About').then((m) => ({ default: m.About })),
)

function Home() {
  // Skip choice persists for the session — repeat visits go straight to the hub.
  const [introDone, setIntroDone] = useState(wasIntroSkipped)
  if (!introDone) return <Cinematic onDone={() => setIntroDone(true)} />
  return <MultiverseHub />
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/about"
          element={
            <Suspense fallback={<div className="h-full bg-void" />}>
              <About />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}
