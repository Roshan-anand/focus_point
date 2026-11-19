import { Plate } from '#/components/plate'

export function KeepsakeSection() {
  return (
    <section className="keepsake panel panel-paper">
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
  )
}
