import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { FileText, ArrowLeftRight, MessageSquareText, FileSpreadsheet, FileOutput, Download, X } from 'lucide-react'
import { PageHeader } from '@/components/PageHeader'
import { Panel, PanelHeader, Button, Badge, Note, SectionLabel } from '@/components/ui'
import { LineChart, Donut, SriPill, assetColor } from '@/components/charts'
import { profileById, profiles } from '@/lib/data/profiles'
import { cx, pct, pctw, signClass, frDateShort } from '@/lib/format'
import type { Profile } from '@/lib/types'

const PERIODS = ['YTD', '1 an', '3 ans', '5 ans']

export function ProfileDetail() {
  const { id } = useParams()
  const p = profileById(id ?? '') ?? profiles[0]
  const [comment, setComment] = useState(false)
  const [arb, setArb] = useState(false)
  const [period, setPeriod] = useState('YTD')

  return (
    <>
      <PageHeader
        back={{ to: '/allocations', label: 'Retour aux compagnies & profils' }}
        title={<span>{p.riskType} <span className="text-mute">— {p.contracts}</span></span>}
        sub={`Indice : ${p.indexClass}`}
        right={
          <div className="flex flex-wrap items-center gap-3">
            <div className="rounded-xl border border-line bg-ink-800 px-4 py-2"><SriPill score={p.sri} /></div>
            <Button variant="default" onClick={() => setArb(true)}><ArrowLeftRight size={14} /> Arbitrages</Button>
            <Button variant="default" onClick={() => setComment(true)}><MessageSquareText size={14} /> Commentaire structurel</Button>
          </div>
        }
      />

      {/* 3 metrics */}
      <div className="mb-6 grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-line bg-line shadow-card">
        <MetricCell label="Perf. YTD au 01/04/2025" value={pct(p.metric.perfYtd)} valueClass={signClass(p.metric.perfYtd)} sub={pct(p.indexMetric.perfYtd)} />
        <MetricCell label="Volatilité 1 an" value={pct(p.metric.volatility, 2, false)} valueClass="text-chalk" sub={pct(p.indexMetric.volatility, 2, false)} />
        <MetricCell label="Perte max historique" value={pct(p.metric.maxLoss)} valueClass={signClass(p.metric.maxLoss)} sub={pct(p.indexMetric.maxLoss)} />
      </div>

      {/* Performances / Risques */}
      <Panel className="mb-6">
        <PanelHeader title="Performances / Risques" right={
          <div className="flex gap-1.5">
            {PERIODS.map((per) => (
              <button
                key={per}
                onClick={() => setPeriod(per)}
                className={cx(
                  'rounded-full border px-3 py-1 text-xs transition-all duration-200 ease-smooth',
                  period === per ? 'border-gold/40 bg-gold/10 text-gold' : 'border-line text-mute hover:border-ink-500 hover:text-chalk',
                )}
              >
                {per}
              </button>
            ))}
          </div>
        } />
        <div className="p-5">
          <div className="mb-4 flex flex-wrap items-end gap-3">
            <DateField label="Du" value="01/01/2025" />
            <DateField label="au" value="01/04/2025" />
            <Button variant="default">Ok</Button>
          </div>
          <LineChart profil={p.spark} indice={p.sparkIndex} showLegend height={170} xLabels={['1-Jan', '15-Jan', '1-Fév', '15-Fév', '1-Mars', '15-Mars', '1-Avr']} color="#4f86d6" />
          <table className="mt-5 w-full">
            <thead>
              <tr className="border-b border-line text-left">
                <th className="label px-2 py-2 font-normal"></th>
                <th className="label px-2 py-2 text-right font-normal">Performance ({period})</th>
                <th className="label px-2 py-2 text-right font-normal">Perte max historique</th>
                <th className="label px-2 py-2 text-right font-normal">Délai recouvrement</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line/60">
              <tr>
                <td className="px-2 py-3 text-sm text-chalk">Profil {p.riskType} — {p.contracts}</td>
                <td className={cx('px-2 py-3 text-right font-mono text-sm tnum', signClass(p.metric.perfYtd))}>{pct(p.metric.perfYtd)}</td>
                <td className={cx('px-2 py-3 text-right font-mono text-sm tnum', signClass(p.metric.maxLoss))}>{pct(p.metric.maxLoss)}</td>
                <td className="px-2 py-3 text-right font-mono text-sm text-mute tnum">{p.metric.recoveryLabel}</td>
              </tr>
              <tr>
                <td className="px-2 py-3 text-sm text-faint">Indice {p.index}</td>
                <td className={cx('px-2 py-3 text-right font-mono text-sm tnum', signClass(p.indexMetric.perfYtd))}>{pct(p.indexMetric.perfYtd)}</td>
                <td className={cx('px-2 py-3 text-right font-mono text-sm tnum', signClass(p.indexMetric.maxLoss))}>{pct(p.indexMetric.maxLoss)}</td>
                <td className="px-2 py-3 text-right font-mono text-sm text-faint tnum">{p.indexMetric.recoveryLabel}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Panel>

      {/* Allocation */}
      <Panel className="mb-6">
        <PanelHeader title="Allocation par classe d'actifs" />
        <div className="flex flex-col items-center gap-8 p-5 sm:flex-row sm:items-center">
          <Donut slices={p.allocation} size={170} thickness={26} />
          <div className="flex-1 space-y-2.5">
            {p.allocation.map((s) => (
              <div key={s.klass} className="flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-sm" style={{ background: assetColor(s.klass) }} />
                <span className="flex-1 text-sm text-mute">{s.klass}</span>
                <span className="font-mono text-sm text-chalk tnum">{pctw(s.pct)}</span>
              </div>
            ))}
          </div>
        </div>
      </Panel>

      {/* Inventaire */}
      <Panel>
        <PanelHeader
          title="Inventaire au 01/04/2025"
          right={
            <div className="flex gap-2.5">
              <Button variant="default" size="sm"><FileSpreadsheet size={13} /> Fichier Excel</Button>
              <Button variant="gold" size="sm"><FileOutput size={13} /> Fichier O2S</Button>
            </div>
          }
        />
        <div className="p-5 pt-3">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[860px]">
              <thead>
                <tr className="border-b border-line text-left">
                  {['Nom', 'ISIN', 'SRI', 'Frais', 'Perf 1er janv', 'Perf depuis achat', 'Quote-part', 'Reporting', 'DIC'].map((h) => (
                    <th key={h} className="label px-3 py-2 font-normal">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-line/60">
                {p.inventory.map((l) => (
                  <tr key={l.isin} className="hover:bg-ink-800">
                    <td className="px-3 py-3 text-sm text-chalk">{l.name}</td>
                    <td className="px-3 py-3 font-mono text-2xs text-faint">{l.isin}</td>
                    <td className="px-3 py-3 font-mono text-sm text-mute tnum">{l.sri}</td>
                    <td className="px-3 py-3 font-mono text-sm text-mute tnum">{pct(l.fees, 2, false)}</td>
                    <td className={cx('px-3 py-3 font-mono text-sm tnum', signClass(l.perfSinceJan))}>{pct(l.perfSinceJan)}</td>
                    <td className={cx('px-3 py-3 font-mono text-sm tnum', signClass(l.perfSinceBuy ?? 0))}>{l.perfSinceBuy != null ? pct(l.perfSinceBuy) : '—'}</td>
                    <td className="px-3 py-3 font-mono text-sm text-chalk tnum">{pctw(l.quotePart, 2)}</td>
                    <td className="px-3 py-3">{l.reporting ? <button title="Reporting mensuel" className="text-gain hover:text-chalk"><FileText size={14} /></button> : <span className="text-ghost">—</span>}</td>
                    <td className="px-3 py-3"><button title="DIC" className="text-mute hover:text-chalk"><FileText size={14} /></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Panel>

      {comment && <StructuralComment p={p} onClose={() => setComment(false)} />}
      {arb && <ArbitrageBox p={p} onClose={() => setArb(false)} />}
    </>
  )
}

function MetricCell({ label, value, valueClass, sub }: { label: string; value: string; valueClass?: string; sub: string }) {
  return (
    <div className="bg-ink-750 p-5">
      <div className="mb-1.5 text-xs text-mute">{label}</div>
      <div className={cx('font-mono text-xl tnum', valueClass)}>{value}</div>
      <div className="mt-1 font-mono text-2xs text-faint tnum">{sub}</div>
    </div>
  )
}

function DateField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="mb-1 text-xs lowercase text-faint">{label}</div>
      <input defaultValue={value} className="w-32 rounded-lg border border-line bg-ink-800 px-3 py-2 font-mono text-sm text-chalk focus:border-ink-500 focus:outline-none" />
    </div>
  )
}

// ─── Overlays ────────────────────────────────────────────────────────────────

function Overlay({ onClose, children, width = 'max-w-3xl' }: { onClose: () => void; children: React.ReactNode; width?: string }) {
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/65 p-4 pt-[6vh] backdrop-blur-sm" onClick={onClose}>
      <div className={cx('w-full animate-scale-in', width)} onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>
  )
}

function StructuralComment({ p, onClose }: { p: Profile; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="flex-1 bg-black/50" onClick={onClose} />
      <aside className="flex w-full max-w-lg animate-slide-in flex-col border-l border-line bg-ink-850 shadow-2xl">
        <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
          <span className="text-sm font-medium text-chalk">Commentaire structurel</span>
          <div className="flex items-center gap-3">
            <span className="text-xs text-faint">{p.riskType} — {p.contracts}</span>
            <button onClick={onClose} className="rounded p-1 text-mute hover:bg-ink-700 hover:text-chalk"><X size={16} /></button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-5">
          <SectionLabel className="mb-2">Description du profil</SectionLabel>
          <p className="text-sm leading-relaxed text-mute">{p.structuralComment.summary}</p>
          <div className="my-4 flex items-center gap-3">
            <span className="text-xs italic text-faint">Composition détaillée par classe d'actifs</span>
            <span className="h-px flex-1 bg-line" />
          </div>
          <div className="space-y-3 text-sm leading-relaxed text-mute">
            {p.structuralComment.detailByClass.map((c, i) => <p key={i}>{c}</p>)}
          </div>
        </div>
      </aside>
    </div>
  )
}

function ArbitrageBox({ p, onClose }: { p: Profile; onClose: () => void }) {
  const [tab, setTab] = useState<'Mouvements' | 'Inventaire'>('Mouvements')
  const a = p.arbitrage
  return (
    <Overlay onClose={onClose} width="max-w-3xl">
      <div className="overflow-hidden rounded-2xl border border-wine/40 bg-ink-800 shadow-2xl">
        <div className="flex flex-wrap items-center justify-between gap-3 bg-wine/85 px-5 py-3">
          <div className="flex items-center gap-3">
            <span className="font-mono text-sm font-medium text-white">Arbitrage au</span>
            <select className="rounded-lg border border-white/25 bg-white/10 px-2.5 py-1 font-mono text-xs text-white focus:outline-none">
              <option>{frDateShort(a.date)}</option>
            </select>
          </div>
          <div className="flex items-center gap-2.5">
            <button className="flex items-center gap-1.5 rounded-lg border border-white/25 bg-white/10 px-2.5 py-1 text-xs text-white transition-colors hover:bg-white/20">
              <Download size={12} /> Export PDF
            </button>
            <span className="text-xs text-white/80">{p.riskType} — {p.contracts}</span>
            <button onClick={onClose} className="rounded p-1 text-white/80 hover:bg-white/10 hover:text-white"><X size={15} /></button>
          </div>
        </div>
        <div className="px-5 py-4">
          <SectionLabel className="mb-2">Justification — contexte macro-économique</SectionLabel>
          <div className="space-y-2.5 text-sm leading-relaxed text-mute">
            {a.macroContext.map((c, i) => <p key={i}>{c}</p>)}
          </div>
          <div className="my-4 grid grid-cols-3 gap-4 border-y border-line py-3.5 text-center">
            <div><div className="mb-1 text-xs text-mute">Ventes</div><div className="font-mono text-2xl text-loss tnum">{a.nbVentes}</div></div>
            <div><div className="mb-1 text-xs text-mute">Achats</div><div className="font-mono text-2xl text-gain tnum">{a.nbAchats}</div></div>
            <div>
              <div className="mb-1 text-xs text-mute">Perf. profil achat + vente</div>
              <div className="font-mono text-2xl text-gain tnum">{pct(a.impact)}</div>
            </div>
          </div>
          <p className="mb-4 text-center text-2xs italic text-faint">Performance réelle du profil, arbitrages inclus — ce n'est pas un backtest.</p>
          <div className="mb-3 flex gap-1 border-b border-line">
            {(['Mouvements', 'Inventaire'] as const).map((t) => (
              <button key={t} onClick={() => setTab(t)} className={cx('-mb-px border-b-2 px-4 py-2 text-sm', tab === t ? 'border-wine text-chalk' : 'border-transparent text-mute hover:text-chalk')}>{t}</button>
            ))}
          </div>
          {tab === 'Mouvements' ? (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[620px]">
                <thead><tr className="border-b border-line text-left">{['Mouv.', 'Nom', 'ISIN', '% port', '% in/out', 'DIC'].map((h) => <th key={h} className="label px-2 py-2 font-normal">{h}</th>)}</tr></thead>
                <tbody className="divide-y divide-line/60">
                  {a.moves.map((m) => (
                    <tr key={m.isin}>
                      <td className="px-2 py-2.5"><Badge tone={m.kind === 'Vente' ? 'loss' : 'gain'}>{m.kind}</Badge></td>
                      <td className="px-2 py-2.5 text-sm text-chalk">{m.name}</td>
                      <td className="px-2 py-2.5 font-mono text-2xs text-faint">{m.isin}</td>
                      <td className={cx('px-2 py-2.5 font-mono text-2xs tnum', signClass(m.pctPort))}>{pct(m.pctPort)}</td>
                      <td className={cx('px-2 py-2.5 font-mono text-2xs tnum', signClass(m.pctInOut))}>{pct(m.pctInOut)}</td>
                      <td className="px-2 py-2.5">{m.dic ? <FileText size={13} className="text-mute" /> : <span className="text-ghost">—</span>}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <Note>Inventaire du portefeuille à la date sélectionnée — {p.inventory.length} supports. Les mouvements et l'inventaire se comprennent « à date » : vue du portefeuille et des opérations réalisées à ce moment-là.</Note>
          )}
        </div>
      </div>
    </Overlay>
  )
}
