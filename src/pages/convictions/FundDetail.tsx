import { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Pencil, Leaf, FileText, BarChart3, ScrollText, Sparkles, Filter, Search } from 'lucide-react'
import { PageHeader } from '@/components/PageHeader'
import { Panel, RecoPill, Tabs, Badge, Button, Note, Modal } from '@/components/ui'
import { SriGauge } from '@/components/charts'
import { funcById, funds, similarFunds, insurerContracts } from '@/lib/data/funds'
import { cx, pct, signClass } from '@/lib/format'
import type { Fund } from '@/lib/types'

const TABS = ['Analyse', 'Ethyk Score', 'Informations', 'Société de gestion', 'Fonds similaires', 'Parts du fonds']

export function FundDetail() {
  const { id } = useParams()
  const fund = funcById(id ?? '') ?? funds[0]
  const [tab, setTab] = useState('Analyse')

  return (
    <>
      <PageHeader
        back={{ to: '/convictions', label: 'Accueil › Fonds suivis' }}
        title={fund.name}
        sub={`${fund.isin} (EUR) · ${fund.sgp} — ${fund.category}`}
        right={
          <>
            <Button variant="default"><Pencil size={14} /> Éditer</Button>
            <Button variant="gold"><Leaf size={14} /> Éditer Ethyk Score</Button>
          </>
        }
      />

      {/* 4 metrics */}
      <div className="mb-5 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <MetricCard label="Performance du fonds" sub="YTD" value={<span className={signClass(fund.perfYtd)}>{pct(fund.perfYtd)}</span>} />
        <MetricCard label="Performance catégorie" sub="YTD" value={<span className={signClass(fund.perfCatYtd)}>{pct(fund.perfCatYtd)}</span>} />
        <MetricCard label="Recommandation fonds" value={<RecoPill reco={fund.recoFund} />} plain />
        <MetricCard label="Recommandation catégorie" value={<RecoPill reco={fund.recoCategory} />} plain />
      </div>

      <Tabs tabs={TABS} active={tab} onChange={setTab} className="mb-5" />

      {tab === 'Analyse' && <AnalyseTab fund={fund} />}
      {tab === 'Ethyk Score' && <EthykTab fund={fund} />}
      {tab === 'Informations' && <InfoTab fund={fund} />}
      {tab === 'Société de gestion' && <SgpTab fund={fund} />}
      {tab === 'Fonds similaires' && <SimilarTab fund={fund} />}
      {tab === 'Parts du fonds' && <PartsTab fund={fund} />}
    </>
  )
}

function MetricCard({ label, sub, value, plain }: { label: string; sub?: string; value: React.ReactNode; plain?: boolean }) {
  return (
    <div className="rounded-lg border border-line bg-ink-750 p-4">
      <div className="label mb-2">{label}</div>
      <div className={cx(plain ? '' : 'font-mono text-2xl tnum')}>{value}</div>
      {sub && <div className="mt-1 font-mono text-2xs text-faint">{sub}</div>}
    </div>
  )
}

function Block({ icon, title, right, children }: { icon?: React.ReactNode; title: string; right?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="border-t border-line py-4 first:border-t-0 first:pt-0">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2 label-b">{icon}{title}</div>
        {right}
      </div>
      <div className="space-y-2 text-sm leading-relaxed text-mute">{children}</div>
    </section>
  )
}

function AnalyseTab({ fund }: { fund: Fund }) {
  const a = fund.analysis
  return (
    <Panel className="px-5 py-4">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-line pb-3">
        <span className="text-sm text-chalk">Interlocuteur : <span className="text-mute">{fund.interlocutor}</span></span>
        <span className="font-mono text-2xs text-faint">Dernière mise à jour {fund.lastComment}</span>
      </div>

      <Block icon={<FileText size={13} />} title="Commentaire actualité"><p>{a.actualite}</p></Block>
      <Block icon={<BarChart3 size={13} />} title="Vue du gérant">{a.vueGerant.map((p, i) => <p key={i}>{p}</p>)}</Block>
      <Block title="Positionnement du portefeuille">
        <p>{a.positionnement[0]}</p>
        <ul className="ml-4 list-disc space-y-1">{a.positionnement.slice(1).map((p, i) => <li key={i}>{p}</li>)}</ul>
      </Block>
      <Block title="Éléments de valorisation">
        <p>{a.valorisation[0]}</p>
        <ul className="ml-4 list-disc space-y-1">{a.valorisation.slice(1, -1).map((p, i) => <li key={i}>{p}</li>)}</ul>
        <p>{a.valorisation[a.valorisation.length - 1]}</p>
      </Block>
      <Block icon={<ScrollText size={13} />} title="Commentaire de structure"><p>{a.structure}</p></Block>
      <Block title="Commentaire de structure simplifié"><p>{a.structureSimple}</p></Block>
      <Block title="Recommandation du fonds" right={<RecoPill reco={fund.recoFund} />}><p>{a.recoFundText}</p></Block>
      <Block title="Recommandation de la catégorie" right={<RecoPill reco={fund.recoCategory} />}><p>{a.recoCategoryText}</p></Block>
      <Block title="Documents">
        <div className="flex flex-wrap gap-2">
          {fund.documents.map((d) => (
            <Button key={d.label} variant="default" size="sm"><FileText size={12} /> {d.label}</Button>
          ))}
        </div>
      </Block>
    </Panel>
  )
}

function EthykTab({ fund }: { fund: Fund }) {
  const e = fund.ethykScore
  const rows = [
    ['Environnement', e.environment],
    ['Social', e.social],
    ['Gouvernance', e.governance],
  ] as const
  return (
    <Panel className="p-5">
      <div className="mb-4 flex items-center gap-2 label-b"><Leaf size={14} className="text-gain" /> Ethyk Score — notation ESG propriétaire</div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="flex flex-col items-center justify-center rounded-lg border border-line bg-ink-800 p-6">
          <div className="font-mono text-5xl text-gain tnum">{e.global.toFixed(1)}</div>
          <div className="mt-1 font-mono text-2xs text-faint">/ 10 · {e.label}</div>
        </div>
        <div className="md:col-span-2 space-y-4">
          {rows.map(([label, v]) => (
            <div key={label}>
              <div className="mb-1 flex items-center justify-between text-sm">
                <span className="text-mute">{label}</span>
                <span className="font-mono text-chalk tnum">{v} / 10</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-ink-700">
                <div className="h-full rounded-full bg-gain/70" style={{ width: `${(v / 10) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Panel>
  )
}

function InfoTab({ fund }: { fund: Fund }) {
  const info: [string, React.ReactNode][] = [
    ['Code ISIN', fund.isin],
    ['Société de gestion', fund.sgp],
    ['Catégorie Morningstar', fund.category],
    ['SRI', <SriGauge key="s" score={fund.sri} className="w-40" />],
    ['Frais courants', pct(fund.fees, 2, false)],
    ['Encours', '412 M€'],
    ['Date de création', '18/03/2010'],
    ['Devise', 'EUR'],
    ['Éligibilité', 'AV · CTO · PEA'],
    ['Fréquence de valorisation', 'Quotidienne'],
  ]
  return (
    <Panel className="p-5">
      <div className="mb-4 label-b">Informations — frais, SRI, encours, dates, codes</div>
      <dl className="grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
        {info.map(([k, v]) => (
          <div key={k} className="flex items-center justify-between border-b border-line/60 pb-2">
            <dt className="text-sm text-faint">{k}</dt>
            <dd className="font-mono text-sm text-chalk tnum">{v}</dd>
          </div>
        ))}
      </dl>
    </Panel>
  )
}

function SgpTab({ fund }: { fund: Fund }) {
  return (
    <Panel className="p-5">
      <div className="mb-3 label-b">Société de gestion</div>
      <h3 className="font-serif text-xl text-chalk">{fund.sgp}</h3>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-mute">{fund.managerCompanyBlurb}</p>
      <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[['Encours gérés', '38 Mds €'], ['Fonds gérés', '42'], ['Création', '1998'], ['Équipe gestion', '24 gérants']].map(([k, v]) => (
          <div key={k} className="rounded-lg border border-line bg-ink-800 p-3">
            <div className="label mb-1">{k}</div>
            <div className="font-mono text-lg text-chalk tnum">{v}</div>
          </div>
        ))}
      </div>
    </Panel>
  )
}

function SimilarTab({ fund }: { fund: Fund }) {
  const [modal, setModal] = useState(false)
  return (
    <Panel className="p-5">
      <h3 className="mb-2 font-serif text-lg text-chalk">
        Sélection de fonds EOS pour la catégorie <span className="italic text-gold">{fund.category}</span>
      </h3>
      <Note tone="gain">Cette sélection résulte d'un double objectif : un référencement large et/ou des fonds concurrentiels.</Note>
      <div className="my-4">
        <Button variant="default" onClick={() => setModal(true)}><Filter size={14} /> Filtrer par contrat(s) d'assurance vie</Button>
      </div>
      <div className="overflow-hidden rounded-lg border border-line">
        <table className="w-full">
          <thead>
            <tr className="border-b border-line text-left">
              <th className="label px-4 py-2.5 font-normal">Classement EOS</th>
              <th className="label px-4 py-2.5 font-normal">Nom du fonds</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {similarFunds.map((s) => (
              <tr key={s.rank} className={cx('transition-colors hover:bg-ink-800', s.consulted && 'bg-gold/[0.06]')}>
                <td className="px-4 py-2.5">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gain/15 font-mono text-2xs text-gain tnum">{s.rank}</span>
                </td>
                <td className="px-4 py-2.5">
                  <span className="text-sm text-chalk">{s.name}</span>
                  {s.consulted && <Badge tone="gold" className="ml-2">fonds consulté</Badge>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ContractFilterModal open={modal} onClose={() => setModal(false)} />
    </Panel>
  )
}

function ContractFilterModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState('')
  const [checked, setChecked] = useState<Set<string>>(new Set(['AXA France Vie · Coralis Sélection']))

  const toggle = (key: string) => setChecked((prev) => {
    const next = new Set(prev)
    next.has(key) ? next.delete(key) : next.add(key)
    return next
  })
  const toggleInsurer = (ins: string, contracts: string[]) => setChecked((prev) => {
    const next = new Set(prev)
    const keys = contracts.map((c) => `${ins} · ${c}`)
    const allOn = keys.every((k) => next.has(k))
    keys.forEach((k) => (allOn ? next.delete(k) : next.add(k)))
    return next
  })

  const list = useMemo(
    () => insurerContracts.map((g) => ({ ...g, contracts: g.contracts.filter((c) => c.toLowerCase().includes(q.toLowerCase())) })).filter((g) => g.contracts.length || !q),
    [q],
  )

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Sélectionner un/des contrats"
      footer={
        <>
          <span className="font-mono text-2xs text-faint">{checked.size} contrat{checked.size > 1 ? 's' : ''} sélectionné{checked.size > 1 ? 's' : ''}</span>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={onClose}>Annuler</Button>
            <Button variant="primary" size="sm" onClick={onClose}>Filtrer</Button>
          </div>
        </>
      }
    >
      <Note>Filtre sous réserve des informations communiquées par les assureurs.</Note>
      <div className="relative my-3">
        <Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ghost" />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Recherche par nom de contrat" className="w-full rounded-md border border-line bg-ink-800 py-2 pl-9 pr-3 text-sm text-chalk placeholder:text-ghost focus:border-ink-500 focus:outline-none" />
      </div>
      <div className="space-y-3">
        {list.map((g) => {
          const keys = g.contracts.map((c) => `${g.insurer} · ${c}`)
          const allOn = keys.length > 0 && keys.every((k) => checked.has(k))
          return (
            <div key={g.insurer}>
              <label className="flex cursor-pointer items-center gap-2 pb-1">
                <input type="checkbox" checked={allOn} onChange={() => toggleInsurer(g.insurer, g.contracts)} className="h-4 w-4 accent-gain" />
                <span className="text-sm font-semibold text-chalk">{g.insurer}</span>
              </label>
              <div className="ml-6 space-y-1">
                {g.contracts.map((c) => {
                  const key = `${g.insurer} · ${c}`
                  return (
                    <label key={c} className="flex cursor-pointer items-center gap-2">
                      <input type="checkbox" checked={checked.has(key)} onChange={() => toggle(key)} className="h-3.5 w-3.5 accent-gain" />
                      <span className="text-sm text-mute">{c}</span>
                    </label>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </Modal>
  )
}

function PartsTab({ fund }: { fund: Fund }) {
  return (
    <Panel className="overflow-hidden">
      <div className="border-b border-line px-5 py-3 label-b"><Sparkles size={13} className="mr-2 inline" />Parts du fonds — C / D / I</div>
      <table className="w-full">
        <thead>
          <tr className="border-b border-line text-left">
            {['Part', 'ISIN', 'Type', 'Devise', 'Éligibilité'].map((h) => <th key={h} className="label px-5 py-2.5 font-normal">{h}</th>)}
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {fund.parts.map((p) => (
            <tr key={p.isin} className="hover:bg-ink-800">
              <td className="px-5 py-3 text-sm text-chalk">{p.label}</td>
              <td className="px-5 py-3 font-mono text-2xs text-mute">{p.isin}</td>
              <td className="px-5 py-3"><Badge tone={p.kind === 'C' ? 'blue' : p.kind === 'I' ? 'gain' : 'gold'}>{p.kind}</Badge></td>
              <td className="px-5 py-3 font-mono text-2xs text-mute">{p.devise}</td>
              <td className="px-5 py-3 text-2xs text-mute">{p.eligibility}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Panel>
  )
}
