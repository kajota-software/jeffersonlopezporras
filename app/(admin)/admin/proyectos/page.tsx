import 'server-only'
import type { Metadata } from 'next'
import Link from 'next/link'
import PageHeader from '@/components/admin/PageHeader'
import ProjectList from '@/components/admin/ProjectList'
import EmptyState from '@/components/admin/EmptyState'
import { BTN_PRIMARY } from '@/components/admin/styles'
import { countProjectsByStage, listProjects } from '@/lib/admin/queries/projects'
import { ACTIVE_STAGES, PROJECT_STAGE, PROJECT_STAGES } from '@/lib/admin/constants'
import type { ProjectStage } from '@/lib/admin/constants'

export const metadata: Metadata = { title: 'Proyectos' }

export default async function ProjectsPage({ searchParams }: PageProps<'/admin/proyectos'>) {
  const sp = await searchParams
  const archived = sp.archivados === '1'
  const etapa = typeof sp.etapa === 'string' && (PROJECT_STAGES as readonly string[]).includes(sp.etapa) ? (sp.etapa as ProjectStage) : undefined
  const all = sp.todos === '1'
  const filter = archived ? undefined : etapa ?? (all ? undefined : 'activos')
  const [projects, counts] = await Promise.all([listProjects({ stage: filter, archived }), countProjectsByStage()])
  const activeCount = ACTIVE_STAGES.reduce((n, s) => n + counts[s], 0)

  const filters = [
    { href: '/admin/proyectos', label: `Activos (${activeCount})`, active: filter === 'activos' },
    ...PROJECT_STAGES.map(s => ({ href: `/admin/proyectos?etapa=${s}`, label: `${PROJECT_STAGE[s].label} (${counts[s]})`, active: etapa === s && !archived })),
    { href: '/admin/proyectos?todos=1', label: 'Todos', active: all && !etapa && !archived },
    { href: '/admin/proyectos?archivados=1', label: 'Archivados', active: archived },
  ]

  return (
    <div className="flex flex-col gap-8">
      <PageHeader title="Proyectos" actions={<Link href="/admin/proyectos/nuevo" className={BTN_PRIMARY}>Nuevo proyecto</Link>} />
      <nav aria-label="Filtrar proyectos">
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
      {projects.length === 0 ? (
        <EmptyState title="No hay proyectos con este filtro.">Los proyectos se crean desde un cliente o con «Nuevo proyecto».</EmptyState>
      ) : (
        <ProjectList rows={projects} />
      )}
    </div>
  )
}
