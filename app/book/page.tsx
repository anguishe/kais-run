import type { Metadata } from 'next'
import BookPageClient from './BookPageClient'

export const metadata: Metadata = {
  other: { googlebot: 'noindex, nofollow' },
}

export default function BookPage() {
  return <BookPageClient />
}
