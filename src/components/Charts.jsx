import { useMemo } from 'react'
import { motion } from 'framer-motion'

function Bar({ value, label, color='bg-fuchsia-500' }){
  return (
    <div className="flex items-end gap-2">
      <div className="w-8 text-xs text-white/60">{label}</div>
      <div className="h-24 w-full bg-white/5 rounded-lg overflow-hidden">
        <div className={`${color} h-full`} style={{ width: `${value*100}%` }} />
      </div>
    </div>
  )
}

export function ProvinceBars({ data }){
  const top = useMemo(()=>data.slice(0,6), [data])
  return (
    <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.6}}
      className="rounded-2xl p-5 md:p-6 backdrop-blur-xl bg-black/40 border border-white/10">
      <h4 className="text-white/80 font-semibold mb-4">Distribution by Province</h4>
      <div className="space-y-3">
        {top.map(([p, count], idx)=> (
          <Bar key={p} value={count/top[0][1]} label={p.split(' ').map(w=>w[0]).join('')} color={idx%2? 'bg-purple-500':'bg-fuchsia-500'} />
        ))}
      </div>
    </motion.div>
  )
}

export function YearTrend({ data }){
  const max = Math.max(...data.map(d=>d.invest)) || 1
  return (
    <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.6}}
      className="rounded-2xl p-5 md:p-6 backdrop-blur-xl bg-black/40 border border-white/10">
      <h4 className="text-white/80 font-semibold mb-4">Investment Rate by Birth Year</h4>
      <div className="relative h-36 md:h-48">
        <svg className="absolute inset-0 w-full h-full">
          <defs>
            <linearGradient id="grad" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#a855f7"/>
              <stop offset="100%" stopColor="#ec4899"/>
            </linearGradient>
          </defs>
          <polyline fill="none" stroke="url(#grad)" strokeWidth="3"
            points={data.map((d,i)=>{
              const x = (i/(data.length-1||1))*100
              const y = 100 - (d.invest/max)*100
              return `${x},${y}`
            }).join(' ')}
            vectorEffect="non-scaling-stroke" />
        </svg>
      </div>
      <div className="mt-2 text-xs text-white/60 grid grid-cols-6">
        {data.map(d=> (<span key={d.year}>{d.year}</span>))}
      </div>
    </motion.div>
  )
}
