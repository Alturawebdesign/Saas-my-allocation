import { FileOutput, Users, Wallet, ClipboardList, Megaphone } from 'lucide-react'
import { PageHeader } from '@/components/PageHeader'
import { Panel, PanelHeader, Badge, Button } from '@/components/ui'
import { clients, clientsPendingOrders, clientsTotalEncours, campaign } from '@/lib/data/clients'
import { eurCompact } from '@/lib/format'
import type { Client } from '@/lib/types'

const statusTone: Record<Client['status'], 'gold' | 'gain' | 'blue'> = {
  'Ordre en attente': 'gold', 'À jour': 'gain', Notifié: 'blue',
}

export function Clients() {
  return (
    <>
      <PageHeader title="Clients" sub="Mapping clients ↔ profils ↔ contrats · synchronisé HubSpot" right={<Button variant="gold"><FileOutput size={14} /> Export O2S Harvest ({clientsPendingOrders})</Button>} />

      {/* KPI */}
      <div className="mb-5 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Kpi icon={<Users size={15} className="text-equilibre" />} label="Clients" value={String(clients.length)} sub="synchronisés HubSpot" />
        <Kpi icon={<Wallet size={15} className="text-gold" />} label="Encours total" value={eurCompact(clientsTotalEncours)} sub="tous contrats" />
        <Kpi icon={<ClipboardList size={15} className="text-winebright" />} label="Ordres en attente" value={String(clientsPendingOrders)} sub="→ à émettre vers O2S" />
        <Kpi icon={<Megaphone size={15} className="text-gain" />} label="Campagne en cours" value={`${campaign.confirmed}/${campaign.totalClients}`} sub="confirmés" />
      </div>

      {/* Campaign */}
      <Panel className="mb-5">
        <PanelHeader icon={<Megaphone size={14} />} title="Suivi de campagne" right={<span className="font-mono text-2xs text-faint">{campaign.label}</span>} />
        <div className="p-5">
          <div className="mb-2 flex justify-between text-2xs text-mute">
            <span>{campaign.notified} notifiés · {campaign.confirmed} confirmés</span>
            <span>{campaign.pending} en attente</span>
          </div>
          <div className="flex h-3 overflow-hidden rounded-full bg-ink-700">
            <div className="bg-gain" style={{ width: `${(campaign.confirmed / campaign.totalClients) * 100}%` }} />
            <div className="bg-equilibre" style={{ width: `${((campaign.notified - campaign.confirmed) / campaign.totalClients) * 100}%` }} />
          </div>
          <div className="mt-3 flex gap-4 font-mono text-[10px] text-faint">
            <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-sm bg-gain" /> Confirmés</span>
            <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-sm bg-equilibre" /> Notifiés non confirmés</span>
            <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-sm bg-ink-700" /> Non touchés</span>
          </div>
        </div>
      </Panel>

      {/* Clients table */}
      <Panel className="overflow-hidden">
        <PanelHeader icon={<Users size={14} />} title="Liste clients" />
        <div className="overflow-x-auto">
          <table className="w-full min-w-[920px]">
            <thead>
              <tr className="border-b border-line text-left">
                {['Client', 'Type', 'Contrats', 'Encours', 'Profils affectés', 'Ordres', 'Statut'].map((h) => <th key={h} className="label px-4 py-2.5 font-normal">{h}</th>)}
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {clients.map((c) => (
                <tr key={c.id} className="hover:bg-ink-800">
                  <td className="px-4 py-3 text-sm font-medium text-chalk">{c.name}</td>
                  <td className="px-4 py-3 text-2xs text-mute">{c.type}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col gap-0.5">
                      {c.contracts.map((ct) => <span key={ct.label} className="font-mono text-2xs text-mute">{ct.label} <span className="text-faint">· {eurCompact(ct.encours)}</span></span>)}
                    </div>
                  </td>
                  <td className="px-4 py-3 font-mono text-sm text-chalk tnum">{eurCompact(c.totalEncours)}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col gap-0.5">
                      {c.affectedProfiles.map((pr) => <span key={pr} className="text-2xs text-mute">{pr}</span>)}
                    </div>
                  </td>
                  <td className="px-4 py-3">{c.pendingOrders > 0 ? <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gold/15 font-mono text-2xs text-gold tnum">{c.pendingOrders}</span> : <span className="text-ghost">—</span>}</td>
                  <td className="px-4 py-3"><Badge tone={statusTone[c.status]}>{c.status}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </>
  )
}

function Kpi({ icon, label, value, sub }: { icon: React.ReactNode; label: string; value: string; sub: string }) {
  return (
    <div className="rounded-lg border border-line bg-ink-750 p-4">
      <div className="mb-2 flex items-center gap-2">{icon}<span className="label">{label}</span></div>
      <div className="font-mono text-2xl text-chalk tnum">{value}</div>
      <div className="mt-0.5 font-mono text-2xs text-faint">{sub}</div>
    </div>
  )
}
