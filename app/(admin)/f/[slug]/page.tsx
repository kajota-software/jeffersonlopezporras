import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import PublicForm from '@/components/forms/PublicForm'
import { publicForm } from '@/lib/admin/queries/forms'
import { submitForm } from '@/lib/admin/actions/public/forms'

// Formulario público. Sin requireAdmin: el acceso lo controla isPublic (y archivedAt).
export async function generateMetadata({ params }: PageProps<'/f/[slug]'>): Promise<Metadata> {
  const form = await publicForm((await params).slug)
  return { title: form?.title ?? 'Formulario' }
}

export default async function PublicFormPage({ params }: PageProps<'/f/[slug]'>) {
  const { slug } = await params
  const form = await publicForm(slug)
  if (!form) notFound()

  return (
    <main className="mx-auto max-w-[640px] px-5 py-10 md:py-16">
      <Image src="/brand/logo-jefferson-lopez.svg" alt="Jefferson López" width={737} height={163} className="h-5 w-auto" priority />
      <h1 className="mt-10 text-[2rem] font-bold leading-tight tracking-tight text-text-primary">{form.title}</h1>
      {form.description && <p className="mt-4 whitespace-pre-line text-[1.05rem] leading-[1.7] text-text-secondary">{form.description}</p>}
      <p className="mt-3 text-[14px] text-text-muted">Las preguntas con * son obligatorias.</p>
      <div className="mt-10">
        <PublicForm fields={form.fields} action={submitForm.bind(null, slug)} />
      </div>
    </main>
  )
}
