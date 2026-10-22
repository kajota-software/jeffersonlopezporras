import 'server-only'
import type { Metadata } from 'next'
import Link from 'next/link'
import PageHeader from '@/components/admin/PageHeader'
import StatusText from '@/components/admin/StatusText'
import EmptyState from '@/components/admin/EmptyState'
import { BTN_PRIMARY, DIVIDER, META } from '@/components/admin/styles'
import { countClientsByStatus, listClients } from '@/lib/admin/queries/clients'
import { BUSINESS_TYPE, CLIENT_STATUS, CLIENT_STATUSES } from '@/lib/admin/constants'
import type { ClientStatus } from '@/lib/admin/constants'
import { formatDate } from '@/lib/admin/dates'

export const metadata: Metadata = { title: 'Clientes' }

export default async function ClientsPage({ searchParams }: PageProps<'/admin/clientes'>) {
  const sp = await searchParams
  const estado = typeof sp.estado === 'string' && (CLIENT_STATUSES as readonly string[]).includes(sp.estado) ? (sp.estado as ClientStatus) : undefined
  const archived = sp.archivados === '1'
  const [clients, counts] = await Promise.all([listClients({ status: estado, archived }), countClientsByStatus()])
  const total = Object.values(counts).reduce((a, b) => a + b, 0)

  const filters = [
    { href: '/admin/clientes', label: `Todos (${total})`, active: !estado && !archived },
    ...CLIENT_STATUSES.map(s => ({ href: `/admin/clientes?estado=${s}`, label: `${CLIENT_STATUS[s].label} (${counts[s]})`, active: estado === s && !archived })),
    { href: '/admin/clientes?archivados=1', label: 'Archivados', active: archived },
  ]

  return (
    <div className="flex flex-col gap-8">
      <PageHeader title="Clientes" actions={<Link href="/admin/clientes/nuevo" className={BTN_PRIMARY}>Nuevo cliente</Link>} />

      <nav aria-label="Filtrar clientes">
        <ul className="flex flex-wrap gap-x-5">
          {filters.map(f => (
            <li key={f.href}>
              <Link
                href={f.href}
                aria-current={f.active ? 'page' : undefined}
                className={`inline-flex min-h-11 items-center text-[14px] underline-offset-4 hover:underline ${f.active ? 'font-semibold text-accent' : 'text-text-secondary'}`}
              >
                {f.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {clients.length === 0 ? (
        <EmptyState title={archived ? 'No hay clientes archivados.' : 'No hay clientes con este filtro.'}>
          {!archived && <>Los leads del diagnóstico aparecen aquí solos. También puede <Link href="/admin/clientes/nuevo" className="underline">crear uno a mano</Link>.</>}
        </EmptyState>
      ) : (
        <ul>
          {clients.map(c => (
            <li key={String(c._id)} style={{ borderTop: DIVIDER }}>
              <Link href={`/admin/clientes/${c._id}`} className="group grid gap-1 py-4 sm:grid-cols-[1fr_120px_140px] sm:items-center sm:gap-6">
                <span className="min-w-0">
                  <span className="block truncate text-[15px] font-semibold text-text-primary group-hover:underline group-hover:underline-offset-4">{c.name}</span>
                  <span className={`${META} block truncate`}>{[c.business, BUSINESS_TYPE[c.businessType]].filter(Boolean).join(' · ')}</span>
                </span>
                <StatusText status={c.status} />
                <span className={META}>{c.lastContactAt ? `Contacto: ${formatDate(c.lastContactAt)}` : 'Sin contacto'}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
