import 'server-only'
import type { Metadata } from 'next'
import Link from 'next/link'
import PageHeader from '@/components/admin/PageHeader'
import { FormCreateForm } from '@/components/admin/FormSettings'
import { META } from '@/components/admin/styles'
import { clientOptions } from '@/lib/admin/queries/clients'
import { projectOptions } from '@/lib/admin/queries/forms'

export const metadata: Metadata = { title: 'Nuevo formulario' }

export default async function NewFormPage({ searchParams }: PageProps<'/admin/formularios/nuevo'>) {
  const sp = await searchParams
  const [clients, projects] = await Promise.all([clientOptions(), projectOptions()])
  return (
    <div className="flex flex-col gap-8">
      <Link href="/admin/formularios" className={`${META} inline-flex min-h-11 w-fit items-center underline-offset-4 hover:underline`}>← Formularios</Link>
      <PageHeader title="Nuevo formulario" description="Se crea sin acceso público: lo activa cuando esté listo." />
      <FormCreateForm
        clients={clients}
        projects={projects}
        clientId={typeof sp.cliente === 'string' ? sp.cliente : ''}
        projectId={typeof sp.proyecto === 'string' ? sp.proyecto : ''}
      />
    </div>
  )
}
