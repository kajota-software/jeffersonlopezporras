'use client'

// Guarda como PDF con el diálogo de impresión del navegador (no se generan PDFs en el servidor)
export default function PrintButton({ label = 'Imprimir o guardar como PDF' }: { label?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="no-print inline-flex min-h-11 cursor-pointer items-center rounded-lg bg-[rgba(28,18,9,0.06)] px-4 text-[14px] font-semibold text-text-primary transition-colors hover:bg-[rgba(28,18,9,0.1)]"
    >
      {label}
    </button>
  )
}
