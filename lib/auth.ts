// Configuración de Better Auth (solo servidor). Sin "server-only" porque también la usa scripts/create-admin.ts.
import { betterAuth } from 'better-auth'
import { mongodbAdapter } from 'better-auth/adapters/mongodb'
import { admin } from 'better-auth/plugins'
import { nextCookies } from 'better-auth/next-js'
import { client, db } from '@/lib/db'

export const auth = betterAuth({
  database: mongodbAdapter(db, { client }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 12,
    // El registro solo se abre desde el script de admin (ALLOW_SIGNUP=true)
    disableSignUp: process.env.ALLOW_SIGNUP !== 'true',
  },
  // Sin cookieCache a propósito: al leer la sesión dentro de una Server Action, Better Auth reescribe
  // esa cookie y Next refresca la página por su cuenta; con el refresh() de la acción, la pantalla
  // quedaba colgada en "Guardando…". Cuesta una consulta más por pantalla (~70 ms).
  telemetry: { enabled: false },
  // admin() agrega el campo `role` al usuario; nextCookies() siempre va de último
  plugins: [admin(), nextCookies()],
})
