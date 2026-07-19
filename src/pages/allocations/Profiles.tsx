import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { FileOutput, GitCompare, ChevronDown, Building2, Globe2, ArrowUpRight } from 'lucide-react'
import { PageHeader } from '@/components/PageHeader'
import { Panel, PanelHeader, Button } from '@/components/ui'
import { companies, allocatorScenario } from '@/lib/data/companies'
import { profileById } from '@/lib/data/profiles'
import { cx, frDate, pct, riskColor, riskDot, signClass } from '@/lib/format'

export function Profiles() {
  const [params] = useSearchParams()
  const preselected = params.get('compagnie')
  const [openSlugs, setOpenSlugs] = useState<Set<string>>(
    () => new Set(preselected ? [preselected] : [companies[0].slug]),
  )

  const toggle = (slug: string) =>
    setOpenSlugs((prev) => {
      const next = new Set(prev)
      next.has(slug) ? next.delete(slug) : next.add(slug)
      return next
    })

  const totalProfiles = useMemo(
    () => companies.reduce((n, c) => n + c.contracts.reduce((m, ct) => m + ct.profiles.length, 0), 0),
    [],
  )

  return (
    <>
      <PageHeader
        title="Allocateur d'actifs"
        sub={`Navigation par compagnie → contrat → profil · ${totalProfiles} profils gérés`}
        right={
          <>
            <Link to="/allocations/comparateur"><Button variant="default"><GitCompare size={14} /> Comparateur</Button></Link>
            <Button variant="gold"><FileOutput size={14} /> Générer fichier O2S</Button>
          </>
        }
      />

      {/* Scénario de l'allocataire — en amont des allocations par contrat */}
      <Panel className="mb-6">
        <PanelHeader
          icon={<Globe2 size={15} />}
          title={allocatorScenario.title}
          right={<span className="text-xs text-faint">Édité le {frDate(allocatorScenario.updatedAt)}</span>}
        />
        <p className="px-5 py-4 text-sm leading-relaxed text-mute">{allocatorScenario.text}</p>
      </Panel>

      {/* Compagnie → Contrat → Profil */}
      <div className="space-y-4">
        {companies.map((company) => {
          const open = openSlugs.has(company.slug)
          return (
            <Panel key={company.slug} className="overflow-hidden">
              <button
                onClick={() => toggle(company.slug)}
                className="flex w-full items-center gap-3 px-5 py-4 text-left transition-colors hover:bg-ink-700/40 ring-eos"
                aria-expanded={open}
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gold/10 text-gold"><Building2 size={17} /></span>
                <div className="min-w-0 flex-1">
                  <h2 className="font-serif text-lg text-chalk">{company.name}</h2>
                  <div className="text-xs text-faint">
                    {company.contracts.length} contrat{company.contracts.length > 1 ? 's' : ''} ·{' '}
                    {company.contracts.reduce((n, ct) => n + ct.profiles.length, 0)} profil{company.contracts.reduce((n, ct) => n + ct.profiles.length, 0) > 1 ? 's' : ''}
                  </div>
                </div>
                <ChevronDown size={16} className={cx('shrink-0 text-mute transition-transform duration-200', open && 'rotate-180')} />
              </button>

              {open && (
                <div className="animate-fade-in divide-y divide-line/60 border-t border-line/70">
                  {company.contracts.map((contract) => (
                    <div key={contract.label} className="px-5 py-4">
                      <div className="mb-2.5 text-sm font-medium text-chalk">{contract.label}</div>
                      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
                        {contract.profiles.map(({ riskType, profileId }) => {
                          const p = profileById(profileId)
                          if (!p) return null
                          return (
                            <Link
                              key={profileId}
                              to={`/allocations/${profileId}`}
                              className="hover-lift group rounded-xl border border-line bg-ink-800 px-4 py-3 hover:bg-ink-700"
                            >
                              <div className="flex items-center justify-between">
                                <span className={cx('flex items-center gap-2 font-serif text-sm', riskColor[riskType])}>
                                  <span className={cx('h-2 w-2 rounded-full', riskDot[riskType])} />
                                  {riskType}
                                </span>
                                <ArrowUpRight size={13} className="text-ghost opacity-0 transition-opacity group-hover:opacity-100" />
                              </div>
                              <div className="mt-2 flex items-center justify-between text-xs">
                                <span className="text-faint">Perf. YTD</span>
                                <span className={cx('font-mono tnum', signClass(p.metric.perfYtd))}>{pct(p.metric.perfYtd)}</span>
                              </div>
                              <div className="mt-1 flex items-center justify-between text-xs">
                                <span className="text-faint">SRI</span>
                                <span className="font-mono text-mute tnum">{p.sri} / 7</span>
                              </div>
                            </Link>
                          )
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Panel>
          )
        })}
      </div>
    </>
  )
}
