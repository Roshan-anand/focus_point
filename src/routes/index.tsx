import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { ArrowDown, ArrowUpRight, MapPin } from 'lucide-react'

export const Route = createFileRoute('/')({ component: Home })
const frames = ['The portrait', 'The gesture', 'The smile']
const photo = '/prints/portrait.webp'

function Home() {
  const [selected, select] = useState(0)
  return (
    <main>
      <div className="cover">
        <div className="imprint">
          <span>Focus Point Photography</span>
          <span>
            <MapPin size={14} /> Sullia, Karnataka
          </span>
        </div>
        <div className="spread">
          <div className="words">
            <h1>
              Just before
              <br />
              the shutter.
            </h1>
            <div className="signed">
              <b />
              <img src="/prints/signature.png" alt="Focus Point Photography" />
            </div>
            <p>A portrait from the Western Ghats.</p>
            <div
              className="proofs"
              role="group"
              aria-label="Choose a portrait detail"
            >
              {frames.map((name, i) => (
                <button
                  key={name}
                  aria-label={name}
                  aria-pressed={selected === i}
                  onClick={() => select(i)}
                >
                  <span className={'window crop' + i}>
                    <img src={photo} alt="" />
                  </span>
                  <small>0{i + 1}</small>
                </button>
              ))}
            </div>
          </div>
          <figure className="stack">
            <div className="backprint" aria-hidden="true">
              <img src={photo} alt="" />
            </div>
            <div className="print">
              <div key={selected} className={'window crop' + selected}>
                <img
                  fetchPriority="high"
                  src={photo}
                  alt={
                    [
                      'A smiling child in yellow rests his cheeks in his palms among dark foliage.',
                      'A closer view of hands cupping the child’s cheeks.',
                      'A close crop of the child’s smile.',
                    ][selected]
                  }
                />
              </div>
              <figcaption aria-live="polite">
                <i>{frames[selected]}</i>
                <span>0{selected + 1} / 03</span>
              </figcaption>
            </div>
          </figure>
        </div>
        <div className="edge">
          <a href="#album">
            <ArrowDown size={16} /> Into the album
          </a>
          <span>
            Portrait study <em>/</em> Sullia
          </span>
        </div>
      </div>
      <article id="album">
        <div className="albuminner">
          <figure>
            <div className="detail">
              <img
                src={photo}
                alt="Monochrome detail of the smile framed by two hands."
              />
            </div>
            <figcaption>Detail from the portrait</figcaption>
          </figure>
          <div>
            <h2>
              Two hands.
              <br />
              One grin.
            </h2>
            <p>A little moment to take home.</p>
          </div>
        </div>
      </article>
      <footer>
        <img src="/prints/signature.png" alt="Focus Point Photography" />
        <p>Weddings, modelling &amp; albums in Sullia.</p>
        <a href="https://www.instagram.com/focus_point_sullia/">
          Enquire at the studio <ArrowUpRight size={17} />
        </a>
      </footer>
    </main>
  )
}
