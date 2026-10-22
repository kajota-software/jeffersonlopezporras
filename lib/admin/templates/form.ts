// Plantilla de formulario y destinos posibles de cada campo (mapsTo).
// mapsTo 'seccion.campo' llena el proyecto al importar; 'cliente.campo' sirve para crear el cliente.
import type { FormField } from '@/lib/admin/collections'
import { buildSections } from '@/lib/admin/templates/project'

export const CLIENT_TARGETS = [
  { value: 'cliente.name', label: 'Cliente → Nombre' },
  { value: 'cliente.business', label: 'Cliente → Negocio' },
  { value: 'cliente.whatsapp', label: 'Cliente → WhatsApp' },
  { value: 'cliente.email', label: 'Cliente → Email' },
  { value: 'cliente.location', label: 'Cliente → Ubicación' },
]

// Todos los campos de las secciones de proyecto (la plantilla base es igual en todos los paquetes)
export const PROJECT_TARGETS = buildSections('esencial').flatMap(s =>
  s.fields.map(f => ({ value: `${s.key}.${f.key}`, label: `${s.title} → ${f.label}` })),
)

export const MAP_TARGETS = [...CLIENT_TARGETS, ...PROJECT_TARGETS]

type Seed = Omit<FormField, 'id' | 'help' | 'options'> & { help?: string; options?: string[] }

const BUSINESS_INFO: Seed[] = [
  { type: 'text', label: 'Su nombre', required: true, mapsTo: 'cliente.name' },
  { type: 'text', label: 'Nombre del negocio', required: true, mapsTo: 'cliente.business' },
  { type: 'phone', label: 'WhatsApp', required: true, mapsTo: 'cliente.whatsapp', help: 'Con código de país, por ejemplo +506 8888 7777' },
  { type: 'email', label: 'Email', required: false, mapsTo: 'cliente.email' },
  { type: 'text', label: '¿Dónde está ubicado?', required: true, mapsTo: 'negocio.ubicacion' },
  { type: 'textarea', label: '¿Qué ofrece su negocio?', required: true, mapsTo: 'negocio.queHace', help: 'Cuéntelo como se lo contaría a un turista.' },
  { type: 'text', label: '¿Cuántos años tiene operando?', required: false, mapsTo: 'negocio.anos' },
  { type: 'textarea', label: '¿Cuáles son sus temporadas altas y bajas?', required: false, mapsTo: 'negocio.temporadas' },
  { type: 'textarea', label: '¿Por qué quiere una página web ahora?', required: true, mapsTo: 'problema.porQueAhora' },
  { type: 'textarea', label: '¿Quiénes son sus clientes y de dónde vienen?', required: false, mapsTo: 'clienteIdeal.quien' },
  { type: 'multiselect', label: '¿Qué idiomas hablan sus clientes?', required: false, mapsTo: 'clienteIdeal.idiomas', options: ['Español', 'Inglés', 'Francés', 'Alemán', 'Otro'] },
  { type: 'textarea', label: '¿Cómo le reservan hoy?', required: false, mapsTo: 'clienteIdeal.comoReserva', help: 'WhatsApp, Booking, Airbnb, teléfono, en persona…' },
  { type: 'textarea', label: 'Habitaciones, tours o vehículos que ofrece', required: true, mapsTo: 'oferta.productos', help: 'Uno por línea.' },
  { type: 'textarea', label: '¿Qué lo hace distinto a la competencia?', required: false, mapsTo: 'oferta.diferenciadores' },
  { type: 'textarea', label: 'Precios por temporada', required: false, mapsTo: 'precios.precios' },
  { type: 'textarea', label: 'Políticas de pago y cancelación', required: false, mapsTo: 'precios.politicas' },
  { type: 'text', label: 'Redes sociales (enlaces)', required: false, mapsTo: 'comunicacion.redes' },
  { type: 'select', label: '¿Ya tiene fotos profesionales?', required: false, mapsTo: 'contenido.fotos', options: ['Sí', 'Algunas', 'No'] },
  { type: 'select', label: '¿Ya tiene un dominio (www.sunegocio.com)?', required: false, mapsTo: null, options: ['Sí', 'No', 'No sé'] },
  { type: 'text', label: 'Si lo tiene, ¿cuál es?', required: false, mapsTo: 'dominio.domain' },
  { type: 'textarea', label: 'Páginas que le gustan como referencia', required: false, mapsTo: 'competencia.referencias', help: 'Un enlace por línea.' },
]

export const BUSINESS_INFO_TEMPLATE = {
  title: 'Información de su negocio',
  description: 'Con estas respuestas preparo su sitio. Le toma unos 10 minutos; si no sabe alguna, déjela en blanco.',
  fields: BUSINESS_INFO,
}

const shortId = () => `f${Math.random().toString(36).slice(2, 9)}`

// Campos con id propio, listos para guardar en el formulario
export const seedFields = (seeds: Seed[]): FormField[] =>
  seeds.map(s => ({ id: shortId(), help: '', options: [], ...s }))

export const newFieldId = shortId
