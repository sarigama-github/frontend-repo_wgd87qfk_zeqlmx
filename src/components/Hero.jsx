import Spline from '@splinetool/react-spline'
import { motion } from 'framer-motion'

export default function Hero(){
  return (
    <section className="relative h-[68vh] md:h-[72vh] rounded-3xl overflow-hidden border border-white/10 bg-[radial-gradient(1250px_400px_at_10%_-20%,#3b0764_40%,transparent),radial-gradient(1250px_500px_at_90%_120%,#1d4ed8_20%,transparent)]">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/wwTRdG1D9CkNs368/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-purple-600/10 via-fuchsia-500/10 to-blue-600/10" />
      <div className="relative z-10 h-full grid place-items-center text-center px-6">
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.8}}>
          <p className="text-xs md:text-sm uppercase tracking-[0.3em] text-fuchsia-300/80">Futuristic Fintech Insights</p>
          <h1 className="mt-3 text-3xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-br from-fuchsia-300 via-purple-200 to-blue-300 drop-shadow-[0_0_30px_rgba(236,72,153,0.25)]">
            Analyzing the Financial DNA of Generation Z
          </h1>
          <p className="mt-4 text-white/70 max-w-3xl mx-auto">
            Explore adoption, credit behavior, and investment patterns through interactive filters and neon-glass visuals.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
