import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Download, SlidersHorizontal, Pencil } from 'lucide-react'
import { PageHeader } from '@/components/PageHeader'
import { Panel, RecoPill, Button } from '@/components/ui'
import { funds, TOTAL_TRACKED } from '@/lib/data/funds'
import { cx, pct, signClass, trendClass, trendGlyph, frDateShort } from '@/lib/format'

export function FundList() {
  const navigate = useNavigate()
  const [q, setQ] = useState('')
  const [sgp, setSgp] = useState('Toutes')
  const [excludeEos, setExcludeEos] = useState(true)

  const sgps = useMemo(() => ['Toutes', ...Array.from(new Set(funds.map((f) => f.sgp))).sort()], [])

  const filtered = useMemo(
    () =>
      funds.filter((f) => {
        if (q && !f.name.toLowerCase().includes(q.toLowerCase())) return false
        if (sgp !== 'Toutes' && f.sgp !== sgp) return false
        if (excludeEos && f.eosExcluded) return false
        return true
      }),
    [q, sgp, excludeEos],
  )

  return (
    <>
      <PageHeader
        title="La liste des fonds à mettre à jour !"
        sub="Consultez tous les fonds suivis de l'application."
        right={
          <div className="text-right">
            <div className="mb-2 font-mono text-2xs text-faint">{TOTAL_TRACKED} fonds suivis</div>
            <Button variant="default"><Download size={14} /> Téléchargement Excel</Button>
          </div>
        }
      />

      {/* Search + filters */}
      <Panel className="mb-5 p-4">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <div className="label mb-2">Recherche</div>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ghost" />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Recherche par nom de fonds"
                  className="w-full rounded-md border border-line bg-ink-800 py-2 pl-9 pr-3 text-sm text-chalk placeholder:text-ghost focus:border-ink-500 focus:outline-none"
                />
              </div>
              <Button variant="default"><Search size={14} /> Rechercher</Button>
            </div>
          </div>
          <div>
            <div className="label mb-2">Filtres</div>
            <div className="flex flex-wrap items-center gap-4">
              <div>
                <label className="mb-1 block font-mono text-[10px] text-faint">Société de gestion</label>
                <select value={sgp} onChange={(e) => setSgp(e.target.value)} className="rounded-md border border-line bg-ink-800 px-3 py-2 text-sm text-chalk focus:border-ink-500 focus:outline-none">
                  {sgps.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </div>
              <label className="flex cursor-pointer items-center gap-2 text-sm text-mute">
                <input type="checkbox" checked={excludeEos} onChange={(e) => setExcludeEos(e.target.checked)} className="h-4 w-4 accent-gain" />
                Fonds EOS Allocations exclus
              </label>
            </div>
          </div>
        </div>
      </Panel>

      {/* Result count */}
      <div className="mb-2 flex items-center justify-between px-1">
        <span className="text-sm text-mute">
          <span className="text-chalk">{filtered.length}</span> fonds correspondent à votre recherche :
        </span>
        <button
          onClick={() => { setQ(''); setSgp('Toutes'); setExcludeEos(true) }}
          className="flex items-center gap-1 font-mono text-2xs text-mute hover:text-chalk"
        >
          <SlidersHorizontal size={12} /> Supprimer les filtres / tri
        </button>
      </div>

      {/* Table */}
      <Panel className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px]">
            <thead>
              <tr className="border-b border-line text-left">
                {['Fonds', 'Dernier commentaire', 'Recommandation', 'Nb clients', 'Performance YTD', 'Éditer'].map((h) => (
                  <th key={h} className="label px-4 py-2.5 font-normal">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-line/60">
              {filtered.map((f) => (
                <tr key={f.id} onClick={() => navigate(`/convictions/${f.id}`)} className="cursor-pointer transition-colors hover:bg-ink-800">
                  <td className="px-4 py-4">
                    <div className="text-sm font-medium text-chalk">{f.name}</div>
                    <div className="mt-0.5 text-xs text-faint">{f.sriCategory}</div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-xs text-mute tnum">{f.lastComment}</div>
                    <div className={cx('mt-0.5 text-xs', f.freshnessDays > 45 ? 'text-gold' : 'text-faint')}>{f.lastCommentLabel}</div>
                  </td>
                  <td className="px-4 py-4"><RecoPill reco={f.recoFund} /></td>
                  <td className="px-4 py-4">
                    <span className="inline-flex items-center gap-2">
                      <span className={cx('text-xs', trendClass(f.trend))}>{trendGlyph(f.trend)}</span>
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-equilibre/15 text-xs text-equilibre tnum">{f.nbClients}</span>
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className={cx('font-mono text-sm tnum', signClass(f.perfYtd))}>{pct(f.perfYtd)}</div>
                    <div className="mt-0.5 text-xs text-faint tnum">{frDateShort('2025-03-17')}</div>
                  </td>
                  <td className="px-4 py-4">
                    <button onClick={(e) => { e.stopPropagation(); navigate(`/convictions/${f.id}`) }} className="rounded-lg p-2 text-mute hover:bg-ink-700 hover:text-chalk">
                      <Pencil size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </>
  )
}
