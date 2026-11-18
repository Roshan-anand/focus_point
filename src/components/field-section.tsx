import { Plate } from '#/components/plate'
import { EMBRACE_FRAME } from '#/data/portfolio'

export function FieldSection() {
  return (
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
            alt={EMBRACE_FRAME.alt}
          />
        </div>
      </div>
    </section>
  )
}
