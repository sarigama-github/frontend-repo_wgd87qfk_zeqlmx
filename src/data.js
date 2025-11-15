// Synthetic dataset for Gen Z financial DNA dashboard
// Each record: { id, gender, birth_year, province, fintech_adoption (0-1), credit_score (300-850), investment_rate (0-1), spend_save_ratio }
export const provinces = [
  'Ontario','Quebec','British Columbia','Alberta','Manitoba','Saskatchewan','Nova Scotia','New Brunswick','Newfoundland and Labrador','Prince Edward Island'
]

function randomFrom(arr){return arr[Math.floor(Math.random()*arr.length)]}

const genders = ['Female','Male','Non-binary']
const years = Array.from({length: 2002-1997+1}, (_,i)=>1997+i)

export const dataset = Array.from({length: 480}, (_,i)=>{
  const birth_year = randomFrom(years)
  const gender = randomFrom(genders)
  const province = randomFrom(provinces)
  const fintech_base = 0.62 + (birth_year-1997)*0.05/5
  const fintech_adoption = Math.min(0.96, Math.max(0.28, fintech_base + (Math.random()-0.5)*0.22))
  const credit_score = Math.round(580 + (Math.random()*220) + (fintech_adoption-0.6)*90)
  const investment_rate = Math.min(0.9, Math.max(0.05, 0.25 + (Math.random()-0.5)*0.22 + (credit_score-650)/1000))
  const spend_save_ratio = Math.min(3.0, Math.max(0.5, 1.1 + (Math.random()-0.5)*0.8 + (1-investment_rate)))
  return { id: i+1, gender, birth_year, province, fintech_adoption, credit_score, investment_rate, spend_save_ratio }
})

export function filterData({ genders: gSel, yearsRange, provinces: pSel }){
  return dataset.filter(d=>
    (gSel.size===0 || gSel.has(d.gender)) &&
    d.birth_year>=yearsRange[0] && d.birth_year<=yearsRange[1] &&
    (pSel.size===0 || pSel.has(d.province))
  )
}

export function aggregate(filtered){
  const avg = (arr,sel)=>(arr.length? arr.reduce((a,b)=>a+sel(b),0)/arr.length:0)
  const fintech = avg(filtered, d=>d.fintech_adoption)
  const credit = avg(filtered, d=>d.credit_score)
  const invest = avg(filtered, d=>d.investment_rate)
  const ratio = avg(filtered, d=>d.spend_save_ratio)
  // Province counts
  const byProv = {}
  filtered.forEach(d=>{byProv[d.province]=(byProv[d.province]||0)+1})
  const provinceCounts = Object.entries(byProv).sort((a,b)=>b[1]-a[1])
  // Yearly trend
  const byYearMap = new Map()
  filtered.forEach(d=>{
    const e = byYearMap.get(d.birth_year) || {count:0, invest:0}
    e.count++; e.invest+=d.investment_rate; byYearMap.set(d.birth_year, e)
  })
  const byYear = Array.from(byYearMap.entries()).sort((a,b)=>a[0]-b[0]).map(([year, e])=>({year, invest: e.invest/e.count}))
  return { fintech, credit, invest, ratio, provinceCounts, byYear }
}
