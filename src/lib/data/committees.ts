import type { Committee, SgpMeeting } from '../types'

export const committees: Committee[] = [
  {
    id: 'ga-2026-06',
    title: 'Comité GA — Juin 2026',
    date: '2026-06-24',
    type: 'Comité GA',
    status: 'En préparation',
    attendees: ['Pierre C (Allocataire)', 'Marie L. (Analyste)', 'Direction', 'Compliance'],
    decisions: [],
    actions: [
      { label: 'Compiler synthèses agents (8 en file)', owner: 'Marie L.', due: '2026-06-18', done: false },
      { label: 'Préparer propositions A/C/V (fraîcheur > 45 j)', owner: 'Pierre C', due: '2026-06-20', done: false },
      { label: 'Revue macro T3 2026', owner: 'Pierre C', due: '2026-06-22', done: false },
    ],
  },
  {
    id: 'ga-2026-05',
    title: 'Comité GA — 27 mai 2026',
    date: '2026-05-27',
    type: 'Comité GA',
    status: 'PV signé',
    signed: true,
    attendees: ['Pierre C (Allocataire)', 'Marie L. (Analyste)', 'Direction', 'Compliance'],
    decisions: [
      { kind: 'Statut A/C/V', label: 'Carmignac Patrimoine A → Acheter', detail: 'Renforcement obligataire IG court terme confirmé.' },
      { kind: 'Sortie fonds', label: 'Natixis EM → Vendre', detail: 'Signal de sortie émis le 02/05 (FR0010390955). Remplacement avant prochain entretien.' },
      { kind: 'Arbitrage', label: 'Profil Défensif Axa-Cardif', detail: 'Arbitrage validé · 47 clients impactés · campagne HubSpot.' },
    ],
    actions: [
      { label: 'Notifier 47 clients (campagne HubSpot)', owner: 'Marie L.', due: '2026-06-03', done: true },
      { label: 'Publier 3 décisions A/C/V au registre', owner: 'Compliance', due: '2026-05-28', done: true },
      { label: 'Émettre ordres O2S vers Harvest', owner: 'Pierre C', due: '2026-06-05', done: false },
    ],
  },
  {
    id: 'ga-2026-04',
    title: 'Comité GA — 29 avril 2026',
    date: '2026-04-29',
    type: 'Comité GA',
    status: 'Archivé',
    signed: true,
    attendees: ['Pierre C (Allocataire)', 'Marie L. (Analyste)', 'Direction'],
    decisions: [
      { kind: 'Nouveau fonds', label: 'Sofidy Sélection 1 P → référencement', detail: 'Ajout foncières cotées zone euro à la buy-list.' },
      { kind: 'Statut A/C/V', label: 'Varenne Valeur → Vendre', detail: 'Rotation vers actions internationales pures.' },
    ],
    actions: [
      { label: 'Mettre à jour fiches fonds concernées', owner: 'Marie L.', due: '2026-05-06', done: true },
    ],
  },
  {
    id: 'mensuel-2026-06',
    title: 'Comité mensuel — Juin 2026',
    date: '2026-06-10',
    type: 'Comité mensuel',
    status: 'À venir',
    attendees: ['Pierre C', 'Marie L.'],
    decisions: [],
    actions: [{ label: 'Revue fraîcheur listes UC par compagnie', owner: 'Pierre C', due: '2026-06-10', done: false }],
  },
]

export const committeeById = (id: string) => committees.find((c) => c.id === id)

export const sgpMeetings: SgpMeeting[] = [
  { sgp: 'Carmignac Gestion', date: '2026-04-22', kind: 'Réunion trimestrielle', status: 'Réalisé' },
  { sgp: 'Lazard Frères Gestion', date: '2026-06-12', kind: 'One-to-one', status: 'Planifié' },
  { sgp: 'Rothschild & Co AM', date: '2026-06-18', kind: 'Roadshow', status: 'Planifié' },
  { sgp: 'DNCA Finance', date: '2026-06-25', kind: 'Visio', status: 'À préparer' },
  { sgp: 'Comgest', date: '2026-07-02', kind: 'Réunion trimestrielle', status: 'À préparer' },
  { sgp: 'BDL Capital Management', date: '2026-07-09', kind: 'One-to-one', status: 'Planifié' },
]
