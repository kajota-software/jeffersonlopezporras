'use client'

import { useTransition } from 'react'
import { setProjectStage } from '@/lib/admin/actions/projects'
import { PROJECT_STAGE, PROJECT_STAGES } from '@/lib/admin/constants'
import type { ProjectStage } from '@/lib/admin/constants'

// Cambio de etapa: guarda al elegir y queda en el historial del proyecto
export default function StageSelect({ projectId, stage }: { projectId: string; stage: ProjectStage }) {
  const [pending, startTransition] = useTransition()
  return (
    <label className="flex items-center gap-2 text-[13px] text-text-muted">
      Etapa
      <select
        value={stage}
        disabled={pending}
        onChange={e => {
          const next = e.target.value as ProjectStage
          startTransition(async () => { await setProjectStage(projectId, next) })
        }}
        className="min-h-11 cursor-pointer rounded-lg bg-[rgba(28,18,9,0.05)] px-3 text-[14px] font-semibold outline-none focus:ring-2 focus:ring-accent/40"
        style={{ color: PROJECT_STAGE[stage].color }}
      >
        {PROJECT_STAGES.map(s => <option key={s} value={s}>{PROJECT_STAGE[s].label}</option>)}
      </select>
    </label>
  )
}
