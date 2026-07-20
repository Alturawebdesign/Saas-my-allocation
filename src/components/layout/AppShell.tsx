import { Outlet, useLocation } from 'react-router-dom'
import { Sparkles } from 'lucide-react'
import { TopNav } from './TopNav'
import { ChatPanel } from './ChatPanel'
import { useChat } from '@/lib/chatStore'

export function AppShell() {
  const { openChat, open } = useChat()
  const location = useLocation()
  return (
    <div className="min-h-screen bg-ink-900">
      <TopNav />
      <main className="mx-auto max-w-[1600px] px-4 py-8 sm:px-6">
        {/* Keyed by route → content gently fades up on every navigation */}
        <div key={location.pathname} className="animate-fade-up">
          <Outlet />
        </div>
      </main>

      {/* Lanceur Chat IA flottant — retiré du tableau de bord (le chat garde sa page dédiée) */}
      {!open && location.pathname !== '/' && (
        <button
          onClick={() => openChat()}
          aria-label="Ouvrir le Chat IA"
          className="group fixed bottom-6 right-6 z-30 flex items-center gap-2 rounded-full border border-wine/50 bg-wine/90 px-4 py-3 text-sm font-medium text-white shadow-pop ring-eos transition-all duration-200 ease-smooth hover:scale-105 hover:bg-wine active:scale-95"
        >
          <Sparkles size={17} className="transition-transform duration-300 group-hover:rotate-12" />
          Chat IA
        </button>
      )}

      <ChatPanel />
    </div>
  )
}
