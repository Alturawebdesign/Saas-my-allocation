import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { FileText, ArrowLeftRight, MessageSquareText, Download, FileSpreadsheet, FileOutput, ListChecks, X } from 'lucide-react'
import { PageHeader } from '@/components/PageHeader'
import { Panel, PanelHeader, Button, Badge, Note, SectionLabel } from '@/components/ui'
import { LineChart, Donut, SriPill, SriGauge, MiniBars, assetColor } from '@/components/charts'
import { profileById, profiles } from '@/lib/data/profiles'
import { cx, pct, pctw, signClass, frDateShort } from '@/lib/format'
import type { Profile } from '@/lib/types'

export function ProfileDetail() {
  const { id } = useParams()
  const p = profileById(id ?? '') ?? profiles[0]
  const [pdf, setPdf] = useState(false)
  const [comment, setComment] = useState(false)
  const [arb, setArb] = useState(false)
  const [vp, setVp] = useState(false)
  const [invTab, setInvTab] = useState<'VP' | 'Excel' | 'O2S'>('VP')

  return (
    <>
      <PageHeader
        back={{ to: '/allocations', label: 'Retour aux profils' }}
        title={<span>{p.riskType} <span className="text-mute">— {p.contracts}</span></span>}
        sub={`/ Indice : ${p.indexClass}`}
        right={
          <div className="flex flex-wrap items-center gap-3">
            <div className="rounded-lg border border-line bg-ink-800 px-4 py-2"><SriPill score={p.sri} /></div>
            <Button variant="gold" onClick={() => setPdf(true)}><FileText size={14} /> Générer un document</Button>
          </div>
        }
      />

      <div className="mb-5 flex flex-col gap-4 lg:flex-row">
        {/* 3 metrics */}
        <div className="grid flex-1 grid-cols-3 gap-px overflow-hidden rounded-lg border border-line bg-line">
          <MetricCell label="Perf. YTD au 01/04/2025" value={pct(p.metric.perfYtd)} valueClass={signClass(p.metric.perfYtd)} sub={pct(p.indexMetric.perfYtd)} />
          <MetricCell label="Volatilité 1 an" value={pct(p.metric.volatility, 2, false)} valueClass="text-chalk" sub={pct(p.indexMetric.volatility, 2, false)} />
          <MetricCell label="Perte max historique" value={pct(p.metric.maxLoss)} valueClass={signClass(p.metric.maxLoss)} sub={pct(p.indexMetric.maxLoss)} />
        </div>
        {/* Action buttons */}
        <div className="flex gap-3">
          <Button variant="default" onClick={() => setArb(true)}><ArrowLeftRight size={14} /> Arbitrages</Button>
          <Button variant="default" onClick={() => setComment(true)}><MessageSquareText size={14} /> Commentaire structurel</Button>
        </div>
      </div>

      {/* Performances / Risques */}
      <Panel className="mb-5">
        <PanelHeader title="Performances / Risques" />
        <div className="p-5">
          <div className="mb-4 flex flex-wrap items-end gap-3">
            <DateField label="Du" value="01/01/2025" />
            <DateField label="au" value="01/04/2025" />
            <Button variant="default">Ok</Button>
          </div>
          <LineChart profil={p.spark} indice={p.sparkIndex} showLegend height={170} xLabels={['1-Jan', '15-Jan', '1-Fév', '15-Fév', '1-Mars', '15-Mars', '1-Avr']} color="#4f86d6" />
          <table className="mt-4 w-full">
            <thead>
              <tr className="border-b border-line text-left">
                <th className="label px-2 py-2 font-normal"></th>
                <th className="label px-2 py-2 text-right font-normal">Performance</th>
                <th className="label px-2 py-2 text-right font-normal">Perte max historique</th>
                <th className="label px-2 py-2 text-right font-normal">Délai recouvrement</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              <tr>
                <td className="px-2 py-2.5 text-sm text-chalk">Profil {p.riskType} — {p.contracts}</td>
                <td className={cx('px-2 py-2.5 text-right font-mono text-sm tnum', signClass(p.metric.perfYtd))}>{pct(p.metric.perfYtd)}</td>
                <td className={cx('px-2 py-2.5 text-right font-mono text-sm tnum', signClass(p.metric.maxLoss))}>{pct(p.metric.maxLoss)}</td>
                <td className="px-2 py-2.5 text-right font-mono text-sm text-mute tnum">{p.metric.recoveryLabel}</td>
              </tr>
              <tr>
                <td className="px-2 py-2.5 text-sm text-faint">Indice {p.index}</td>
                <td className={cx('px-2 py-2.5 text-right font-mono text-sm tnum', signClass(p.indexMetric.perfYtd))}>{pct(p.indexMetric.perfYtd)}</td>
                <td className={cx('px-2 py-2.5 text-right font-mono text-sm tnum', signClass(p.indexMetric.maxLoss))}>{pct(p.indexMetric.maxLoss)}</td>
                <td className="px-2 py-2.5 text-right font-mono text-sm text-faint tnum">{p.indexMetric.recoveryLabel}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Panel>

      {/* Allocation */}
      <Panel className="mb-5">
        <PanelHeader title="Allocation" />
        <div className="flex flex-col items-center gap-8 p-5 sm:flex-row sm:items-center">
          <Donut slices={p.allocation} size={170} thickness={26} />
          <div className="flex-1 space-y-2">
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
        <PanelHeader title={`Inventaire au 01/04/2025`} />
        <div className="p-5">
          <div className="mb-4 flex flex-wrap gap-3">
            <Button variant={invTab === 'VP' ? 'gold' : 'default'} onClick={() => { setInvTab('VP'); setVp(true) }}><ListChecks size={14} /> Inventaire VP</Button>
            <Button variant={invTab === 'Excel' ? 'gold' : 'default'} onClick={() => setInvTab('Excel')}><FileSpreadsheet size={14} /> Fichier Excel</Button>
            <Button variant={invTab === 'O2S' ? 'gold' : 'default'} onClick={() => setInvTab('O2S')}><FileOutput size={14} /> Fichier O2S</Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px]">
              <thead>
                <tr className="border-b border-line text-left">
                  {['Nom', 'ISIN', 'SRI', 'Frais', 'Perf 1er janv', 'Quote-part', 'Reporting'].map((h) => (
                    <th key={h} className="label px-3 py-2 font-normal">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {p.inventory.map((l) => (
                  <tr key={l.isin} className="hover:bg-ink-800">
                    <td className="px-3 py-2.5 text-sm text-chalk">{l.name}</td>
                    <td className="px-3 py-2.5 font-mono text-2xs text-faint">{l.isin}</td>
                    <td className="px-3 py-2.5 font-mono text-sm text-mute tnum">{l.sri}</td>
                    <td className="px-3 py-2.5 font-mono text-sm text-mute tnum">{pct(l.fees, 2, false)}</td>
                    <td className={cx('px-3 py-2.5 font-mono text-sm tnum', signClass(l.perfSinceJan))}>{pct(l.perfSinceJan)}</td>
                    <td className="px-3 py-2.5 font-mono text-sm text-chalk tnum">{pctw(l.quotePart, 2)}</td>
                    <td className="px-3 py-2.5">{l.reporting ? <span className="text-gain">●</span> : <span className="text-ghost">—</span>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Panel>

      {pdf && <PdfPreview p={p} onClose={() => setPdf(false)} />}
      {comment && <StructuralComment p={p} onClose={() => setComment(false)} />}
      {arb && <ArbitrageBox p={p} onClose={() => setArb(false)} />}
      {vp && <VpModal p={p} onClose={() => setVp(false)} />}
    </>
  )
}

function MetricCell({ label, value, valueClass, sub }: { label: string; value: string; valueClass?: string; sub: string }) {
  return (
    <div className="bg-ink-750 p-4">
      <div className="label mb-1.5">{label}</div>
      <div className={cx('font-mono text-xl tnum', valueClass)}>{value}</div>
      <div className="mt-0.5 font-mono text-2xs text-faint tnum">{sub}</div>
    </div>
  )
}

function DateField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="mb-1 font-mono text-2xs lowercase text-faint">{label}</div>
      <input defaultValue={value} className="w-32 rounded-md border border-line bg-ink-800 px-3 py-2 font-mono text-sm text-chalk focus:border-ink-500 focus:outline-none" />
    </div>
  )
}

// ─── Overlays ────────────────────────────────────────────────────────────────

function Overlay({ onClose, children, width = 'max-w-4xl' }: { onClose: () => void; children: React.ReactNode; width?: string }) {
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/65 p-4 pt-[6vh] backdrop-blur-sm" onClick={onClose}>
      <div className={cx('w-full animate-scale-in', width)} onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>
  )
}

function PdfPreview({ p, onClose }: { p: Profile; onClose: () => void }) {
  return (
    <Overlay onClose={onClose}>
      <div className="mb-2 flex items-center justify-between">
        <span className="label-b flex items-center gap-2"><FileText size={13} /> Générer un document — aperçu du PDF client</span>
        <div className="flex gap-2">
          <Button variant="gold" size="sm"><Download size={13} /> Télécharger</Button>
          <button onClick={onClose} className="rounded p-1.5 text-mute hover:bg-ink-700 hover:text-chalk"><X size={16} /></button>
        </div>
      </div>
      <div className="overflow-hidden rounded-lg border border-ink-600 bg-ink-800">
        {/* Cover */}
        <div className="bg-gradient-to-b from-[#111a2e] to-ink-800 px-8 py-10 text-center">
          <div className="label mb-2 tracking-[0.3em]">CFGP · META</div>
          <h2 className="font-serif text-3xl text-chalk">{p.riskType} — {p.contracts}</h2>
          <div className="mt-2 font-mono text-2xs text-faint">Avril 2025 · Meta EXP · Pierre B.</div>
        </div>
        {/* Pages */}
        <PdfSection n="02" title="Structure du profil">
          <p className="text-sm leading-relaxed text-mute">{p.structuralComment.summary}</p>
        </PdfSection>
        <PdfSection n="03" title="Décomposition du profil">
          <table className="w-full">
            <thead><tr className="border-b border-line text-left">{['Nom', 'Catégorie', 'Perf. 1er janv.', 'SRI', 'Quote-part'].map((h) => <th key={h} className="label py-2 font-normal">{h}</th>)}</tr></thead>
            <tbody className="divide-y divide-line/70">
              {p.inventory.slice(0, 6).map((l) => (
                <tr key={l.isin}>
                  <td className="py-2 text-sm text-chalk">{l.name}</td>
                  <td className="py-2 text-2xs text-mute">{l.category}</td>
                  <td className={cx('py-2 font-mono text-2xs tnum', signClass(l.perfSinceJan))}>{pct(l.perfSinceJan)}</td>
                  <td className="py-2 font-mono text-2xs text-mute tnum">{l.sri}</td>
                  <td className="py-2 font-mono text-2xs text-chalk tnum">{pctw(l.quotePart, 2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </PdfSection>
        <PdfSection n="04" title="Allocation d'actifs réelle">
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {p.allocation.map((s) => (
              <span key={s.klass} className="flex items-center gap-2 text-sm text-mute">
                <span className="h-2.5 w-2.5 rounded-sm" style={{ background: assetColor(s.klass) }} /> {s.klass} <span className="font-mono text-chalk tnum">{pctw(s.pct)}</span>
              </span>
            ))}
          </div>
        </PdfSection>
        <PdfSection n="05" title="Performances">
          <MiniBars data={p.perfHistory} />
          <div className="mt-4 grid grid-cols-3 gap-3">
            {[['Perf. YTD', pct(p.metric.perfYtd), signClass(p.metric.perfYtd)], ['Volatilité', pct(p.metric.volatility, 2, false), 'text-chalk'], ['Perte max', pct(p.metric.maxLoss), signClass(p.metric.maxLoss)]].map(([k, v, c]) => (
              <div key={k} className="rounded-md border border-line bg-ink-750 p-3">
                <div className="label mb-1">{k}</div>
                <div className={cx('font-mono text-lg tnum', c)}>{v}</div>
              </div>
            ))}
          </div>
          <div className="mt-4"><SectionLabel className="mb-1.5">SRI du profil</SectionLabel><SriGauge score={p.sri} /></div>
        </PdfSection>
        <PdfSection n="07" title="Signature">
          <div className="grid grid-cols-2 gap-x-10 gap-y-6">
            {['Date', 'Nom du client', 'Contrat', 'Signature conseiller'].map((s) => (
              <div key={s}><div className="label mb-6">{s}</div><div className="border-b border-ink-500" /></div>
            ))}
          </div>
        </PdfSection>
      </div>
    </Overlay>
  )
}

function PdfSection({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-line px-8 py-6">
      <div className="label mb-1">Page {n}</div>
      <h3 className="mb-3 font-serif text-lg text-chalk">{title}</h3>
      {children}
    </div>
  )
}

function StructuralComment({ p, onClose }: { p: Profile; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="flex-1 bg-black/50" onClick={onClose} />
      <aside className="flex w-full max-w-lg animate-slide-in flex-col border-l border-line bg-ink-850 shadow-2xl">
        <div className="flex items-center justify-between border-b border-line px-4 py-3">
          <span className="label-b">Commentaire structurel</span>
          <div className="flex items-center gap-3">
            <span className="font-mono text-2xs text-faint">{p.riskType} — {p.contracts}</span>
            <button onClick={onClose} className="rounded p-1 text-mute hover:bg-ink-700 hover:text-chalk"><X size={16} /></button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-5">
          <SectionLabel className="mb-2">Description du profil</SectionLabel>
          <p className="text-sm leading-relaxed text-mute">{p.structuralComment.summary}</p>
          <div className="my-4 flex items-center gap-3">
            <span className="text-2xs italic text-faint">Composition détaillée par classe d'actifs</span>
            <span className="text-2xs text-equilibre">voir plus</span>
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
      <div className="overflow-hidden rounded-lg border border-wine/40 bg-ink-800 shadow-2xl">
        <div className="flex items-center justify-between bg-wine/85 px-5 py-3">
          <span className="font-mono text-sm font-medium text-white">Arbitrage au {frDateShort(a.date)}</span>
          <div className="flex items-center gap-3">
            <span className="font-mono text-2xs text-white/80">{p.riskType} — {p.contracts}</span>
            <button onClick={onClose} className="rounded p-1 text-white/80 hover:bg-white/10 hover:text-white"><X size={15} /></button>
          </div>
        </div>
        <div className="px-5 py-4">
          <SectionLabel className="mb-2">Contexte macro-économique</SectionLabel>
          <div className="space-y-2 text-sm leading-relaxed text-mute">
            {a.macroContext.map((c, i) => <p key={i}>{c}</p>)}
          </div>
          <div className="my-4 grid grid-cols-3 gap-4 border-y border-line py-3 text-center">
            <div><div className="label mb-1">Ventes</div><div className="font-mono text-2xl text-loss tnum">{a.nbVentes}</div></div>
            <div><div className="label mb-1">Achats</div><div className="font-mono text-2xl text-gain tnum">{a.nbAchats}</div></div>
            <div><div className="label mb-1">Impact estimé</div><div className="font-mono text-2xl text-gain tnum">{pct(a.impact)}</div></div>
          </div>
          <div className="mb-3 flex gap-1 border-b border-line">
            {(['Mouvements', 'Inventaire'] as const).map((t) => (
              <button key={t} onClick={() => setTab(t)} className={cx('-mb-px border-b-2 px-4 py-2 text-sm', tab === t ? 'border-wine text-chalk' : 'border-transparent text-mute hover:text-chalk')}>{t}</button>
            ))}
          </div>
          {tab === 'Mouvements' ? (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[620px]">
                <thead><tr className="border-b border-line text-left">{['Mouv.', 'Nom', 'ISIN', '% port', '% in/out', 'DIC'].map((h) => <th key={h} className="label px-2 py-2 font-normal">{h}</th>)}</tr></thead>
                <tbody className="divide-y divide-line">
                  {a.moves.map((m) => (
                    <tr key={m.isin}>
                      <td className="px-2 py-2"><Badge tone={m.kind === 'Vente' ? 'loss' : 'gain'}>{m.kind}</Badge></td>
                      <td className="px-2 py-2 text-sm text-chalk">{m.name}</td>
                      <td className="px-2 py-2 font-mono text-2xs text-faint">{m.isin}</td>
                      <td className={cx('px-2 py-2 font-mono text-2xs tnum', signClass(m.pctPort))}>{pct(m.pctPort)}</td>
                      <td className={cx('px-2 py-2 font-mono text-2xs tnum', signClass(m.pctInOut))}>{pct(m.pctInOut)}</td>
                      <td className="px-2 py-2">{m.dic ? <FileText size={13} className="text-mute" /> : <span className="text-ghost">—</span>}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <Note>Snapshot complet du profil à la date de l'arbitrage — {p.inventory.length} supports. L'inventaire et les mouvements se comprennent « à la date sélectionnée ».</Note>
          )}
        </div>
      </div>
    </Overlay>
  )
}

function VpModal({ p, onClose }: { p: Profile; onClose: () => void }) {
  const total = p.vpInventory.reduce((s, l) => s + l.quotePart, 0)
  return (
    <Overlay onClose={onClose} width="max-w-xl">
      <div className="overflow-hidden rounded-lg border border-line bg-ink-800 shadow-2xl">
        <div className="flex items-center justify-between border-b border-line px-5 py-3">
          <span className="font-mono text-sm font-semibold text-chalk">INVENTAIRE VP</span>
          <div className="flex items-center gap-3">
            <span className="font-mono text-2xs text-faint">{p.riskType} — {p.contracts}</span>
            <button onClick={onClose} className="rounded p-1 text-mute hover:bg-ink-700 hover:text-chalk"><X size={15} /></button>
          </div>
        </div>
        <div className="px-5 py-4">
          <p className="mb-4 text-sm leading-relaxed text-mute">
            Inventaire restreint utilisé pour programmer des <span className="text-chalk">versements périodiques</span>. Nombre de supports réduit afin de simplifier la gestion des flux récurrents — les fonds à faible liquidité ou en gestion spécifique sont exclus.
          </p>
          <table className="w-full">
            <thead><tr className="border-b border-line text-left"><th className="label py-2 font-normal">Fonds</th><th className="label py-2 text-right font-normal">Quote-part VP</th></tr></thead>
            <tbody className="divide-y divide-line">
              {p.vpInventory.map((l) => (
                <tr key={l.isin}>
                  <td className="py-3"><div className="text-sm text-chalk">{l.name}</div><div className="font-mono text-2xs text-faint">{l.isin} · {l.category}</div></td>
                  <td className="py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <div className="h-1.5 w-16 overflow-hidden rounded-full bg-ink-700"><div className="h-full bg-equilibre" style={{ width: `${l.quotePart}%` }} /></div>
                      <span className="w-12 text-right font-mono text-sm text-chalk tnum">{pctw(l.quotePart)}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot><tr className="border-t border-line"><td className="py-2.5 label-b">Total · {p.vpInventory.length} supports</td><td className="py-2.5 text-right font-mono text-sm text-chalk tnum">{pctw(total)}</td></tr></tfoot>
          </table>
          <Note tone="neutral"><span className="italic">{p.vpNote}</span></Note>
        </div>
      </div>
    </Overlay>
  )
}
