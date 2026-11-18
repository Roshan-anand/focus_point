import { createFileRoute } from '@tanstack/react-router'

import { AlbumSection } from '#/components/album-section'
import { FieldSection } from '#/components/field-section'
import { Hero } from '#/components/hero'
import { KeepsakeSection } from '#/components/keepsake-section'
import { Masthead } from '#/components/masthead'
import { Opening } from '#/components/opening'
import { SiteFooter } from '#/components/site-footer'
import { FRAMES } from '#/data/portfolio'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <main>
      <Opening />
      <Masthead />
      <Hero frames={FRAMES} />
      <AlbumSection />
      <FieldSection />
      <KeepsakeSection />
      <SiteFooter />
    </main>
  )
}
