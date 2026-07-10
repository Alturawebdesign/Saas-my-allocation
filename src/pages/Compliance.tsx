import { ShieldCheck, Clock, Link2, GitBranch, Eye, FileLock2, AlertTriangle, Download } from 'lucide-react'
import { PageHeader } from '@/components/PageHeader'
import { Panel, PanelHeader, Badge, Button } from '@/components/ui'
import { pillars, complianceEntries, alerts, regulatorExports } from '@/lib/data/compliance'
import { cx, frDateShort } from '@/lib/format'
import type { TraceabilityPillar } from '@/lib/types'

const pillarIcon: Record<TraceabilityPillar, React.ReactNode> = {
  Horodatage: <Clock size={14} />, Sourçage: <Link2 size={14} />, Versioning: <GitBranch size={14} />,
  'Validation 4 yeux': <Eye size={14} />, Consignation: <FileLock2 size={14} />,
}
const typeTone: Record<string, 'wine' | 'blue' | 'gold' | 'gain' | 'neutral'> = {
  'Output IA': 'wine', 'PV comité': 'blue', Décision: 'gold', 'Allocation émise': 'gain', 'Mémo client': 'neutral',
}

export function Compliance() {
  return (
    <>
      <PageHeader title="Conformité" sub="Traçabilité réglementaire native · horodatage · sourçage · versioning · validation 4 yeux · consignation" right={<Button variant="gold"><Download size={14} /> Export ACPR/AMF</Button>} />

      {/* 5 pillars */}
      <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {pillars.map((p) => (
          <div key={p.name} className="rounded-lg border border-line bg-ink-750 p-3.5">
            <div className="mb-2 flex items-center gap-2 text-gold">{pillarIcon[p.name]}<span className="text-sm font-medium text-chalk">{p.name}</span></div>
            <p className="text-2xs leading-relaxed text-mute">{p.mechanism}</p>
            <div className="mt-2 border-t border-line pt-2 font-mono text-[10px] text-faint">{p.visibleIn}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
        {/* Register */}
        <div className="lg:col-span-8">
          <Panel className="overflow-hidden">
            <PanelHeader icon={<ShieldCheck size={14} />} title="Registre des décisions & journal" right={<span className="font-mono text-2xs text-faint">horodaté · sourcé · versionné</span>} />
            <div className="overflow-x-auto">
              <table className="w-full min-w-[820px]">
                <thead><tr className="border-b border-line text-left">{['Réf.', 'Type', 'Objet', 'Auteur', 'Source', 'Date', 'V.', 'Piliers'].map((h) => <th key={h} className="label px-3 py-2.5 font-normal">{h}</th>)}</tr></thead>
                <tbody className="divide-y divide-line">
                  {complianceEntries.map((e) => (
                    <tr key={e.id} className="hover:bg-ink-800">
                      <td className="px-3 py-3 font-mono text-2xs text-gold">{e.ref}</td>
                      <td className="px-3 py-3"><Badge tone={typeTone[e.type]}>{e.type}</Badge></td>
                      <td className="px-3 py-3 text-sm text-chalk">{e.label}</td>
                      <td className="px-3 py-3 text-2xs text-mute">{e.author}</td>
                      <td className="px-3 py-3 font-mono text-[10px] text-faint">{e.source}</td>
                      <td className="px-3 py-3 font-mono text-2xs text-mute tnum">{frDateShort(e.date)}</td>
                      <td className="px-3 py-3 font-mono text-2xs text-mute tnum">v{e.version}</td>
                      <td className="px-3 py-3">
                        <div className="flex gap-1">
                          {e.pillars.map((p) => <span key={p} title={p} className="text-faint">{pillarIcon[p]}</span>)}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Panel>
        </div>

        {/* Alerts + exports */}
        <div className="space-y-5 lg:col-span-4">
          <Panel>
            <PanelHeader icon={<AlertTriangle size={14} />} title="Alertes & contrôles" />
            <div className="divide-y divide-line">
              {alerts.map((a, i) => (
                <div key={i} className="flex items-start gap-3 px-4 py-3">
                  <span className={cx('mt-0.5', a.tone === 'wine' ? 'text-winebright' : 'text-gold')}><AlertTriangle size={15} /></span>
                  <div>
                    <div className="text-sm text-chalk">{a.label}</div>
                    <div className="mt-0.5 text-2xs text-faint">{a.detail}</div>
                  </div>
                </div>
              ))}
            </div>
          </Panel>

          <Panel>
            <PanelHeader icon={<Download size={14} />} title="Export régulateur" />
            <div className="space-y-2 p-3">
              {regulatorExports.map((r) => (
                <div key={r.label} className="flex items-center justify-between rounded-md border border-line bg-ink-800 p-3">
                  <div>
                    <div className="text-sm text-chalk">{r.label}</div>
                    <div className="font-mono text-2xs text-faint">{r.period}</div>
                  </div>
                  <Badge tone="blue">{r.format}</Badge>
                </div>
              ))}
              <p className="px-1 pt-1 font-mono text-[10px] text-ghost">Formats ACPR/AMF prêts à l'emploi · chaque pièce est opposable.</p>
            </div>
          </Panel>
        </div>
      </div>
    </>
  )
}
