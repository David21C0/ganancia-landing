import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { DiagnosticProvider } from './context/DiagnosticProvider'
import { Home } from './pages/Home'
import { ResultsPage } from './pages/ResultsPage'

export default function App() {
  return (
    <DiagnosticProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/resultados/:clientType" element={<ResultsPage />} />
        </Routes>
      </BrowserRouter>
    </DiagnosticProvider>
  )
}
