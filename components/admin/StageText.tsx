import { PROJECT_STAGE } from '@/lib/admin/constants'
import type { ProjectStage } from '@/lib/admin/constants'

export default function StageText({ stage }: { stage: ProjectStage }) {
  const s = PROJECT_STAGE[stage]
  return <span className="text-[13px] font-semibold" style={{ color: s.color }}>{s.label}</span>
}
