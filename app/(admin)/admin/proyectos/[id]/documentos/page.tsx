import 'server-only'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import PageHeader from '@/components/admin/PageHeader'
import DeliverableForm from '@/components/admin/DeliverableForm'
import ArchiveButton from '@/components/admin/ArchiveButton'
import EmptyState from '@/components/admin/EmptyState'
import { CopyLinkButton, PublicToggle } from '@/components/admin/LinkControls'
import { DIVIDER, LINK, META, SECTION_TITLE } from '@/components/admin/styles'
import { deliverablesForProject, getProject } from '@/lib/admin/queries/projects'
import { createDeliverable, setDeliverableArchived, setDeliverablePublic } from '@/lib/admin/actions/deliverables'
import { DELIVERABLE_KIND } from '@/lib/admin/constants'
import { formatDateTime } from '@/lib/admin/dates'

export const metadata: Metadata = { title: 'Documentos del proyecto' }

export default async function DeliverablesPage({ params }: PageProps<'/admin/proyectos/[id]/documentos'>) {
  const { id } = await params
  const project = await getProject(id)
  if (!project) notFound()
  const docs = await deliverablesForProject(project._id)

  return (
    <div className="flex flex-col gap-12">
      <Link href={`/admin/proyectos/${id}`} className={`${META} inline-flex min-h-11 w-fit items-center underline-offset-4 hover:underline`}>← {project.name}</Link>
      <PageHeader
        title="Documentos"
        description="Cada documento es una copia congelada de las secciones elegidas: editar el proyecto después no lo cambia."
      />

      <section aria-labelledby="generados">
        <h2 id="generados" className={`${SECTION_TITLE} mb-2`}>Generados</h2>
        {docs.length === 0 ? (
          <EmptyState title="Todavía no hay documentos." />
        ) : (
          <ul>
            {docs.map(d => {
              const path = `/d/${d.slug}`
              const visible = d.isPublic && !d.archivedAt
              return (
                <li key={String(d._id)} className="flex flex-col gap-3 py-4 md:flex-row md:items-center md:justify-between" style={{ borderTop: DIVIDER }}>
                  <div className="min-w-0">
                    <p className="text-[15px] font-semibold text-text-primary">{d.title}</p>
                    <p className={`${META} mt-0.5`}>
                      {DELIVERABLE_KIND[d.kind]} · versión {d.version} · {formatDateTime(d.createdAt)} ·{' '}
                      <span style={{ color: visible ? '#1e6b52' : '#9b2c1f', fontWeight: 600 }}>
                        {d.archivedAt ? 'Archivado' : d.isPublic ? 'Link activo' : 'Sin acceso'}
                      </span>
                    </p>
                    {visible && <a href={path} target="_blank" rel="noopener noreferrer" className={`${LINK} mt-1 inline-flex min-h-11 items-center text-[14px]`}>Abrir {path}</a>}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {visible && <CopyLinkButton path={path} />}
                    {!d.archivedAt && <PublicToggle isPublic={d.isPublic} action={setDeliverablePublic.bind(null, String(d._id))} />}
                    <ArchiveButton archived={!!d.archivedAt} action={setDeliverableArchived.bind(null, String(d._id))} confirmText="¿Archivar este documento? El link deja de funcionar." />
                  </div>
                </li>
              )
            })}
          </ul>
        )}
      </section>

      <section aria-labelledby="generar">
        <h2 id="generar" className={`${SECTION_TITLE} mb-4`}>Generar documento</h2>
        <DeliverableForm
          action={createDeliverable.bind(null, id)}
          projectName={project.name}
          sections={project.sections.map(s => ({ key: s.key, title: s.title }))}
        />
      </section>
    </div>
  )
}
