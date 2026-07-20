import { Link } from 'react-router-dom'
import {
  Layers, Database, Inbox, Landmark, FileOutput, ChevronRight, TrendingUp, TrendingDown,
  RefreshCcw, Building2,
} from 'lucide-react'
import { PageHeader } from '@/components/PageHeader'
import { Panel, PanelHeader, Badge } from '@/components/ui'
import { kpis, dashboardDate, todos, todosTotal } from '@/lib/data/dashboard'
import { funds } from '@/lib/data/funds'
import { companies } from '@/lib/data/companies'
import { profileById } from '@/lib/data/profiles'
import { cx, pct, riskDot } from '@/lib/format'
import { USER_FIRSTNAME } from '@/lib/config'

const kpiTone: Record<string, string> = {
  neutral: 'border-t-ink-500',
  gold: 'border-t-gold',
  wine: 'border-t-wine',
  blue: 'border-t-equilibre',
}

const priorityBar: Record<string, string> = { high: 'bg-loss', medium: 'bg-gold', low: 'bg-ink-500' }

/** Top & flop par écart fonds vs catégorie — même logique de lecture que le suivi des fonds. */
function topFlop() {
  const scored = funds.map((f) => ({ f, ecart: f.perfYtd - f.perfCatYtd }))
  const sorted = [...scored].sort((a, b) => b.ecart - a.ecart)
  return { top: sorted.slice(0, 3), flop: sorted.slice(-3).reverse() }
}

export function Dashboard() {
  const { top, flop } = topFlop()
  const lastProfile = profileById('defensif-axa-cardif')!

  return (
    <>
      <PageHeader
        title={`Bonjour ${USER_FIRSTNAME} 👋`}
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
          {/* Top & Flop des fonds */}
          <Panel>
            <PanelHeader
              icon={<TrendingUp size={15} />}
              title="Top & Flop des fonds"
              right={<Link to="/convictions" className="text-xs text-mute hover:text-chalk">Tout le suivi →</Link>}
            />
            <div className="grid grid-cols-1 gap-0 sm:grid-cols-2 sm:divide-x sm:divide-line/60">
              <div className="p-4">
                <div className="mb-2 flex items-center gap-1.5 text-xs font-medium text-gain"><TrendingUp size={13} /> Top — écart vs catégorie</div>
                <div className="space-y-1">
                  {top.map(({ f, ecart }) => (
                    <Link key={f.id} to={`/convictions/${f.id}`} className="flex items-center justify-between rounded-lg px-2.5 py-2 hover:bg-ink-800">
                      <span className="min-w-0 truncate pr-2 text-sm text-chalk">{f.name}</span>
                      <span className="shrink-0 font-mono text-xs text-gain tnum">{pct(ecart)}</span>
                    </Link>
                  ))}
                </div>
              </div>
              <div className="border-t border-line/60 p-4 sm:border-t-0">
                <div className="mb-2 flex items-center gap-1.5 text-xs font-medium text-loss"><TrendingDown size={13} /> Flop — écart vs catégorie</div>
                <div className="space-y-1">
                  {flop.map(({ f, ecart }) => (
                    <Link key={f.id} to={`/convictions/${f.id}`} className="flex items-center justify-between rounded-lg px-2.5 py-2 hover:bg-ink-800">
                      <span className="min-w-0 truncate pr-2 text-sm text-chalk">{f.name}</span>
                      <span className="shrink-0 font-mono text-xs text-loss tnum">{pct(ecart)}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </Panel>

          {/* Mes actions à mener */}
          <Panel>
            <PanelHeader
              title="Mes actions à mener"
              right={<Link to="/admin" className="text-xs text-mute hover:text-chalk">{todosTotal} au total →</Link>}
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
          {/* Dernières mises à jour (vue publique — l'activité détaillée vit dans Admin) */}
          <Panel>
            <PanelHeader icon={<RefreshCcw size={14} />} title="Dernières mises à jour" />
            <div className="divide-y divide-line/60">
              <Link to={`/allocations/${lastProfile.id}`} className="flex items-center gap-3 px-5 py-3.5 hover:bg-ink-800">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold/12 text-gold"><Layers size={15} /></span>
                <div className="min-w-0 flex-1">
                  <div className="text-sm text-chalk">Dernier profil mis à jour</div>
                  <div className="text-xs text-faint">Défensif — Cardif Elite · arbitrage du 26/09</div>
                </div>
                <ChevronRight size={14} className="text-ghost" />
              </Link>
              <Link to="/convictions/carmignac-patrimoine-a" className="flex items-center gap-3 px-5 py-3.5 hover:bg-ink-800">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-equilibre/12 text-equilibre"><Database size={15} /></span>
                <div className="min-w-0 flex-1">
                  <div className="text-sm text-chalk">Dernier fonds mis à jour</div>
                  <div className="text-xs text-faint">Carmignac Patrimoine A · il y a 4 jours</div>
                </div>
                <ChevronRight size={14} className="text-ghost" />
              </Link>
            </div>
          </Panel>

          {/* Entrée par compagnie — navigation descendante */}
          <Panel>
            <PanelHeader
              icon={<Building2 size={14} />}
              title="Allocations par compagnie"
              right={<Link to="/allocations" className="text-xs text-mute hover:text-chalk">Tout voir →</Link>}
            />
            <div className="divide-y divide-line/60">
              {companies.map((c) => {
                const riskTypes = Array.from(new Set(c.contracts.flatMap((ct) => ct.profiles.map((p) => p.riskType))))
                return (
                  <Link key={c.slug} to={`/allocations?compagnie=${c.slug}`} className="flex items-center gap-3 px-5 py-3 hover:bg-ink-800">
                    <div className="min-w-0 flex-1">
                      <div className="font-serif text-sm text-chalk">{c.name}</div>
                      <div className="text-xs text-faint">{c.contracts.length} contrat{c.contracts.length > 1 ? 's' : ''} · {c.contracts.map((ct) => ct.label).join(' · ')}</div>
                    </div>
                    <span className="flex shrink-0 items-center gap-1.5">
                      {riskTypes.map((r) => <span key={r} title={r} className={cx('h-2.5 w-2.5 rounded-full', riskDot[r])} />)}
                    </span>
                    <ChevronRight size={14} className="shrink-0 text-ghost" />
                  </Link>
                )
              })}
            </div>
          </Panel>

          {/* Raccourcis */}
          <Panel>
            <PanelHeader title="Raccourcis" />
            <div className="grid grid-cols-2 gap-3 p-4">
              <Shortcut to="/allocations" icon={<Layers size={17} className="text-equilibre" />} title="Allocateur d'actifs" sub="Compagnie → contrat → profil" />
              <Shortcut to="/convictions" icon={<Database size={17} className="text-gold" />} title="Suivi des fonds" sub="184 fonds référencés" />
              <Shortcut to="/comites" icon={<Landmark size={17} className="text-gold" />} title="Prochain comité" sub="24 juin · préparation" />
              <Shortcut to="/admin" icon={<Inbox size={17} className="text-equilibre" />} title="Admin · Sources" sub="8 à valider · 23 en file" />
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
