import { useCallback, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'

import { AlbumSection } from '#/components/album-section'
import { FieldSection } from '#/components/field-section'
import { Hero } from '#/components/hero'
import { KeepsakeSection } from '#/components/keepsake-section'
import { Opening } from '#/components/opening'
import { PhotoShuffle } from '#/components/photo-shuffle'
import { SiteFooter } from '#/components/site-footer'
import { PORTRAIT_FRAME } from '#/data/portfolio'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  const [revealed, setRevealed] = useState(false)
  const reveal = useCallback(() => setRevealed(true), [])

  return (
    <main>
      <Opening onReveal={reveal} />
      <Hero frame={PORTRAIT_FRAME} revealed={revealed} />
      <div className="panels">
        <AlbumSection />
        <FieldSection />
        <KeepsakeSection />
        <PhotoShuffle />
        <SiteFooter />
      </div>
    </main>
  )
}
