import type { SourceItem } from '../types'

export const sources: SourceItem[] = [
  {
    id: 'src-1',
    subject: 'Newsletter Carmignac — mai 2026',
    origin: 'Newsletter',
    sgp: 'Carmignac Gestion',
    status: 'À valider',
    receivedAt: '2026-05-28',
    agent: 'Agent Nourrisseur A',
    fundImpact: 'Carmignac Patrimoine A · Carmignac PF Credit',
    summary:
      'Positionnement défensif maintenu, renforcement obligations IG court terme depuis T4 2025. Exposition devises couverte. Pas de changement de stratégie prévu H1 2026.',
  },
  {
    id: 'src-2',
    subject: 'Note réunion Lazard Frères Gestion — 22/04',
    origin: 'Note de réunion',
    sgp: 'Lazard Frères Gestion',
    status: 'À valider',
    receivedAt: '2026-05-27',
    agent: 'Agent Nourrisseur B',
    fundImpact: 'Lazard Small Caps France A',
    summary:
      'Discours gérant prudent : anticipation de stabilité des résultats 2025 vs consensus +15 %. Valorisation intégrant déjà stagnation des bénéfices.',
  },
  {
    id: 'src-3',
    subject: 'Signal de sortie détecté — Natixis EM',
    origin: 'Newsletter',
    sgp: 'Natixis IM',
    status: 'À valider',
    receivedAt: '2026-05-02',
    agent: 'Agent Nourrisseur A',
    fundImpact: 'FR0010390955',
    signalAlert: true,
    summary:
      '⚠️ Signal de sortie sur FR0010390955 (Natixis EM) — à remplacer avant prochain entretien client. Alternative pré-identifiée à valider.',
  },
  {
    id: 'src-4',
    subject: 'Liste UC Spirica Evolution (SE-2016)',
    origin: 'Liste UC',
    sgp: 'Spirica',
    status: 'Validé / en base',
    receivedAt: '2026-05-27',
    humanValidator: 'Pierre B.',
    summary: 'Mise à jour mensuelle de la liste des supports UC disponibles sur le contrat SE-2016.',
  },
  {
    id: 'src-5',
    subject: 'Compte-rendu Comité GA 27/05/2026',
    origin: 'Comité',
    status: 'Validé / en base',
    receivedAt: '2026-05-27',
    humanValidator: 'Compliance',
    summary: '3 décisions A/C/V publiées + arbitrage Défensif Axa-Cardif.',
  },
  {
    id: 'src-6',
    subject: 'Newsletter Rothschild & Co — mai 2026',
    origin: 'Newsletter',
    sgp: 'Rothschild & Co AM',
    status: "File d'attente IA",
    receivedAt: '2026-05-28',
    summary: 'En cours de lecture / structuration par agent.',
  },
  {
    id: 'src-7',
    subject: 'Échange fournisseur — DNCA Finance',
    origin: 'Échange fournisseur',
    sgp: 'DNCA Finance',
    status: "File d'attente IA",
    receivedAt: '2026-05-28',
    summary: 'Préparation réunion trimestrielle du 25/06.',
  },
  {
    id: 'src-8',
    subject: 'Reporting mensuel BDL Convictions',
    origin: 'Newsletter',
    sgp: 'BDL Capital Management',
    status: 'Reçu',
    receivedAt: '2026-05-28',
  },
  {
    id: 'src-9',
    subject: 'Liste UC Cardif Elite — mai 2026',
    origin: 'Liste UC',
    sgp: 'Cardif',
    status: 'Reçu',
    receivedAt: '2026-05-26',
  },
]

export const sourcesMailbox = 'ga-feed@cfgp.fr'

export const sourceCounts = {
  received: sources.filter((s) => s.status === 'Reçu').length,
  queue: sources.filter((s) => s.status === "File d'attente IA").length,
  toValidate: sources.filter((s) => s.status === 'À valider').length,
  inBase: sources.filter((s) => s.status === 'Validé / en base').length,
  queueTotal: 23,
}

export const agentPerformance = [
  { agent: 'Agent Nourrisseur A', processed: 142, errorRate: 2.1, alerts: 1 },
  { agent: 'Agent Nourrisseur B', processed: 98, errorRate: 3.4, alerts: 0 },
  { agent: 'Agent Nourrisseur C', processed: 61, errorRate: 1.6, alerts: 0 },
]
