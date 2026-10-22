import { ObjectId } from 'mongodb'

// Convierte un id que viene de la URL o de un formulario; null si no es un ObjectId válido
export function toObjectId(id: unknown): ObjectId | null {
  return typeof id === 'string' && /^[0-9a-f]{24}$/i.test(id) ? new ObjectId(id) : null
}
