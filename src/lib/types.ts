// ─────────────────────────────────────────────────────────────────────────────
// Domain model — CFGP Allocataire
// Encodes the referential shared across all modules: funds (Convictions),
// profiles/allocations (Allocations), clients, committees, sources & compliance.
// ─────────────────────────────────────────────────────────────────────────────

export type RiskType = 'Défensif' | 'Équilibré' | 'Dynamique'

/** A/C/V recommendation used across the fund referential. */
export type Reco = 'Positive' | 'Neutre' | 'Négative'
export type Trend = 'up' | 'down' | 'flat'

/** Asset classes used in allocation donuts & inventories. */
export type AssetClass =
  | 'Fonds Euro'
  | 'Obligations'
  | 'Actions'
  | 'Oblig. convertibles'
  | 'Liquidités'
  | 'Monétaire'
  | 'Diversifié'

export interface FundPart {
  label: string // e.g. "Part R (Retail)"
  isin: string
  kind: 'C' | 'D' | 'I' // Capitalisation / Distribution / Institutionnelle
  devise: string
  eligibility: string
}

export interface FundDocRef {
  label: string
  kind: 'DIC' | 'Reporting' | 'Prospectus' | 'Attestation'
}

/** A tracked fund — the atomic unit of the Convictions module (Vigie des fonds). */
export interface Fund {
  id: string
  name: string
  isin: string
  sgp: string // société de gestion
  category: string
  sriCategory: string // short taxonomy label shown under the name
  sri: number // 1..7
  fees: number // frais courants %
  perfYtd: number
  perfCatYtd: number
  recoFund: Reco
  recoCategory: Reco
  trend: Trend
  nbClients: number
  lastComment: string // date ISO
  lastCommentLabel: string // e.g. "Mise à jour trimestrielle"
  freshnessDays: number // days since last verification
  eosExcluded: boolean // is this one of "our" funds (EOS/CFGP models)
  ethykScore: EthykScore
  analysis: FundAnalysis
  parts: FundPart[]
  documents: FundDocRef[]
  interlocutor: string
  managerCompanyBlurb: string
}

export interface EthykScore {
  global: number // /10
  environment: number
  social: number
  governance: number
  label: string
}

export interface FundAnalysis {
  actualite: string
  vueGerant: string[]
  positionnement: string[]
  valorisation: string[]
  structure: string
  structureSimple: string
  recoFundText: string
  recoCategoryText: string
}

export interface SimilarFund {
  rank: number
  name: string
  consulted?: boolean
}

// ─── Allocations / profiles ─────────────────────────────────────────────────

export interface Metric {
  perfYtd: number
  volatility: number
  maxLoss: number
  recoveryLabel?: string // "8 mois et 19 j."
}

export interface AllocationSlice {
  klass: AssetClass
  pct: number
}

export interface InventoryLine {
  name: string
  isin: string
  sri: number
  fees: number
  perfSinceJan: number
  quotePart: number
  category?: string
  reporting?: boolean
}

export interface ArbitrageMove {
  kind: 'Achat' | 'Vente'
  name: string
  isin: string
  pctPort: number // % du portefeuille (signed)
  pctInOut: number // % in/out (signed)
  dic: boolean
}

export interface Arbitrage {
  date: string // ISO
  macroContext: string[]
  nbVentes: number
  nbAchats: number
  impact: number
  moves: ArbitrageMove[]
}

/** An allocation profile = (risk type × grappe de contrats). Equivalent META CGP. */
export interface Profile {
  id: string
  riskType: RiskType
  contracts: string // "Axa, Cardif"
  index: string // benchmark label
  indexClass: string // "Allocation EUR Prudente — International"
  metric: Metric
  indexMetric: Metric
  sri: number // profile SRI 1..7
  spark: number[] // profile curve
  sparkIndex: number[] // benchmark curve
  allocation: AllocationSlice[]
  inventory: InventoryLine[]
  vpInventory: { name: string; isin: string; category: string; quotePart: number }[]
  vpNote: string
  arbitrage: Arbitrage
  structuralComment: {
    summary: string
    detailByClass: string[]
  }
  perfHistory: { year: number; value: number }[]
}

// ─── Clients ─────────────────────────────────────────────────────────────────

export interface Client {
  id: string
  name: string
  type: 'Personne physique' | 'Personne morale'
  contracts: { label: string; company: string; encours: number; profileId?: string }[]
  totalEncours: number
  affectedProfiles: string[]
  pendingOrders: number
  lastCampaign?: string
  status: 'Ordre en attente' | 'À jour' | 'Notifié'
}

// ─── Comités ───────────────────────────────────────────────────────────────

export interface CommitteeDecision {
  kind: 'Statut A/C/V' | 'Nouveau fonds' | 'Arbitrage' | 'Sortie fonds'
  label: string
  detail: string
}

export interface Committee {
  id: string
  title: string
  date: string // ISO
  type: 'Comité GA' | 'Comité mensuel' | 'Comité annuel'
  status: 'À venir' | 'En préparation' | 'PV signé' | 'Archivé'
  decisions: CommitteeDecision[]
  actions: { label: string; owner: string; due: string; done: boolean }[]
  attendees: string[]
  signed?: boolean
}

// ─── Sources (nourrisseurs — pivot IA) ───────────────────────────────────────

export type SourceStatus = 'Reçu' | "File d'attente IA" | 'À valider' | 'Validé / en base'

export interface SourceItem {
  id: string
  subject: string
  origin: 'Newsletter' | 'Note de réunion' | 'Liste UC' | 'Échange fournisseur' | 'Comité'
  sgp?: string
  status: SourceStatus
  receivedAt: string
  agent?: string
  humanValidator?: string
  fundImpact?: string
  signalAlert?: boolean
  summary?: string
}

export interface SgpMeeting {
  sgp: string
  date: string
  kind: 'Roadshow' | 'One-to-one' | 'Réunion trimestrielle' | 'Visio'
  status: 'Planifié' | 'Réalisé' | 'À préparer'
}

// ─── Conformité ──────────────────────────────────────────────────────────────

export interface ComplianceEntry {
  id: string
  ref: string // doc number "#2026-0428"
  type: 'Décision' | 'Allocation émise' | 'Mémo client' | 'PV comité' | 'Output IA'
  label: string
  author: string
  source: string
  date: string
  version: number
  pillars: TraceabilityPillar[]
}

export type TraceabilityPillar =
  | 'Horodatage'
  | 'Sourçage'
  | 'Versioning'
  | 'Validation 4 yeux'
  | 'Consignation'

// ─── Dashboard ───────────────────────────────────────────────────────────────

export interface Kpi {
  label: string
  value: string
  sub: string
  tone: 'neutral' | 'gold' | 'wine' | 'blue'
}

export interface ActivityEvent {
  time: string
  actor: string
  origin: 'Chat IA' | 'Agent IA' | 'Comité' | 'Arbitrage' | 'Nourrisseur humain'
  text: string
  sub: string
  docRef?: string
}

export interface TodoItem {
  label: string
  sub: string
  priority: 'high' | 'medium' | 'low'
}

// ─── Chat IA ─────────────────────────────────────────────────────────────────

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  text?: string
  allocation?: AiAllocationOutput
}

/** The 4-layer structured output the Chat IA produces (§ BNP transposition). */
export interface AiAllocationOutput {
  profile: string
  contract: string
  contractRef: string
  baseUpdate: string
  committee: string
  lines: { klass: string; pct: number; isinCount: number | string }[]
  expectedReturn: string
  volatility: string
  var95: string
  timeToRecover: string
  liquidityBucket: string
  justification: {
    isin: string
    fund: string
    sgp: string
    category: string
    status: string
    thesis: string
    lastMeeting: string
    meetingSynthesis: string
    availability: { contract: string; available: boolean; note?: string }[]
    sources: string
  }
  macro: {
    regime: string
    rates: string
    biases: { label: string; stance: 'SURPONDÉRER' | 'NEUTRE' | 'SOUS-PONDÉRER' }[]
    alert?: string
  }
}
