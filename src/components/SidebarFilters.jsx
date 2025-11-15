import { useEffect, useMemo, useState } from 'react'
import { provinces, dataset } from '../data'
import { ChevronDown } from 'lucide-react'

export default function SidebarFilters({ onChange }){
  const genders = ['Female','Male','Non-binary']
  const years = useMemo(()=>{
    const ys = dataset.map(d=>d.birth_year)
    return [Math.min(...ys), Math.max(...ys)]
  },[])
  const [genderSel, setGenderSel] = useState(new Set())
  const [provinceSel, setProvinceSel] = useState(new Set())
  const [yearsRange, setYearsRange] = useState([years[0], years[1]])

  useEffect(()=>{
    onChange({ genders: genderSel, provinces: provinceSel, yearsRange })
  },[genderSel, provinceSel, yearsRange])

  const toggle = (set, val)=>{
    const s = new Set(Array.from(set))
    s.has(val)? s.delete(val): s.add(val)
    return s
  }

  return (
    <aside className="w-full md:w-72 p-4 md:p-6 backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl shadow-[0_0_1px_#fff_inset] text-white space-y-6">
      <div>
        <h3 className="text-sm uppercase tracking-widest text-white/60 mb-3">Gender</h3>
        <div className="flex flex-wrap gap-2">
          {genders.map(g=> (
            <button key={g} onClick={()=>setGenderSel(prev=>toggle(prev,g))}
              className={`px-3 py-1.5 rounded-full text-sm transition-all duration-200 border ${genderSel.has(g)?'bg-pink-500/30 border-pink-400/60 shadow-[0_0_12px_#ec4899aa]':'bg-white/5 border-white/10 hover:bg-white/10'}`}>
              {g}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm uppercase tracking-widest text-white/60 mb-3">Birth years</h3>
        <div className="px-1">
          <div className="flex items-center gap-3 text-white/80 text-sm mb-2">
            <span>{yearsRange[0]}</span>
            <ChevronDown className="w-4 h-4 rotate-90 opacity-60" />
            <span>{yearsRange[1]}</span>
          </div>
          <input type="range" min={years[0]} max={years[1]} value={yearsRange[0]} onChange={e=>setYearsRange([Number(e.target.value), yearsRange[1]])} className="w-full accent-fuchsia-500" />
          <input type="range" min={years[0]} max={years[1]} value={yearsRange[1]} onChange={e=>setYearsRange([yearsRange[0], Number(e.target.value)])} className="w-full mt-2 accent-fuchsia-500" />
        </div>
      </div>

      <div>
        <h3 className="text-sm uppercase tracking-widest text-white/60 mb-3">Provinces</h3>
        <div className="grid grid-cols-1 gap-2 max-h-52 pr-2 overflow-auto scrollbar-thin scrollbar-thumb-white/10">
          {provinces.map(p=> (
            <label key={p} className="flex items-center justify-between gap-3 px-3 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10">
              <span className="text-sm text-white/80">{p}</span>
              <input type="checkbox" checked={provinceSel.has(p)} onChange={()=>setProvinceSel(prev=>toggle(prev,p))} className="accent-pink-500" />
            </label>
          ))}
        </div>
      </div>
    </aside>
  )
}
