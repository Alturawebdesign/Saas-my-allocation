import { useEffect, type ReactNode } from 'react'
import { X } from 'lucide-react'
import type { Reco } from '@/lib/types'
import { cx, recoStyle } from '@/lib/format'

// ─── Recommendation pill ─────────────────────────────────────────────────────

export function RecoPill({ reco, className }: { reco: Reco; className?: string }) {
  return (
    <span className={cx('inline-flex items-center rounded-full border px-2.5 py-0.5 text-2xs font-medium', recoStyle[reco], className)}>
      {reco}
    </span>
  )
}

// ─── Generic badge ───────────────────────────────────────────────────────────

export function Badge({ children, tone = 'neutral', className }: { children: ReactNode; tone?: 'neutral' | 'gain' | 'loss' | 'gold' | 'blue' | 'wine'; className?: string }) {
  const tones: Record<string, string> = {
    neutral: 'bg-ink-600/60 text-mute border-line',
    gain: 'bg-gain/12 text-gain border-gain/25',
    loss: 'bg-loss/12 text-loss border-loss/25',
    gold: 'bg-gold/12 text-gold border-gold/30',
    blue: 'bg-equilibre/12 text-equilibre border-equilibre/30',
    wine: 'bg-wine/20 text-winebright border-wine/40',
  }
  return <span className={cx('inline-flex items-center rounded border px-2 py-0.5 text-2xs font-medium', tones[tone], className)}>{children}</span>
}

// ─── Section label (mono uppercase) ──────────────────────────────────────────

export function SectionLabel({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cx('label-b', className)}>{children}</div>
}

// ─── Metric block ────────────────────────────────────────────────────────────

export function Metric({ label, value, sub, valueClass }: { label: string; value: ReactNode; sub?: ReactNode; valueClass?: string }) {
  return (
    <div>
      <div className="label mb-1">{label}</div>
      <div className={cx('font-mono text-xl tnum', valueClass)}>{value}</div>
      {sub != null && <div className="mt-0.5 font-mono text-2xs text-faint tnum">{sub}</div>}
    </div>
  )
}

// ─── Panel ───────────────────────────────────────────────────────────────────

export function Panel({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cx('panel', className)}>{children}</div>
}

export function PanelHeader({ icon, title, right }: { icon?: ReactNode; title: ReactNode; right?: ReactNode }) {
  return (
    <div className="flex items-center justify-between border-b border-line/70 px-5 py-3.5">
      <div className="flex items-center gap-2.5 text-sm font-medium text-chalk">
        {icon && <span className="text-gold">{icon}</span>}
        {title}
      </div>
      {right}
    </div>
  )
}

// ─── Tabs ────────────────────────────────────────────────────────────────────

export function Tabs({ tabs, active, onChange, className }: { tabs: string[]; active: string; onChange: (t: string) => void; className?: string }) {
  return (
    <div className={cx('flex gap-1 border-b border-line', className)}>
      {tabs.map((t) => (
        <button
          key={t}
          onClick={() => onChange(t)}
          className={cx(
            'relative -mb-px border-b-2 px-4 py-2.5 text-sm transition-colors ring-eos',
            active === t ? 'border-gold text-chalk' : 'border-transparent text-mute hover:text-chalk',
          )}
        >
          {t}
        </button>
      ))}
    </div>
  )
}

// ─── Segmented control (pill filters) ────────────────────────────────────────

export function Segmented({ options, active, onChange }: { options: string[]; active: string; onChange: (o: string) => void }) {
  return (
    <div className="inline-flex gap-2">
      {options.map((o) => (
        <button
          key={o}
          onClick={() => onChange(o)}
          className={cx(
            'rounded-full border px-4 py-1.5 text-sm ring-eos transition-all duration-200 ease-smooth active:scale-[0.97]',
            active === o ? 'border-gold/40 bg-gold/10 text-gold shadow-soft' : 'border-line bg-transparent text-mute hover:border-ink-500 hover:text-chalk',
          )}
        >
          {o}
        </button>
      ))}
    </div>
  )
}

// ─── Modal ───────────────────────────────────────────────────────────────────

export function Modal({ open, onClose, title, children, footer, width = 'max-w-md' }: { open: boolean; onClose: () => void; title: ReactNode; children: ReactNode; footer?: ReactNode; width?: string }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/60 p-4 pt-[8vh] backdrop-blur-sm" onClick={onClose}>
      <div className={cx('w-full animate-scale-in panel-800 shadow-2xl', width)} onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-line px-4 py-3">
          <h3 className="text-sm font-medium text-chalk">{title}</h3>
          <button onClick={onClose} className="rounded p-1 text-mute hover:bg-ink-700 hover:text-chalk ring-eos">
            <X size={16} />
          </button>
        </div>
        <div className="max-h-[62vh] overflow-y-auto px-4 py-4">{children}</div>
        {footer && <div className="flex items-center justify-between gap-3 border-t border-line px-4 py-3">{footer}</div>}
      </div>
    </div>
  )
}

// ─── Button ──────────────────────────────────────────────────────────────────

export function Button({ children, variant = 'default', size = 'md', className, ...rest }: { children: ReactNode; variant?: 'default' | 'primary' | 'ghost' | 'gold'; size?: 'sm' | 'md' } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const variants: Record<string, string> = {
    default: 'border border-line bg-ink-750 text-chalk hover:bg-ink-700 hover:border-ink-500',
    primary: 'border border-equilibre/40 bg-equilibre/15 text-equilibre hover:bg-equilibre/25',
    gold: 'border border-gold/40 bg-gold/12 text-gold hover:bg-gold/20',
    ghost: 'text-mute hover:text-chalk hover:bg-ink-700',
  }
  const sizes: Record<string, string> = { sm: 'px-3 py-1.5 text-2xs', md: 'px-4 py-2 text-sm' }
  return (
    <button
      className={cx(
        'inline-flex items-center justify-center gap-2 rounded-lg font-medium ring-eos transition-all duration-200 ease-smooth active:scale-[0.97]',
        variants[variant],
        sizes[size],
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  )
}

// ─── Empty / placeholder note ────────────────────────────────────────────────

export function Note({ children, tone = 'neutral' }: { children: ReactNode; tone?: 'neutral' | 'gold' | 'wine' | 'gain' }) {
  const tones: Record<string, string> = {
    neutral: 'border-line bg-ink-800 text-mute',
    gold: 'border-gold/25 bg-gold/8 text-gold/90',
    wine: 'border-wine/35 bg-wine/12 text-winebright',
    gain: 'border-gain/25 bg-gain/8 text-gain/90',
  }
  return <div className={cx('rounded-md border px-3 py-2.5 text-2xs leading-relaxed', tones[tone])}>{children}</div>
}
