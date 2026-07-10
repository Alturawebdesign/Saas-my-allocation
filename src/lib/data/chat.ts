import type { AiAllocationOutput } from '../types'

/** Pre-built prompt templates (Chat IA · templates pré-construits). */
export const chatTemplates: string[] = [
  'Génère une allocation équilibrée pour contrat Cardif Essentiel',
  'Compare ce profil avec une version plus défensive',
  'Liste les fonds éligibles pour Cardif Essentiel',
  'Synthèse macro du dernier comité',
]

/** The canonical structured output for "Équilibré Cardif Essentiel" (§ BNP transposition). */
export const cardifEssentielAllocation: AiAllocationOutput = {
  profile: 'Équilibré',
  contract: 'Cardif Essentiel',
  contractRef: 'CE-2019',
  baseUpdate: '15/05/2026',
  committee: 'GA 08/05/2026',
  lines: [
    { klass: 'Actions Europe (large cap)', pct: 22, isinCount: 3 },
    { klass: 'Actions US', pct: 18, isinCount: 4 },
    { klass: 'Actions Émergents', pct: 5, isinCount: 2 },
    { klass: 'Obligations IG', pct: 15, isinCount: 2 },
    { klass: 'Obligations HY', pct: 8, isinCount: 1 },
    { klass: 'Diversifié / Flexible', pct: 20, isinCount: 4 },
    { klass: 'Private Equity / FCPR', pct: 7, isinCount: 'selon éligibilité contrat' },
    { klass: 'Liquidités', pct: 5, isinCount: '—' },
  ],
  expectedReturn: '+4,2 % / an',
  volatility: '7,8 %',
  var95: '−6,1 %',
  timeToRecover: '18 mois',
  liquidityBucket: 'Daily 68 % · Monthly 20 % · Illiquide 12 %',
  justification: {
    isin: 'FR0010135103',
    fund: 'Carmignac Patrimoine A',
    sgp: 'Carmignac Gestion',
    category: 'Diversifié flexible',
    status: 'A (Acheter)',
    thesis:
      'Fonds patrimonial flexible historique. Capacité éprouvée à réduire le risque actions en régime de stress. Portage obligataire renforcé depuis T4 2025 (+IG court terme). Exposition devises couverte.',
    lastMeeting: '22/04/2026 — réunion trimestrielle',
    meetingSynthesis:
      'Positionnement défensif maintenu, objectif de capture asymétrique. Pas de changement de stratégie prévu H1 2026.',
    availability: [
      { contract: 'Cardif Essentiel (CE-2019)', available: true, note: 'UC quotidienne' },
      { contract: 'Cardif Libertés (CL-2012)', available: true, note: 'UC quotidienne' },
      { contract: 'Spirica Evolution (SE-2016)', available: false, note: 'alt. LU0094170976' },
    ],
    sources: 'Newsletter Carmignac 05/2026 · Note réunion 22/04/2026 · Comité GA 08/05/2026',
  },
  macro: {
    regime: 'Croissance molle / Désinflation progressive',
    rates: 'plateau Fed + BCE, premières baisses attendues T3 2026',
    biases: [
      { label: 'Obligations IG courte duration', stance: 'SURPONDÉRER' },
      { label: 'Actions Europe value/dividendes', stance: 'SURPONDÉRER' },
      { label: 'Actions US croissance', stance: 'NEUTRE' },
      { label: 'Obligations HY longue duration', stance: 'SOUS-PONDÉRER' },
      { label: 'Émergents devise locale', stance: 'SOUS-PONDÉRER' },
    ],
    alert: 'Signal de sortie sur FR0010390955 (Natixis EM) émis le 02/05/2026 — à remplacer avant prochain entretien client.',
  },
}
