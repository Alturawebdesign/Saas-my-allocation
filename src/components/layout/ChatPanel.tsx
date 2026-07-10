import { useEffect, useRef, useState } from 'react'
import { Send, Sparkles, X, MessageSquarePlus } from 'lucide-react'
import { useChat } from '@/lib/chatStore'
import { chatTemplates } from '@/lib/data/chat'
import { AllocationOutput } from '../AllocationOutput'
import { cx } from '@/lib/format'

export function ChatPanel() {
  const { open, messages, closeChat, send, reset } = useChat()
  const [input, setInput] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, open])

  if (!open) return null

  const submit = () => {
    send(input)
    setInput('')
  }

  return (
    <div className="fixed inset-0 z-40 flex justify-end">
      <div className="flex-1 bg-black/40 backdrop-blur-[1px]" onClick={closeChat} />
      <aside className="flex w-full max-w-xl animate-slide-in flex-col border-l border-line bg-ink-850 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-line bg-gradient-to-r from-wine/25 to-transparent px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-wine/30 text-winebright">
              <Sparkles size={15} />
            </span>
            <div>
              <div className="text-sm font-medium text-chalk">Chat IA</div>
              <div className="font-mono text-2xs text-faint">Interface de production · base vivante nourrie</div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button onClick={reset} title="Nouvelle conversation" className="rounded p-1.5 text-mute hover:bg-ink-700 hover:text-chalk">
              <MessageSquarePlus size={16} />
            </button>
            <button onClick={closeChat} className="rounded p-1.5 text-mute hover:bg-ink-700 hover:text-chalk">
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
          {messages.length === 0 && (
            <div className="mt-6 text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-wine/15 text-winebright">
                <Sparkles size={22} />
              </div>
              <p className="mx-auto max-w-xs text-sm text-mute">
                Posez votre question en langage naturel. L'IA consulte la base et produit une allocation adaptée au profil, au contrat et à la date.
              </p>
              <div className="mt-5 space-y-2 text-left">
                <div className="label mb-1">Templates pré-construits</div>
                {chatTemplates.map((t) => (
                  <button
                    key={t}
                    onClick={() => send(t)}
                    className="flex w-full items-center gap-2 rounded-md border border-line bg-ink-800 px-3 py-2 text-left text-2xs text-mute transition-colors hover:border-ink-500 hover:text-chalk"
                  >
                    <span className="text-gold">›</span> {t}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((m) =>
            m.role === 'user' ? (
              <div key={m.id} className="flex justify-end">
                <div className="max-w-[85%] rounded-lg rounded-tr-sm border border-equilibre/30 bg-equilibre/12 px-3 py-2 text-sm text-chalk">{m.text}</div>
              </div>
            ) : (
              <div key={m.id} className="flex justify-start">
                <div className={cx('w-full', m.allocation ? '' : 'max-w-[90%] rounded-lg rounded-tl-sm border border-line bg-ink-800 px-3 py-2 text-sm leading-relaxed text-mute')}>
                  {m.allocation ? <AllocationOutput a={m.allocation} /> : m.text}
                </div>
              </div>
            ),
          )}
        </div>

        {/* Input */}
        <div className="border-t border-line p-3">
          <div className="flex items-end gap-2 rounded-lg border border-line bg-ink-800 px-3 py-2 focus-within:border-ink-500">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  submit()
                }
              }}
              rows={1}
              placeholder="Génère une allocation équilibrée pour contrat Cardif Essentiel…"
              className="max-h-28 flex-1 resize-none bg-transparent text-sm text-chalk placeholder:text-ghost focus:outline-none"
            />
            <button onClick={submit} disabled={!input.trim()} className="rounded-md bg-wine/30 p-1.5 text-winebright transition-colors hover:bg-wine/45 disabled:opacity-40">
              <Send size={15} />
            </button>
          </div>
          <div className="mt-1.5 text-center font-mono text-[10px] text-ghost">Chaque output est horodaté, sourcé et consigné en Conformité.</div>
        </div>
      </aside>
    </div>
  )
}
