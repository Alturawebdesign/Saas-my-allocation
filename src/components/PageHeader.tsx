import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'

export function PageHeader({ title, sub, right, back }: { title: ReactNode; sub?: ReactNode; right?: ReactNode; back?: { to: string; label: string } }) {
  return (
    <div className="mb-8">
      {back && (
        <Link to={back.to} className="mb-3 inline-flex items-center gap-1 text-xs text-mute hover:text-chalk">
          <ChevronLeft size={14} /> {back.label}
        </Link>
      )}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl text-chalk">{title}</h1>
          {sub && <div className="mt-1.5 text-sm text-mute">{sub}</div>}
        </div>
        {right && <div className="flex items-center gap-2.5">{right}</div>}
      </div>
    </div>
  )
}
