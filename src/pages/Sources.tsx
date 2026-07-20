import { Mail, Bot, UserCheck, Database, AlertTriangle, Check } from 'lucide-react'
import { PageHeader } from '@/components/PageHeader'
import { Panel, PanelHeader, Badge, Button } from '@/components/ui'
import { sources, sourcesMailbox, sourceCounts, agentPerformance } from '@/lib/data/sources'
import { cx, frDateShort } from '@/lib/format'
import type { SourceItem, SourceStatus } from '@/lib/types'

const COLUMNS: { status: SourceStatus; icon: React.ReactNode; label: string; count: number }[] = [
  { status: 'Reçu', icon: <Mail size={14} />, label: 'Boîte mail', count: sourceCounts.received },
  { status: "File d'attente IA", icon: <Bot size={14} />, label: "File d'attente IA", count: sourceCounts.queue },
  { status: 'À valider', icon: <UserCheck size={14} />, label: 'À valider (humain)', count: sourceCounts.toValidate },
  { status: 'Validé / en base', icon: <Database size={14} />, label: 'Validé / en base', count: sourceCounts.inBase },
]

const originTone: Record<string, 'blue' | 'gain' | 'gold' | 'neutral' | 'wine'> = {
  Newsletter: 'blue', 'Note de réunion': 'gain', 'Liste UC': 'gold', 'Échange fournisseur': 'neutral', Comité: 'wine',
}

export function Sources() {
  return (
    <>
      <PageHeader
        title="Sources"
        sub="Nourrisseurs — agents IA + humains · pivot de l'architecture"
        right={<span className="flex items-center gap-2 rounded-md border border-line bg-ink-800 px-3 py-2 font-mono text-2xs text-mute"><Mail size={13} /> {sourcesMailbox}</span>}
      />

      {/* Pipeline */}
      <div className="mb-5 grid grid-cols-1 gap-4 lg:grid-cols-4">
        {COLUMNS.map((col) => (
          <Panel key={col.status} className="flex flex-col">
            <div className="flex items-center justify-between border-b border-line px-3.5 py-2.5">
              <div className="flex items-center gap-2 label-b">{col.icon}{col.label}</div>
              <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-ink-700 px-1.5 font-mono text-2xs text-chalk tnum">{col.count}</span>
            </div>
            <div className="flex-1 space-y-2 p-2.5">
              {sources.filter((s) => s.status === col.status).map((s) => <SourceCard key={s.id} s={s} />)}
              {col.status === "File d'attente IA" && (
                <div className="rounded-md border border-dashed border-line px-3 py-2 text-center font-mono text-[10px] text-ghost">+ {sourceCounts.queueTotal - sourceCounts.queue} autres en file</div>
              )}
            </div>
          </Panel>
        ))}
      </div>

      {/* Agent performance */}
      <Panel>
        <PanelHeader icon={<Bot size={14} />} title="Performance agents nourrisseurs" right={<span className="font-mono text-2xs text-faint">taux d'erreur · alertes qualité</span>} />
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px]">
            <thead><tr className="border-b border-line text-left">{['Agent', 'Intrants traités', "Taux d'erreur", 'Alertes'].map((h) => <th key={h} className="label px-4 py-2.5 font-normal">{h}</th>)}</tr></thead>
            <tbody className="divide-y divide-line">
              {agentPerformance.map((a) => (
                <tr key={a.agent} className="hover:bg-ink-800">
                  <td className="px-4 py-3 text-sm text-chalk">{a.agent}</td>
                  <td className="px-4 py-3 font-mono text-sm text-mute tnum">{a.processed}</td>
                  <td className="px-4 py-3"><span className={cx('font-mono text-sm tnum', a.errorRate > 3 ? 'text-gold' : 'text-gain')}>{a.errorRate.toFixed(1).replace('.', ',')} %</span></td>
                  <td className="px-4 py-3">{a.alerts > 0 ? <Badge tone="wine">{a.alerts} alerte</Badge> : <span className="text-ghost">—</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </>
  )
}

function SourceCard({ s }: { s: SourceItem }) {
  return (
    <div className={cx('rounded-md border p-3', s.signalAlert ? 'border-wine/40 bg-wine/8' : 'border-line bg-ink-800')}>
      <div className="mb-1.5 flex items-start justify-between gap-2">
        <span className="text-sm leading-snug text-chalk">{s.subject}</span>
        {s.signalAlert && <AlertTriangle size={14} className="shrink-0 text-winebright" />}
      </div>
      <div className="mb-2 flex flex-wrap items-center gap-1.5">
        <Badge tone={originTone[s.origin]}>{s.origin}</Badge>
        {s.sgp && <span className="font-mono text-[10px] text-faint">{s.sgp}</span>}
      </div>
      {s.summary && <p className="mb-2 line-clamp-3 text-2xs leading-relaxed text-mute">{s.summary}</p>}
      {s.fundImpact && <div className="mb-2 font-mono text-[10px] text-gold">↳ {s.fundImpact}</div>}
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] text-ghost">
          {frDateShort(s.receivedAt)}{s.agent ? ` · ${s.agent}` : ''}{s.humanValidator ? ` · ✓ ${s.humanValidator}` : ''}
        </span>
        {s.status === 'À valider' && <Button variant="primary" size="sm"><Check size={11} /> Valider</Button>}
      </div>
    </div>
  )
}
