import { Plate } from '#/components/plate'
import { JASMINE_FRAME } from '#/data/portfolio'

export function AlbumSection() {
  return (
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
            alt={JASMINE_FRAME.alt}
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
  )
}
