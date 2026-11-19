import { ArrowDown } from 'lucide-react'

import type { Frame } from '#/data/portfolio'

export type HeroProps = {
  frame: Frame
  /** Set once the opening flash has fired; the copy rises in from it. */
  revealed?: boolean
}

export function Hero({ frame, revealed = false }: HeroProps) {
  return (
    <div className={revealed ? 'hero is-revealed' : 'hero'}>
      <div key={frame.file} className={`exposure exposure-${frame.file}`}>
        <img
          src={`/prints/${frame.file}.webp`}
          alt={frame.alt}
          fetchPriority="high"
        />
      </div>
      <div className="hero-inner">
        <div className="title">
          <h1>
            Just before
            <br />
            the shutter.
          </h1>
          <div className="signature">
            <b />
            <span className="signature-text">Focus Point</span>
          </div>
        </div>
        <div className="hero-foot">
          <a className="scroll" href="#album">
            <ArrowDown size={18} /> Into the album
          </a>
        </div>
      </div>
    </div>
  )
}
