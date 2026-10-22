import { createAuthClient } from 'better-auth/react'
import { adminClient } from 'better-auth/client/plugins'

// Cliente de auth para componentes del navegador (misma URL del sitio)
export const authClient = createAuthClient({
  plugins: [adminClient()],
})
