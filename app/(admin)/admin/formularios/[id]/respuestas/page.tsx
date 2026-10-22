import 'server-only'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import PageHeader from '@/components/admin/PageHeader'
import EmptyState from '@/components/admin/EmptyState'
import { CreateClientButton, ImportToProject } from '@/components/admin/ResponseActions'
import { DIVIDER, LINK, META } from '@/components/admin/styles'
import { getForm, projectOptions, responsesForForm } from '@/lib/admin/queries/forms'
import { createClientFromResponse, importResponseToProject } from '@/lib/admin/actions/forms'
import { answerToText } from '@/lib/admin/schemas/forms'
import { formatDateTime } from '@/lib/admin/dates'
import { MAP_TARGETS } from '@/lib/admin/templates/form'

export const metadata: Metadata = { title: 'Respuestas' }

const targetLabel = new Map(MAP_TARGETS.map(t => [t.value, t.label]))

export default async function ResponsesPage({ params }: PageProps<'/admin/formularios/[id]/respuestas'>) {
  const { id } = await params
  const form = await getForm(id)
  if (!form) notFound()
  const [responses, projects] = await Promise.all([responsesForForm(form._id), projectOptions()])

  return (
    <div className="flex flex-col gap-10">
      <Link href={`/admin/formularios/${id}`} className={`${META} inline-flex min-h-11 w-fit items-center underline-offset-4 hover:underline`}>← {form.title}</Link>
      <PageHeader title="Respuestas" description={`${responses.length} ${responses.length === 1 ? 'respuesta' : 'respuestas'}`} />

      {responses.length === 0 ? (
        <EmptyState title="Todavía no hay respuestas.">{form.isPublic ? 'Comparta el link del formulario.' : 'Active el link público para empezar a recibir respuestas.'}</EmptyState>
      ) : (
        <ol className="flex flex-col">
          {responses.map((r, n) => {
            const rid = String(r._id)
            const hasProjectTargets = r.fieldsSnapshot.some(f => f.mapsTo && !f.mapsTo.startsWith('cliente.'))
            return (
              <li key={rid} className="py-6" style={{ borderTop: DIVIDER }}>
                <details open={n === 0}>
                  <summary className="flex min-h-11 cursor-pointer list-none flex-col justify-center">
                    <span className="text-[15px] font-semibold text-text-primary">Respuesta del {formatDateTime(r.submittedAt)}</span>
                    <span className={META}>
                      {r.importedAt ? `Importada ${formatDateTime(r.importedAt)}` : 'Sin importar'}
                      {r.clientId ? ' · ' : ' · Sin cliente'}
                      {r.clientId && <Link href={`/admin/clientes/${r.clientId}`} className={`${LINK} inline-flex min-h-11 items-center`}>Ver cliente</Link>}
                    </span>
                  </summary>

                  <dl className="mt-4 flex flex-col gap-4">
                    {r.fieldsSnapshot.map(f => {
                      const value = answerToText(f, r.answers[f.id])
                      return (
                        <div key={f.id}>
                          <dt className={META}>
                            {f.label}
                            {f.mapsTo && <span className="text-text-muted"> · {targetLabel.get(f.mapsTo) ?? f.mapsTo}</span>}
                          </dt>
                          <dd className={`mt-0.5 whitespace-pre-line text-[15px] leading-[1.6] ${value ? 'text-text-primary' : 'text-text-muted'}`}>{value || 'Sin respuesta'}</dd>
                        </div>
                      )
                    })}
                  </dl>

                  <div className="mt-6 grid gap-6 md:grid-cols-2">
                    {hasProjectTargets && (
                      <ImportToProject
                        action={importResponseToProject.bind(null, rid)}
                        projects={projects}
                        defaultProjectId={form.projectId ? String(form.projectId) : ''}
                      />
                    )}
                    {!r.clientId && (
                      <div>
                        <CreateClientButton action={createClientFromResponse.bind(null, rid)} />
                        <p className={`${META} mt-2`}>Usa las respuestas marcadas como «Cliente → …». Si el WhatsApp ya existe, enlaza ese cliente.</p>
                      </div>
                    )}
                  </div>
                </details>
              </li>
            )
          })}
        </ol>
      )}
    </div>
  )
}
