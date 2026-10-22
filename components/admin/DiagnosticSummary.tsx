import { diag } from '@/lib/translations'
import { formatDateTime } from '@/lib/admin/dates'
import { DIVIDER, META } from '@/components/admin/styles'
import type { DiagnosticDoc } from '@/lib/admin/collections'

const usd = (n: number) => `$${n.toLocaleString('en-US')}`

// Respuestas del diagnóstico tal cual las eligió el visitante, con el texto de cada pregunta
export default function DiagnosticSummary({ d }: { d: DiagnosticDoc }) {
  return (
    <details className="py-4" style={{ borderTop: DIVIDER }}>
      <summary className="flex min-h-11 cursor-pointer list-none flex-col justify-center">
        <span className="text-[15px] font-medium text-text-primary">Plan recomendado: {diag.plans[d.recommendedPlan].name.es}</span>
        <span className={META}>
          {formatDateTime(d.createdAt)}
          {d.estimate.lost > 0 && ` · ~${d.estimate.lost} reservas/mes perdidas (~${usd(d.estimate.yearly)}/año)`}
          {d.lang === 'en' && ' · en inglés'}
        </span>
      </summary>
      <dl className="mt-3 flex flex-col gap-3">
        {diag.questions.map((q, i) => (
          <div key={i}>
            <dt className={META}>{q.q.es}</dt>
            <dd className="text-[15px] text-text-primary">{d.answers[i] === null ? '—' : q.options[d.answers[i]!].es}</dd>
          </div>
        ))}
      </dl>
    </details>
  )
}
