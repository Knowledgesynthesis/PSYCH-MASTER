import { Link } from 'react-router-dom'

export function NotFound() {
  return (
    <div className="py-20 text-center">
      <div className="text-6xl font-bold text-primary">404</div>
      <h1 className="mt-2 text-xl font-semibold">Page not found</h1>
      <p className="mt-1 text-muted-foreground">The page may have moved in the new version.</p>
      <Link to="/" className="mt-6 inline-block rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">Go to dashboard</Link>
    </div>
  )
}
