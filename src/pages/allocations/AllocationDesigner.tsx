import { useState } from 'react'
import { PageHeader } from '@/components/PageHeader'
import { Panel, Note } from '@/components/ui'
import { LineChart, BucketBar } from '@/components/charts'
import { cx, walk } from '@/lib/format'

// Faithful to the BNP "Allocation Designer" mockup (3 allocations, Analysis / Backtests).
const BLOCK_COLORS: Record<string, string> = {
  'Private real estate': '#3ecf8e', 'Private equity': '#2b9e6e', 'Private debt': '#1f7a52', 'Alt. strategies': '#7c6bd0',
  'Real estate sec.': '#e06b5e', 'Real estate': '#e06b5e', Structured: '#c9a24b', 'Structured prod.': '#c9a24b',
  Infrastructure: '#3ecf8e', 'Eq. emerging': '#4f86d6', 'Eq. EAFE': '#5b93de', 'Eq. US': '#c9a24b',
  'Plain equity': '#7c6bd0', 'Cash EM': '#d9b877', 'Total bonds': '#e0894e', Liquidity: '#8a94a8',
}

interface Alloc { id: number; color: string; blocks: { label: string; pct: number }[]; ret: number; vol: number; var: number; ttr: number; liq: { label: string; pct: number; color: string }[]; drawdown: number }

const LIQ_COLORS = { Daily: '#3ecf8e', Monthly: '#4f86d6', Quarterly: '#c9a24b', Illiquid: '#e06b5e' }
function liq(d: number, m: number, q: number, i: number) {
  return [
    { label: 'Daily', pct: d, color: LIQ_COLORS.Daily },
    { label: 'Monthly', pct: m, color: LIQ_COLORS.Monthly },
    { label: 'Quarterly', pct: q, color: LIQ_COLORS.Quarterly },
    { label: 'Illiquid', pct: i, color: LIQ_COLORS.Illiquid },
  ]
}

const ALLOCS: Alloc[] = [
  {
    id: 1, color: '#3ecf8e', ret: 3.5, vol: 4.8, var: -3.7, ttr: 14, drawdown: -19.8, liq: liq(40, 30, 15, 15),
    blocks: [
      { label: 'Private real estate', pct: 9 }, { label: 'Private equity', pct: 7 }, { label: 'Private debt', pct: 5 },
      { label: 'Alt. strategies', pct: 4 }, { label: 'Real estate sec.', pct: 6 }, { label: 'Structured prod.', pct: 7 },
      { label: 'Eq. emerging', pct: 6 }, { label: 'Eq. EAFE', pct: 8 }, { label: 'Eq. US', pct: 7 },
      { label: 'Total bonds', pct: 9 }, { label: 'Liquidity', pct: 7 },
    ],
  },
  {
    id: 2, color: '#4f86d6', ret: 4.3, vol: 8.1, var: -6.3, ttr: 22, drawdown: -24, liq: liq(55, 25, 12, 8),
    blocks: [
      { label: 'Infrastructure', pct: 6 }, { label: 'Private equity', pct: 5 }, { label: 'Private debt', pct: 4 },
      { label: 'Alt. strategies', pct: 5 }, { label: 'Real estate', pct: 4 }, { label: 'Structured', pct: 6 },
      { label: 'Eq. emerging', pct: 8 }, { label: 'Eq. EAFE', pct: 9 }, { label: 'Eq. US', pct: 10 },
      { label: 'Total bonds', pct: 8 }, { label: 'Liquidity', pct: 9 },
    ],
  },
  {
    id: 3, color: '#c9a24b', ret: 3.4, vol: 9.6, var: -8.6, ttr: 31, drawdown: -49.6, liq: liq(70, 15, 8, 7),
    blocks: [
      { label: 'Infrastructure', pct: 4 }, { label: 'Private equity', pct: 4 }, { label: 'Alt. strategies', pct: 4 },
      { label: 'Structured', pct: 5 }, { label: 'Eq. emerging', pct: 7 }, { label: 'Eq. EAFE', pct: 9 },
      { label: 'Plain equity', pct: 5 }, { label: 'Eq. US', pct: 15 }, { label: 'Total bonds', pct: 12 },
      { label: 'Cash EM', pct: 8 }, { label: 'Liquidity', pct: 7 },
    ],
  },
]
const REF_DRAWDOWN = -46.8

export function AllocationDesigner() {
  const [tab, setTab] = useState<'Analysis' | 'Backtests'>('Analysis')
  return (
    <>
      <PageHeader
        back={{ to: '/allocations', label: 'Retour aux profils' }}
        title="Simulateur d'allocation"
        sub="Allocation Designer — comparaison de 3 allocations stratégiques · réf. EXE-06032022"
        right={
          <div className="flex rounded-md border border-line bg-ink-800 p-0.5">
            {(['Analysis', 'Backtests'] as const).map((t) => (
              <button key={t} onClick={() => setTab(t)} className={cx('rounded px-4 py-1.5 text-sm transition-colors', tab === t ? 'bg-ink-700 text-chalk' : 'text-mute hover:text-chalk')}>{t}</button>
            ))}
          </div>
        }
      />

      <Note tone="neutral" >
        Outil de présentation stratégique : comparez 3 allocations par classe d'actifs (cotées & non cotées), avec métriques risque / rendement / liquidité normalisées. Réf. fonctionnelle de la couche « allocation cible » du Chat IA.
      </Note>

      {tab === 'Analysis' ? (
        <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Panel className="p-4">
              <div className="mb-3 flex gap-2">
                {ALLOCS.map((a) => (
                  <span key={a.id} className="flex items-center gap-1.5 rounded-full border border-line px-3 py-1 text-2xs text-mute">
                    <span className="flex h-4 w-4 items-center justify-center rounded-full font-mono text-[9px] text-white" style={{ background: a.color }}>{a.id}</span> Allocation {a.id}
                  </span>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-3">
                {ALLOCS.map((a) => (
                  <div key={a.id} className="space-y-1">
                    <div className="mb-1 flex items-center gap-1.5 label"><span className="flex h-3.5 w-3.5 items-center justify-center rounded-full font-mono text-[8px] text-white" style={{ background: a.color }}>{a.id}</span>Allocation {a.id}</div>
                    {a.blocks.map((b) => (
                      <div key={b.label} className="flex items-center justify-between rounded px-2 text-2xs text-white" style={{ background: BLOCK_COLORS[b.label] ?? '#6b7894', height: `${Math.max(b.pct * 2.4, 18)}px` }}>
                        <span className="truncate">{b.label}</span>
                        <span className="font-mono tnum">{b.pct}%</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </Panel>
          </div>

          {/* Metrics panel */}
          <div className="space-y-4">
            <Panel className="p-4">
              <div className="label-b mb-3">Performance — Expected return (5–10 Y)</div>
              {ALLOCS.map((a) => (
                <MetricRow key={a.id} id={a.id} color={a.color} value={`+${a.ret}%`} pctWidth={(a.ret / 5) * 100} tone="pos" />
              ))}
            </Panel>
            <Panel className="p-4">
              <div className="label-b mb-3">Risk — Volatility · VAR · Time to recover</div>
              {ALLOCS.map((a) => (
                <MetricRow key={a.id} id={a.id} color={a.color} value={`${a.vol}%`} pctWidth={(a.vol / 10) * 100} tone="neutral" />
              ))}
              <div className="label mt-3">VAR 95 %</div>
              {ALLOCS.map((a) => (
                <div key={a.id} className="flex items-center justify-between py-0.5 text-2xs">
                  <span className="text-faint">Allocation {a.id}</span><span className="font-mono text-loss tnum">{a.var}%</span>
                </div>
              ))}
              <div className="label mb-1 mt-3">Time to recover (months)</div>
              <div className="grid grid-cols-3 gap-2">
                {ALLOCS.map((a) => (
                  <div key={a.id} className="rounded border border-line bg-ink-800 py-2 text-center">
                    <div className="font-mono text-lg text-chalk tnum">{a.ttr}</div>
                    <div className="label">alloc {a.id}</div>
                  </div>
                ))}
              </div>
            </Panel>
            <Panel className="p-4">
              <div className="label-b mb-3">Liquidity — bucket par allocation</div>
              {ALLOCS.map((a) => (
                <div key={a.id} className="mb-2">
                  <div className="mb-1 label">Allocation {a.id}</div>
                  <BucketBar segments={a.liq} />
                </div>
              ))}
              <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
                {Object.entries(LIQ_COLORS).map(([k, c]) => (
                  <span key={k} className="flex items-center gap-1 font-mono text-[10px] text-faint"><span className="h-2 w-2 rounded-sm" style={{ background: c }} />{k}</span>
                ))}
              </div>
            </Panel>
          </div>
        </div>
      ) : (
        <BacktestsTab />
      )}
    </>
  )
}

function MetricRow({ id, color, value, pctWidth, tone }: { id: number; color: string; value: string; pctWidth: number; tone: 'pos' | 'neutral' }) {
  return (
    <div className="mb-1.5 flex items-center gap-2">
      <span className="w-3 shrink-0 font-mono text-2xs text-faint">{id}</span>
      <div className="h-3 flex-1 overflow-hidden rounded-sm bg-ink-700">
        <div className="h-full rounded-sm" style={{ width: `${Math.min(pctWidth, 100)}%`, background: color }} />
      </div>
      <span className={cx('w-12 text-right font-mono text-2xs tnum', tone === 'pos' ? 'text-gain' : 'text-chalk')}>{value}</span>
    </div>
  )
}

function BacktestsTab() {
  return (
    <div className="mt-5 space-y-5">
      <Panel className="p-4">
        <div className="flex flex-wrap items-end gap-4">
          <div>
            <div className="label mb-1">Période historique</div>
            <select className="rounded-md border border-line bg-ink-800 px-3 py-2 text-sm text-chalk"><option>10 ans · Déc 2016 – Déc 2026</option><option>5 ans · Déc 2021 – Déc 2026</option></select>
          </div>
          <div>
            <div className="label mb-1">Classe de référence</div>
            <select className="rounded-md border border-line bg-ink-800 px-3 py-2 text-sm text-chalk"><option>Equities Developed Markets</option><option>Balanced 50/50</option></select>
          </div>
        </div>
      </Panel>

      <Panel className="p-4">
        <div className="label-b mb-4">Historical Max Drawdown</div>
        <div className="space-y-3">
          {ALLOCS.map((a) => (
            <div key={a.id} className="flex items-center gap-3">
              <span className="w-24 text-2xs text-mute">Allocation {a.id}</span>
              <div className="relative h-4 flex-1 overflow-hidden rounded-sm bg-ink-700">
                <div className="h-full rounded-sm" style={{ width: `${(Math.abs(a.drawdown) / 50) * 100}%`, background: a.color }} />
              </div>
              <span className="w-16 text-right font-mono text-sm text-loss tnum">{a.drawdown}%</span>
            </div>
          ))}
          <div className="flex items-center gap-3 border-t border-line pt-3">
            <span className="w-24 text-2xs text-faint">Référence</span>
            <div className="relative h-4 flex-1 overflow-hidden rounded-sm bg-ink-700">
              <div className="h-full rounded-sm bg-idx" style={{ width: `${(Math.abs(REF_DRAWDOWN) / 50) * 100}%` }} />
            </div>
            <span className="w-16 text-right font-mono text-sm text-faint tnum">{REF_DRAWDOWN}%</span>
          </div>
        </div>
      </Panel>

      <Panel className="p-4">
        <div className="label-b mb-2">Performance cumulée simulée · 10 ans</div>
        <LineChart profil={walk(3, 40, 0.9, 3, 100)} indice={walk(77, 40, 0.5, 3.4, 100)} color="#3ecf8e" height={180} showLegend />
      </Panel>
    </div>
  )
}
