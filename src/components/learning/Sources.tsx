import { Link } from 'react-router-dom'
import { BookMarked } from 'lucide-react'
import { refById } from '@/content/references'

export function Sources({ ids, className }: { ids?: string[]; className?: string }) {
  if (!ids?.length) return null
  return (
    <div className={className}>
      <div className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
        <BookMarked className="h-3.5 w-3.5" aria-hidden="true" />
        <span className="font-medium">Sources:</span>
        {ids.map((id) => {
          const r = refById[id]
          if (!r) return null
          return (
            <Link key={id} to={`/references#${id}`} title={r.full} className="rounded-full bg-muted px-2 py-0.5 hover:bg-primary/10 hover:text-primary">
              {r.short}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
