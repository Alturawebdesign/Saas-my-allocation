import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import type { ChatMessage } from './types'
import { cardifEssentielAllocation } from './data/chat'

interface ChatState {
  open: boolean
  messages: ChatMessage[]
  openChat: (seed?: string) => void
  closeChat: () => void
  send: (text: string) => void
  reset: () => void
}

const ChatCtx = createContext<ChatState | null>(null)

let counter = 0
const nextId = () => `m${++counter}`

/** Very small deterministic "IA" — recognises the allocation-generation intent. */
function respond(text: string): ChatMessage {
  const t = text.toLowerCase()
  const wantsAllocation = /(g[ée]n[èe]re|allocation|cardif essentiel|[ée]quilibr)/.test(t)
  if (wantsAllocation) {
    return { id: nextId(), role: 'assistant', allocation: cardifEssentielAllocation }
  }
  if (/compar/.test(t)) {
    return {
      id: nextId(),
      role: 'assistant',
      text:
        "Comparatif instantané : la version plus défensive réduit la poche actions de 45 % à 28 %, remonte le fonds euro à 34 %, et abaisse la VAR 95 % de −6,1 % à −3,9 %. Le time to recover passe de 18 à 9 mois. Toutes les lignes restent filtrées par la liste UC du contrat Cardif Essentiel (CE-2019).",
    }
  }
  if (/macro|comit[ée]/.test(t)) {
    return {
      id: nextId(),
      role: 'assistant',
      text:
        "Synthèse macro — Comité GA 08/05/2026 : régime de croissance molle / désinflation progressive. Plateau Fed + BCE, premières baisses attendues T3 2026. Biais actifs : surpondérer obligations IG courte duration et actions Europe value/dividendes ; neutre sur actions US croissance ; sous-pondérer HY longue duration et émergents devise locale.",
    }
  }
  return {
    id: nextId(),
    role: 'assistant',
    text:
      "Je consulte la base vivante (nourrisseurs + comités) et je produis une réponse contextualisée au profil, au contrat et à la date. Essayez par exemple : « Génère une allocation équilibrée pour contrat Cardif Essentiel ».",
  }
}

export function ChatProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])

  const send = useCallback((text: string) => {
    if (!text.trim()) return
    setMessages((m) => [...m, { id: nextId(), role: 'user', text }, respond(text)])
  }, [])

  const openChat = useCallback((seed?: string) => {
    setOpen(true)
    if (seed) setTimeout(() => send(seed), 60)
  }, [send])

  const closeChat = useCallback(() => setOpen(false), [])
  const reset = useCallback(() => setMessages([]), [])

  const value = useMemo(() => ({ open, messages, openChat, closeChat, send, reset }), [open, messages, openChat, closeChat, send, reset])
  return <ChatCtx.Provider value={value}>{children}</ChatCtx.Provider>
}

export function useChat() {
  const ctx = useContext(ChatCtx)
  if (!ctx) throw new Error('useChat must be used within ChatProvider')
  return ctx
}
