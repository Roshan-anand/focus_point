import { ArrowUpRight } from 'lucide-react'

import { INSTAGRAM_URL } from '#/data/portfolio'

export type PlateProps = {
  file: string
  caption: string
  post: string
  alt: string
  width?: number
}

export function Plate({ file, caption, post, alt, width = 512 }: PlateProps) {
  return (
    <figure className={`plate ${file}`}>
      <img
        src={`/prints/${file}.webp`}
        alt={alt}
        width={width}
        height="640"
        loading="lazy"
      />
      <figcaption>
        <span>{caption}</span>
        <a
          href={INSTAGRAM_URL + post}
          aria-label={`View the original Instagram post for ${caption}`}
        >
          <ArrowUpRight size={15} />
        </a>
      </figcaption>
    </figure>
  )
}
