import { Users, Building2, Layers, Tags, Bot, Plug, Check } from 'lucide-react'
import { PageHeader } from '@/components/PageHeader'
import { Panel, PanelHeader, Badge } from '@/components/ui'
import { insurerContracts } from '@/lib/data/funds'

const roles = [
  { name: 'Pierre B.', role: 'Allocataire', scope: 'Production + Comités' },
  { name: 'Marie L.', role: 'Analyste', scope: 'Convictions + Sources' },
  { name: 'Direction', role: 'Direction', scope: 'Validation 4 yeux' },
  { name: 'Cabinet Compliance', role: 'Compliance', scope: 'Conformité (lecture + export)' },
]
const profilTypes = ['Défensif', 'Équilibré', 'Dynamique']
const categories = ['Actions Europe Small', 'Actions Internationales', 'Allocation Flexible', 'Obligations Corporate', 'Convertibles', 'Actions Émergentes', 'Immobilier coté', 'Monétaire']
const agents = [
  { name: 'Agent Nourrisseur A', model: 'LLM + RAG', seuil: 'Alerte signal sortie' },
  { name: 'Agent Nourrisseur B', model: 'LLM + RAG', seuil: 'Extraction notes réunion' },
  { name: 'Agent Nourrisseur C', model: 'LLM + RAG', seuil: 'Structuration listes UC' },
]
const integrations = [
  { name: 'Harvest O2S', desc: "Export d'ordres d'arbitrage (format import direct)", status: 'Connecté' },
  { name: 'HubSpot', desc: 'Synchronisation clients & campagnes', status: 'Connecté' },
  { name: 'Boîte mail unique', desc: 'ga-feed@cfgp.fr — réception des intrants', status: 'Connecté' },
  { name: 'Morningstar Direct', desc: 'Données quantitatives en streaming', status: 'Optionnel' },
]

export function Admin() {
  return (
    <>
      <PageHeader title="Administration" sub="Paramétrage · référentiels · rôles · agents IA · intégrations" />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {/* Users & roles */}
        <Panel>
          <PanelHeader icon={<Users size={14} />} title="Utilisateurs & rôles" />
          <div className="divide-y divide-line">
            {roles.map((r) => (
              <div key={r.name} className="flex items-center justify-between px-4 py-3">
                <div>
                  <div className="text-sm text-chalk">{r.name}</div>
                  <div className="font-mono text-2xs text-faint">{r.scope}</div>
                </div>
                <Badge tone="blue">{r.role}</Badge>
              </div>
            ))}
          </div>
        </Panel>

        {/* Companies & contracts */}
        <Panel>
          <PanelHeader icon={<Building2 size={14} />} title="Compagnies & contrats" right={<span className="font-mono text-2xs text-faint">référentiel UC par contrat</span>} />
          <div className="max-h-64 overflow-y-auto divide-y divide-line">
            {insurerContracts.map((g) => (
              <div key={g.insurer} className="px-4 py-3">
                <div className="mb-1 text-sm font-medium text-chalk">{g.insurer}</div>
                <div className="flex flex-wrap gap-1.5">
                  {g.contracts.map((c) => <span key={c} className="rounded border border-line bg-ink-800 px-2 py-0.5 font-mono text-[10px] text-mute">{c}</span>)}
                </div>
              </div>
            ))}
          </div>
        </Panel>

        {/* Profil types */}
        <Panel>
          <PanelHeader icon={<Layers size={14} />} title="Profils types" />
          <div className="flex flex-wrap gap-2 p-4">
            {profilTypes.map((p) => <span key={p} className="rounded-md border border-line bg-ink-800 px-3 py-1.5 text-sm text-chalk">{p}</span>)}
            <span className="rounded-md border border-dashed border-line px-3 py-1.5 text-sm text-faint">× compagnie</span>
          </div>
        </Panel>

        {/* Categories */}
        <Panel>
          <PanelHeader icon={<Tags size={14} />} title="Catégories de fonds (taxonomie)" />
          <div className="flex flex-wrap gap-1.5 p-4">
            {categories.map((c) => <span key={c} className="rounded border border-line bg-ink-800 px-2 py-1 font-mono text-2xs text-mute">{c}</span>)}
          </div>
        </Panel>

        {/* Agents IA */}
        <Panel>
          <PanelHeader icon={<Bot size={14} />} title="Paramétrage agents IA" right={<span className="font-mono text-2xs text-faint">modèles · prompts · seuils</span>} />
          <div className="divide-y divide-line">
            {agents.map((a) => (
              <div key={a.name} className="flex items-center justify-between px-4 py-3">
                <div>
                  <div className="text-sm text-chalk">{a.name}</div>
                  <div className="font-mono text-2xs text-faint">{a.seuil}</div>
                </div>
                <Badge tone="wine">{a.model}</Badge>
              </div>
            ))}
          </div>
        </Panel>

        {/* Integrations */}
        <Panel>
          <PanelHeader icon={<Plug size={14} />} title="Intégrations" />
          <div className="divide-y divide-line">
            {integrations.map((it) => (
              <div key={it.name} className="flex items-center justify-between px-4 py-3">
                <div>
                  <div className="text-sm text-chalk">{it.name}</div>
                  <div className="font-mono text-2xs text-faint">{it.desc}</div>
                </div>
                <span className={it.status === 'Connecté' ? 'flex items-center gap-1 font-mono text-2xs text-gain' : 'font-mono text-2xs text-faint'}>
                  {it.status === 'Connecté' && <Check size={12} />}{it.status}
                </span>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </>
  )
}
