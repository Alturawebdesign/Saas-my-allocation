import { useState } from 'react'
import { Landmark, CalendarDays, FileSignature, CheckCircle2, Circle, ClipboardList } from 'lucide-react'
import { PageHeader } from '@/components/PageHeader'
import { Panel, PanelHeader, Badge, Button, Note } from '@/components/ui'
import { committees, sgpMeetings } from '@/lib/data/committees'
import { cx, frDate } from '@/lib/format'
import type { Committee } from '@/lib/types'

const statusTone: Record<Committee['status'], 'gold' | 'blue' | 'gain' | 'neutral'> = {
  'À venir': 'neutral', 'En préparation': 'gold', 'PV signé': 'gain', Archivé: 'blue',
}
const decisionTone: Record<string, 'gain' | 'loss' | 'blue' | 'gold'> = {
  'Statut A/C/V': 'blue', 'Nouveau fonds': 'gain', Arbitrage: 'gold', 'Sortie fonds': 'loss',
}

export function Committees() {
  const [selId, setSelId] = useState(committees[1].id)
  const sel = committees.find((c) => c.id === selId)!

  return (
    <>
      <PageHeader title="Comités" sub="Gouvernance · décisions + PV signés électroniquement" right={<Button variant="gold"><ClipboardList size={14} /> Préparer un comité</Button>} />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
        {/* Calendar list */}
        <div className="lg:col-span-4">
          <Panel>
            <PanelHeader icon={<CalendarDays size={14} />} title="Calendrier" />
            <div className="divide-y divide-line">
              {committees.map((c) => (
                <button key={c.id} onClick={() => setSelId(c.id)} className={cx('flex w-full items-start gap-3 px-4 py-3 text-left transition-colors hover:bg-ink-800', selId === c.id && 'bg-ink-800')}>
                  <span className={cx('mt-1 h-2 w-2 shrink-0 rounded-full', selId === c.id ? 'bg-gold' : 'bg-ink-500')} />
                  <div className="min-w-0 flex-1">
                    <div className="text-sm text-chalk">{c.title}</div>
                    <div className="font-mono text-2xs text-faint">{frDate(c.date)}</div>
                  </div>
                  <Badge tone={statusTone[c.status]}>{c.status}</Badge>
                </button>
              ))}
            </div>
          </Panel>

          <Panel className="mt-5">
            <PanelHeader icon={<Landmark size={14} />} title="Calendrier rencontres SGP" />
            <div className="divide-y divide-line">
              {sgpMeetings.map((m, i) => (
                <div key={i} className="flex items-center justify-between px-4 py-2.5">
                  <div>
                    <div className="text-sm text-chalk">{m.sgp}</div>
                    <div className="font-mono text-2xs text-faint">{frDate(m.date)} · {m.kind}</div>
                  </div>
                  <Badge tone={m.status === 'Réalisé' ? 'gain' : m.status === 'À préparer' ? 'gold' : 'neutral'}>{m.status}</Badge>
                </div>
              ))}
            </div>
          </Panel>
        </div>

        {/* Detail */}
        <div className="lg:col-span-8">
          <Panel>
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-4">
              <div>
                <h2 className="font-serif text-xl text-chalk">{sel.title}</h2>
                <div className="mt-0.5 font-mono text-2xs text-faint">{frDate(sel.date)} · {sel.type} · {sel.attendees.length} participants</div>
              </div>
              <div className="flex items-center gap-2">
                <Badge tone={statusTone[sel.status]}>{sel.status}</Badge>
                {sel.signed && <span className="flex items-center gap-1 font-mono text-2xs text-gain"><FileSignature size={13} /> PV signé</span>}
              </div>
            </div>

            <div className="space-y-5 p-5">
              {/* Attendees */}
              <div>
                <div className="label mb-2">Participants</div>
                <div className="flex flex-wrap gap-2">
                  {sel.attendees.map((a) => <span key={a} className="rounded-full border border-line bg-ink-800 px-2.5 py-1 text-2xs text-mute">{a}</span>)}
                </div>
              </div>

              {/* Decisions */}
              <div>
                <div className="label mb-2">Décisions {sel.decisions.length > 0 && `(${sel.decisions.length})`}</div>
                {sel.decisions.length === 0 ? (
                  <Note tone="gold">Comité en préparation — décisions à statuer. Validation à 4 yeux requise (proposeur ≠ valideur).</Note>
                ) : (
                  <div className="space-y-2">
                    {sel.decisions.map((d, i) => (
                      <div key={i} className="flex items-start gap-3 rounded-md border border-line bg-ink-800 p-3">
                        <Badge tone={decisionTone[d.kind]}>{d.kind}</Badge>
                        <div className="min-w-0">
                          <div className="text-sm font-medium text-chalk">{d.label}</div>
                          <div className="mt-0.5 text-2xs text-mute">{d.detail}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Actions / suivi post-comité */}
              <div>
                <div className="label mb-2">Suivi post-comité</div>
                <div className="space-y-1.5">
                  {sel.actions.map((a, i) => (
                    <div key={i} className="flex items-center gap-3 rounded-md px-2 py-1.5 hover:bg-ink-800">
                      {a.done ? <CheckCircle2 size={15} className="text-gain" /> : <Circle size={15} className="text-ghost" />}
                      <span className={cx('flex-1 text-sm', a.done ? 'text-faint line-through' : 'text-chalk')}>{a.label}</span>
                      <span className="font-mono text-2xs text-faint">{a.owner} · {a.due}</span>
                    </div>
                  ))}
                </div>
              </div>

              {sel.signed && (
                <div className="flex gap-2 border-t border-line pt-4">
                  <Button variant="default"><FileSignature size={14} /> Consulter le PV signé</Button>
                  <Button variant="ghost">Voir dans Conformité →</Button>
                </div>
              )}
            </div>
          </Panel>
        </div>
      </div>
    </>
  )
}
