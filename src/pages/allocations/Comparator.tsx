import { useState } from 'react'
import { PageHeader } from '@/components/PageHeader'
import { Panel, PanelHeader } from '@/components/ui'
import { Donut, LineChart, assetColor } from '@/components/charts'
import { profiles } from '@/lib/data/profiles'
import { cx, pct, pctw, signClass } from '@/lib/format'
import type { Profile } from '@/lib/types'

export function Comparator() {
  const [aId, setAId] = useState(profiles[0].id)
  const [bId, setBId] = useState(profiles[4].id)
  const a = profiles.find((p) => p.id === aId)!
  const b = profiles.find((p) => p.id === bId)!

  return (
    <>
      <PageHeader back={{ to: '/allocations', label: 'Retour aux profils' }} title="Comparateur de profils" sub="Deux profils côte à côte — mêmes métriques, allocations et courbes" />
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <ProfileColumn profile={a} onSelect={setAId} selected={aId} accent="#4f86d6" />
        <ProfileColumn profile={b} onSelect={setBId} selected={bId} accent="#e06b5e" />
      </div>
    </>
  )
}

function ProfileColumn({ profile, onSelect, selected, accent }: { profile: Profile; onSelect: (id: string) => void; selected: string; accent: string }) {
  const metrics: [string, string, string][] = [
    ['Perf. YTD', pct(profile.metric.perfYtd), signClass(profile.metric.perfYtd)],
    ['Volatilité 1 an', pct(profile.metric.volatility, 2, false), 'text-chalk'],
    ['Perte max', pct(profile.metric.maxLoss), signClass(profile.metric.maxLoss)],
    ['SRI', `${profile.sri} / 7`, 'text-chalk'],
  ]
  return (
    <Panel>
      <div className="border-b border-line p-4">
        <select value={selected} onChange={(e) => onSelect(e.target.value)} className="w-full rounded-md border border-line bg-ink-800 px-3 py-2 text-sm text-chalk focus:border-ink-500 focus:outline-none">
          {profiles.map((p) => <option key={p.id} value={p.id}>{p.riskType} — {p.contracts}</option>)}
        </select>
      </div>
      <div className="grid grid-cols-2 gap-px bg-line sm:grid-cols-4">
        {metrics.map(([k, v, c]) => (
          <div key={k} className="bg-ink-750 p-3">
            <div className="label mb-1">{k}</div>
            <div className={cx('font-mono text-base tnum', c)}>{v}</div>
          </div>
        ))}
      </div>
      <div className="p-4">
        <LineChart profil={profile.spark} indice={profile.sparkIndex} color={accent} height={130} showLegend />
      </div>
      <PanelHeader title="Allocation" />
      <div className="flex items-center gap-6 p-4">
        <Donut slices={profile.allocation} size={130} thickness={20} />
        <div className="flex-1 space-y-1.5">
          {profile.allocation.map((s) => (
            <div key={s.klass} className="flex items-center gap-2 text-2xs">
              <span className="h-2 w-2 rounded-sm" style={{ background: assetColor(s.klass) }} />
              <span className="flex-1 text-mute">{s.klass}</span>
              <span className="font-mono text-chalk tnum">{pctw(s.pct)}</span>
            </div>
          ))}
        </div>
      </div>
    </Panel>
  )
}
