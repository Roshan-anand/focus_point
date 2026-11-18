import { ArrowUpRight, LocateFixed } from 'lucide-react'

import { STUDIO_INSTAGRAM_URL } from '#/data/portfolio'

export function SiteFooter() {
  return (
    <footer>
      <LocateFixed size={23} strokeWidth={1} />
      <h2>Let’s make a portrait.</h2>
      <a href={STUDIO_INSTAGRAM_URL}>
        Enquire at the studio <ArrowUpRight size={18} />
      </a>
      <div className="colophon">
        <img src="/prints/signature.png" alt="Focus Point Photography" />
        <span>
          Weddings, modelling &amp; albums
          <br />
          Sullia, Karnataka
        </span>
      </div>
    </footer>
  )
}
