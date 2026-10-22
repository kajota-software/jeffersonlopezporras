// Crea los índices de las colecciones del admin. Idempotente: se puede correr las veces que haga falta.
//   npm run create-indexes
import { client } from '@/lib/db'
import { col } from '@/lib/admin/collections'

async function main() {
  const results = await Promise.all([
    col.clients().createIndexes([
      { key: { status: 1, updatedAt: -1 }, name: 'status_updatedAt' },
      { key: { whatsapp: 1 }, name: 'whatsapp', sparse: true },
      { key: { 'tech.domainExpiresAt': 1 }, name: 'domainExpiresAt' },
      { key: { name: 'text', business: 'text' }, name: 'text_name_business', default_language: 'spanish' },
    ]),
    col.diagnostics().createIndexes([
      { key: { clientId: 1, createdAt: -1 }, name: 'clientId_createdAt' },
      { key: { createdAt: -1 }, name: 'createdAt' },
    ]),
    col.activities().createIndexes([{ key: { clientId: 1, createdAt: -1 }, name: 'clientId_createdAt' }]),
    col.followups().createIndexes([
      { key: { done: 1, dueAt: 1 }, name: 'done_dueAt' },
      { key: { clientId: 1, dueAt: 1 }, name: 'clientId_dueAt' },
    ]),
    col.rateLimits().createIndexes([
      { key: { key: 1, createdAt: -1 }, name: 'key_createdAt' },
      // Cada registro se borra solo a los 10 minutos
      { key: { createdAt: 1 }, name: 'ttl_createdAt', expireAfterSeconds: 600 },
    ]),
    col.projects().createIndexes([
      { key: { clientId: 1 }, name: 'clientId' },
      { key: { stage: 1, updatedAt: -1 }, name: 'stage_updatedAt' },
    ]),
    col.deliverables().createIndexes([
      { key: { projectId: 1, createdAt: -1 }, name: 'projectId_createdAt' },
      { key: { slug: 1 }, name: 'slug', unique: true },
    ]),
    col.forms().createIndexes([{ key: { slug: 1 }, name: 'slug', unique: true }]),
    col.formResponses().createIndexes([{ key: { formId: 1, submittedAt: -1 }, name: 'formId_submittedAt' }]),
  ])
  console.log('Índices listos:', results.flat().join(', '))
}

main()
  .catch(error => {
    console.error('No se pudieron crear los índices:', error instanceof Error ? error.message : error)
    process.exitCode = 1
  })
  .finally(() => client.close())
