import 'server-only'
import type { Metadata } from 'next'
import Link from 'next/link'
import PageHeader from '@/components/admin/PageHeader'
import { ProjectCreateForm } from '@/components/admin/ProjectForms'
import { META } from '@/components/admin/styles'
import { clientOptions, getClient } from '@/lib/admin/queries/clients'
import { toDayString } from '@/lib/admin/dates'

export const metadata: Metadata = { title: 'Nuevo proyecto' }

export default async function NewProjectPage({ searchParams }: PageProps<'/admin/proyectos/nuevo'>) {
  const sp = await searchParams
  const preselected = typeof sp.cliente === 'string' ? await getClient(sp.cliente) : null
  const clients = await clientOptions()

  return (
    <div className="flex flex-col gap-8">
      <Link
        href={preselected ? `/admin/clientes/${preselected._id}?tab=proyectos` : '/admin/proyectos'}
        className={`${META} inline-flex min-h-11 w-fit items-center underline-offset-4 hover:underline`}
      >
        ← {preselected ? preselected.name : 'Proyectos'}
      </Link>
      <PageHeader title="Nuevo proyecto" description="Se crea con la plantilla del paquete: secciones, campos y checklist de entrega." />
      {clients.length === 0 ? (
        <p className={META}>Primero <Link href="/admin/clientes/nuevo" className="underline">cree un cliente</Link>.</p>
      ) : (
        <ProjectCreateForm
          clients={clients}
          clientId={preselected ? String(preselected._id) : undefined}
          defaultName={preselected ? `Sitio de ${preselected.business || preselected.name}` : ''}
          defaultStart={toDayString(new Date())}
        />
      )}
    </div>
  )
}
