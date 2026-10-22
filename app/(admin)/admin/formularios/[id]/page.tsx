import 'server-only'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import PageHeader from '@/components/admin/PageHeader'
import FormBuilder from '@/components/admin/FormBuilder'
import ArchiveButton from '@/components/admin/ArchiveButton'
import { FormMetaForm } from '@/components/admin/FormSettings'
import { CopyLinkButton, PublicToggle } from '@/components/admin/LinkControls'
import { BTN_SECONDARY, LINK, META, SECTION_TITLE } from '@/components/admin/styles'
import { getForm, projectOptions } from '@/lib/admin/queries/forms'
import { clientOptions } from '@/lib/admin/queries/clients'
import { saveFormFields, setFormArchived, setFormPublic, updateFormMeta } from '@/lib/admin/actions/forms'

export async function generateMetadata({ params }: PageProps<'/admin/formularios/[id]'>): Promise<Metadata> {
  const form = await getForm((await params).id)
  return { title: form?.title ?? 'Formulario' }
}

export default async function FormPage({ params }: PageProps<'/admin/formularios/[id]'>) {
  const { id } = await params
  const [form, clients, projects] = await Promise.all([getForm(id), clientOptions(), projectOptions()])
  if (!form) notFound()
  const path = `/f/${form.slug}`
  const live = form.isPublic && !form.archivedAt

  return (
    <div className="flex flex-col gap-10">
      <Link href="/admin/formularios" className={`${META} inline-flex min-h-11 w-fit items-center underline-offset-4 hover:underline`}>← Formularios</Link>
      <PageHeader
        title={form.title}
        description={
          <p className={META}>
            <span className="font-semibold" style={{ color: live ? '#1e6b52' : '#7a6045' }}>
              {form.archivedAt ? 'Archivado' : form.isPublic ? 'Link activo' : 'Sin acceso público'}
            </span>
            {live && <> · <a href={path} target="_blank" rel="noopener noreferrer" className={`${LINK} inline-flex min-h-11 items-center`}>Abrir {path}</a></>}
          </p>
        }
        actions={
          <>
            <Link href={`/admin/formularios/${id}/respuestas`} className={BTN_SECONDARY}>Respuestas</Link>
            {live && <CopyLinkButton path={path} />}
            {!form.archivedAt && <PublicToggle isPublic={form.isPublic} action={setFormPublic.bind(null, id)} />}
            <ArchiveButton archived={!!form.archivedAt} action={setFormArchived.bind(null, id)} confirmText="¿Archivar este formulario? El link deja de funcionar; las respuestas se conservan." />
          </>
        }
      />

      <section aria-labelledby="preguntas">
        <h2 id="preguntas" className={`${SECTION_TITLE} mb-1`}>Preguntas</h2>
        <p className={`${META} mb-4`}>«Al importar, se guarda en» conecta cada respuesta con un campo del proyecto o del cliente.</p>
        <FormBuilder initial={form.fields} action={saveFormFields.bind(null, id)} />
      </section>

      <details>
        <summary className={`${LINK} inline-flex min-h-11 cursor-pointer items-center text-[14px]`}>Editar título, descripción, cliente y proyecto</summary>
        <div className="mt-4">
          <FormMetaForm
            action={updateFormMeta.bind(null, id)}
            values={{ title: form.title, description: form.description, clientId: form.clientId ? String(form.clientId) : '', projectId: form.projectId ? String(form.projectId) : '' }}
            clients={clients}
            projects={projects}
          />
        </div>
      </details>
    </div>
  )
}
