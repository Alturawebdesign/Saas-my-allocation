import { Outlet } from 'react-router-dom'
import { Sparkles } from 'lucide-react'
import { TopNav } from './TopNav'
import { ChatPanel } from './ChatPanel'
import { useChat } from '@/lib/chatStore'

export function AppShell() {
  const { openChat, open } = useChat()
  return (
    <div className="min-h-screen bg-ink-900">
      <TopNav />
      <main className="mx-auto max-w-[1600px] px-4 py-6">
        <Outlet />
      </main>

      {/* Floating Chat IA launcher — omniprésent */}
      {!open && (
        <button
          onClick={() => openChat()}
          className="fixed bottom-6 right-6 z-30 flex items-center gap-2 rounded-full border border-wine/50 bg-wine/90 px-4 py-3 text-sm font-medium text-white shadow-2xl transition-transform hover:scale-105"
        >
          <Sparkles size={17} />
          Chat IA
        </button>
      )}

      <ChatPanel />
    </div>
  )
}
