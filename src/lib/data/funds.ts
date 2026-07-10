import type { Fund, SimilarFund } from '../types'

// The fully-studied fund from the mockups (Écran 2 — Fiche fonds).
const lazardSmallCaps: Fund = {
  id: 'lazard-small-caps-france-a',
  name: 'Lazard Small Caps France A',
  isin: 'FR0010292436',
  sgp: 'Lazard Frères Gestion',
  category: 'Actions Europe Ptes / Moy Caps',
  sriCategory: 'Actions France Petites & Moy. Cap.',
  sri: 5,
  fees: 2.31,
  perfYtd: 0.02,
  perfCatYtd: -3.68,
  recoFund: 'Neutre',
  recoCategory: 'Positive',
  trend: 'down',
  nbClients: 5,
  lastComment: '2025-04-03',
  lastCommentLabel: 'Mise à jour trimestrielle',
  freshnessDays: 12,
  eosExcluded: false,
  interlocutor: 'Jean-François Cardinet (gérant)',
  managerCompanyBlurb:
    'Lazard Frères Gestion — société de gestion française, filiale du groupe Lazard. Expertise historique sur les actions européennes et la sélection de petites et moyennes capitalisations.',
  ethykScore: {
    global: 6.4,
    environment: 6,
    social: 7,
    governance: 6,
    label: 'Correct — transparence perfectible',
  },
  analysis: {
    actualite:
      "Le fonds a sous-performé son indice de référence et ses principaux concurrents sur le trimestre. Cette contre-performance est largement imputable à trois titres spécifiques, dont Eutelsat (dans l'indice mais pas dans le portefeuille), ainsi qu'à une orientation exclusive vers les small caps françaises dans un environnement de marché peu favorable à ce segment jusqu'à fin février. Le rebond des small caps en mars n'a pas suffi à compenser le retard accumulé. Comparé à d'autres fonds comme Indépendance et Expansion ou Archor, la performance du fonds souffre également de l'absence d'expositions à des valeurs non françaises ou à plus forte capitalisation.",
    vueGerant: [
      "Le discours du gérant reste prudent. Pour 2024, les résultats des sociétés en portefeuille ont été globalement conformes aux attentes. En revanche, pour 2025, Lazard Small Caps France anticipe une stabilité des résultats, alors que le consensus table sur une croissance de 15 %. Cette prudence s'explique notamment par les incertitudes liées aux nouvelles mesures de droits de douane américaines et à leurs impacts indirects sur la demande.",
      "Le gérant rappelle que la valorisation actuelle du portefeuille intègre déjà une hypothèse de stagnation des bénéfices, voire de recul. Par conséquent, même si les résultats venaient à décevoir, l'impact sur les cours pourrait être limité. Le portefeuille se traite sur un PE 2025 à 12,6x selon le consensus, mais en intégrant un scénario plus conservateur de stabilité des résultats, ce multiple monte à 14,7x, voire à 16,6x en cas de recul de 10 % des bénéfices.",
    ],
    positionnement: [
      'Le fonds conserve une gestion purement bottom-up, sans orientation sectorielle active. Il reste fortement exposé à :',
      "l'industrie (environ 40 % de l'actif)",
      'la technologie, principalement via les services informatiques (environ 30 %)',
      'la consommation discrétionnaire (environ 10 %)',
    ],
    valorisation: [
      'Le portefeuille affiche des niveaux de valorisation jugés raisonnables par le gérant :',
      'PE 2025 à 12,6x selon le consensus (+15 % de croissance résultats)',
      'PE ajusté à 14,7x si les résultats sont stables',
      'PE à 16,6x avec −10 % des résultats',
      "Ces niveaux sont inférieurs ou en ligne avec la moyenne historique et laissent entrevoir un potentiel de revalorisation si la dynamique économique s'améliore en zone euro.",
    ],
    structure:
      "Lazard Small Caps France est un fonds d'actions françaises dont la capitalisation boursière est comprise entre 100 millions d'euros et 2 milliards d'euros. La capitalisation moyenne des entreprises en portefeuille est de 1 milliard (1,3 avec la montée du marché), ce qui en fait un vrai fonds de petites capitalisations. Le portefeuille est relativement concentré avec une quarantaine de valeurs et à taux de rotation faible. Sur une année classique, le gérant achète 4 valeurs et en vend 4. Le process de gestion assez classique repose sur 3 piliers : la valorisation, la rentabilité des sociétés et la croissance potentielle des bénéfices.",
    structureSimple:
      "Lazard Small Caps France est un fonds d'actions françaises investissant dans les petites capitalisations boursières (entre 100 millions et 2 milliards d'euros). Le processus de sélection repose sur 3 piliers : la valorisation, la rentabilité des sociétés et la croissance potentielle des bénéfices.",
    recoFundText:
      'Nous apprécions le fonds mais la sous-performance depuis 18 mois est compliquée.',
    recoCategoryText:
      "La valorisation relative nous semble attractive. Toutefois, il nous semble un peu tôt pour se renforcer compte tenu du ralentissement économique.",
  },
  parts: [
    { label: 'Part A (Retail)', isin: 'FR0010292436', kind: 'C', devise: 'EUR', eligibility: 'AV · CTO · PEA' },
    { label: 'Part I (Institutionnelle)', isin: 'FR0010541717', kind: 'C', devise: 'EUR', eligibility: 'CTO' },
    { label: 'Part D (Distribution)', isin: 'FR0013296904', kind: 'D', devise: 'EUR', eligibility: 'CTO' },
  ],
  documents: [
    { label: 'DIC (DICI)', kind: 'DIC' },
    { label: 'Reporting mensuel', kind: 'Reporting' },
    { label: 'Prospectus', kind: 'Prospectus' },
    { label: 'Attestation A/C/V', kind: 'Attestation' },
  ],
}

/** The rest of the tracked universe — condensed records for the list view. */
const roster: Array<Partial<Fund> & Pick<Fund, 'name' | 'isin' | 'sgp' | 'category' | 'sriCategory' | 'sri' | 'perfYtd' | 'perfCatYtd' | 'recoFund' | 'recoCategory' | 'trend' | 'nbClients' | 'freshnessDays'>> = [
  { name: 'Lazard Crédit FI SRI', isin: 'FR0010589633', sgp: 'Lazard Frères Gestion', category: 'Obligations EUR Subordonnées', sriCategory: 'Obligations EUR Subordonnées', sri: 3, perfYtd: 1.12, perfCatYtd: 0.88, recoFund: 'Neutre', recoCategory: 'Neutre', trend: 'flat', nbClients: 10, freshnessDays: 8, fees: 1.15 },
  { name: 'Lazard Patrimoine Croissance', isin: 'FR0013335967', sgp: 'Lazard Frères Gestion', category: 'Allocation EUR Agressive', sriCategory: 'Allocation EUR Agressive', sri: 4, perfYtd: 2.2, perfCatYtd: 1.94, recoFund: 'Neutre', recoCategory: 'Neutre', trend: 'flat', nbClients: 5, freshnessDays: 8, fees: 1.9 },
  { name: 'Lazard Convertible Global', isin: 'FR0010674978', sgp: 'Lazard Frères Gestion', category: 'Convertibles International', sriCategory: 'Convertibles International', sri: 4, perfYtd: -2.36, perfCatYtd: -1.1, recoFund: 'Positive', recoCategory: 'Positive', trend: 'flat', nbClients: 8, freshnessDays: 8, fees: 1.45 },
  { name: 'Lazard Patrimoine SRI', isin: 'FR0013216851', sgp: 'Lazard Frères Gestion', category: 'Allocation EUR Prudente — International', sriCategory: 'Allocation EUR Prudente', sri: 3, perfYtd: -1.1, perfCatYtd: -0.6, recoFund: 'Neutre', recoCategory: 'Neutre', trend: 'flat', nbClients: 6, freshnessDays: 8, fees: 1.7 },
  { name: 'Echiquier Artificial Intelligence', isin: 'LU2005011550', sgp: 'La Financière de l’Échiquier', category: 'Actions Secteur Technologie', sriCategory: 'Actions Secteur Technologie', sri: 6, perfYtd: -8.46, perfCatYtd: -6.2, recoFund: 'Négative', recoCategory: 'Neutre', trend: 'flat', nbClients: 3, freshnessDays: 22, fees: 2.1 },
  { name: 'MS INVF Global Brands A', isin: 'LU0119620416', sgp: 'Morgan Stanley IM', category: 'Actions Intl Gdes Cap. Mixte', sriCategory: 'Actions Internationales', sri: 4, perfYtd: -2.52, perfCatYtd: -7.67, recoFund: 'Positive', recoCategory: 'Neutre', trend: 'up', nbClients: 21, freshnessDays: 15, fees: 1.84 },
  { name: 'Comgest Monde', isin: 'FR0000284689', sgp: 'Comgest', category: 'Actions Intl Gdes Cap. Croissance', sriCategory: 'Actions Internationales', sri: 5, perfYtd: -4.65, perfCatYtd: -7.67, recoFund: 'Positive', recoCategory: 'Neutre', trend: 'up', nbClients: 14, freshnessDays: 19, fees: 2.0 },
  { name: 'Mirova Global Sustainable Equity', isin: 'LU0914729862', sgp: 'Mirova', category: 'Actions Intl Gdes Cap. Croissance', sriCategory: 'Actions Internationales ISR', sri: 5, perfYtd: -5.27, perfCatYtd: -7.67, recoFund: 'Neutre', recoCategory: 'Neutre', trend: 'down', nbClients: 9, freshnessDays: 47, fees: 1.7 },
  { name: 'JPM Europe Strategic Value Fund', isin: 'LU0107398538', sgp: 'J.P. Morgan AM', category: 'Actions Europe Gdes Cap. Value', sriCategory: 'Actions Europe Value', sri: 5, perfYtd: 12.24, perfCatYtd: 7.95, recoFund: 'Positive', recoCategory: 'Positive', trend: 'up', nbClients: 11, freshnessDays: 5, fees: 1.5 },
  { name: 'ODDO BHF European High Dividend', isin: 'LU1959131748', sgp: 'ODDO BHF AM', category: 'Actions Europe Rendement', sriCategory: 'Actions Europe Rendement', sri: 5, perfYtd: 10.68, perfCatYtd: 8.13, recoFund: 'Positive', recoCategory: 'Positive', trend: 'up', nbClients: 7, freshnessDays: 11, fees: 1.6 },
  { name: 'R-co Conviction Equity Value Euro', isin: 'FR0011037853', sgp: 'Rothschild & Co AM', category: 'Actions Europe Gdes Cap. Value', sriCategory: 'Actions Zone Euro Value', sri: 5, perfYtd: 9.94, perfCatYtd: 7.95, recoFund: 'Positive', recoCategory: 'Positive', trend: 'up', nbClients: 13, freshnessDays: 6, fees: 1.7 },
  { name: 'BDL Convictions', isin: 'FR0010651224', sgp: 'BDL Capital Management', category: 'Actions Europe Flex Cap', sriCategory: 'Actions Europe Flex Cap', sri: 4, perfYtd: 10.45, perfCatYtd: -8.94, recoFund: 'Positive', recoCategory: 'Positive', trend: 'up', nbClients: 12, freshnessDays: 9, fees: 1.9 },
  { name: 'Piquemal Houghton Global Equities', isin: 'IE00BYYLU142', sgp: 'Piquemal Houghton Investments', category: 'Actions Intl Gdes Cap. Mixte', sriCategory: 'Actions Internationales', sri: 5, perfYtd: 8.67, perfCatYtd: -4.95, recoFund: 'Neutre', recoCategory: 'Neutre', trend: 'flat', nbClients: 4, freshnessDays: 33, fees: 1.95 },
  { name: 'Indépendance Europe Small', isin: 'FR0010331421', sgp: 'Indépendance AM', category: 'Actions Europe Petites Cap.', sriCategory: 'Actions Europe Small', sri: 5, perfYtd: 11.95, perfCatYtd: 0.47, recoFund: 'Positive', recoCategory: 'Positive', trend: 'up', nbClients: 15, freshnessDays: 7, fees: 1.85 },
  { name: 'Indépendance France Small & Mid', isin: 'FR0010400336', sgp: 'Indépendance AM', category: 'Actions Europe Petites Cap.', sriCategory: 'Actions France Small', sri: 5, perfYtd: 7.09, perfCatYtd: 0.85, recoFund: 'Positive', recoCategory: 'Positive', trend: 'up', nbClients: 9, freshnessDays: 7, fees: 1.85 },
  { name: 'Afer Actions PME', isin: 'FR0013202729', sgp: 'Aviva Investors France', category: 'Actions Europe Petites Cap.', sriCategory: 'Actions PME', sri: 5, perfYtd: 6.31, perfCatYtd: 0.85, recoFund: 'Neutre', recoCategory: 'Positive', trend: 'flat', nbClients: 6, freshnessDays: 51, fees: 1.9 },
  { name: 'Lazard Capacités Émergentes', isin: 'FR0000098683', sgp: 'Lazard Frères Gestion', category: 'Actions Marchés Émergent', sriCategory: 'Actions Émergentes', sri: 5, perfYtd: 1.17, perfCatYtd: -2.01, recoFund: 'Neutre', recoCategory: 'Négative', trend: 'down', nbClients: 4, freshnessDays: 28, fees: 2.1 },
  { name: 'Alken Small Cap Europe', isin: 'LU2205166446', sgp: 'Alken AM', category: 'Actions Europe Petites Cap.', sriCategory: 'Actions Europe Small', sri: 5, perfYtd: 9.4, perfCatYtd: 0.47, recoFund: 'Positive', recoCategory: 'Positive', trend: 'up', nbClients: 6, freshnessDays: 14, fees: 1.95 },
  { name: 'Carmignac Patrimoine A', isin: 'FR0010135103', sgp: 'Carmignac Gestion', category: 'Allocation EUR Flexible — International', sriCategory: 'Allocation Flexible', sri: 3, perfYtd: 1.9, perfCatYtd: 0.4, recoFund: 'Positive', recoCategory: 'Neutre', trend: 'up', nbClients: 24, freshnessDays: 4, fees: 1.5 },
  { name: 'DNCA Invest Credit Conviction', isin: 'FR0010735110', sgp: 'DNCA Finance', category: 'Obligations Corporate Europe', sriCategory: 'Obligations Corporate', sri: 3, perfYtd: 2.1, perfCatYtd: 1.6, recoFund: 'Positive', recoCategory: 'Positive', trend: 'up', nbClients: 11, freshnessDays: 10, fees: 1.05 },
]

function fillFund(r: (typeof roster)[number], i: number): Fund {
  const base = lazardSmallCaps
  return {
    id: r.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
    isin: r.isin,
    name: r.name,
    sgp: r.sgp,
    category: r.category,
    sriCategory: r.sriCategory,
    sri: r.sri,
    fees: r.fees ?? 1.8,
    perfYtd: r.perfYtd,
    perfCatYtd: r.perfCatYtd,
    recoFund: r.recoFund,
    recoCategory: r.recoCategory,
    trend: r.trend,
    nbClients: r.nbClients,
    lastComment: '2025-04-03',
    lastCommentLabel: r.freshnessDays > 45 ? 'À actualiser' : 'Mise à jour trimestrielle',
    freshnessDays: r.freshnessDays,
    eosExcluded: false,
    interlocutor: `Gérant ${r.sgp}`,
    managerCompanyBlurb: `${r.sgp} — présentation de la société de gestion et de l'équipe de gérants.`,
    ethykScore: {
      global: Number((4 + ((i * 7) % 6)).toFixed(1)),
      environment: 4 + (i % 6),
      social: 4 + ((i + 2) % 6),
      governance: 4 + ((i + 4) % 6),
      label: 'Notation ESG propriétaire',
    },
    analysis: {
      ...base.analysis,
      actualite: `Suivi trimestriel de ${r.name}. ${base.analysis.actualite}`,
    },
    parts: base.parts,
    documents: base.documents,
  }
}

export const funds: Fund[] = [lazardSmallCaps, ...roster.map(fillFund)]

export const funcById = (id: string) => funds.find((f) => f.id === id)

/** Ranked EOS selection for the "Fonds similaires" tab (Actions Europe Ptes/Moy Caps). */
export const similarFunds: SimilarFund[] = [
  { rank: 1, name: 'Indépendance France Small & Mid' },
  { rank: 2, name: 'Alken Small Cap Europe' },
  { rank: 3, name: 'HMG Découvertes' },
  { rank: 4, name: 'Indépendance Europe Small' },
  { rank: 5, name: 'Valboa — Engagement ISR' },
  { rank: 6, name: 'Gay-Lussac Microcaps Europe' },
  { rank: 7, name: 'MainFirst Top European Ideas Fund' },
  { rank: 8, name: 'IDAM Small Euro' },
  { rank: 9, name: 'IDAM Small France' },
  { rank: 10, name: 'Lazard Small Caps France', consulted: true },
  { rank: 11, name: 'Sextant PME' },
  { rank: 12, name: 'Amplegest PME' },
  { rank: 13, name: 'Gay-Lussac Microcaps' },
]

export const TOTAL_TRACKED = 184
export const TOTAL_ACTIVE = 142

/** Insurers → contracts, for the "Filtrer par contrat" modal. */
export const insurerContracts: { insurer: string; contracts: string[] }[] = [
  { insurer: 'AXA France Vie', contracts: ['Coralis Sélection', 'Clé 2', 'Lifinity Europe', 'Amadeo Evolution', 'Coralis Capi', 'AXA PEA'] },
  { insurer: 'Ageas France', contracts: ['Forticiel Génération 2', 'Privilège Gestion Active', 'PEA Ageas', 'myPGA'] },
  { insurer: 'Cardif', contracts: ['Cardif Elite', 'Cardif Multiplus', 'Cardif Essentiel', 'Cardif Libertés'] },
  { insurer: 'Generali', contracts: ['Himalia', 'Octuor', 'Platinum'] },
  { insurer: 'SwissLife', contracts: ['SwissLife Expert Premium', 'SwissLife Liberté'] },
  { insurer: 'Spirica', contracts: ['Spirica Evolution (SE-2016)', 'Assurance Vie Active'] },
]
