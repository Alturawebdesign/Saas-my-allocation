import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'

export function PageHeader({ title, sub, right, back }: { title: ReactNode; sub?: ReactNode; right?: ReactNode; back?: { to: string; label: string } }) {
  return (
    <div className="mb-6">
      {back && (
        <Link to={back.to} className="mb-2 inline-flex items-center gap-1 font-mono text-2xs text-mute hover:text-chalk">
          <ChevronLeft size={13} /> {back.label}
        </Link>
      )}
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-serif text-3xl text-chalk">{title}</h1>
          {sub && <div className="mt-1 font-mono text-2xs text-faint">{sub}</div>}
        </div>
        {right && <div className="flex items-center gap-2">{right}</div>}
      </div>
    </div>
  )
}
