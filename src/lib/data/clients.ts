import type { Client } from '../types'

export const clients: Client[] = [
  {
    id: 'cli-durand',
    name: 'M. et Mme Durand',
    type: 'Personne physique',
    contracts: [
      { label: 'Cardif Elite', company: 'Cardif', encours: 340000, profileId: 'defensif-axa-cardif' },
      { label: 'AXA PEA', company: 'AXA', encours: 85000, profileId: 'equilibre-axa-cardif-swisslife' },
    ],
    totalEncours: 425000,
    affectedProfiles: ['Défensif — Axa, Cardif', 'Équilibré — Axa, Cardif, SwissLife'],
    pendingOrders: 1,
    lastCampaign: 'Arbitrage T2 2026',
    status: 'Ordre en attente',
  },
  {
    id: 'cli-lefevre',
    name: 'Mme Lefèvre',
    type: 'Personne physique',
    contracts: [{ label: 'Generali Himalia', company: 'Generali', encours: 210000, profileId: 'equilibre-generali-afer-gaipare' }],
    totalEncours: 210000,
    affectedProfiles: ['Équilibré — Generali, AFER, Gaipare'],
    pendingOrders: 1,
    lastCampaign: 'Arbitrage T2 2026',
    status: 'Ordre en attente',
  },
  {
    id: 'cli-holding-mercure',
    name: 'Holding Mercure SAS',
    type: 'Personne morale',
    contracts: [
      { label: 'Cardif Multiplus (Capi)', company: 'Cardif', encours: 1250000, profileId: 'dynamique-axa-cardif' },
    ],
    totalEncours: 1250000,
    affectedProfiles: ['Dynamique — Axa, Cardif'],
    pendingOrders: 0,
    status: 'À jour',
  },
  {
    id: 'cli-martin',
    name: 'M. Martin',
    type: 'Personne physique',
    contracts: [
      { label: 'SwissLife Expert Premium', company: 'SwissLife', encours: 96000, profileId: 'defensif-generali-swisslife' },
      { label: 'Eres PER', company: 'Eres', encours: 42000, profileId: 'dynamique-generali-swisslife-eres' },
    ],
    totalEncours: 138000,
    affectedProfiles: ['Défensif — Generali, SwissLife', 'Dynamique — Generali, SwissLife, Eres PER'],
    pendingOrders: 1,
    lastCampaign: 'Arbitrage T2 2026',
    status: 'Notifié',
  },
  {
    id: 'cli-bonnet',
    name: 'M. et Mme Bonnet',
    type: 'Personne physique',
    contracts: [{ label: 'Spirica Evolution (SE-2016)', company: 'Spirica', encours: 178000, profileId: 'defensif-spirica-evolution' }],
    totalEncours: 178000,
    affectedProfiles: ['Défensif — Spirica, Evolution'],
    pendingOrders: 0,
    status: 'À jour',
  },
  {
    id: 'cli-rousseau',
    name: 'Mme Rousseau',
    type: 'Personne physique',
    contracts: [
      { label: 'Cardif Essentiel (CE-2019)', company: 'Cardif', encours: 320000, profileId: 'equilibre-cardif-multiplus' },
    ],
    totalEncours: 320000,
    affectedProfiles: ['Équilibré — Cardif, Multiplus'],
    pendingOrders: 1,
    lastCampaign: 'Souscription initiale',
    status: 'Ordre en attente',
  },
  {
    id: 'cli-garcia',
    name: 'M. Garcia',
    type: 'Personne physique',
    contracts: [{ label: 'Abeille Épargne Active', company: 'Abeille', encours: 64000, profileId: 'defensif-abeille-epargne' }],
    totalEncours: 64000,
    affectedProfiles: ['Défensif — Abeille, Épargne Active'],
    pendingOrders: 0,
    status: 'À jour',
  },
  {
    id: 'cli-petit',
    name: 'M. et Mme Petit',
    type: 'Personne physique',
    contracts: [
      { label: 'Intencial Sélection', company: 'Intencial', encours: 145000, profileId: 'equilibre-intencial-selection' },
      { label: 'AXA Coralis Sélection', company: 'AXA', encours: 210000, profileId: 'equilibre-axa-cardif-swisslife' },
    ],
    totalEncours: 355000,
    affectedProfiles: ['Équilibré — Intencial, Sélection', 'Équilibré — Axa, Cardif, SwissLife'],
    pendingOrders: 1,
    lastCampaign: 'Arbitrage T2 2026',
    status: 'Notifié',
  },
]

export const clientsPendingOrders = clients.reduce((n, c) => n + c.pendingOrders, 0)
export const clientsTotalEncours = clients.reduce((n, c) => n + c.totalEncours, 0)

/** Suivi de campagne — the arbitrage currently rolling out to clients. */
export const campaign = {
  label: 'Arbitrage Défensif Axa-Cardif · T2 2026',
  totalClients: 47,
  notified: 31,
  confirmed: 18,
  pending: 16,
}
