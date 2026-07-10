import type { ComplianceEntry, TraceabilityPillar } from '../types'

export const pillars: { name: TraceabilityPillar; mechanism: string; visibleIn: string }[] = [
  {
    name: 'Horodatage',
    mechanism: "Chaque donnée porte sa date d'entrée + date de dernière vérification + date d'expiration.",
    visibleIn: 'Conformité · partout en surimpression',
  },
  {
    name: 'Sourçage',
    mechanism: 'Chaque info pointe vers sa source primaire (newsletter, réunion SGP, comité).',
    visibleIn: 'Sources · sur chaque fiche fonds',
  },
  {
    name: 'Versioning',
    mechanism: 'Chaque modification crée une version archivée, diff visualisable.',
    visibleIn: 'Conformité · journal des allocations',
  },
  {
    name: 'Validation 4 yeux',
    mechanism: 'Décisions sensibles (statut A/C/V, nouveau fonds, arbitrage) exigent un valideur ≠ proposeur.',
    visibleIn: 'Comités · workflow Sources',
  },
  {
    name: 'Consignation',
    mechanism: 'Toute output IA est consignée comme document opposable (PDF + métadonnées).',
    visibleIn: 'Conformité · Chat IA · documents émis',
  },
]

export const complianceEntries: ComplianceEntry[] = [
  {
    id: 'ce-1',
    ref: '#2026-0428',
    type: 'Output IA',
    label: 'Allocation « Équilibré Cardif Essentiel » générée via Chat IA',
    author: 'Marie L.',
    source: 'Base 15/05/2026 · Comité GA 08/05/2026',
    date: '2026-05-28',
    version: 1,
    pillars: ['Horodatage', 'Sourçage', 'Consignation'],
  },
  {
    id: 'ce-2',
    ref: '#2026-0427',
    type: 'PV comité',
    label: 'PV Comité GA 27/05/2026 — signé électroniquement',
    author: 'Compliance',
    source: 'Comité GA 27/05/2026',
    date: '2026-05-27',
    version: 2,
    pillars: ['Horodatage', 'Versioning', 'Validation 4 yeux', 'Consignation'],
  },
  {
    id: 'ce-3',
    ref: '#2026-0426',
    type: 'Décision',
    label: 'Statut A/C/V — Carmignac Patrimoine A → Acheter',
    author: 'Pierre B. → validé Direction',
    source: 'Note réunion 22/04/2026',
    date: '2026-05-27',
    version: 1,
    pillars: ['Horodatage', 'Sourçage', 'Validation 4 yeux'],
  },
  {
    id: 'ce-4',
    ref: '#2026-0425',
    type: 'Allocation émise',
    label: 'Arbitrage Défensif Axa-Cardif — 47 clients',
    author: 'Pierre B.',
    source: 'Comité GA 27/05/2026',
    date: '2026-05-27',
    version: 3,
    pillars: ['Horodatage', 'Versioning', 'Validation 4 yeux', 'Consignation'],
  },
  {
    id: 'ce-5',
    ref: '#2026-0424',
    type: 'Mémo client',
    label: 'Mémo recommandation — Mme Rousseau (Cardif Essentiel)',
    author: 'Marie L.',
    source: 'Chat IA · doc #2026-0428',
    date: '2026-05-28',
    version: 1,
    pillars: ['Horodatage', 'Sourçage', 'Consignation'],
  },
  {
    id: 'ce-6',
    ref: '#2026-0421',
    type: 'Décision',
    label: 'Signal de sortie — Natixis EM (FR0010390955) → Vendre',
    author: 'Agent IA → validé Pierre B.',
    source: 'Newsletter 02/05/2026',
    date: '2026-05-02',
    version: 1,
    pillars: ['Horodatage', 'Sourçage', 'Validation 4 yeux'],
  },
]

export const alerts = [
  { level: 'Fraîcheur', label: '12 fiches fonds > 45 jours', detail: 'Obligation de service · mise à jour mensuelle par compagnie', tone: 'gold' as const },
  { level: 'Expiration', label: '3 listes UC arrivent à échéance', detail: 'Cardif Elite · Generali Himalia · Spirica SE-2016', tone: 'gold' as const },
  { level: 'Signal', label: '1 signal de sortie non traité', detail: 'Natixis EM (FR0010390955) — remplacement à valider', tone: 'wine' as const },
]

export const regulatorExports = [
  { label: 'Registre des décisions — T2 2026', format: 'ACPR', period: 'Avr–Juin 2026' },
  { label: 'Piste d\'audit allocations — T2 2026', format: 'AMF', period: 'Avr–Juin 2026' },
  { label: 'Documents émis (mémos + PV) — T2 2026', format: 'ACPR/AMF', period: 'Avr–Juin 2026' },
]
