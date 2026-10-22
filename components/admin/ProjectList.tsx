import Link from 'next/link'
import StageText from '@/components/admin/StageText'
import ProgressBar from '@/components/admin/ProgressBar'
import { DIVIDER, META } from '@/components/admin/styles'
import { PACKAGE } from '@/lib/admin/constants'
import type { PackageKey, ProjectStage } from '@/lib/admin/constants'
import { formatDate } from '@/lib/admin/dates'

type Row = { _id: unknown; name: string; clientName: string; package: PackageKey; stage: ProjectStage; dueDate: Date | null; pct: number }

export default function ProjectList({ rows, showClient = true }: { rows: Row[]; showClient?: boolean }) {
  return (
    <ul>
      {rows.map(p => (
        <li key={String(p._id)} style={{ borderTop: DIVIDER }}>
          <Link href={`/admin/proyectos/${p._id}`} className="group grid gap-2 py-4 sm:grid-cols-[1fr_130px_160px] sm:items-center sm:gap-6">
            <span className="min-w-0">
              <span className="block truncate text-[15px] font-semibold text-text-primary group-hover:underline group-hover:underline-offset-4">{p.name}</span>
              <span className={`${META} block truncate`}>
                {[showClient && p.clientName, PACKAGE[p.package], p.dueDate && `Entrega ${formatDate(p.dueDate)}`].filter(Boolean).join(' · ')}
              </span>
            </span>
            <StageText stage={p.stage} />
            <ProgressBar pct={p.pct} label={`Avance de ${p.name}`} />
          </Link>
        </li>
      ))}
    </ul>
  )
}
