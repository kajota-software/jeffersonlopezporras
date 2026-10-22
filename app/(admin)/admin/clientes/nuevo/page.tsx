import 'server-only'
import type { Metadata } from 'next'
import Link from 'next/link'
import PageHeader from '@/components/admin/PageHeader'
import ClientForm, { EMPTY_CLIENT } from '@/components/admin/ClientForm'
import { createClient } from '@/lib/admin/actions/clients'
import { META } from '@/components/admin/styles'

export const metadata: Metadata = { title: 'Nuevo cliente' }

export default function NewClientPage() {
  return (
    <div className="flex flex-col gap-8">
      <Link href="/admin/clientes" className={`${META} inline-flex min-h-11 w-fit items-center underline-offset-4 hover:underline`}>← Clientes</Link>
      <PageHeader title="Nuevo cliente" />
      <ClientForm action={createClient} values={EMPTY_CLIENT} submitLabel="Crear cliente" />
    </div>
  )
}
