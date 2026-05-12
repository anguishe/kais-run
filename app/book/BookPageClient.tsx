'use client'
import { useEffect, useRef } from 'react'
import { ContactFormSection } from '@/components/sections/ContactFormSection'

export default function BookPageClient() {
  const widgetHostRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const host = widgetHostRef.current
    if (!host) return

    const existing = document.getElementById('square-widget-script')
    if (existing) existing.remove()

    const script = document.createElement('script')
    script.id = 'square-widget-script'
    script.src = 'https://square.site/appointments/buyer/widget/x06wxfzw47ogj7/LY4W4QTX4A1PF.js'
    script.async = true
    host.appendChild(script)

    return () => {
      const s = document.getElementById('square-widget-script')
      if (s) s.remove()
    }
  }, [])

  return (
    <>
      <main className="min-h-screen bg-[#0F1117] pt-24">
        <div className="max-w-4xl mx-auto px-6 pb-12 text-center">
          <p className="text-[#0A5C52] font-sans text-sm tracking-[0.25em] uppercase mb-3">
            Destin · Fort Walton Beach · Niceville
          </p>
          <h1 className="font-display text-6xl md:text-8xl text-[#F0EDE6] mb-4">
            BOOK YOUR SESSION
          </h1>
          <p className="text-[#9A9590] text-lg max-w-xl mx-auto">
            New dogs start with the Kai's Run Welcome — $35.
            Select your session type below.
          </p>
          <div className="w-16 h-px bg-[#0A5C52] mx-auto mt-6" />
        </div>

        <div
          ref={widgetHostRef}
          className="max-w-4xl mx-auto px-6 pb-24"
          style={{ minHeight: '700px', width: '100%' }}
        />
      </main>

      <ContactFormSection
        endpoint="https://formspree.io/f/mojrrvdd"
        tag="founding-20"
      />
    </>
  )
}
