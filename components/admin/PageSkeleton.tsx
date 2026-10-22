// Esqueleto que aparece al instante al navegar mientras el servidor trae los datos.
// Solo cambia la opacidad (y nada con prefers-reduced-motion).
const BLOCK = 'rounded-md bg-[rgba(28,18,9,0.07)] motion-safe:animate-pulse'

export function ListSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div aria-hidden className="flex flex-col">
      {Array.from({ length: rows }, (_, i) => (
        <div key={i} className="flex flex-col gap-2 py-4" style={{ borderTop: '1px solid rgba(28,18,9,0.06)' }}>
          <div className={`${BLOCK} h-4 w-2/3 max-w-[320px]`} />
          <div className={`${BLOCK} h-3 w-1/3 max-w-[180px]`} />
        </div>
      ))}
    </div>
  )
}

export default function PageSkeleton() {
  return (
    <div role="status" aria-live="polite" className="flex flex-col gap-8">
      <span className="sr-only">Cargando…</span>
      <div className={`${BLOCK} h-9 w-56`} />
      <div className={`${BLOCK} h-4 w-80 max-w-full`} />
      <ListSkeleton />
    </div>
  )
}
