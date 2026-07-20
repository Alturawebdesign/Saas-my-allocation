import { useState, useRef, useEffect } from 'react'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import { ChevronDown, Sparkles, TrendingUp, Menu, X } from 'lucide-react'
import { cx } from '@/lib/format'
import { useChat } from '@/lib/chatStore'
import { BRAND_PREFIX, BRAND_ACCENT, USER_NAME, USER_INITIALS } from '@/lib/config'

interface NavItem {
  label: string
  to: string
  children?: { label: string; to: string; hint?: string }[]
}

// Clients & Sources vivent désormais dans Admin (Pilotage & Clients / Sources).
const NAV: NavItem[] = [
  { label: 'Tableau de bord', to: '/' },
  { label: 'Suivi des fonds', to: '/convictions' },
  {
    label: "Allocateur d'actifs",
    to: '/allocations',
    children: [
      { label: 'Compagnies & profils', to: '/allocations', hint: 'Compagnie → contrat → profil' },
      { label: 'Comparateur', to: '/allocations/comparateur', hint: 'Deux profils côte à côte' },
      { label: "Simulateur d'allocation", to: '/allocations/simulateur', hint: 'Briques rendement / risque' },
    ],
  },
  { label: 'Comités', to: '/comites' },
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
            <ChevronDown size={13} className={cx('transition-transform duration-200', open && 'rotate-180')} />
            {isActive && <span className="absolute inset-x-2 bottom-0 h-0.5 rounded-full bg-gold" />}
          </>
        )}
      </NavLink>
      {open && (
        <div className="absolute left-0 top-full z-30 w-60 animate-slide-down rounded-xl border border-line bg-ink-800 p-1.5 shadow-pop">
          {item.children!.map((c) => (
            <button
              key={c.label}
              onClick={() => {
                setOpen(false)
                navigate(c.to)
              }}
              className="flex w-full flex-col items-start rounded-lg px-3 py-2 text-left transition-colors hover:bg-ink-700"
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

function MobileNav({ onClose }: { onClose: () => void }) {
  const navigate = useNavigate()
  const go = (to: string) => {
    onClose()
    navigate(to)
  }
  return (
    <div className="animate-slide-down border-t border-line bg-ink-850 lg:hidden">
      <nav className="mx-auto max-w-[1600px] space-y-1 px-4 py-3">
        {NAV.map((item) => (
          <div key={item.label}>
            <NavLink
              to={item.to}
              end={item.to === '/'}
              onClick={(e) => {
                e.preventDefault()
                go(item.to)
              }}
              className={({ isActive }) =>
                cx('block rounded-lg px-3 py-2.5 text-sm transition-colors', isActive ? 'bg-ink-700 text-chalk' : 'text-mute hover:bg-ink-800 hover:text-chalk')
              }
            >
              {item.label}
            </NavLink>
            {item.children && (
              <div className="ml-3 border-l border-line pl-2">
                {item.children.map((c) => (
                  <button key={c.label} onClick={() => go(c.to)} className="block w-full rounded-lg px-3 py-1.5 text-left text-2xs text-faint transition-colors hover:text-chalk">
                    {c.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
        <NavLink to="/admin" onClick={(e) => { e.preventDefault(); go('/admin') }} className="block rounded-lg px-3 py-2.5 text-sm text-mute transition-colors hover:bg-ink-800 hover:text-chalk">
          Admin
        </NavLink>
      </nav>
    </div>
  )
}

export function TopNav() {
  const { openChat } = useChat()
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  // Close the mobile menu on navigation
  useEffect(() => setMobileOpen(false), [location.pathname])

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-ink-850/90 shadow-soft backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-[1600px] items-center gap-1 px-4 sm:px-6">
        {/* Brand */}
        <NavLink to="/" className="mr-3 flex items-center gap-2 ring-eos rounded-md">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-gold/15 text-gold">
            <TrendingUp size={16} />
          </span>
          <span className="font-serif text-[15px] leading-tight text-chalk">
            {BRAND_PREFIX}<span className="text-gold">{BRAND_ACCENT}</span>
          </span>
        </NavLink>

        {/* Desktop nav */}
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
            className="flex items-center gap-2 rounded-lg border border-wine/45 bg-wine/20 px-3 py-1.5 text-sm text-winebright ring-eos transition-all duration-200 ease-smooth hover:border-wine/70 hover:bg-wine/35 active:scale-95"
          >
            <Sparkles size={14} />
            <span className="hidden sm:inline">Chat IA</span>
          </button>
          <NavLink to="/admin" className={({ isActive }) => cx('hidden rounded-lg px-2.5 py-1.5 text-sm transition-colors lg:block', isActive ? 'text-chalk' : 'text-mute hover:text-chalk')}>
            Admin
          </NavLink>
          <div className="hidden items-center gap-2 rounded-lg border border-line bg-ink-800 py-1 pl-1 pr-2.5 sm:flex">
            <span className="flex h-6 w-6 items-center justify-center rounded bg-equilibre/20 font-mono text-2xs text-equilibre">{USER_INITIALS}</span>
            <span className="hidden text-2xs text-mute md:inline">{USER_NAME}</span>
          </div>
          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={mobileOpen}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-ink-800 text-mute ring-eos transition-colors hover:text-chalk lg:hidden"
          >
            {mobileOpen ? <X size={17} /> : <Menu size={17} />}
          </button>
        </div>
      </div>

      {mobileOpen && <MobileNav onClose={() => setMobileOpen(false)} />}
    </header>
  )
}
