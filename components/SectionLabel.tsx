interface Props {
  children: React.ReactNode
}

export function SectionLabel({ children }: Props) {
  return (
    <span
      className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs italic tracking-wide"
      style={{
        fontFamily: 'var(--font-lora), Georgia, serif',
        color: '#8b4513',
        background: 'rgba(139, 69, 19, 0.07)',
        border: '1.5px solid rgba(139, 69, 19, 0.25)',
        borderRadius: '4px',
      }}
    >
      {children}
    </span>
  )
}
