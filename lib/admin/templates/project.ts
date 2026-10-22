// Plantillas de proyecto (en código, no en la base). Al crear un proyecto se COPIAN al documento:
// cambiar una plantilla no altera los proyectos que ya existen.
import type { FieldType, PackageKey } from '@/lib/admin/constants'
import type { ClientTech, ProjectSection } from '@/lib/admin/collections'
import { toDayString } from '@/lib/admin/dates'

type TemplateSection = {
  key: string
  title: string
  fields: { key: string; label: string; type: FieldType }[]
  checklist: string[]
}

const f = (key: string, label: string, type: FieldType = 'textarea') => ({ key, label, type })

// Sección 9: sus campos usan las mismas claves que la ficha técnica del cliente para sincronizarse
export const DOMAIN_SECTION_KEY = 'dominio'
export const TECH_FIELD_KEYS = ['domain', 'registrar', 'domainExpiresAt', 'hosting', 'productionUrl', 'repoUrl', 'accessNotes'] as const

const BASE: TemplateSection[] = [
  {
    key: 'negocio',
    title: 'Negocio',
    fields: [f('queHace', 'Qué hace el negocio'), f('ubicacion', 'Ubicación', 'text'), f('temporadas', 'Temporadas (alta, baja)'), f('anos', 'Años operando', 'text')],
    checklist: ['Entiendo qué vende y a quién', 'Tengo la ubicación exacta', 'Conozco sus temporadas'],
  },
  {
    key: 'problema',
    title: 'Problema que soluciona / por qué quiere la web',
    fields: [f('problema', 'Problema principal hoy'), f('porQueAhora', 'Por qué quiere la web ahora'), f('intentosPrevios', 'Qué ha probado antes')],
    checklist: ['El problema está escrito con sus palabras', 'Sé qué pasaría si no hace nada'],
  },
  {
    key: 'clienteIdeal',
    title: 'Cliente ideal',
    fields: [f('quien', 'Quién es su cliente'), f('origen', 'De dónde viene (país, ciudad)'), f('idiomas', 'Idiomas que habla', 'list'), f('comoReserva', 'Cómo reserva hoy')],
    checklist: ['Perfil del cliente definido', 'Idiomas confirmados', 'Sé por qué canal reserva hoy'],
  },
  {
    key: 'oferta',
    title: 'Oferta',
    fields: [f('productos', 'Habitaciones, tours o vehículos', 'list'), f('diferenciadores', 'Qué lo hace distinto', 'list'), f('incluye', 'Qué incluye cada opción')],
    checklist: ['Lista completa de productos', 'Diferenciadores claros', 'Descripción de cada producto'],
  },
  {
    key: 'precios',
    title: 'Precios, temporadas y paquetes',
    fields: [f('precioDesde', 'Precio desde (USD)', 'money'), f('precios', 'Precios por producto y temporada'), f('paquetes', 'Paquetes o membresías', 'list'), f('politicas', 'Políticas de pago y cancelación')],
    checklist: ['Precios por temporada confirmados', 'Políticas de pago definidas', 'Políticas de cancelación definidas'],
  },
  {
    key: 'comunicacion',
    title: 'Comunicación',
    fields: [
      f('tono', 'Tono de la marca', 'text'), f('idiomasSitio', 'Idiomas del sitio', 'list'), f('whatsapp', 'WhatsApp para reservas', 'text'),
      f('redes', 'Redes sociales', 'list'), f('canales', 'Canales actuales (Booking, Airbnb, etc.)', 'list'),
    ],
    checklist: ['Tono acordado', 'Número de WhatsApp confirmado', 'Redes y canales anotados'],
  },
  {
    key: 'estructura',
    title: 'Estructura del sitio',
    fields: [f('paginas', 'Páginas', 'list'), f('secciones', 'Secciones del inicio', 'list'), f('ctaPrincipal', 'Llamado a la acción principal', 'text')],
    checklist: ['Mapa del sitio aprobado', 'CTA principal definido'],
  },
  {
    key: 'contenido',
    title: 'Contenido disponible',
    fields: [f('fotos', 'Fotos (dónde están, cuántas)'), f('textos', 'Textos'), f('logo', 'Logo', 'text'), f('resenas', 'Reseñas para mostrar')],
    checklist: ['Fotos recibidas', 'Textos recibidos', 'Logo recibido', 'Reseñas recibidas'],
  },
  {
    key: DOMAIN_SECTION_KEY,
    title: 'Dominio y accesos',
    fields: [
      f('domain', 'Dominio', 'text'), f('registrar', 'Registrador', 'text'), f('domainExpiresAt', 'Vencimiento del dominio', 'date'),
      f('hosting', 'Hosting', 'text'), f('productionUrl', 'URL en producción', 'text'), f('repoUrl', 'Repositorio', 'text'),
      f('accessNotes', 'Dónde están los accesos (nunca contraseñas)'),
    ],
    checklist: ['Dominio a nombre del cliente', 'Acceso al dominio para conectar', 'DNS apuntando al hosting'],
  },
  {
    key: 'competencia',
    title: 'Competencia y referencias',
    fields: [f('competidores', 'Competidores', 'list'), f('referencias', 'Sitios de referencia que le gustan', 'list'), f('queNo', 'Lo que no quiere')],
    checklist: ['Competencia revisada', 'Referencias recibidas'],
  },
  {
    key: 'objetivos',
    title: 'Objetivos y cómo medimos el éxito',
    fields: [f('objetivos', 'Objetivos', 'list'), f('metricas', 'Cómo sabremos que funciona', 'list')],
    checklist: ['Objetivos acordados con el cliente'],
  },
  {
    key: 'alcance',
    title: 'Alcance acordado',
    fields: [f('incluido', 'Incluido', 'list'), f('fueraDeAlcance', 'Fuera de alcance', 'list'), f('extras', 'Extras cotizados aparte', 'list')],
    checklist: ['Alcance aprobado por el cliente', 'Extras cotizados por separado'],
  },
  // La sección 13 (checklist de entrega) depende del paquete: ver DELIVERY_CHECKLIST
  {
    key: 'notas',
    title: 'Notas libres',
    fields: [],
    checklist: [],
  },
]

const ESENCIAL_DELIVERY = [
  'Sitio de una página con fotos, servicios y precios',
  'Diseño revisado en celular',
  'Ubicación con mapa y cómo llegar',
  'Botón de WhatsApp con mensaje prellenado',
  'Dominio conectado y HTTPS activo',
  'Velocidad revisada (Lighthouse móvil ≥ 90)',
  'Aprobación del cliente antes de publicar',
  'Sitio publicado',
]
const RESERVA_DELIVERY = [
  ...ESENCIAL_DELIVERY.slice(0, -2),
  'Sitio bilingüe (español e inglés)',
  'Página de detalle por habitación, tour o vehículo',
  'Formulario que califica al cliente antes de WhatsApp',
  'Mensaje de WhatsApp con fechas, personas y servicio',
  'Píxel de Meta instalado y probado',
  'Garantía de 14 días: fecha de recepción de fotos y textos anotada',
  'Inicio de los 30 días de ajustes anotado',
  ...ESENCIAL_DELIVERY.slice(-2),
]
const GESTION_DELIVERY = [
  ...RESERVA_DELIVERY.slice(0, -2),
  'Panel privado con login',
  'Calendario de reservas y disponibilidad',
  'Avisos y confirmaciones por correo',
  'Manejo de clientes',
  'Contabilidad básica',
  'Reportes automáticos',
  'Capacitación de uso del panel',
  ...RESERVA_DELIVERY.slice(-2),
]
const MEDIDA_DELIVERY = ['Alcance documentado y aprobado', 'Entregables acordados', 'Pruebas completas', 'Capacitación de uso', 'Aprobación del cliente', 'Publicado']

export const DELIVERY_CHECKLIST: Record<PackageKey, string[]> = {
  esencial: ESENCIAL_DELIVERY,
  reserva_directa: RESERVA_DELIVERY,
  gestion: GESTION_DELIVERY,
  medida: MEDIDA_DELIVERY,
}

// Secciones que se incluyen por defecto en cada tipo de documento
export const DELIVERABLE_DEFAULT_SECTIONS = {
  resumen: ['negocio', 'problema', 'clienteIdeal', 'objetivos'],
  requerimientos: ['negocio', 'problema', 'clienteIdeal', 'oferta', 'precios', 'comunicacion', 'estructura', 'contenido', 'competencia', 'objetivos', 'alcance'],
  avance: ['entrega', 'notas'],
  entrega: [DOMAIN_SECTION_KEY, 'alcance', 'entrega'],
} as const

// Copia nueva de la plantilla para un paquete; la sección de dominio arranca con la ficha técnica del cliente
export function buildSections(pkg: PackageKey, tech?: ClientTech): ProjectSection[] {
  const sections: TemplateSection[] = [
    ...BASE.slice(0, -1),
    { key: 'entrega', title: 'Checklist de entrega', fields: [], checklist: DELIVERY_CHECKLIST[pkg] },
    BASE[BASE.length - 1],
  ]
  return sections.map(s => ({
    key: s.key,
    title: s.title,
    notes: '',
    fields: s.fields.map(field => ({ ...field, value: s.key === DOMAIN_SECTION_KEY && tech ? techValue(tech, field.key) : '' })),
    checklist: s.checklist.map((label, i) => ({ id: `${s.key}-${i + 1}`, label, done: false, comment: '' })),
  }))
}

function techValue(tech: ClientTech, key: string): string {
  if (key === 'domainExpiresAt') return tech.domainExpiresAt ? toDayString(tech.domainExpiresAt) : ''
  const value = tech[key as keyof ClientTech]
  return typeof value === 'string' ? value : ''
}

// Progreso (% de checks hechos) de una sección o de todo el proyecto
export function progress(sections: Pick<ProjectSection, 'checklist'>[]) {
  const items = sections.flatMap(s => s.checklist)
  const done = items.filter(i => i.done).length
  return { done, total: items.length, pct: items.length ? Math.round((done / items.length) * 100) : 0 }
}
