import type { ActivityEvent, Kpi, TodoItem } from '../types'

export const dashboardDate = { label: 'mercredi 28 mai 2026', time: '14h32' }

export const kpis: Kpi[] = [
  { label: 'Fonds suivis', value: '184', sub: 'dont 142 actifs', tone: 'neutral' },
  { label: 'Fraîcheur > 45 j', value: '12', sub: 'à actualiser', tone: 'gold' },
  { label: 'Arbitrages en attente', value: '3', sub: '→ 47 clients impactés', tone: 'wine' },
  { label: 'Intrants à valider', value: '8', sub: 'synthèses agents IA', tone: 'blue' },
]

export const activity: ActivityEvent[] = [
  {
    time: '14:18',
    actor: 'Marie L.',
    origin: 'Chat IA',
    text: 'a généré une allocation « Équilibré Cardif Essentiel » via Chat IA',
    sub: 'consigné · doc #2026-0428',
    docRef: '#2026-0428',
  },
  {
    time: '11:42',
    actor: 'Agent IA',
    origin: 'Agent IA',
    text: 'a synthétisé Newsletter Carmignac mai 2026',
    sub: 'en attente de validation humaine',
  },
  {
    time: '10:15',
    actor: 'Comité GA',
    origin: 'Comité',
    text: 'PV du Comité GA 27/05/2026 signé électroniquement',
    sub: '3 décisions A/C/V publiées',
  },
  {
    time: '09:30',
    actor: 'Arbitrage',
    origin: 'Arbitrage',
    text: 'Arbitrage validé sur profil Défensif Axa-Cardif → 47 clients à notifier',
    sub: 'campagne lancée vers HubSpot',
  },
  {
    time: 'Hier',
    actor: 'Pierre C',
    origin: 'Nourrisseur humain',
    text: 'Liste UC Spirica Evolution (SE-2016) mise à jour',
    sub: 'nourrisseur humain : Pierre C',
  },
]

export const todos: TodoItem[] = [
  { label: 'Valider 8 synthèses agents IA', sub: 'Sources → File "À valider" · échéance H+2', priority: 'high' },
  { label: 'Confirmer arbitrage Profil Équilibré Cardif', sub: 'Comité 27/05 · 47 clients impactés', priority: 'high' },
  { label: 'Actualiser 12 fiches fonds (fraîcheur > 45 j)', sub: 'Convictions → filtre fraîcheur', priority: 'medium' },
  { label: "Préparer ordre du jour comité du 24 juin", sub: 'Comités → préparation', priority: 'medium' },
  { label: 'Vérifier MAJ liste UC Spirica (SE-2016)', sub: 'Admin → contrats · cadence mensuelle', priority: 'low' },
]
export const todosTotal = 11
