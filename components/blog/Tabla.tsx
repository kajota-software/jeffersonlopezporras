// Tabla para artículos: solo divisores finos. En móvil, cada fila se apila como un bloque.
export default function Tabla({ head, rows, caption }: { head: string[]; rows: string[][]; caption?: string }) {
  const [, ...valueHeads] = head

  return (
    <figure className="my-10">
      {/* Móvil */}
      <ul className="md:hidden" style={{ borderTop: '1px solid rgba(28,18,9,0.22)' }}>
        {rows.map(([label, ...values], i) => (
          <li key={i} className="py-4" style={{ borderBottom: '1px solid rgba(28,18,9,0.09)' }}>
            <p className="text-[15px] font-semibold leading-snug text-text-primary">{label}</p>
            <dl className="mt-2 grid grid-cols-3 gap-2">
              {values.map((v, j) => (
                <div key={j}>
                  <dt className="text-[10px] font-semibold uppercase tracking-[0.06em]" style={{ color: '#7a6045' }}>{valueHeads[j]}</dt>
                  <dd className="mt-0.5 text-[15px] tabular-nums" style={{ color: '#4a3520' }}>{v}</dd>
                </div>
              ))}
            </dl>
          </li>
        ))}
      </ul>

      {/* Escritorio */}
      <table className="hidden w-full border-collapse text-left text-[15px] md:table">
        <thead>
          <tr style={{ borderBottom: '1px solid rgba(28,18,9,0.22)' }}>
            {head.map(h => (
              <th key={h} scope="col" className="py-3 pr-4 text-[12px] font-semibold uppercase tracking-[0.06em]" style={{ color: '#7a6045' }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} style={{ borderBottom: '1px solid rgba(28,18,9,0.09)' }}>
              {row.map((cell, j) => (
                <td key={j} className={`py-3 pr-4 tabular-nums ${j === 0 ? 'text-text-primary' : ''}`} style={j === 0 ? undefined : { color: '#4a3520' }}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {caption && <figcaption className="mt-3 text-[13px] leading-[1.6]" style={{ color: '#7a6045' }}>{caption}</figcaption>}
    </figure>
  )
}
