import type { AllocationSlice } from '@/lib/types'
import { cx } from '@/lib/format'

// ─── Line chart — Profil (solid) vs Indice (dotted) ──────────────────────────

function pointsPath(series: number[], w: number, h: number, pad: number, min: number, max: number) {
  const span = max - min || 1
  const step = (w - pad * 2) / (series.length - 1 || 1)
  return series.map((v, i) => {
    const x = pad + i * step
    const y = h - pad - ((v - min) / span) * (h - pad * 2)
    return [x, y] as const
  })
}

function toPath(pts: readonly (readonly [number, number])[]) {
  return pts.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`).join(' ')
}

export function LineChart({
  profil,
  indice,
  color = '#4f86d6',
  height = 150,
  xLabels,
  showLegend = false,
}: {
  profil: number[]
  indice?: number[]
  color?: string
  height?: number
  xLabels?: string[]
  showLegend?: boolean
}) {
  const w = 760
  const h = height
  const pad = 20
  const all = [...profil, ...(indice ?? [])]
  const min = Math.min(...all)
  const max = Math.max(...all)
  const pPts = pointsPath(profil, w, h, pad, min, max)
  const iPts = indice ? pointsPath(indice, w, h, pad, min, max) : []

  return (
    <div>
      {showLegend && (
        <div className="mb-2 flex items-center gap-4 font-mono text-2xs uppercase tracking-label text-mute">
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-0.5 w-4" style={{ background: color }} /> Profil
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-0.5 w-4 border-t border-dashed border-idx" /> Indice
          </span>
        </div>
      )}
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full" preserveAspectRatio="none" style={{ height }}>
        {[0.25, 0.5, 0.75].map((g) => (
          <line key={g} x1={pad} x2={w - pad} y1={pad + g * (h - pad * 2)} y2={pad + g * (h - pad * 2)} stroke="#212a3a" strokeWidth={1} />
        ))}
        {indice && <path d={toPath(iPts)} fill="none" stroke="#6b7894" strokeWidth={1.5} strokeDasharray="2 3" />}
        <path d={toPath(pPts)} fill="none" stroke={color} strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
      </svg>
      {xLabels && (
        <div className="mt-1 flex justify-between px-2 font-mono text-2xs text-faint">
          {xLabels.map((l) => (
            <span key={l}>{l}</span>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Sparkline — tiny bicolor curve for profile cards ────────────────────────

export function Sparkline({
  profil,
  indice,
  color = '#4f86d6',
  width = 150,
  height = 40,
}: {
  profil: number[]
  indice?: number[]
  color?: string
  width?: number
  height?: number
}) {
  const pad = 3
  const all = [...profil, ...(indice ?? [])]
  const min = Math.min(...all)
  const max = Math.max(...all)
  const pPts = pointsPath(profil, width, height, pad, min, max)
  const iPts = indice ? pointsPath(indice, width, height, pad, min, max) : []
  return (
    <svg viewBox={`0 0 ${width} ${height}`} width={width} height={height} className="overflow-visible">
      {indice && <path d={toPath(iPts)} fill="none" stroke="#6b7894" strokeWidth={1.2} strokeDasharray="1.5 2.5" />}
      <path d={toPath(pPts)} fill="none" stroke={color} strokeWidth={1.6} strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  )
}

// ─── Donut — allocation breakdown ────────────────────────────────────────────

const ASSET_COLORS: Record<string, string> = {
  'Fonds Euro': '#3f5fb0',
  Obligations: '#4f86d6',
  Actions: '#c9a24b',
  'Oblig. convertibles': '#3ecf8e',
  Liquidités: '#8a94a8',
  Monétaire: '#e06b5e',
  Diversifié: '#7c6bd0',
}

export function assetColor(k: string) {
  return ASSET_COLORS[k] ?? '#6b7894'
}

export function Donut({ slices, size = 150, thickness = 22 }: { slices: AllocationSlice[]; size?: number; thickness?: number }) {
  const r = (size - thickness) / 2
  const c = size / 2
  const circ = 2 * Math.PI * r
  let offset = 0
  const total = slices.reduce((s, x) => s + x.pct, 0) || 100
  return (
    <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
      <circle cx={c} cy={c} r={r} fill="none" stroke="#161d2c" strokeWidth={thickness} />
      {slices.map((s) => {
        const len = (s.pct / total) * circ
        const el = (
          <circle
            key={s.klass}
            cx={c}
            cy={c}
            r={r}
            fill="none"
            stroke={assetColor(s.klass)}
            strokeWidth={thickness}
            strokeDasharray={`${len} ${circ - len}`}
            strokeDashoffset={-offset}
          />
        )
        offset += len
        return el
      })}
    </svg>
  )
}

// ─── SRI gauge — 1..7 risk scale ─────────────────────────────────────────────

export function SriGauge({ score, className, showScale = true }: { score: number; className?: string; showScale?: boolean }) {
  return (
    <div className={className}>
      <div className="relative h-2 w-full overflow-hidden rounded-full" style={{ background: 'linear-gradient(90deg,#3ecf8e 0%,#9cc85a 30%,#c9a24b 55%,#e0894e 78%,#f0675f 100%)' }}>
        <div className="absolute top-1/2 h-3.5 w-0.5 -translate-y-1/2 bg-chalk shadow" style={{ left: `calc(${((score - 1) / 6) * 100}% - 1px)` }} />
      </div>
      {showScale && (
        <div className="mt-1 flex justify-between font-mono text-2xs text-faint">
          <span>1</span>
          <span className="text-mute">▲ Score {score}</span>
          <span>7</span>
        </div>
      )}
    </div>
  )
}

export function SriPill({ score }: { score: number }) {
  return (
    <div className="inline-flex flex-col items-center gap-1">
      <span className="label">SRI du profil</span>
      <div className="h-1.5 w-24 rounded-full" style={{ background: 'linear-gradient(90deg,#3ecf8e,#c9a24b,#f0675f)' }} />
      <span className="font-mono text-2xs text-mute">Score {score} / 7</span>
    </div>
  )
}

// ─── Écart bar — deviation vs category, centered on zero ─────────────────────

export function EcartBar({ value, max = 20 }: { value: number; max?: number }) {
  const pos = value >= 0
  const w = Math.min(Math.abs(value) / max, 1) * 50
  return (
    <div className="relative h-2 w-20 rounded-sm bg-ink-700">
      <div className="absolute left-1/2 top-0 h-full w-px bg-ink-500" />
      <div
        className={cx('absolute top-0 h-full rounded-sm', pos ? 'bg-gain' : 'bg-loss')}
        style={pos ? { left: '50%', width: `${w}%` } : { right: '50%', width: `${w}%` }}
      />
    </div>
  )
}

// ─── Mini annual perf bars ───────────────────────────────────────────────────

export function MiniBars({ data }: { data: { year: number; value: number }[] }) {
  const max = Math.max(...data.map((d) => Math.abs(d.value))) || 1
  return (
    <div className="flex items-end gap-3">
      {data.map((d) => {
        const pos = d.value >= 0
        const hgt = (Math.abs(d.value) / max) * 34
        return (
          <div key={d.year} className="flex flex-1 flex-col items-center gap-1">
            <div className="flex h-[38px] w-full flex-col justify-end">
              <div className={cx('mx-auto w-4 rounded-sm', pos ? 'bg-gain/70' : 'bg-loss/70')} style={{ height: Math.max(hgt, 2) }} />
            </div>
            <span className="font-mono text-2xs text-faint">{d.year}</span>
            <span className={cx('font-mono text-2xs tnum', pos ? 'text-gain' : 'text-loss')}>{pos ? '+' : '−'}{Math.abs(d.value).toFixed(2).replace('.', ',')}%</span>
          </div>
        )
      })}
    </div>
  )
}

// ─── Segmented liquidity bucket bar ──────────────────────────────────────────

export function BucketBar({ segments }: { segments: { label: string; pct: number; color: string }[] }) {
  return (
    <div className="flex h-2.5 w-full overflow-hidden rounded-full">
      {segments.map((s) => (
        <div key={s.label} style={{ width: `${s.pct}%`, background: s.color }} title={`${s.label} ${s.pct}%`} />
      ))}
    </div>
  )
}

// ─── Horizontal weight bar (dashboard perf profils) ──────────────────────────

export function WeightBar({ value, max = 3, tone }: { value: number; max?: number; tone: 'pos' | 'neg' }) {
  const blocks = 4
  const filled = Math.round((Math.abs(value) / max) * blocks)
  return (
    <div className="flex gap-1">
      {Array.from({ length: blocks }).map((_, i) => (
        <span
          key={i}
          className={cx('h-3 w-3 rounded-[2px]', i < filled ? (tone === 'pos' ? 'bg-gain' : 'bg-loss') : 'bg-ink-600')}
        />
      ))}
    </div>
  )
}
