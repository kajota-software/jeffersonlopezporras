import 'server-only'
import { requireAdmin } from '@/lib/require-admin'
import AdminNav from '@/components/admin/AdminNav'

// Todo lo que está bajo /admin exige sesión con rol admin (las Server Actions lo verifican aparte)
export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin()
  return (
    <div className="mx-auto grid max-w-[1200px] grid-cols-1 px-4 sm:px-6 md:grid-cols-[200px_1fr] md:gap-12">
      <AdminNav />
      <main className="min-w-0 pb-20 pt-4 md:pt-10">{children}</main>
    </div>
  )
}
