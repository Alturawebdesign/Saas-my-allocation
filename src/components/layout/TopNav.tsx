import { useState, useRef, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { ChevronDown, Sparkles, TrendingUp } from 'lucide-react'
import { cx } from '@/lib/format'
import { useChat } from '@/lib/chatStore'

interface NavItem {
  label: string
  to: string
  children?: { label: string; to: string; hint?: string }[]
}

const NAV: NavItem[] = [
  { label: 'Tableau de bord', to: '/' },
  {
    label: 'Convictions',
    to: '/convictions',
    children: [
      { label: 'Base fonds', to: '/convictions', hint: '184 fonds référencés' },
      { label: 'Short list interne', to: '/convictions?view=shortlist', hint: 'Sélection convictions' },
      { label: 'Univers par compagnie', to: '/convictions?view=univers', hint: 'Filtrage UC dispo' },
      { label: 'Statuts A/C/V', to: '/convictions?view=statuts', hint: 'Historique versionné' },
    ],
  },
  {
    label: 'Allocations',
    to: '/allocations',
    children: [
      { label: 'Mes profils', to: '/allocations', hint: 'Profils par contrat' },
      { label: 'Comparateur', to: '/allocations/comparateur', hint: 'Deux profils côte à côte' },
      { label: "Simulateur d'arbitrage", to: '/allocations/simulateur', hint: 'Allocation Designer' },
    ],
  },
  { label: 'Comités', to: '/comites' },
  { label: 'Clients', to: '/clients' },
  { label: 'Sources', to: '/sources' },
  { label: 'Conformité', to: '/conformite' },
]

function NavDropdown({ item }: { item: NavItem }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  return (
    <div ref={ref} className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <NavLink
        to={item.to}
        className={({ isActive }) =>
          cx('flex items-center gap-1 px-3 py-3.5 text-sm transition-colors', isActive ? 'text-chalk' : 'text-mute hover:text-chalk')
        }
      >
        {({ isActive }) => (
          <>
            {item.label}
            <ChevronDown size={13} className={cx('transition-transform', open && 'rotate-180')} />
            {isActive && <span className="absolute inset-x-2 bottom-0 h-0.5 rounded-full bg-gold" />}
          </>
        )}
      </NavLink>
      {open && (
        <div className="absolute left-0 top-full z-30 w-60 animate-fade-in rounded-lg border border-line bg-ink-800 p-1.5 shadow-2xl">
          {item.children!.map((c) => (
            <button
              key={c.label}
              onClick={() => {
                setOpen(false)
                navigate(c.to)
              }}
              className="flex w-full flex-col items-start rounded-md px-3 py-2 text-left transition-colors hover:bg-ink-700"
            >
              <span className="text-sm text-chalk">{c.label}</span>
              {c.hint && <span className="font-mono text-[10px] text-faint">{c.hint}</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export function TopNav() {
  const { openChat } = useChat()
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-ink-850/95 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-[1600px] items-center gap-1 px-4">
        {/* Brand */}
        <NavLink to="/" className="mr-3 flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-gold/15 text-gold">
            <TrendingUp size={16} />
          </span>
          <span className="font-serif text-[15px] leading-tight text-chalk">
            CFGP <span className="text-gold">Allocataire</span>
          </span>
        </NavLink>

        {/* Nav */}
        <nav className="hidden items-center lg:flex">
          {NAV.map((item) =>
            item.children ? (
              <NavDropdown key={item.label} item={item} />
            ) : (
              <NavLink
                key={item.label}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  cx('relative px-3 py-3.5 text-sm transition-colors', isActive ? 'text-chalk' : 'text-mute hover:text-chalk')
                }
              >
                {({ isActive }) => (
                  <>
                    {item.label}
                    {isActive && <span className="absolute inset-x-2 bottom-0 h-0.5 rounded-full bg-gold" />}
                  </>
                )}
              </NavLink>
            ),
          )}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <button
            onClick={() => openChat()}
            className="flex items-center gap-2 rounded-md border border-wine/45 bg-wine/20 px-3 py-1.5 text-sm text-winebright transition-colors hover:bg-wine/35"
          >
            <Sparkles size={14} />
            Chat IA
          </button>
          <NavLink to="/admin" className={({ isActive }) => cx('rounded-md px-2.5 py-1.5 text-sm transition-colors', isActive ? 'text-chalk' : 'text-mute hover:text-chalk')}>
            Admin
          </NavLink>
          <div className="flex items-center gap-2 rounded-md border border-line bg-ink-800 py-1 pl-1 pr-2.5">
            <span className="flex h-6 w-6 items-center justify-center rounded bg-equilibre/20 font-mono text-2xs text-equilibre">PB</span>
            <span className="hidden text-2xs text-mute sm:inline">Pierre B.</span>
          </div>
        </div>
      </div>
    </header>
  )
}
