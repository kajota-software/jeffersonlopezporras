import 'server-only'
import type { Metadata } from 'next'
import Link from 'next/link'
import PageHeader from '@/components/admin/PageHeader'
import EmptyState from '@/components/admin/EmptyState'
import { BTN_PRIMARY, DIVIDER, META } from '@/components/admin/styles'
import { listForms } from '@/lib/admin/queries/forms'
import { formatDate } from '@/lib/admin/dates'

export const metadata: Metadata = { title: 'Formularios' }

export default async function FormsPage({ searchParams }: PageProps<'/admin/formularios'>) {
  const archived = (await searchParams).archivados === '1'
  const forms = await listForms({ archived })

  return (
    <div className="flex flex-col gap-8">
      <PageHeader title="Formularios" description="Preguntas para sus clientes, con link público." actions={<Link href="/admin/formularios/nuevo" className={BTN_PRIMARY}>Nuevo formulario</Link>} />
      <nav aria-label="Filtrar formularios">
        <ul className="flex gap-x-5">
          {[{ href: '/admin/formularios', label: 'Activos', active: !archived }, { href: '/admin/formularios?archivados=1', label: 'Archivados', active: archived }].map(f => (
            <li key={f.href}>
              <Link href={f.href} aria-current={f.active ? 'page' : undefined} className={`inline-flex min-h-11 items-center text-[14px] underline-offset-4 hover:underline ${f.active ? 'font-semibold text-accent' : 'text-text-secondary'}`}>
                {f.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      {forms.length === 0 ? (
        <EmptyState title={archived ? 'No hay formularios archivados.' : 'Todavía no hay formularios.'}>
          {!archived && 'Empiece con la plantilla «Información de su negocio».'}
        </EmptyState>
      ) : (
        <ul>
          {forms.map(f => (
            <li key={String(f._id)} style={{ borderTop: DIVIDER }}>
              <Link href={`/admin/formularios/${f._id}`} className="group grid gap-1 py-4 sm:grid-cols-[1fr_140px_150px] sm:items-center sm:gap-6">
                <span className="min-w-0">
                  <span className="block truncate text-[15px] font-semibold text-text-primary group-hover:underline group-hover:underline-offset-4">{f.title}</span>
                  <span className={`${META} block truncate`}>{[f.clientName ?? 'Sin cliente', `${f.fieldCount} preguntas`].join(' · ')}</span>
                </span>
                <span className="text-[13px] font-semibold" style={{ color: f.isPublic ? '#1e6b52' : '#7a6045' }}>{f.isPublic ? 'Link activo' : 'Sin acceso'}</span>
                <span className={META}>{f.responses} {f.responses === 1 ? 'respuesta' : 'respuestas'}{f.lastResponse && ` · ${formatDate(f.lastResponse)}`}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
