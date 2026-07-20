import { FileText, AlertTriangle, Check, X, ArrowUp, ArrowDown, Minus } from 'lucide-react'
import type { AiAllocationOutput } from '@/lib/types'
import { cx } from '@/lib/format'
import { Badge } from './ui'

function Layer({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-line pt-3 first:border-t-0 first:pt-0">
      <div className="mb-2 flex items-center gap-2">
        <span className="flex h-4 w-4 items-center justify-center rounded-full bg-gold/15 font-mono text-[9px] text-gold">{n}</span>
        <span className="label-b">{title}</span>
      </div>
      {children}
    </div>
  )
}

const stanceStyle: Record<string, string> = {
  SURPONDÉRER: 'text-gain',
  NEUTRE: 'text-mute',
  'SOUS-PONDÉRER': 'text-loss',
}
const stanceIcon: Record<string, React.ReactNode> = {
  SURPONDÉRER: <ArrowUp size={11} />,
  NEUTRE: <Minus size={11} />,
  'SOUS-PONDÉRER': <ArrowDown size={11} />,
}

/** Renders the 4-layer structured allocation output produced by the Chat IA. */
export function AllocationOutput({ a }: { a: AiAllocationOutput }) {
  const j = a.justification
  return (
    <div className="space-y-4 rounded-lg border border-ink-600 bg-ink-800 p-3.5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <div className="font-serif text-base text-chalk">
            Allocation {a.profile} — {a.contract}
          </div>
          <div className="mt-0.5 font-mono text-2xs text-faint">
            réf. {a.contractRef} · Mise à jour base : {a.baseUpdate} · Comité {a.committee}
          </div>
        </div>
        <Badge tone="gain">Fraîcheur OK · &lt; 45 j</Badge>
      </div>

      {/* Layer 1 — allocation cible */}
      <Layer n={1} title="Allocation cible opérationnelle">
        <div className="space-y-1.5">
          {a.lines.map((l) => (
            <div key={l.klass} className="flex items-center gap-3">
              <span className="w-40 shrink-0 text-2xs text-mute">{l.klass}</span>
              <div className="h-3 flex-1 overflow-hidden rounded-sm bg-ink-700">
                <div className="h-full bg-gold/70" style={{ width: `${Math.min(l.pct * 2.5, 100)}%` }} />
              </div>
              <span className="w-9 shrink-0 text-right font-mono text-2xs text-chalk tnum">{l.pct} %</span>
              <span className="w-32 shrink-0 font-mono text-[10px] text-faint">→ ISIN : {l.isinCount}</span>
            </div>
          ))}
        </div>
        <div className="mt-3 grid grid-cols-2 gap-x-6 gap-y-1.5 rounded-md border border-line bg-ink-750 p-3 md:grid-cols-4">
          {[
            ['Rendement espéré (5 ans)', a.expectedReturn],
            ['Volatilité estimée', a.volatility],
            ['VAR 95 % (1 an)', a.var95],
            ['Time to recover', a.timeToRecover],
          ].map(([k, v]) => (
            <div key={k}>
              <div className="label">{k}</div>
              <div className="mt-0.5 font-mono text-sm text-chalk tnum">{v}</div>
            </div>
          ))}
          <div className="col-span-2 md:col-span-4">
            <div className="label">Bucket liquidité</div>
            <div className="mt-0.5 font-mono text-2xs text-mute tnum">{a.liquidityBucket}</div>
          </div>
        </div>
      </Layer>

      {/* Layer 2 — justification fonds */}
      <Layer n={2} title="Justification fonds">
        <div className="rounded-md border border-line bg-ink-750 p-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-2xs text-mute">{j.isin}</span>
            <span className="text-sm font-medium text-chalk">{j.fund}</span>
            <span className="text-2xs text-faint">· {j.sgp}</span>
            <Badge tone="gain" className="ml-auto">Statut : {j.status}</Badge>
          </div>
          <div className="mt-1 font-mono text-2xs text-faint">Catégorie : {j.category}</div>
          <p className="mt-2 text-2xs leading-relaxed text-mute">{j.thesis}</p>
          <div className="mt-3 border-t border-line pt-2">
            <div className="label mb-1">Dernière rencontre SGP · {j.lastMeeting}</div>
            <p className="text-2xs leading-relaxed text-mute">{j.meetingSynthesis}</p>
          </div>
          <div className="mt-3 space-y-1 border-t border-line pt-2">
            <div className="label mb-1">Disponibilité par contrat</div>
            {j.availability.map((av) => (
              <div key={av.contract} className="flex items-center gap-2 text-2xs">
                {av.available ? <Check size={12} className="text-gain" /> : <X size={12} className="text-loss" />}
                <span className="text-mute">{av.contract}</span>
                {av.note && <span className={cx('font-mono text-[10px]', av.available ? 'text-faint' : 'text-gold')}>· {av.note}</span>}
              </div>
            ))}
          </div>
          <div className="mt-3 flex items-start gap-1.5 border-t border-line pt-2 font-mono text-[10px] text-faint">
            <FileText size={11} className="mt-0.5 shrink-0" />
            <span>Sources : {j.sources}</span>
          </div>
        </div>
      </Layer>

      {/* Layer 3 — contexte macro */}
      <Layer n={3} title="Contexte macro de cadrage">
        <div className="rounded-md border border-line bg-ink-750 p-3">
          <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
            <div>
              <span className="label">Régime actuel</span>
              <div className="text-2xs text-mute">{a.macro.regime}</div>
            </div>
            <div>
              <span className="label">Taux directeurs</span>
              <div className="text-2xs text-mute">{a.macro.rates}</div>
            </div>
          </div>
          <div className="mt-2.5 space-y-1 border-t border-line pt-2">
            <div className="label mb-1">Biais directionnels actifs</div>
            {a.macro.biases.map((b) => (
              <div key={b.label} className="flex items-center justify-between text-2xs">
                <span className="text-mute">{b.label}</span>
                <span className={cx('flex items-center gap-1 font-mono text-[10px] font-semibold', stanceStyle[b.stance])}>
                  {stanceIcon[b.stance]}
                  {b.stance}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Layer>

      {/* Layer 4 — alert / contract constraint */}
      {a.macro.alert && (
        <div className="flex items-start gap-2 rounded-md border border-wine/40 bg-wine/12 p-2.5">
          <AlertTriangle size={14} className="mt-0.5 shrink-0 text-winebright" />
          <div>
            <div className="label-b text-winebright">Alerte · Couche contrainte contrat</div>
            <p className="mt-0.5 text-2xs leading-relaxed text-mute">{a.macro.alert}</p>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between border-t border-line pt-3">
        <span className="font-mono text-[10px] text-faint">Output consigné · doc #2026-0428 · horodaté · sourcé · opposable</span>
        <button className="rounded border border-gold/40 bg-gold/12 px-2.5 py-1 text-2xs text-gold hover:bg-gold/20">Exporter mémo PDF</button>
      </div>
    </div>
  )
}
