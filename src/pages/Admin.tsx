import { Link } from 'react-router-dom'
import {
  Users, Building2, Layers, Tags, Bot, Plug, Check, Activity, Inbox, ChevronRight,
  CalendarClock, Sparkles, Landmark, ArrowLeftRight, UserRound,
} from 'lucide-react'
import { PageHeader } from '@/components/PageHeader'
import { Panel, PanelHeader, Badge, Note } from '@/components/ui'
import { insurerContracts } from '@/lib/data/funds'
import { activity } from '@/lib/data/dashboard'
import type { ActivityEvent } from '@/lib/types'

const originIcon: Record<ActivityEvent['origin'], React.ReactNode> = {
  'Chat IA': <Sparkles size={13} className="text-winebright" />,
  'Agent IA': <Bot size={13} className="text-equilibre" />,
  Comité: <Landmark size={13} className="text-gold" />,
  Arbitrage: <ArrowLeftRight size={13} className="text-gain" />,
  'Nourrisseur humain': <UserRound size={13} className="text-mute" />,
}

const roles = [
  { name: 'Pierre C', role: 'Allocataire', scope: 'Production + Comités' },
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
      <PageHeader title="Administration" sub="Paramétrage · pilotage · sources · rôles · agents IA · intégrations" />

      {/* Pilotage & Clients / Sources — rapatriés du menu principal */}
      <div className="mb-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Link to="/clients" className="hover-lift group rounded-2xl border border-line bg-ink-750 p-5 shadow-card hover:bg-ink-700/50">
          <div className="flex items-center justify-between">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-equilibre/12 text-equilibre"><Users size={17} /></span>
            <ChevronRight size={15} className="text-ghost transition-transform group-hover:translate-x-0.5" />
          </div>
          <div className="mt-3 text-sm font-medium text-chalk">Pilotage &amp; Clients</div>
          <div className="mt-1 text-xs text-faint">Encours, ordres en attente, campagnes — logique CRM</div>
        </Link>
        <Link to="/sources" className="hover-lift group rounded-2xl border border-line bg-ink-750 p-5 shadow-card hover:bg-ink-700/50">
          <div className="flex items-center justify-between">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gold/12 text-gold"><Inbox size={17} /></span>
            <ChevronRight size={15} className="text-ghost transition-transform group-hover:translate-x-0.5" />
          </div>
          <div className="mt-3 text-sm font-medium text-chalk">Sources</div>
          <div className="mt-1 text-xs text-faint">Boîte mail, file d'attente, validation — exposé aussi à l'allocataire</div>
        </Link>
      </div>

      {/* Calendrier de mises à jour — règles d'alerte */}
      <Panel className="mb-6">
        <PanelHeader icon={<CalendarClock size={15} />} title="Calendrier des mises à jour — règles d'alerte" />
        <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2">
          <Note tone="gold">
            <span className="font-medium">Profils :</span> tout profil non modifié depuis <span className="font-medium">4 mois</span> (rythme quadrimestriel) bascule dans la to-do.
          </Note>
          <Note tone="gold">
            <span className="font-medium">Fonds :</span> tout fonds non revu depuis <span className="font-medium">6 mois</span> (rythme semestriel) bascule dans la to-do.
          </Note>
        </div>
      </Panel>

      {/* Activité récente — rapatriée du tableau de bord (vue interne, pas client) */}
      <Panel className="mb-6">
        <PanelHeader icon={<Activity size={15} />} title="Activité récente" right={<span className="text-xs text-faint">vue interne — non exposée côté client</span>} />
        <div className="divide-y divide-line/60">
          {activity.map((e, i) => (
            <div key={i} className="flex gap-3.5 px-5 py-3.5">
              <span className="w-9 shrink-0 pt-1 text-xs text-faint">{e.time}</span>
              <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-line bg-ink-800">{originIcon[e.origin]}</span>
              <div className="min-w-0">
                <div className="text-sm leading-relaxed text-chalk">
                  <span className="font-medium">{e.actor}</span>{' '}
                  <span className="text-mute">{e.text.replace(new RegExp(`^${e.actor}\\s*`), '')}</span>
                </div>
                <div className="mt-0.5 text-xs text-faint">{e.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </Panel>

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
