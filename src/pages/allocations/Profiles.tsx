import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { FileOutput, ArrowUpRight, GitCompare } from 'lucide-react'
import { PageHeader } from '@/components/PageHeader'
import { Panel, Segmented, Button } from '@/components/ui'
import { Sparkline } from '@/components/charts'
import { profiles } from '@/lib/data/profiles'
import { cx, pct, riskColor, riskHex, signClass } from '@/lib/format'
import type { Profile } from '@/lib/types'

const FILTERS = ['Tous', 'Défensif', 'Équilibré', 'Dynamique']

export function Profiles() {
  const [filter, setFilter] = useState('Tous')
  const list = useMemo(() => (filter === 'Tous' ? profiles : profiles.filter((p) => p.riskType === filter)), [filter])

  return (
    <>
      <PageHeader
        title="Mes profils"
        right={
          <>
            <Link to="/allocations/comparateur"><Button variant="default"><GitCompare size={14} /> Comparateur</Button></Link>
            <Button variant="gold"><FileOutput size={14} /> Générer fichier O2S</Button>
          </>
        }
      />

      <div className="mb-3 flex items-center justify-between">
        <Segmented options={FILTERS} active={filter} onChange={setFilter} />
        <span className="label">{list.length} profils</span>
      </div>

      <div className="space-y-5">
        {list.map((p) => <ProfileCard key={p.id} p={p} />)}
      </div>
    </>
  )
}

function ProfileCard({ p }: { p: Profile }) {
  return (
    <Link to={`/allocations/${p.id}`} className="block">
      <Panel className="hover-lift group px-6 py-5 hover:bg-ink-700/40">
        <div className="mb-3 flex items-start justify-between">
          <div>
            <h3 className={cx('font-serif text-xl', riskColor[p.riskType])}>
              {p.riskType} <span className="text-mute">— {p.contracts}</span>
            </h3>
            <div className="mt-1 text-xs text-faint">Indice : {p.indexClass}</div>
          </div>
          <span className="flex items-center gap-1 font-mono text-2xs text-mute opacity-0 transition-opacity group-hover:opacity-100">
            voir le détail <ArrowUpRight size={12} />
          </span>
        </div>

        <div className="flex items-end justify-between gap-6">
          <table className="tnum">
            <thead>
              <tr className="text-left">
                <th />
                <th className="label px-4 pb-1 text-right font-normal">Perf. YTD<br /><span className="text-ghost">au 01/04/2025</span></th>
                <th className="label px-4 pb-1 text-right font-normal">Volatilité<br /><span className="text-ghost">1 an</span></th>
                <th className="label px-4 pb-1 text-right font-normal">Perte max<br /><span className="text-ghost">historique</span></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="pr-2 text-sm text-chalk">Profil</td>
                <td className={cx('px-4 py-0.5 text-right font-mono text-sm', signClass(p.metric.perfYtd))}>{pct(p.metric.perfYtd)}</td>
                <td className="px-4 py-0.5 text-right font-mono text-sm text-chalk">{pct(p.metric.volatility, 2, false)}</td>
                <td className={cx('px-4 py-0.5 text-right font-mono text-sm', signClass(p.metric.maxLoss))}>{pct(p.metric.maxLoss)}</td>
              </tr>
              <tr>
                <td className="pr-2 text-sm text-faint">Indice</td>
                <td className={cx('px-4 py-0.5 text-right font-mono text-2xs', signClass(p.indexMetric.perfYtd))}>{pct(p.indexMetric.perfYtd)}</td>
                <td className="px-4 py-0.5 text-right font-mono text-2xs text-faint">{pct(p.indexMetric.volatility, 2, false)}</td>
                <td className={cx('px-4 py-0.5 text-right font-mono text-2xs', signClass(p.indexMetric.maxLoss))}>{pct(p.indexMetric.maxLoss)}</td>
              </tr>
            </tbody>
          </table>

          <div className="hidden shrink-0 sm:block">
            <Sparkline profil={p.spark} indice={p.sparkIndex} color={riskHex[p.riskType]} width={220} height={54} />
            <div className="mt-1 flex justify-between px-1 font-mono text-2xs text-ghost">
              <span>1-Jan</span><span>1-Fév</span><span>1-Mars</span><span>1-Avr</span>
            </div>
          </div>
        </div>
      </Panel>
    </Link>
  )
}
