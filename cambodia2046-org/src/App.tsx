import { Routes, Route } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { ScrollToTop } from './components/ScrollToTop'
import { Footer } from './components/Footer'
import { HomePage } from './pages/HomePage'
import { PhilosophyPage } from './pages/PhilosophyPage'
import { EnginesPage } from './pages/EnginesPage'
import { EngineDetailPage } from './pages/EngineDetailPage'
import { RoadmapPage } from './pages/RoadmapPage'
import { InvolvedPage } from './pages/InvolvedPage'
import { AboutPage } from './pages/AboutPage'

export default function App() {
  return (
    <div className="min-h-screen">
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/philosophy" element={<PhilosophyPage />} />
          <Route path="/engines" element={<EnginesPage />} />
          <Route path="/engines/:engineId" element={<EngineDetailPage />} />
          <Route path="/roadmap" element={<RoadmapPage />} />
          <Route path="/involved" element={<InvolvedPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
