import type { ReactNode } from 'react'

// Título de página (único H1) con descripción y acciones opcionales
export default function PageHeader({ title, description, actions }: { title: ReactNode; description?: ReactNode; actions?: ReactNode }) {
  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0">
        <h1 className="text-[1.75rem] font-bold leading-tight tracking-tight text-text-primary md:text-[2rem]">{title}</h1>
        {description && <div className="mt-2 text-[15px] leading-[1.6] text-text-secondary">{description}</div>}
      </div>
      {actions && <div className="flex shrink-0 flex-wrap gap-3">{actions}</div>}
    </header>
  )
}
