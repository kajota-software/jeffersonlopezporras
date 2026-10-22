import 'server-only'
import type { Metadata } from 'next'
import Link from 'next/link'
import PageHeader from '@/components/admin/PageHeader'
import FollowupList from '@/components/admin/FollowupList'
import FollowupForm from '@/components/admin/FollowupForm'
import { DIVIDER, META, SECTION_TITLE } from '@/components/admin/styles'
import { pendingFollowups, recentDoneFollowups } from '@/lib/admin/queries/crm'
import { clientOptions } from '@/lib/admin/queries/clients'
import { formatDateTime, startOfDayCR, toDayString } from '@/lib/admin/dates'

export const metadata: Metadata = { title: 'Seguimientos' }

export default async function FollowupsPage() {
  // Todo lo pendiente (hasta un año hacia adelante) y lo último que se hizo
  const [pending, done, clients] = await Promise.all([pendingFollowups(365), recentDoneFollowups(20), clientOptions()])

  return (
    <div className="flex flex-col gap-12">
      <PageHeader title="Seguimientos" description="Recordatorios para escribir, llamar o revisar algo con un cliente." />

      <section aria-labelledby="nuevo-seguimiento">
        <h2 id="nuevo-seguimiento" className={`${SECTION_TITLE} mb-4`}>Nuevo seguimiento</h2>
        {clients.length === 0 ? (
          <p className={META}>Primero <Link href="/admin/clientes/nuevo" className="underline">cree un cliente</Link>.</p>
        ) : (
          <FollowupForm clients={clients} defaultDay={toDayString(startOfDayCR(1))} />
        )}
      </section>

      <FollowupList title="Vencidos" rows={pending.overdue} overdue empty="Ningún seguimiento vencido." />
      <FollowupList title="Hoy" rows={pending.today} empty="Nada para hoy." />
      <FollowupList title="Próximos" rows={pending.upcoming} empty="Nada programado." />

      <section>
        <h2 className={SECTION_TITLE}>Hechos recientemente</h2>
        {done.length === 0 ? (
          <p className={`${META} mt-2`}>Todavía no hay seguimientos hechos.</p>
        ) : (
          <ul className="mt-2">
            {done.map(f => (
              <li key={String(f._id)} className="py-3" style={{ borderTop: DIVIDER }}>
                <p className="text-[15px] text-text-secondary line-through">{f.title}</p>
                <p className={`${META} mt-0.5`}>
                  <Link href={`/admin/clientes/${f.clientId}`} className="underline-offset-4 hover:underline">{f.clientName}</Link> · Hecho {formatDateTime(f.doneAt)}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}
