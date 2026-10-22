// Barra fina de avance (sin bordes ni sombras), con el porcentaje en texto
export default function ProgressBar({ pct, label, className = '' }: { pct: number; label?: string; className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label ?? 'Avance'}
        className="h-1.5 flex-1 overflow-hidden rounded-full bg-[rgba(28,18,9,0.08)]"
      >
        <div className="h-full rounded-full bg-accent transition-[width] duration-300" style={{ width: `${pct}%` }} />
      </div>
      <span className="w-10 shrink-0 text-right text-[13px] font-semibold tabular-nums text-text-secondary">{pct}%</span>
    </div>
  )
}
