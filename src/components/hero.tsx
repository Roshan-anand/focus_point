import { useState } from 'react'
import { ArrowDown } from 'lucide-react'

import type { Frame } from '#/data/portfolio'

export type HeroProps = {
  frames: readonly Frame[]
}

export function Hero({ frames }: HeroProps) {
  const [selected, setSelected] = useState(0)
  const frame = frames[selected]

  return (
    <div className="hero">
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
            <img src="/prints/signature.png" alt="Focus Point Photography" />
          </div>
        </div>
        <div className="hero-foot">
          <a className="scroll" href="#album">
            <ArrowDown size={18} /> Into the album
          </a>
          <div className="strip" role="group" aria-label="Select a photograph">
            {frames.map((f, i) => (
              <button
                key={f.file}
                aria-label={f.name}
                aria-pressed={selected === i}
                onClick={() => setSelected(i)}
              >
                <img src={`/prints/${f.file}.webp`} alt="" />
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="frame-caption" aria-live="polite">
        <span>0{selected + 1} / 03</span>
        {frame.name}
      </div>
    </div>
  )
}
