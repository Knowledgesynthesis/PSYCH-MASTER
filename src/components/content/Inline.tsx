import { Fragment } from 'react'
import { Link } from 'react-router-dom'

// Supports **bold** and [label](/internal or https://external) only. Single asterisks are
// literal (gene names like HLA-B*15:02 and footnote markers must render as typed).
const TOKEN = /(\*\*.+?\*\*|\[[^\]]+\]\([^)\s]+\))/g

export function Inline({ text }: { text: string }) {
  const parts = text.split(TOKEN)
  return (
    <>
      {parts.map((p, i) => {
        if (p.length > 4 && p.startsWith('**') && p.endsWith('**')) {
          return (
            <strong key={i} className="font-semibold text-foreground">
              {p.slice(2, -2)}
            </strong>
          )
        }
        const m = p.match(/^\[([^\]]+)\]\(([^)\s]+)\)$/)
        if (m) {
          const [, label, href] = m
          return href.startsWith('/') ? (
            <Link key={i} to={href} className="font-medium text-primary underline decoration-primary/30 underline-offset-2 hover:decoration-primary">
              {label}
            </Link>
          ) : (
            <a key={i} href={href} target="_blank" rel="noreferrer" className="font-medium text-primary underline underline-offset-2">
              {label}
            </a>
          )
        }
        return <Fragment key={i}>{p}</Fragment>
      })}
    </>
  )
}
