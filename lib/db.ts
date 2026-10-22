// Conexión a MongoDB (solo servidor). Sin "server-only" porque también la usa scripts/create-admin.ts.
import { MongoClient } from 'mongodb'

const REQUIRED = ['MONGODB_URI', 'MONGODB_USERNAME', 'MONGODB_PASSWORD'] as const

// Falla al arrancar si falta alguna variable, sin mostrar sus valores
const missing = REQUIRED.filter(key => !process.env[key])
if (missing.length) {
  throw new Error(`Faltan variables de entorno para MongoDB: ${missing.join(', ')}. Revise el archivo .env.`)
}

const DB_NAME = 'portfolio'

// En desarrollo, Next recarga módulos: el cliente se guarda en globalThis para no abrir conexiones de más
const globalForMongo = globalThis as unknown as { mongoClient?: MongoClient }

// Usuario y contraseña van en `auth`, no en la URI, para evitar problemas con caracteres especiales
export const client =
  globalForMongo.mongoClient ??
  new MongoClient(process.env.MONGODB_URI!, {
    auth: { username: process.env.MONGODB_USERNAME!, password: process.env.MONGODB_PASSWORD! },
  })

if (process.env.NODE_ENV !== 'production') globalForMongo.mongoClient = client

export const db = client.db(DB_NAME)
