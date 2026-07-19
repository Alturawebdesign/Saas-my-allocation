import type { RiskType } from '../types'

// Navigation descendante : Compagnie → Contrat → Profil.
// Chaque profil référence une fiche du module Allocations (profiles.ts).
export interface ContractProfileRef {
  riskType: RiskType
  profileId: string
}

export interface InsurerContract {
  label: string
  profiles: ContractProfileRef[]
}

export interface Company {
  slug: string
  name: string
  contracts: InsurerContract[]
}

export const companies: Company[] = [
  {
    slug: 'cardif',
    name: 'Cardif',
    contracts: [
      {
        label: 'Cardif Elite',
        profiles: [
          { riskType: 'Défensif', profileId: 'defensif-axa-cardif' },
          { riskType: 'Équilibré', profileId: 'equilibre-axa-cardif-swisslife' },
          { riskType: 'Dynamique', profileId: 'dynamique-axa-cardif' },
        ],
      },
      {
        label: 'Cardif Multiplus',
        profiles: [{ riskType: 'Équilibré', profileId: 'equilibre-cardif-multiplus' }],
      },
    ],
  },
  {
    slug: 'generali',
    name: 'Generali',
    contracts: [
      {
        label: 'Himalia',
        profiles: [
          { riskType: 'Défensif', profileId: 'defensif-generali-swisslife' },
          { riskType: 'Équilibré', profileId: 'equilibre-generali-afer-gaipare' },
          { riskType: 'Dynamique', profileId: 'dynamique-generali-swisslife-eres' },
        ],
      },
      {
        label: 'Octuor',
        profiles: [{ riskType: 'Dynamique', profileId: 'dynamique-generali-octuor' }],
      },
    ],
  },
  {
    slug: 'intencial',
    name: 'Intencial',
    contracts: [
      {
        label: 'Intencial Sélection',
        profiles: [{ riskType: 'Équilibré', profileId: 'equilibre-intencial-selection' }],
      },
    ],
  },
  {
    slug: 'uaf',
    name: 'UAF Life Patrimoine',
    contracts: [
      {
        label: 'Arborescence Vie',
        profiles: [
          { riskType: 'Défensif', profileId: 'defensif-spirica-evolution' },
          { riskType: 'Dynamique', profileId: 'dynamique-swisslife-liberte' },
        ],
      },
    ],
  },
  {
    slug: 'abeille',
    name: 'Abeille Assurances',
    contracts: [
      {
        label: 'Épargne Active',
        profiles: [{ riskType: 'Défensif', profileId: 'defensif-abeille-epargne' }],
      },
    ],
  },
]

export const companyBySlug = (slug: string) => companies.find((c) => c.slug === slug)

/** Scénario macro de l'allocataire — affiché en amont des allocations par contrat. */
export const allocatorScenario = {
  updatedAt: '2026-05-27',
  title: "Scénario de l'allocataire",
  text:
    "Régime de croissance molle et de désinflation progressive. Plateau des taux directeurs (Fed + BCE), premières baisses attendues au T3 2026 — environnement plutôt propice aux classes d'actifs risquées, mais beaucoup de valorisations sont tendues. Biais actifs : surpondérer les obligations IG de courte duration et les actions Europe value / dividendes ; neutre sur les actions US croissance ; sous-pondérer le high yield de longue duration et les émergents en devise locale.",
}
