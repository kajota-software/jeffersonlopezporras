import { diag } from '@/lib/translations'
import type { L } from '@/lib/translations'

// Índices de las preguntas en diag.questions
export const Q = { type: 0, channel: 1, web: 2, google: 3, reply: 4, price: 5, volume: 6, goal: 7 } as const
export const TOTAL_QUESTIONS = diag.questions.length
export const OTHER_BUSINESS = 3

// Una respuesta = índice de la opción elegida
export type Answers = (number | null)[]
export type PlanKey = keyof typeof diag.plans

const PRICE_MID = [70, 200, 450, 800]
const VOLUME_MID = [6, 20, 45, 75]
const LOSS_WEB = [0.10, 0.06, 0.02]
const LOSS_GOOGLE = [0, 0.05, 0.07, 0.10]
const LOSS_REPLY = [0, 0.05, 0.10, 0.15]
const MAX_LOSS = 0.35

export function emptyAnswers(): Answers {
  return Array(TOTAL_QUESTIONS).fill(null)
}

export function estimate(a: Answers) {
  const rate = Math.min(
    LOSS_WEB[a[Q.web] ?? 0] + LOSS_GOOGLE[a[Q.google] ?? 0] + LOSS_REPLY[a[Q.reply] ?? 0],
    MAX_LOSS,
  )
  const lost = Math.max(1, Math.round(VOLUME_MID[a[Q.volume] ?? 0] * rate))
  const yearly = lost * PRICE_MID[a[Q.price] ?? 0] * 12
  return { lost, yearly }
}

export function recommendPlan(a: Answers): PlanKey {
  if (a[Q.type] === OTHER_BUSINESS) return 'medida'
  if (a[Q.goal] === 2 && a[Q.web] === 2) return 'anuncios'
  if (a[Q.web] === 0 && a[Q.volume] === 0 && a[Q.goal] === 0) return 'esencial'
  return 'reserva'
}

// Hallazgos ordenados por impacto (el peso es la tasa de pérdida que aportan)
export function findings(a: Answers): L[] {
  const f = diag.findings
  const list: { weight: number; text: L }[] = []

  if (a[Q.web] === 0) list.push({ weight: LOSS_WEB[0], text: f.noWeb })
  if (a[Q.web] === 1) list.push({ weight: LOSS_WEB[1], text: f.weakWeb })
  if (a[Q.google] === 1) list.push({ weight: LOSS_GOOGLE[1], text: f.googleLow })
  if (a[Q.google] === 2) list.push({ weight: LOSS_GOOGLE[2], text: f.googleUnknown })
  if (a[Q.google] === 3) list.push({ weight: LOSS_GOOGLE[3], text: f.googleNo })
  if ((a[Q.reply] ?? 0) > 0) list.push({ weight: LOSS_REPLY[a[Q.reply] ?? 0], text: f.slow })
  if (a[Q.channel] === 0) list.push({ weight: 0.08, text: f.platforms })
  if (a[Q.channel] === 3) list.push({ weight: 0.09, text: f.fewBookings })

  if (list.length === 0) return [f.solid]
  return list.sort((x, y) => y.weight - x.weight).slice(0, 3).map(x => x.text)
}

export const formatUSD = (n: number) => `$${n.toLocaleString('en-US')}`

export const fill = (template: string, values: Record<string, string | number>) =>
  template.replace(/\{(\w+)\}/g, (_, k) => String(values[k] ?? ''))
