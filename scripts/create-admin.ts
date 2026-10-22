// Crea el usuario administrador. Uso:
//   npm run create-admin -- <email> <contraseña> "<nombre>"
// Usa las mismas variables de .env que la app (lib/db.ts) y cierra la conexión al terminar.
import { auth } from '@/lib/auth'
import { client, db } from '@/lib/db'

async function main() {
  const [email, password, ...nameParts] = process.argv.slice(2)
  const name = nameParts.join(' ').trim()

  if (!email || !password || !name) {
    console.error('Uso: npm run create-admin -- <email> <contraseña> "<nombre>"')
    process.exitCode = 1
    return
  }
  if (password.length < 12) {
    console.error('La contraseña debe tener al menos 12 caracteres.')
    process.exitCode = 1
    return
  }

  const { user } = await auth.api.signUpEmail({ body: { email, password, name } })

  // El plugin admin() agrega el campo `role`; se asigna directo en la colección `user`
  const result = await db.collection('user').updateOne({ email: user.email }, { $set: { role: 'admin' } })
  if (result.matchedCount !== 1) throw new Error('El usuario se creó, pero no se pudo asignar el rol admin.')

  console.log(`Administrador creado: ${user.email}`)
}

main()
  .catch(error => {
    // Sin imprimir la contraseña ni variables de entorno
    console.error('No se pudo crear el administrador:', error instanceof Error ? error.message : error)
    process.exitCode = 1
  })
  .finally(() => client.close())
