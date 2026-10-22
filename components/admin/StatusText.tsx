import { CLIENT_STATUS } from '@/lib/admin/constants'
import type { ClientStatus } from '@/lib/admin/constants'

// Estado como texto de color (sin pills con borde)
export default function StatusText({ status }: { status: ClientStatus }) {
  const s = CLIENT_STATUS[status]
  return <span className="text-[13px] font-semibold" style={{ color: s.color }}>{s.label}</span>
}
