import { useEffect, useState } from 'react'
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from 'motion/react'

/** Furthest the viewfinder hunts from the centre, in CSS pixels. */
const HUNT_RADIUS = 500
const HUNT_DURATION = 0.34
const HUNT_EASE: [number, number, number, number] = [0.32, 0, 0.24, 1]
const LOCK_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

function huntPoint() {
  const angle = Math.random() * Math.PI * 2
  const reach = 0.55 + Math.random() * 0.45
  return {
    x: Math.cos(angle) * Math.min(HUNT_RADIUS, window.innerWidth / 3) * reach,
    y: Math.sin(angle) * Math.min(HUNT_RADIUS, window.innerHeight / 3) * reach,
  }
}

export function Opening() {
  const reduced = useReducedMotion()
  const [gone, setGone] = useState(false)

  const blur = useMotionValue(12)
  const glassOpacity = useMotionValue(1)
  const glassScale = useMotionValue(1.04)
  const focusX = useMotionValue(0)
  const focusY = useMotionValue(0)
  const focusScale = useMotionValue(1.35)
  const focusOpacity = useMotionValue(0)
  const shutter = useMotionValue(0)

  const glassFilter = useTransform(blur, (value) => `blur(${value}px)`)
  const upperY = useTransform(shutter, (value) => `${-101 + value * 101}%`)
  const lowerY = useTransform(shutter, (value) => `${101 - value * 101}%`)

  useEffect(() => {
    if (reduced) {
      setGone(true)
      return
    }

    const controller = new AbortController()
    const halted = () => controller.signal.aborted
    const timers: ReturnType<typeof setTimeout>[] = []
    const playing: { stop: () => void }[] = []

    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        timers.push(setTimeout(resolve, ms))
      })

    const play = (animation: {
      stop: () => void
      finished: Promise<unknown>
    }) => {
      playing.push(animation)
      return animation.finished
    }

    const run = async () => {
      blur.set(12)
      glassOpacity.set(1)
      glassScale.set(1.04)
      focusX.set(0)
      focusY.set(0)
      focusScale.set(1.35)
      focusOpacity.set(0)
      shutter.set(0)

      const stops = [huntPoint(), huntPoint()]

      // The viewfinder fades in over a frame that is still soft.
      await Promise.all([
        play(animate(focusOpacity, 1, { duration: 0.24 })),
        play(animate(focusScale, 1.15, { duration: 0.6, ease: 'easeOut' })),
      ])
      if (halted()) return
      await wait(120)

      // Two blind passes: the glass hunts to a random point, settles, gives up.
      for (const stop of stops) {
        if (halted()) return
        await Promise.all([
          play(
            animate(focusX, stop.x, {
              duration: HUNT_DURATION,
              ease: HUNT_EASE,
            }),
          ),
          play(
            animate(focusY, stop.y, {
              duration: HUNT_DURATION,
              ease: HUNT_EASE,
            }),
          ),
          play(animate(focusScale, 1, { duration: 0.22, ease: 'easeOut' })),
        ])
        if (halted()) return
        await wait(140)
        if (halted()) return
        await play(animate(focusScale, 1.15, { duration: 0.16 }))
      }

      if (halted()) return

      // Third pass: back onto the portrait, and the blur finally resolves.
      await Promise.all([
        play(animate(focusX, 0, { duration: 0.5, ease: LOCK_EASE })),
        play(animate(focusY, 0, { duration: 0.5, ease: LOCK_EASE })),
        play(animate(blur, 0, { duration: 0.7, ease: LOCK_EASE })),
        play(animate(glassScale, 1, { duration: 0.9, ease: 'easeOut' })),
        play(animate(focusScale, 0.85, { duration: 0.5, ease: 'easeOut' })),
      ])
      if (halted()) return

      // Hold the resolved frame for a beat before the shutter falls.
      await Promise.all([
        play(animate(focusOpacity, 0, { duration: 0.3, ease: 'easeOut' })),
        wait(1000),
      ])
      if (halted()) return

      await play(animate(shutter, 1, { duration: 0.12, ease: 'easeIn' }))
      if (halted()) return
      await play(animate(glassOpacity, 0, { duration: 0.2, ease: 'easeOut' }))
      if (halted()) return
      await play(animate(shutter, 0, { duration: 0.18, ease: 'easeIn' }))
      if (halted()) return
      setGone(true)
    }

    void run()

    return () => {
      controller.abort()
      timers.forEach(clearTimeout)
      playing.forEach((animation) => animation.stop())
    }
  }, [
    reduced,
    blur,
    glassOpacity,
    glassScale,
    focusX,
    focusY,
    focusScale,
    focusOpacity,
    shutter,
  ])

  if (gone) return null

  return (
    <div className="opening" aria-hidden="true">
      <motion.div
        className="focus-glass"
        style={{
          filter: glassFilter,
          opacity: glassOpacity,
          scale: glassScale,
        }}
      />
      <motion.div
        className="lock"
        style={{
          x: focusX,
          y: focusY,
          scale: focusScale,
          opacity: focusOpacity,
        }}
      >
        <i />
        <i />
        <i />
        <i />
      </motion.div>
      <motion.div className="blade upper" style={{ y: upperY }} />
      <motion.div className="blade lower" style={{ y: lowerY }} />
    </div>
  )
}
