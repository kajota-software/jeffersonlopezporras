import type { ReactNode } from 'react'

export default function EmptyState({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <div className="py-10">
      <p className="text-[15px] font-medium text-text-primary">{title}</p>
      {children && <div className="mt-1.5 text-[14px] leading-[1.6] text-text-muted">{children}</div>}
    </div>
  )
}
