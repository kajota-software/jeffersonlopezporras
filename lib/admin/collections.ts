// Tipos y acceso tipado a las colecciones del admin (conviven con user/account/session de Better Auth).
// Las interfaces no llevan _id: el driver lo agrega en las lecturas (WithId<T>).
// Sin "server-only" porque también lo usa scripts/create-indexes.ts.
import type { ObjectId } from 'mongodb'
import { db } from '@/lib/db'
import type { ActivityType, BusinessType, ClientSource, ClientStatus, DeliverableKind, FieldType, FormFieldType, PackageKey, ProjectStage } from '@/lib/admin/constants'
import type { PlanKey } from '@/lib/diagnostic'

export interface Contact {
  name: string
  role: string
  phone: string
  email: string
}

// Ficha técnica: nunca contraseñas, solo dónde están
export interface ClientTech {
  domain: string
  registrar: string
  domainExpiresAt: Date | null
  hosting: string
  productionUrl: string
  repoUrl: string
  accessNotes: string
}

export interface ClientDoc {
  name: string
  business: string
  businessType: BusinessType
  whatsapp: string          // solo dígitos, con código de país (50688887777)
  email: string
  country: string
  location: string
  contacts: Contact[]
  status: ClientStatus
  source: ClientSource
  tags: string[]
  tech: ClientTech
  notes: string
  lastContactAt: Date | null
  createdAt: Date
  updatedAt: Date
  archivedAt: Date | null
}

export interface DiagnosticDoc {
  clientId: ObjectId
  answers: (number | null)[]  // índice de la opción elegida en cada pregunta (9)
  lang: 'es' | 'en'
  estimate: { lost: number; yearly: number }
  recommendedPlan: PlanKey
  contact: { name: string; business: string; phone: string; email: string }
  createdAt: Date
}

export interface ActivityDoc {
  clientId: ObjectId
  projectId: ObjectId | null
  type: ActivityType
  body: string
  createdAt: Date
}

export interface FollowupDoc {
  clientId: ObjectId
  projectId: ObjectId | null
  title: string
  dueAt: Date
  done: boolean
  doneAt: Date | null
  createdAt: Date
}

// Envíos públicos recientes por hash de IP; se borran solos (índice TTL)
export interface RateLimitDoc {
  key: string
  createdAt: Date
}

// Sección de un proyecto: se copia desde la plantilla al crearlo (editar la plantilla no cambia proyectos viejos)
export interface ProjectField {
  key: string
  label: string
  type: FieldType
  value: string             // 'list' = una línea por elemento; 'money' = número; 'date' = YYYY-MM-DD
}
export interface ChecklistItem {
  id: string
  label: string
  done: boolean
  comment: string
}
export interface ProjectSection {
  key: string
  title: string
  notes: string
  fields: ProjectField[]
  checklist: ChecklistItem[]
}

export interface ProjectDoc {
  clientId: ObjectId
  name: string
  package: PackageKey
  stage: ProjectStage
  stageHistory: { stage: ProjectStage; at: Date }[]
  startDate: Date | null
  dueDate: Date | null
  deliveredAt: Date | null
  sections: ProjectSection[]
  createdAt: Date
  updatedAt: Date
  archivedAt: Date | null
}

// Documento por etapa: copia congelada de secciones, con link público /d/[slug]
export interface DeliverableDoc {
  projectId: ObjectId
  clientId: ObjectId
  kind: DeliverableKind
  title: string
  version: number
  intro: string
  snapshot: { sections: ProjectSection[]; projectName: string; clientName: string; business: string; package: PackageKey }
  slug: string
  isPublic: boolean
  createdAt: Date
  archivedAt: Date | null
}

// Formularios dinámicos con link público /f/[slug]
export interface FormField {
  id: string
  type: FormFieldType
  label: string
  help: string
  required: boolean
  options: string[]          // select y multiselect
  mapsTo: string | null      // 'seccion.campo' del proyecto o 'cliente.campo'
}

export interface FormDoc {
  title: string
  description: string
  slug: string
  isPublic: boolean
  clientId: ObjectId | null
  projectId: ObjectId | null
  fields: FormField[]
  createdAt: Date
  updatedAt: Date
  archivedAt: Date | null
}

export type FormAnswer = string | string[] | boolean

export interface FormResponseDoc {
  formId: ObjectId
  fieldsSnapshot: FormField[]           // los campos tal como estaban al responder
  answers: Record<string, FormAnswer>
  clientId: ObjectId | null
  submittedAt: Date
  importedAt: Date | null
}

export const col = {
  clients: () => db.collection<ClientDoc>('clients'),
  diagnostics: () => db.collection<DiagnosticDoc>('diagnostics'),
  activities: () => db.collection<ActivityDoc>('activities'),
  followups: () => db.collection<FollowupDoc>('followups'),
  rateLimits: () => db.collection<RateLimitDoc>('rateLimits'),
  projects: () => db.collection<ProjectDoc>('projects'),
  deliverables: () => db.collection<DeliverableDoc>('deliverables'),
  forms: () => db.collection<FormDoc>('forms'),
  formResponses: () => db.collection<FormResponseDoc>('formResponses'),
}
