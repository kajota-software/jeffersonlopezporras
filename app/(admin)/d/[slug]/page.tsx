import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import PrintButton from '@/components/public/PrintButton'
import SnapshotSections from '@/components/public/SnapshotSections'
import { publicDeliverable } from '@/lib/admin/queries/projects'
import { DELIVERABLE_KIND, PACKAGE } from '@/lib/admin/constants'
import { formatDate } from '@/lib/admin/dates'

// Documento público de un proyecto. Sin requireAdmin: el acceso lo controla isPublic (y archivedAt).
export async function generateMetadata({ params }: PageProps<'/d/[slug]'>): Promise<Metadata> {
  const doc = await publicDeliverable((await params).slug)
  return { title: doc?.title ?? 'Documento' }
}

export default async function DeliverablePublicPage({ params }: PageProps<'/d/[slug]'>) {
  const doc = await publicDeliverable((await params).slug)
  if (!doc) notFound()
  const { snapshot } = doc

  return (
    <main className="mx-auto max-w-[760px] px-6 py-12 md:py-16 print:max-w-none print:px-0 print:py-0">
      <div className="flex items-center justify-between gap-4">
        <Image src="/brand/logo-jefferson-lopez.svg" alt="Jefferson López" width={737} height={163} className="h-5 w-auto" priority />
        <PrintButton />
      </div>

      <header className="mt-12">
        <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-accent">
          {DELIVERABLE_KIND[doc.kind]} · Versión {doc.version}
        </p>
        <h1 className="mt-3 text-[2rem] font-bold leading-tight tracking-tight text-text-primary">{doc.title}</h1>
        <p className="mt-3 text-[15px] text-text-secondary">
          {[snapshot.business || snapshot.clientName, snapshot.projectName, PACKAGE[snapshot.package]].filter(Boolean).join(' · ')}
        </p>
        <p className="mt-1 text-[13px] text-text-muted">Fecha: {formatDate(doc.createdAt)}</p>
      </header>

      {doc.intro && <p className="mt-8 whitespace-pre-line text-[1.05rem] leading-[1.75] text-text-primary">{doc.intro}</p>}

      <div className="mt-10">
        <SnapshotSections sections={snapshot.sections} />
      </div>

      <footer className="mt-10 pt-6 text-[13px] text-text-muted" style={{ borderTop: '1px solid rgba(28,18,9,0.12)' }}>
        Jefferson López · jeffersonlopezporras.com
      </footer>
    </main>
  )
}
