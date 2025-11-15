import { motion } from 'framer-motion'

export default function MetricCard({ label, value, suffix='', glow='from-fuchsia-500 to-purple-500' }){
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="relative rounded-2xl p-[1px] bg-gradient-to-br from-white/40 to-white/5">
      <div className="relative rounded-2xl p-5 md:p-6 backdrop-blur-xl bg-black/40 border border-white/10 overflow-hidden">
        <div className={`pointer-events-none absolute -inset-20 bg-gradient-to-br ${glow} opacity-30 blur-3xl`} />
        <p className="text-xs uppercase tracking-widest text-white/60">{label}</p>
        <div className="mt-2 text-3xl md:text-4xl font-semibold text-white">{value}{suffix}</div>
      </div>
    </motion.div>
  )
}
