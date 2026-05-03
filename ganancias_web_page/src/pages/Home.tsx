import { Navbar } from '../components/layout/Navbar'
import { Footer } from '../components/layout/Footer'
import { Hero } from '../components/sections/Hero'
import { TrustBar } from '../components/sections/TrustBar'
import { TargetClients } from '../components/sections/TargetClients'
import { Services } from '../components/sections/Services'
import { MissionVision } from '../components/sections/MissionVision'
import { SecurityInfo } from '../components/sections/SecurityInfo'
import { DiagnosticCTA } from '../components/sections/DiagnosticCTA'
import { Contact } from '../components/sections/Contact'
import { DiagnosticModal } from '../components/diagnostic/DiagnosticModal'

export function Home() {
  return (
    <div className="page-grid-bg pt-20 sm:pt-24">
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <TargetClients />
        <DiagnosticCTA />
        <Services />
        <MissionVision />
        <SecurityInfo />
        <Contact />
      </main>
      <Footer />
      <DiagnosticModal />
    </div>
  )
}
