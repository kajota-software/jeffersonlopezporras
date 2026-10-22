import 'server-only'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import PageHeader from '@/components/admin/PageHeader'
import StageSelect from '@/components/admin/StageSelect'
import ArchiveButton from '@/components/admin/ArchiveButton'
import ProgressBar from '@/components/admin/ProgressBar'
import SectionEditor from '@/components/admin/SectionEditor'
import { ProjectInfoForm } from '@/components/admin/ProjectForms'
import { BTN_SECONDARY, DIVIDER, LINK, META, SECTION_TITLE } from '@/components/admin/styles'
import { getProjectWithClient } from '@/lib/admin/queries/projects'
import { saveProjectSection, setProjectArchived, updateProjectInfo } from '@/lib/admin/actions/projects'
import { PACKAGE, PROJECT_STAGE } from '@/lib/admin/constants'
import { formatDate, formatDateTime, toDayString } from '@/lib/admin/dates'
import { DOMAIN_SECTION_KEY, progress } from '@/lib/admin/templates/project'

export async function generateMetadata({ params }: PageProps<'/admin/proyectos/[id]'>): Promise<Metadata> {
  const project = await getProjectWithClient((await params).id)
  return { title: project?.name ?? 'Proyecto' }
}

export default async function ProjectPage({ params }: PageProps<'/admin/proyectos/[id]'>) {
  const { id } = await params
  const project = await getProjectWithClient(id)
  if (!project) notFound()
  const { client } = project
  const total = progress(project.sections)

  return (
    <div className="flex flex-col gap-10">
      <Link href="/admin/proyectos" className={`${META} inline-flex min-h-11 w-fit items-center underline-offset-4 hover:underline`}>← Proyectos</Link>

      <PageHeader
        title={project.name}
        description={
          <>
            <p>
              {client ? <Link href={`/admin/clientes/${client._id}`} className={`${LINK} inline-flex min-h-11 items-center`}>{client.name}</Link> : 'Cliente eliminado'}
              {' · '}{PACKAGE[project.package]}
            </p>
            <p className={`${META} mt-1`}>
              Inicio {formatDate(project.startDate)} · Entrega estimada {formatDate(project.dueDate)}
              {project.deliveredAt && ` · Entregado ${formatDate(project.deliveredAt)}`}
              {project.archivedAt && <span style={{ color: '#9b2c1f' }}> · Archivado</span>}
            </p>
          </>
        }
        actions={
          <>
            <StageSelect projectId={id} stage={project.stage} />
            <Link href={`/admin/proyectos/${id}/documentos`} className={BTN_SECONDARY}>Documentos</Link>
            <ArchiveButton archived={!!project.archivedAt} action={setProjectArchived.bind(null, id)} confirmText="¿Archivar este proyecto? Sale de las listas, pero se conserva." />
          </>
        }
      />

      <section aria-labelledby="avance">
        <h2 id="avance" className={SECTION_TITLE}>Avance total</h2>
        <p className={`${META} mt-1`}>{total.done} de {total.total} puntos del checklist</p>
        <ProgressBar pct={total.pct} label="Avance total del proyecto" className="mt-3 max-w-[480px]" />
      </section>

      <section aria-labelledby="secciones">
        <h2 id="secciones" className={`${SECTION_TITLE} mb-2`}>Secciones</h2>
        <p className={`${META} mb-4`}>
          Cada sección se guarda por separado. «Dominio y accesos» también actualiza la ficha técnica del cliente.
        </p>
        {project.sections.map((s, i) => (
          <SectionEditor
            key={s.key}
            index={i}
            section={s}
            action={saveProjectSection.bind(null, id, s.key)}
            open={i === 0 && total.done === 0 && s.fields.every(f => !f.value)}
          />
        ))}
        <div style={{ borderTop: DIVIDER }} />
      </section>

      <div className="grid gap-10 md:grid-cols-2">
        <details>
          <summary className={`${LINK} inline-flex min-h-11 cursor-pointer items-center text-[14px]`}>Editar nombre y fechas</summary>
          <div className="mt-4">
            <ProjectInfoForm
              action={updateProjectInfo.bind(null, id)}
              values={{
                name: project.name,
                startDate: project.startDate ? toDayString(project.startDate) : '',
                dueDate: project.dueDate ? toDayString(project.dueDate) : '',
              }}
            />
          </div>
        </details>

        <details>
          <summary className={`${LINK} inline-flex min-h-11 cursor-pointer items-center text-[14px]`}>Historial de etapas ({project.stageHistory.length})</summary>
          <ol className="mt-3">
            {[...project.stageHistory].reverse().map((h, i) => (
              <li key={i} className="flex justify-between gap-4 py-2.5 text-[14px]" style={{ borderTop: DIVIDER }}>
                <span className="font-semibold" style={{ color: PROJECT_STAGE[h.stage].color }}>{PROJECT_STAGE[h.stage].label}</span>
                <span className={META}>{formatDateTime(h.at)}</span>
              </li>
            ))}
          </ol>
        </details>
      </div>

      {/* Atajo a la ficha técnica sincronizada */}
      <p className={META}>
        <Link href={`/admin/clientes/${project.clientId}?tab=ficha`} className={`${LINK} inline-flex min-h-11 items-center`}>Ver la ficha técnica del cliente</Link>
        <span className="block">Se sincroniza desde la sección «{project.sections.find(s => s.key === DOMAIN_SECTION_KEY)?.title}».</span>
      </p>
    </div>
  )
}
