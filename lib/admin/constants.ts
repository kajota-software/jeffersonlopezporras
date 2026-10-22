// Valores y etiquetas del admin. Sin dependencias de servidor: lo usan también los formularios del navegador.

// Colores de texto para estados: todos pasan 4.5:1 sobre el fondo papel
export const TONE = {
  accent: '#8b4513',
  blue: '#1d4f7a',
  green: '#1e6b52',
  muted: '#7a6045',
  red: '#9b2c1f',
} as const

export const CLIENT_STATUSES = ['lead', 'prospecto', 'cliente', 'inactivo', 'perdido'] as const
export type ClientStatus = (typeof CLIENT_STATUSES)[number]
export const CLIENT_STATUS: Record<ClientStatus, { label: string; color: string }> = {
  lead:      { label: 'Lead',      color: TONE.accent },
  prospecto: { label: 'Prospecto', color: TONE.blue },
  cliente:   { label: 'Cliente',   color: TONE.green },
  inactivo:  { label: 'Inactivo',  color: TONE.muted },
  perdido:   { label: 'Perdido',   color: TONE.red },
}

export const BUSINESS_TYPES = ['hospedaje', 'tour', 'rentacar', 'otro'] as const
export type BusinessType = (typeof BUSINESS_TYPES)[number]
export const BUSINESS_TYPE: Record<BusinessType, string> = {
  hospedaje: 'Hospedaje',
  tour: 'Tours o actividades',
  rentacar: 'Rent a car',
  otro: 'Otro',
}

export const CLIENT_SOURCES = ['diagnostico', 'formulario', 'referido', 'meta', 'organico', 'otro'] as const
export type ClientSource = (typeof CLIENT_SOURCES)[number]
export const CLIENT_SOURCE: Record<ClientSource, string> = {
  diagnostico: 'Diagnóstico',
  formulario: 'Formulario',
  referido: 'Referido',
  meta: 'Meta',
  organico: 'Orgánico',
  otro: 'Otro',
}

export const ACTIVITY_TYPES = ['nota', 'llamada', 'whatsapp', 'reunion', 'correo', 'sistema'] as const
export type ActivityType = (typeof ACTIVITY_TYPES)[number]
export const ACTIVITY_TYPE: Record<ActivityType, string> = {
  nota: 'Nota',
  llamada: 'Llamada',
  whatsapp: 'WhatsApp',
  reunion: 'Reunión',
  correo: 'Correo',
  sistema: 'Sistema',
}
// Tipos que cuentan como contacto real con el cliente (actualizan lastContactAt)
export const CONTACT_ACTIVITY_TYPES: ActivityType[] = ['llamada', 'whatsapp', 'reunion', 'correo']
// Los que se registran a mano (el tipo "sistema" lo escribe la app)
export const MANUAL_ACTIVITY_TYPES = ACTIVITY_TYPES.filter(t => t !== 'sistema')

export const PACKAGES = ['esencial', 'reserva_directa', 'gestion', 'medida'] as const
export type PackageKey = (typeof PACKAGES)[number]
export const PACKAGE: Record<PackageKey, string> = {
  esencial: 'Esencial',
  reserva_directa: 'Reserva Directa',
  gestion: 'Reserva Directa + Gestión',
  medida: 'Sistema a medida',
}

export const PROJECT_STAGES = [
  'descubrimiento', 'propuesta', 'requerimientos', 'desarrollo', 'revision', 'entregado', 'mantenimiento', 'cerrado', 'cancelado',
] as const
export type ProjectStage = (typeof PROJECT_STAGES)[number]
export const PROJECT_STAGE: Record<ProjectStage, { label: string; color: string }> = {
  descubrimiento: { label: 'Descubrimiento', color: TONE.accent },
  propuesta:      { label: 'Propuesta',      color: TONE.accent },
  requerimientos: { label: 'Requerimientos', color: TONE.blue },
  desarrollo:     { label: 'Desarrollo',     color: TONE.blue },
  revision:       { label: 'Revisión',       color: TONE.blue },
  entregado:      { label: 'Entregado',      color: TONE.green },
  mantenimiento:  { label: 'Mantenimiento',  color: TONE.green },
  cerrado:        { label: 'Cerrado',        color: TONE.muted },
  cancelado:      { label: 'Cancelado',      color: TONE.red },
}
// Etapas que cuentan como proyecto activo (Inicio y lista por defecto)
export const ACTIVE_STAGES: ProjectStage[] = ['descubrimiento', 'propuesta', 'requerimientos', 'desarrollo', 'revision', 'mantenimiento']

export const FIELD_TYPES = ['text', 'textarea', 'list', 'money', 'date'] as const
export type FieldType = (typeof FIELD_TYPES)[number]

export const DELIVERABLE_KINDS = ['resumen', 'requerimientos', 'avance', 'entrega'] as const
export type DeliverableKind = (typeof DELIVERABLE_KINDS)[number]
export const DELIVERABLE_KIND: Record<DeliverableKind, string> = {
  resumen: 'Resumen del proyecto',
  requerimientos: 'Requerimientos',
  avance: 'Informe de avance',
  entrega: 'Acta de entrega',
}

export const FORM_FIELD_TYPES = ['text', 'textarea', 'email', 'phone', 'number', 'date', 'select', 'multiselect', 'checkbox'] as const
export type FormFieldType = (typeof FORM_FIELD_TYPES)[number]
export const FORM_FIELD_TYPE: Record<FormFieldType, string> = {
  text: 'Texto corto',
  textarea: 'Texto largo',
  email: 'Email',
  phone: 'Teléfono',
  number: 'Número',
  date: 'Fecha',
  select: 'Una opción',
  multiselect: 'Varias opciones',
  checkbox: 'Casilla (sí/no)',
}
