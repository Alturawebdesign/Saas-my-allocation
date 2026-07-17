import { Link } from 'react-router-dom'
import {
  Activity, MessageSquarePlus, Layers, Database, Inbox, Landmark, FileOutput,
  Sparkles, Bot, Landmark as Gov, ArrowLeftRight, UserRound, ChevronRight,
} from 'lucide-react'
import { PageHeader } from '@/components/PageHeader'
import { Panel, PanelHeader, Badge } from '@/components/ui'
import { WeightBar } from '@/components/charts'
import { kpis, activity, todos, todosTotal, dashboardDate } from '@/lib/data/dashboard'
import { profiles } from '@/lib/data/profiles'
import { useChat } from '@/lib/chatStore'
import { cx, pct, riskColor } from '@/lib/format'
import type { ActivityEvent } from '@/lib/types'

const kpiTone: Record<string, string> = {
  neutral: 'border-t-ink-500',
  gold: 'border-t-gold',
  wine: 'border-t-wine',
  blue: 'border-t-equilibre',
}

const originIcon: Record<ActivityEvent['origin'], React.ReactNode> = {
  'Chat IA': <Sparkles size={13} className="text-winebright" />,
  'Agent IA': <Bot size={13} className="text-equilibre" />,
  Comité: <Gov size={13} className="text-gold" />,
  Arbitrage: <ArrowLeftRight size={13} className="text-gain" />,
  'Nourrisseur humain': <UserRound size={13} className="text-mute" />,
}

const priorityBar: Record<string, string> = { high: 'bg-loss', medium: 'bg-gold', low: 'bg-ink-500' }

export function Dashboard() {
  const { openChat } = useChat()
  const shown = profiles.slice(0, 6)

  return (
    <>
      <PageHeader
        title="Bonjour Pierre 👋"
        sub={`Voici votre tableau de bord · ${dashboardDate.label} · ${dashboardDate.time}`}
        right={<Badge tone="wine" className="rounded-full px-3.5 py-1.5 text-xs">3 actions urgentes</Badge>}
      />

      {/* KPI row */}
      <div className="mb-6 grid grid-cols-2 gap-5 lg:grid-cols-4">
        {kpis.map((k) => (
          <div key={k.label} className={cx('rounded-2xl border border-line border-t-2 bg-ink-750 p-5 shadow-card transition-all duration-200 ease-smooth hover:-translate-y-0.5 hover:shadow-lift', kpiTone[k.tone])}>
            <div className="mb-2.5 text-xs text-mute">{k.label}</div>
            <div className="font-mono text-3xl text-chalk tnum">{k.value}</div>
            <div className="mt-1.5 text-xs text-faint">{k.sub}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left column */}
        <div className="space-y-6 lg:col-span-7">
          {/* Activité récente */}
          <Panel>
            <PanelHeader
              icon={<Activity size={14} />}
              title="Activité récente"
              right={<button className="font-mono text-2xs text-mute hover:text-chalk">Voir tout →</button>}
            />
            <div className="divide-y divide-line/60">
              {activity.map((e, i) => (
                <div key={i} className="flex gap-3.5 px-5 py-4">
                  <span className="w-9 shrink-0 pt-1 text-xs text-faint">{e.time}</span>
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-line bg-ink-800">{originIcon[e.origin]}</span>
                  <div className="min-w-0">
                    <div className="text-sm leading-relaxed text-chalk">
                      <span className="font-medium">{e.actor}</span>{' '}
                      <span className="text-mute">{e.text.replace(new RegExp(`^${e.actor}\\s*`), '')}</span>
                    </div>
                    <div className="mt-1 text-xs text-faint">
                      {e.docRef ? <span className="text-gold">{e.sub}</span> : e.sub}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Panel>

          {/* Mes actions à mener */}
          <Panel>
            <PanelHeader
              title="Mes actions à mener"
              right={<Link to="/sources" className="font-mono text-2xs text-mute hover:text-chalk">{todosTotal} au total →</Link>}
            />
            <div className="p-3">
              {todos.map((t, i) => (
                <div key={i} className="flex items-start gap-3 rounded-xl px-3 py-3 hover:bg-ink-800">
                  <span className={cx('mt-1 h-9 w-1 shrink-0 rounded-full', priorityBar[t.priority])} />
                  <input type="checkbox" className="mt-1 h-4 w-4 shrink-0 accent-gold" />
                  <div className="min-w-0 flex-1">
                    <div className="text-sm leading-relaxed text-chalk">{t.label}</div>
                    <div className="mt-0.5 text-xs text-faint">{t.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </Panel>
        </div>

        {/* Right column */}
        <div className="space-y-6 lg:col-span-5">
          {/* Performances profils */}
          <Panel>
            <PanelHeader
              title="Performances profils (YTD)"
              right={<Link to="/allocations" className="font-mono text-2xs text-mute hover:text-chalk">Détail →</Link>}
            />
            <div className="divide-y divide-line/60">
              {shown.map((p) => (
                <Link key={p.id} to={`/allocations/${p.id}`} className="flex items-center gap-3 px-5 py-3 hover:bg-ink-800">
                  <div className="min-w-0 flex-1">
                    <div className={cx('font-serif text-sm', riskColor[p.riskType])}>{p.riskType}</div>
                    <div className="text-xs text-faint">{p.contracts}</div>
                  </div>
                  <WeightBar value={p.metric.perfYtd} tone={p.metric.perfYtd >= 0 ? 'pos' : 'neg'} />
                  <span className={cx('w-20 whitespace-nowrap text-right font-mono text-sm tnum', p.metric.perfYtd >= 0 ? 'text-gain' : 'text-loss')}>
                    {pct(p.metric.perfYtd)}
                  </span>
                </Link>
              ))}
            </div>
          </Panel>

          {/* Raccourcis */}
          <Panel>
            <PanelHeader title="Raccourcis" />
            <div className="grid grid-cols-2 gap-3 p-4">
              <button
                onClick={() => openChat()}
                className="col-span-1 flex flex-col gap-1 rounded-xl border border-wine/45 bg-wine/15 p-3 text-left shadow-card transition-all duration-200 ease-smooth hover:-translate-y-0.5 hover:bg-wine/25 hover:shadow-lift active:scale-[0.98]"
              >
                <MessageSquarePlus size={17} className="text-winebright" />
                <span className="text-sm font-medium text-chalk">Nouvelle conversation IA</span>
                <span className="text-xs text-faint">Génère allocation, ordres, mémo</span>
              </button>
              <Shortcut to="/allocations" icon={<Layers size={17} className="text-equilibre" />} title="Mes profils (13)" sub="Allocations par contrat" />
              <Shortcut to="/convictions" icon={<Database size={17} className="text-gold" />} title="Base fonds" sub="184 fonds référencés" />
              <Shortcut to="/sources" icon={<Inbox size={17} className="text-equilibre" />} title="Intrants Sources" sub="8 à valider · 23 en file" />
              <Shortcut to="/comites" icon={<Landmark size={17} className="text-gold" />} title="Prochain comité" sub="24 juin · préparation" />
              <Shortcut to="/clients" icon={<FileOutput size={17} className="text-gain" />} title="Export O2S Harvest" sub="Ordres en attente : 47" />
            </div>
          </Panel>
        </div>
      </div>
    </>
  )
}

function Shortcut({ to, icon, title, sub }: { to: string; icon: React.ReactNode; title: string; sub: string }) {
  return (
    <Link to={to} className="hover-lift group flex flex-col gap-1.5 rounded-2xl border border-line bg-ink-800 p-4 hover:bg-ink-700">
      <div className="flex items-center justify-between">
        {icon}
        <ChevronRight size={13} className="text-ghost transition-transform group-hover:translate-x-0.5 group-hover:text-mute" />
      </div>
      <span className="text-sm font-medium text-chalk">{title}</span>
      <span className="text-xs text-faint">{sub}</span>
    </Link>
  )
}
