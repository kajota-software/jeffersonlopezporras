import 'server-only'
import { Suspense } from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import PageHeader from '@/components/admin/PageHeader'
import ClientForm from '@/components/admin/ClientForm'
import TechForm from '@/components/admin/TechForm'
import ActivityForm from '@/components/admin/ActivityForm'
import FollowupForm from '@/components/admin/FollowupForm'
import FollowupList from '@/components/admin/FollowupList'
import Timeline from '@/components/admin/Timeline'
import StatusSelect from '@/components/admin/StatusSelect'
import ArchiveButton from '@/components/admin/ArchiveButton'
import DiagnosticSummary from '@/components/admin/DiagnosticSummary'
import ProjectList from '@/components/admin/ProjectList'
import EmptyState from '@/components/admin/EmptyState'
import { ListSkeleton } from '@/components/admin/PageSkeleton'
import { BTN_PRIMARY, DIVIDER, LINK, META, SECTION_TITLE } from '@/components/admin/styles'
import { getClient } from '@/lib/admin/queries/clients'
import { activitiesForClient, diagnosticsForClient, followupsForClient } from '@/lib/admin/queries/crm'
import { projectsForClient } from '@/lib/admin/queries/projects'
import { setClientArchived, updateClient, updateClientTech } from '@/lib/admin/actions/clients'
import { addActivity } from '@/lib/admin/actions/crm'
import { BUSINESS_TYPE, CLIENT_SOURCE } from '@/lib/admin/constants'
import { formatDate, startOfDayCR, toDayString } from '@/lib/admin/dates'
import { formatPhone } from '@/lib/admin/phone'

const TABS = [
  { key: 'resumen', label: 'Resumen' },
  { key: 'actividad', label: 'Actividad' },
  { key: 'proyectos', label: 'Proyectos' },
  { key: 'ficha', label: 'Ficha técnica' },
] as const
type Tab = (typeof TABS)[number]['key']

export async function generateMetadata({ params }: PageProps<'/admin/clientes/[id]'>): Promise<Metadata> {
  const client = await getClient((await params).id)
  return { title: client?.name ?? 'Cliente' }
}

export default async function ClientPage({ params, searchParams }: PageProps<'/admin/clientes/[id]'>) {
  const [{ id }, sp] = await Promise.all([params, searchParams])
  const tab: Tab = TABS.some(t => t.key === sp.tab) ? (sp.tab as Tab) : 'resumen'
  // Precarga los datos de la pestaña en paralelo con el cliente (una sola ronda a la base)
  if (tab === 'resumen') { void followupsForClient(id); void diagnosticsForClient(id) }
  if (tab === 'actividad') void activitiesForClient(id)
  if (tab === 'proyectos') void projectsForClient(id)
  const client = await getClient(id)
  if (!client) notFound()

  const subtitle = [client.business, BUSINESS_TYPE[client.businessType], client.location].filter(Boolean).join(' · ')

  return (
    <div className="flex flex-col gap-8">
      <Link href="/admin/clientes" className={`${META} inline-flex min-h-11 w-fit items-center underline-offset-4 hover:underline`}>← Clientes</Link>

      <PageHeader
        title={client.name}
        description={
          <>
            {subtitle && <p>{subtitle}</p>}
            <p className={`${META} mt-1`}>
              Origen: {CLIENT_SOURCE[client.source]} · Último contacto: {formatDate(client.lastContactAt)}
              {client.archivedAt && <span style={{ color: '#9b2c1f' }}> · Archivado</span>}
            </p>
          </>
        }
        actions={
          <>
            <StatusSelect clientId={id} status={client.status} />
            <ArchiveButton archived={!!client.archivedAt} action={setClientArchived.bind(null, id)} confirmText="¿Archivar este cliente? Sale de las listas, pero conserva su historial." />
          </>
        }
      />

      {(client.whatsapp || client.email) && (
        <p className="flex flex-wrap gap-x-6 text-[15px]">
          {client.whatsapp && (
            <a href={`https://wa.me/${client.whatsapp}`} target="_blank" rel="noopener noreferrer" className={`${LINK} inline-flex min-h-11 items-center`}>
              WhatsApp {formatPhone(client.whatsapp)}
            </a>
          )}
          {client.email && <a href={`mailto:${client.email}`} className={`${LINK} inline-flex min-h-11 items-center`}>{client.email}</a>}
        </p>
      )}

      <nav aria-label="Secciones del cliente" style={{ borderBottom: DIVIDER }}>
        <ul className="flex gap-6 overflow-x-auto">
          {TABS.map(t => (
            <li key={t.key}>
              <Link
                href={t.key === 'resumen' ? `/admin/clientes/${id}` : `/admin/clientes/${id}?tab=${t.key}`}
                aria-current={tab === t.key ? 'page' : undefined}
                className={`inline-flex min-h-11 items-center whitespace-nowrap text-[15px] ${tab === t.key ? 'font-semibold text-accent' : 'text-text-secondary hover:text-text-primary'}`}
                style={tab === t.key ? { boxShadow: 'inset 0 -2px 0 #8b4513' } : undefined}
              >
                {t.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Cada pestaña carga sus datos aparte: el encabezado aparece sin esperarlas */}
      <Suspense key={tab} fallback={<ListSkeleton />}>
        {tab === 'resumen' && <SummaryTab id={id} client={client} />}
        {tab === 'actividad' && <ActivityTab id={id} />}
        {tab === 'proyectos' && <ProjectsTab id={id} />}
      </Suspense>
      {tab === 'ficha' && (
        <section aria-labelledby="ficha-title">
          <h2 id="ficha-title" className={`${SECTION_TITLE} mb-5`}>Ficha técnica</h2>
          <TechForm
            action={updateClientTech.bind(null, id)}
            values={{
              ...client.tech,
              domainExpiresAt: client.tech.domainExpiresAt ? toDayString(client.tech.domainExpiresAt) : '',
            }}
          />
        </section>
      )}
    </div>
  )
}

async function SummaryTab({ id, client }: { id: string; client: NonNullable<Awaited<ReturnType<typeof getClient>>> }) {
  const [followups, diagnostics] = await Promise.all([followupsForClient(id), diagnosticsForClient(id)])
  const pending = followups.filter(f => !f.done)

  return (
    <div className="flex flex-col gap-14">
      <section className="flex flex-col gap-6">
        <FollowupList title="Seguimientos pendientes" rows={pending} showClient={false} empty="Sin seguimientos pendientes." />
        <details>
          <summary className={`${LINK} inline-flex min-h-11 cursor-pointer items-center text-[14px]`}>Nuevo seguimiento</summary>
          <div className="mt-3">
            <FollowupForm clientId={id} defaultDay={toDayString(startOfDayCR(1))} />
          </div>
        </details>
      </section>

      {diagnostics.length > 0 && (
        <section>
          <h2 className={SECTION_TITLE}>Diagnósticos</h2>
          <div className="mt-2">
            {diagnostics.map(d => <DiagnosticSummary key={String(d._id)} d={d} />)}
          </div>
        </section>
      )}

      <section aria-labelledby="datos-title">
        <h2 id="datos-title" className={`${SECTION_TITLE} mb-5`}>Datos del cliente</h2>
        <ClientForm
          action={updateClient.bind(null, id)}
          submitLabel="Guardar cambios"
          values={{
            name: client.name, business: client.business, businessType: client.businessType,
            whatsapp: client.whatsapp, email: client.email, country: client.country, location: client.location,
            status: client.status, source: client.source, tags: client.tags, notes: client.notes, contacts: client.contacts,
          }}
        />
      </section>
    </div>
  )
}

async function ActivityTab({ id }: { id: string }) {
  const activities = await activitiesForClient(id)
  return (
    <div className="flex flex-col gap-10">
      <section aria-labelledby="nueva-actividad">
        <h2 id="nueva-actividad" className={`${SECTION_TITLE} mb-4`}>Registrar actividad</h2>
        <ActivityForm action={addActivity.bind(null, id)} />
      </section>
      <section aria-labelledby="historial">
        <h2 id="historial" className={`${SECTION_TITLE} mb-2`}>Historial</h2>
        <Timeline items={activities.map(a => ({ id: String(a._id), type: a.type, body: a.body, createdAt: a.createdAt }))} />
      </section>
    </div>
  )
}

async function ProjectsTab({ id }: { id: string }) {
  const projects = await projectsForClient(id)
  return (
    <section aria-labelledby="proyectos-title" className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 id="proyectos-title" className={SECTION_TITLE}>Proyectos</h2>
        <Link href={`/admin/proyectos/nuevo?cliente=${id}`} className={BTN_PRIMARY}>Nuevo proyecto</Link>
      </div>
      {projects.length === 0 ? <EmptyState title="Este cliente todavía no tiene proyectos." /> : <ProjectList rows={projects} showClient={false} />}
    </section>
  )
}
