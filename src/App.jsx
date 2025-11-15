import { useMemo, useState } from 'react'
import Hero from './components/Hero'
import SidebarFilters from './components/SidebarFilters'
import MetricCard from './components/MetricCard'
import { ProvinceBars, YearTrend } from './components/Charts'
import { dataset, filterData, aggregate } from './data'
import { motion } from 'framer-motion'
import { Menu } from 'lucide-react'

function App() {
  const [filters, setFilters] = useState({ genders: new Set(), provinces: new Set(), yearsRange: [1997, 2002] })
  const filtered = useMemo(()=>filterData(filters), [filters])
  const agg = useMemo(()=>aggregate(filtered), [filtered])

  return (
    <div className="min-h-screen bg-[#06060f] text-white relative">
      {/* Neon grainy background */}
      <div className="fixed inset-0 -z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(800px_300px_at_20%_10%,rgba(124,58,237,.25),transparent),radial-gradient(900px_400px_at_80%_90%,rgba(59,130,246,.25),transparent)]" />
        <div className="absolute inset-0 mix-blend-overlay opacity-[0.18]" style={{backgroundImage:'url(https://grainy-gradients.vercel.app/noise.svg)'}} />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 pb-16 pt-6 space-y-10">
        <header className="flex items-center justify-between py-3">
          <div className="flex items-center gap-3">
            <span className="inline-flex size-8 rounded-lg bg-gradient-to-br from-fuchsia-500 to-purple-600 shadow-[0_0_30px_#a21caf66]"></span>
            <h2 className="font-semibold tracking-wide text-white/80">Gen Z Finance</h2>
          </div>
          <button className="md:hidden p-2 rounded-lg bg-white/5 border border-white/10">
            <Menu className="w-5 h-5" />
          </button>
        </header>

        <Hero />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
          <div className="md:col-span-4 lg:col-span-3 order-2 md:order-1">
            <SidebarFilters onChange={setFilters} />
          </div>
          <div className="md:col-span-8 lg:col-span-9 order-1 md:order-2 space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              <MetricCard label="Fintech Adoption" value={(agg.fintech*100).toFixed(0)} suffix="%" />
              <MetricCard label="Avg Credit Score" value={Math.round(agg.credit)} glow="from-purple-500 to-blue-500" />
              <MetricCard label="Investment Rate" value={(agg.invest*100).toFixed(0)} suffix="%" glow="from-sky-500 to-fuchsia-500" />
              <MetricCard label="Spend/Save Ratio" value={agg.ratio.toFixed(2)} glow="from-pink-500 to-purple-500" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
              <ProvinceBars data={agg.provinceCounts} />
              <YearTrend data={agg.byYear} />
            </div>

            <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.6}}
              className="rounded-2xl p-6 backdrop-blur-xl bg-black/40 border border-white/10">
              <h4 className="text-white/80 font-semibold mb-3">About this dashboard</h4>
              <p className="text-white/60 text-sm leading-relaxed">This interactive dashboard uses synthetic, anonymized data to illustrate behavioral patterns across gender, birth cohorts, and provinces. Use the filters to explore how adoption and investment shift across the Gen Z spectrum. Visuals feature glassmorphism cards, neon gradients, and smooth micro-animations inspired by futuristic fintech UI.</p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
