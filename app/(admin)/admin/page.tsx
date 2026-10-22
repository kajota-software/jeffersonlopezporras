import 'server-only'
import type { Metadata } from 'next'
import Link from 'next/link'
import PageHeader from '@/components/admin/PageHeader'
import FollowupList from '@/components/admin/FollowupList'
import StatusText from '@/components/admin/StatusText'
import { DIVIDER, LINK, META, SECTION_TITLE } from '@/components/admin/styles'
import { pendingFollowups, recentDiagnostics } from '@/lib/admin/queries/crm'
import { recentResponses } from '@/lib/admin/queries/forms'
import { countClientsByStatus, domainsExpiring } from '@/lib/admin/queries/clients'
import { countProjectsByStage, listProjects } from '@/lib/admin/queries/projects'
import ProjectList from '@/components/admin/ProjectList'
import { ACTIVE_STAGES, CLIENT_STATUSES, PROJECT_STAGE } from '@/lib/admin/constants'
import { daysFromNow, formatDate, formatDateTime } from '@/lib/admin/dates'
import { formatPhone } from '@/lib/admin/phone'
import { diag } from '@/lib/translations'
import { requireAdmin } from '@/lib/require-admin'

export const metadata: Metadata = { title: 'Inicio' }

export default async function AdminHome() {
  const [{ user }, followups, leads, counts, domains, stageCounts, activeProjects, responses] = await Promise.all([
    requireAdmin(),
    pendingFollowups(7),
    recentDiagnostics(7),
    countClientsByStatus(),
    domainsExpiring(30),
    countProjectsByStage(),
    listProjects({ stage: 'activos' }),
    recentResponses(7),
  ])

  return (
    <div className="flex flex-col gap-14">
      <PageHeader title={`Hola, ${user.name.split(' ')[0]}`} description="Lo que necesita atención hoy." />

      <div className="flex flex-col gap-10">
        <FollowupList title="Vencidos" rows={followups.overdue} overdue empty="Ningún seguimiento vencido." />
        <FollowupList title="Hoy" rows={followups.today} empty="Nada para hoy." />
        <FollowupList title="Próximos 7 días" rows={followups.upcoming} empty="Nada programado." />
        <Link href="/admin/seguimientos" className={`${LINK} w-fit text-[14px]`}>Ver todos los seguimientos →</Link>
      </div>

      <section>
        <h2 className={SECTION_TITLE}>Proyectos activos <span className={`${META} font-normal`}>({activeProjects.length})</span></h2>
        <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-1">
          {ACTIVE_STAGES.map(s => (
            <li key={s}>
              <Link href={`/admin/proyectos?etapa=${s}`} className="inline-flex min-h-11 items-center gap-2 text-[14px]">
                <span className="font-bold tabular-nums text-text-primary">{stageCounts[s]}</span>
                <span style={{ color: PROJECT_STAGE[s].color }}>{PROJECT_STAGE[s].label}</span>
              </Link>
            </li>
          ))}
        </ul>
        {activeProjects.length > 0 && (
          <div className="mt-2">
            <ProjectList rows={activeProjects.slice(0, 5)} />
            {activeProjects.length > 5 && <Link href="/admin/proyectos" className={`${LINK} mt-3 inline-flex min-h-11 items-center text-[14px]`}>Ver todos →</Link>}
          </div>
        )}
      </section>

      <section>
        <h2 className={SECTION_TITLE}>Leads del diagnóstico <span className={`${META} font-normal`}>(últimos 7 días)</span></h2>
        {leads.length === 0 ? (
          <p className={`${META} mt-2`}>No hay leads nuevos.</p>
        ) : (
          <ul className="mt-2">
            {leads.map(d => (
              <li key={String(d._id)} className="py-3" style={{ borderTop: DIVIDER }}>
                <Link href={`/admin/clientes/${d.clientId}`} className="text-[15px] font-medium text-text-primary underline-offset-4 hover:underline">
                  {d.contact.name} · {d.contact.business}
                </Link>
                <p className={`${META} mt-0.5`}>
                  {diag.plans[d.recommendedPlan].name.es} · {formatPhone(d.contact.phone)} · {formatDateTime(d.createdAt)}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2 className={SECTION_TITLE}>Respuestas de formularios <span className={`${META} font-normal`}>(últimos 7 días)</span></h2>
        {responses.length === 0 ? (
          <p className={`${META} mt-2`}>No hay respuestas nuevas.</p>
        ) : (
          <ul className="mt-2">
            {responses.map(r => (
              <li key={String(r._id)} className="py-3" style={{ borderTop: DIVIDER }}>
                <Link href={`/admin/formularios/${r.formId}/respuestas`} className="text-[15px] font-medium text-text-primary underline-offset-4 hover:underline">{r.formTitle}</Link>
                <p className={`${META} mt-0.5`}>{formatDateTime(r.submittedAt)}{r.clientId ? '' : ' · Sin cliente'}</p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2 className={SECTION_TITLE}>Clientes por estado</h2>
        <ul className="mt-3 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-5">
          {CLIENT_STATUSES.map(s => (
            <li key={s}>
              <Link href={`/admin/clientes?estado=${s}`} className="flex min-h-11 flex-col justify-center">
                <span className="text-[1.5rem] font-bold tabular-nums text-text-primary">{counts[s]}</span>
                <StatusText status={s} />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className={SECTION_TITLE}>Dominios que vencen <span className={`${META} font-normal`}>(próximos 30 días)</span></h2>
        {domains.length === 0 ? (
          <p className={`${META} mt-2`}>Ningún dominio por vencer.</p>
        ) : (
          <ul className="mt-2">
            {domains.map(c => {
              const days = daysFromNow(c.tech.domainExpiresAt!)
              return (
                <li key={String(c._id)} className="py-3" style={{ borderTop: DIVIDER }}>
                  <Link href={`/admin/clientes/${c._id}?tab=ficha`} className="text-[15px] font-medium text-text-primary underline-offset-4 hover:underline">
                    {c.tech.domain || 'Sin dominio'} · {c.name}
                  </Link>
                  <p className={`${META} mt-0.5`} style={days < 0 ? { color: '#9b2c1f', fontWeight: 600 } : undefined}>
                    {days < 0 ? `Venció hace ${-days} días` : days === 0 ? 'Vence hoy' : `Vence en ${days} días`} ({formatDate(c.tech.domainExpiresAt)})
                  </p>
                </li>
              )
            })}
          </ul>
        )}
      </section>
    </div>
  )
}
