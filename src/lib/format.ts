import type { Reco, RiskType, Trend } from './types'

/** Signed percent, French style: "+1,13 %" / "−10,20 %". */
export function pct(n: number, digits = 2, withSign = true): string {
  const sign = n > 0 && withSign ? '+' : n < 0 ? '−' : withSign ? '' : ''
  const abs = Math.abs(n)
    .toFixed(digits)
    .replace('.', ',')
  return `${sign}${abs} %`
}

/** Unsigned percent for weights: "39,4 %". */
export function pctw(n: number, digits = 1): string {
  return `${n.toFixed(digits).replace('.', ',')} %`
}

export function eur(n: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(n)
}

export function eurCompact(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace('.', ',')} M€`
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)} k€`
  return `${n} €`
}

/** French long date from ISO: "28 mai 2026". */
export function frDate(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number)
  const months = [
    'janvier', 'février', 'mars', 'avril', 'mai', 'juin',
    'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre',
  ]
  return `${d} ${months[m - 1]} ${y}`
}

/** Short numeric date "28/05/2026". */
export function frDateShort(iso: string): string {
  const [y, m, d] = iso.split('-')
  return `${d}/${m}/${y}`
}

export function signClass(n: number): string {
  return n > 0 ? 'text-gain' : n < 0 ? 'text-loss' : 'text-mute'
}

export const recoStyle: Record<Reco, string> = {
  Positive: 'bg-gain/12 text-gain border-gain/25',
  Neutre: 'bg-ink-600/60 text-mute border-line',
  Négative: 'bg-loss/12 text-loss border-loss/25',
}

export const riskColor: Record<RiskType, string> = {
  Défensif: 'text-defensif',
  Équilibré: 'text-equilibre',
  Dynamique: 'text-dynamique',
}

export const riskHex: Record<RiskType, string> = {
  Défensif: '#c9a24b',
  Équilibré: '#4f86d6',
  Dynamique: '#e06b5e',
}

export const riskDot: Record<RiskType, string> = {
  Défensif: 'bg-defensif',
  Équilibré: 'bg-equilibre',
  Dynamique: 'bg-dynamique',
}

export function trendGlyph(t: Trend): string {
  return t === 'up' ? '▲' : t === 'down' ? '▼' : '='
}

export function trendClass(t: Trend): string {
  return t === 'up' ? 'text-gain' : t === 'down' ? 'text-loss' : 'text-faint'
}

/** cx — tiny className joiner. */
export function cx(...parts: (string | false | null | undefined)[]): string {
  return parts.filter(Boolean).join(' ')
}

/** Deterministic pseudo-random walk for demo sparklines (seeded, stable). */
export function walk(seed: number, len: number, drift: number, vol: number, start = 100): number[] {
  const out: number[] = []
  let v = start
  let s = seed
  for (let i = 0; i < len; i++) {
    s = (s * 9301 + 49297) % 233280
    const r = s / 233280 - 0.5
    v = v + drift + r * vol
    out.push(Number(v.toFixed(2)))
  }
  return out
}
