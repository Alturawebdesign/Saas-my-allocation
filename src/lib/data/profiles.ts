import type { Profile, RiskType } from '../types'
import { walk } from '../format'

const defensifAxaCardif: Profile = {
  id: 'defensif-axa-cardif',
  riskType: 'Défensif',
  contracts: 'Axa, Cardif',
  index: 'Alloc. EUR Prudente',
  indexClass: 'Allocation EUR Prudente — International',
  metric: { perfYtd: 1.13, volatility: 2.61, maxLoss: -10.2, recoveryLabel: '8 mois et 19 j.' },
  indexMetric: { perfYtd: -0.41, volatility: 3.55, maxLoss: -12.8, recoveryLabel: '36 mois et 15 j.' },
  sri: 3,
  spark: walk(11, 24, 0.09, 0.55),
  sparkIndex: walk(29, 24, -0.03, 0.5),
  allocation: [
    { klass: 'Fonds Euro', pct: 39.4 },
    { klass: 'Obligations', pct: 27.7 },
    { klass: 'Actions', pct: 20.6 },
    { klass: 'Oblig. convertibles', pct: 7.2 },
    { klass: 'Liquidités', pct: 3.9 },
    { klass: 'Monétaire', pct: 2.5 },
  ],
  inventory: [
    { name: 'MS INVF Global Brands A', isin: 'LU0133620416', sri: 4, fees: 1.84, perfSinceJan: -2.52, perfSinceBuy: 6.4, quotePart: 5.88, category: 'Actions Intl Gdes Cap. Mixte', reporting: true },
    { name: 'R-co Valor F EUR', isin: 'FR0018507737', sri: 4, fees: 1.93, perfSinceJan: 0.49, perfSinceBuy: 11.2, quotePart: 7.64, category: 'Allocation EUR Flexible', reporting: true },
    { name: 'Eurose C', isin: 'FR0010731044', sri: 3, fees: 1.41, perfSinceJan: 3.83, perfSinceBuy: 8.7, quotePart: 6.84, category: 'Allocation EUR Prudente', reporting: true },
    { name: 'Carmignac PF Emerg Patrim A', isin: 'LU0336084032', sri: 3, fees: 1.81, perfSinceJan: 0.27, perfSinceBuy: 2.9, quotePart: 8.14, category: 'Actions Marchés Émergents', reporting: false },
    { name: 'Moyenne Fonds Euro', isin: 'META00000001', sri: 1, fees: 0.0, perfSinceJan: 0.73, perfSinceBuy: 4.1, quotePart: 39.37, category: 'Autres', reporting: false },
    { name: 'DNCA Invest Convertibles Y EUR', isin: 'LU0743711678', sri: 3, fees: 2.69, perfSinceJan: 5.66, perfSinceBuy: 9.8, quotePart: 8.15, category: 'Convertibles International', reporting: true },
    { name: 'Sofidy Sélection 1 P', isin: 'FR0011694765', sri: 4, fees: 2.3, perfSinceJan: -2.3, perfSinceBuy: -1.1, quotePart: 4.84, category: 'Immobilier — Indirect Zone Euro', reporting: false },
    { name: 'Carmignac PF Credit A EUR', isin: 'LU0992163643', sri: 3, fees: 1.1, perfSinceJan: 2.1, perfSinceBuy: 3.4, quotePart: 8.8, category: 'Obligations EUR Flexibles', reporting: true },
    { name: 'R-co Conviction Credit Euro F', isin: 'FR0010498077', sri: 3, fees: 0.95, perfSinceJan: 1.4, perfSinceBuy: 5.2, quotePart: 6.34, category: 'Obligations EUR Emprunts Privés', reporting: false },
  ],
  vpInventory: [
    { name: 'R-co Valor F EUR', isin: 'FR0010507707', category: 'Allocation EUR Flexible', quotePart: 25 },
    { name: 'Eurose C', isin: 'FR0010731044', category: 'Allocation EUR Prudente', quotePart: 25 },
    { name: 'R-co Conviction Credit Euro F EUR', isin: 'FR0010498077', category: 'Obligations EUR Emprunts Privés', quotePart: 25 },
    { name: 'Carmignac PF Credit A EUR Acc', isin: 'LU0992163643', category: 'Obligations EUR Flexibles', quotePart: 25 },
  ],
  vpNote:
    'Inventaire complet du profil : 8 supports — dont Sofidy Sélection 1, MS INVF Global Brands, Carmignac PF Emerging Patrimoine et DNCA Invest Convertibles exclus du VP pour raison de liquidité ou de ticket minimum.',
  arbitrage: {
    date: '2024-09-26',
    macroContext: [
      "Le contexte macro-économique va vers un assouplissement de l'économie mais nous ne pensons pas que nous irons vers une récession. Les banques centrales sont plus accommodantes et ont enclenché les baisses de taux. Cet environnement est plutôt propice pour les classes d'actifs risquées. Cependant, attention, beaucoup de classes d'actifs sont chères.",
      "C'est le cas des foncières cotées (sociétés exploitant de l'immobilier et étant cotées en bourse) qui ont souffert de la période Covid et de la hausse des taux et en suivant. Un environnement de stabilisation voire de baisse des taux est porteur pour cette classe d'actifs qui a beaucoup de chemin à faire avant de rattraper le retard. Nous conseillons d'introduire le fonds Sofidy Sélection 1 qui investit essentiellement sur des foncières de qualité en zone euro.",
      "Nous suggérons de solder également Varenne Valeur, pour aller vers un fonds plus pur d'actions internationales. Enfin le solde de liquidités sera employé afin d'augmenter la marge actions/obligations émergentes via Carmignac PF Emerging Patrimoine, les obligations d'entreprises de plus longue durée via Carmignac PF Credit ainsi que la Moyenne Fonds Euro.",
    ],
    nbVentes: 2,
    nbAchats: 5,
    impact: 4.22,
    moves: [
      { kind: 'Vente', name: 'Varenne Valeur A EUR Acc', isin: 'LU2158062076', pctPort: -7.12, pctInOut: -100, dic: true },
      { kind: 'Vente', name: 'Ostrum SRI Credit Ultra Short Plus HL', isin: 'FR0013266CZ1', pctPort: -9.94, pctInOut: -100, dic: true },
      { kind: 'Achat', name: 'Carmignac PF Emerg Patrim A EUR Acc', isin: 'LU0336084032', pctPort: 0.06, pctInOut: 5.61, dic: true },
      { kind: 'Achat', name: 'Sofidy Sélection 1 P', isin: 'FR0010904215', pctPort: 5.47, pctInOut: 32.08, dic: true },
      { kind: 'Achat', name: 'MS INVF Global Brands A', isin: 'LU0119620416', pctPort: 5.97, pctInOut: 35.0, dic: true },
      { kind: 'Achat', name: 'Carmignac PF Credit A EUR Acc', isin: 'LU0992163643', pctPort: 1.5, pctInOut: 8.8, dic: true },
      { kind: 'Achat', name: 'Moyenne Fonds Euro', isin: 'META00000001', pctPort: 3.26, pctInOut: 19.08, dic: false },
    ],
  },
  structuralComment: {
    summary:
      "Le profil Défensif Axa, Cardif est composé d'un socle de fonds euro (40 %) complété par une poche diversifiée de 8 fonds. Au sein de cette poche, on retrouve des stratégies actions (35 %), obligataires (35 %) et diversifiées (25 %). Les liquidités issues des différents fonds représentent près de 5 % du profil.",
    detailByClass: [
      'Les actions sont diversifiées géographiquement : actions émergentes via Carmignac PF Emerging Patrimoine, actions européennes via Eurose, actions internationales via MS INVF Global Brands et R-co Valor. Thématiquement, présence de foncières cotées zone euro via Sofidy Sélection 1.',
      "La poche obligataire comprend : obligations émergentes devises fortes et locales (Carmignac PF Emerging Patrimoine), obligations d'entreprises internationales (Carmignac PF Credit), obligations IG euro (R-co Conviction Credit Euro), obligations d'État et d'entreprises zone euro (Eurose), obligations convertibles (DNCA Invest Convertibles).",
      "Le risque de change est peu présent (moins de 18 %) principalement via le dollar US, couvert partiellement.",
    ],
  },
  perfHistory: [
    { year: 2018, value: -0.9 },
    { year: 2019, value: 4.65 },
    { year: 2020, value: 5.72 },
    { year: 2021, value: 4.12 },
    { year: 2022, value: -4.2 },
    { year: 2023, value: 4.39 },
    { year: 2024, value: 4.8 },
  ],
}

/** Lightweight builder for the other list-view profiles. */
function makeProfile(
  id: string,
  riskType: RiskType,
  contracts: string,
  m: { perfYtd: number; volatility: number; maxLoss: number },
  im: { perfYtd: number; volatility: number; maxLoss: number },
  sri: number,
  seed: number,
): Profile {
  const indexClassByRisk: Record<RiskType, string> = {
    Défensif: 'Allocation EUR Prudente — International',
    Équilibré: 'Allocation EUR Modérée — International',
    Dynamique: 'Allocation EUR Agressive — International',
  }
  const indexByRisk: Record<RiskType, string> = {
    Défensif: 'Alloc. EUR Prudente',
    Équilibré: 'Alloc. EUR Modérée',
    Dynamique: 'Alloc. EUR Agressive',
  }
  const drift = riskType === 'Dynamique' ? 0.02 : riskType === 'Équilibré' ? 0.12 : 0.09
  const vol = riskType === 'Dynamique' ? 1.6 : riskType === 'Équilibré' ? 0.95 : 0.55
  const alloc =
    riskType === 'Défensif'
      ? defensifAxaCardif.allocation
      : riskType === 'Équilibré'
        ? [
            { klass: 'Fonds Euro' as const, pct: 22.0 },
            { klass: 'Obligations' as const, pct: 24.0 },
            { klass: 'Actions' as const, pct: 38.5 },
            { klass: 'Oblig. convertibles' as const, pct: 7.5 },
            { klass: 'Liquidités' as const, pct: 4.5 },
            { klass: 'Monétaire' as const, pct: 3.5 },
          ]
        : [
            { klass: 'Fonds Euro' as const, pct: 6.0 },
            { klass: 'Obligations' as const, pct: 12.0 },
            { klass: 'Actions' as const, pct: 68.0 },
            { klass: 'Oblig. convertibles' as const, pct: 6.0 },
            { klass: 'Liquidités' as const, pct: 5.0 },
            { klass: 'Monétaire' as const, pct: 3.0 },
          ]
  return {
    ...defensifAxaCardif,
    id,
    riskType,
    contracts,
    index: indexByRisk[riskType],
    indexClass: indexClassByRisk[riskType],
    metric: { ...m, recoveryLabel: riskType === 'Dynamique' ? '19 mois et 4 j.' : '11 mois et 2 j.' },
    indexMetric: { ...im, recoveryLabel: '34 mois et 8 j.' },
    sri,
    spark: walk(seed, 24, drift, vol),
    sparkIndex: walk(seed + 100, 24, drift - 0.04, vol),
    allocation: alloc,
  }
}

export const profiles: Profile[] = [
  defensifAxaCardif,
  makeProfile('defensif-generali-swisslife', 'Défensif', 'Generali, SwissLife, Vie Plus', { perfYtd: 1.2, volatility: 2.78, maxLoss: -10.2 }, { perfYtd: -0.41, volatility: 3.55, maxLoss: -12.8 }, 3, 42),
  makeProfile('equilibre-axa-cardif-swisslife', 'Équilibré', 'Axa, Cardif, SwissLife', { perfYtd: 2.34, volatility: 4.12, maxLoss: -16.4 }, { perfYtd: 0.87, volatility: 5.2, maxLoss: -18.6 }, 4, 63),
  makeProfile('equilibre-generali-afer-gaipare', 'Équilibré', 'Generali, AFER, Gaipare', { perfYtd: 2.18, volatility: 4.05, maxLoss: -15.9 }, { perfYtd: 0.87, volatility: 5.2, maxLoss: -18.6 }, 4, 77),
  makeProfile('dynamique-axa-cardif', 'Dynamique', 'Axa, Cardif', { perfYtd: -0.59, volatility: 7.25, maxLoss: -30.13 }, { perfYtd: -2.51, volatility: 8.26, maxLoss: -25.08 }, 5, 91),
  makeProfile('dynamique-generali-swisslife-eres', 'Dynamique', 'Generali, SwissLife, Eres PER', { perfYtd: -0.41, volatility: 7.48, maxLoss: -29.8 }, { perfYtd: -2.51, volatility: 8.26, maxLoss: -25.08 }, 5, 108),
  makeProfile('defensif-abeille-epargne', 'Défensif', 'Abeille, Épargne Active', { perfYtd: 1.05, volatility: 2.55, maxLoss: -9.8 }, { perfYtd: -0.41, volatility: 3.55, maxLoss: -12.8 }, 3, 121),
  makeProfile('equilibre-intencial-selection', 'Équilibré', 'Intencial, Sélection', { perfYtd: 2.41, volatility: 4.2, maxLoss: -16.1 }, { perfYtd: 0.87, volatility: 5.2, maxLoss: -18.6 }, 4, 134),
  makeProfile('dynamique-swisslife-liberte', 'Dynamique', 'SwissLife, Liberté', { perfYtd: -0.22, volatility: 7.31, maxLoss: -29.4 }, { perfYtd: -2.51, volatility: 8.26, maxLoss: -25.08 }, 5, 147),
  makeProfile('defensif-spirica-evolution', 'Défensif', 'Spirica, Evolution', { perfYtd: 0.98, volatility: 2.62, maxLoss: -10.0 }, { perfYtd: -0.41, volatility: 3.55, maxLoss: -12.8 }, 3, 160),
  makeProfile('equilibre-cardif-multiplus', 'Équilibré', 'Cardif, Multiplus', { perfYtd: 2.28, volatility: 4.08, maxLoss: -16.2 }, { perfYtd: 0.87, volatility: 5.2, maxLoss: -18.6 }, 4, 173),
  makeProfile('dynamique-generali-octuor', 'Dynamique', 'Generali, Octuor', { perfYtd: -0.7, volatility: 7.55, maxLoss: -30.5 }, { perfYtd: -2.51, volatility: 8.26, maxLoss: -25.08 }, 6, 186),
]

export const profileById = (id: string) => profiles.find((p) => p.id === id)
export const TOTAL_PROFILES = profiles.length
