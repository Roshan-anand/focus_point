import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { ArrowDown, ArrowUpRight, LocateFixed } from 'lucide-react'

export const Route = createFileRoute('/')({ component: Home })
const instagram = 'https://www.instagram.com/'
const frames = [
  {
    name: 'The portrait',
    file: 'portrait',
    alt: 'A boy rests his smiling face in his palms in the shade.',
  },
  {
    name: 'The jasmine',
    file: 'jasmine',
    alt: 'A bride in ivory, wearing a jasmine garland, beneath the trees.',
  },
  {
    name: 'The embrace',
    file: 'meadow',
    alt: 'A couple holding each other in the long grass.',
  },
]

function Plate({
  file,
  caption,
  post,
  alt,
  width = 512,
}: {
  file: string
  caption: string
  post: string
  alt: string
  width?: number
}) {
  return (
    <figure className={'plate ' + file}>
      <img
        src={'/prints/' + file + '.webp'}
        alt={alt}
        width={width}
        height="640"
        loading="lazy"
      />
      <figcaption>
        <span>{caption}</span>
        <a
          href={instagram + post}
          aria-label={'View the original Instagram post for ' + caption}
        >
          <ArrowUpRight size={15} />
        </a>
      </figcaption>
    </figure>
  )
}

function Home() {
  const [selected, select] = useState(0)
  const frame = frames[selected]
  return (
    <main>
      <div className="opening" aria-hidden="true">
        <div className="focus-glass" />
        <div className="lock">
          <i />
          <i />
          <i />
          <i />
        </div>
        <div className="blade upper" />
        <div className="blade lower" />
      </div>
      <header className="mast">
        <span>Focus Point Photography</span>
        <span>Sullia, Karnataka</span>
      </header>
      <div className="hero">
        <div key={frame.file} className={'exposure exposure-' + frame.file}>
          <img
            src={'/prints/' + frame.file + '.webp'}
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
            <div
              className="strip"
              role="group"
              aria-label="Select a photograph"
            >
              {frames.map((f, i) => (
                <button
                  key={f.file}
                  aria-label={f.name}
                  aria-pressed={selected === i}
                  onClick={() => select(i)}
                >
                  <img src={'/prints/' + f.file + '.webp'} alt="" />
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
      <article id="album">
        <div className="sheet">
          <div className="heading">
            <h2>
              A thread
              <br />
              of jasmine.
            </h2>
            <p>
              Ivory against the green.
              <br />A smile between poses.
            </p>
          </div>
          <div className="sequence">
            <Plate
              file="jasmine"
              caption="Beneath the trees"
              post="suji_bhandary/p/DJ3YCPvzMZh/"
              alt={frames[1].alt}
            />
            <Plate
              file="smile"
              caption="The glance"
              post="suji_bhandary/p/DJ3XwFRTWZr/"
              alt="The bride looks down and smiles, touching the flowers at her shoulder."
            />
            <Plate
              file="garland"
              caption="The whole frame"
              post="suji_bhandary/p/DJ3XilCTdtI/"
              alt="Full-length portrait with an ivory sari, a long garland and terracotta pots."
            />
          </div>
        </div>
      </article>
      <section className="field">
        <div className="sheet">
          <div className="pair">
            <div className="field-first">
              <h2>
                A little
                <br />
                closer.
              </h2>
              <Plate
                file="path"
                width={360}
                caption="Along the path"
                post="focus_point_sullia/reel/C3kt_Nfrx6-/"
                alt="A couple in white walk hand in hand on a shaded path."
              />
            </div>
            <Plate
              file="meadow"
              caption="In the long grass"
              post="focus_point_sullia/p/DA5gnUTyHs5/"
              alt={frames[2].alt}
            />
          </div>
        </div>
      </section>
      <section className="keepsake">
        <div className="sheet">
          <div className="mount">
            <Plate
              file="framed"
              caption="A finished print, Sullia"
              post="focus_point_sullia/p/DfUrFwKh91D/"
              alt="Three people in the studio holding a finished framed piece."
            />
            <div>
              <h2>
                In your <br />
                hands.
              </h2>
              <p>The photograph leaves the studio.</p>
            </div>
          </div>
        </div>
      </section>
      <footer>
        <LocateFixed size={23} strokeWidth={1} />
        <h2>Let’s make a portrait.</h2>
        <a href={instagram + 'focus_point_sullia/'}>
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
    </main>
  )
}
