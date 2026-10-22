import type { ActionState } from '@/lib/admin/action-state'

// Mensaje general del formulario; se anuncia a lectores de pantalla
export default function FormNotice({ state }: { state: ActionState }) {
  return (
    <p role="status" aria-live="polite" className="min-h-5 text-[14px]" style={{ color: state.ok ? '#1e6b52' : '#9b2c1f' }}>
      {state.message ?? ''}
    </p>
  )
}
