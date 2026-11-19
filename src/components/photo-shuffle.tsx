import { memo, useCallback, useEffect, useRef, useState } from 'react'
import type { Ref } from 'react'
import { RotateCcw } from 'lucide-react'
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from 'motion/react'

export type ShufflePhoto = {
  id: string
  initialIndex: number
  src: string
  alt: string
  initRotate: number
  initX: number
  initY: number
}

const RAW_PHOTOS = [
  {
    id: 'bride-laugh',
    src: '/story/bride-laugh.webp',
    alt: 'Bride laughing during an unposed moment in the courtyard',
  },
  {
    id: 'portrait-lamp',
    src: '/story/portrait-lamp.webp',
    alt: 'Portrait illuminated by warm ambient lantern light',
  },
  {
    id: 'child-krishna',
    src: '/story/child-krishna.webp',
    alt: 'Young child in traditional attire by the temple steps',
  },
  {
    id: 'couple-walk',
    src: '/story/couple-walk.webp',
    alt: 'Couple walking along the hillside crossing',
  },
  {
    id: 'bride-green',
    src: '/story/bride-green.webp',
    alt: 'Bride against deep emerald foliage in the Western Ghats',
  },
  {
    id: 'groom-chair',
    src: '/story/groom-chair.webp',
    alt: 'Groom resting on the studio verandah in the shade',
  },
  {
    id: 'child-bath',
    src: '/story/child-bath.webp',
    alt: 'Child playing in the morning courtyard sunlight',
  },
  {
    id: 'couple-ivory',
    src: '/story/couple-ivory.webp',
    alt: 'Couple holding hands framed by an overarching forest canopy',
  },
  {
    id: 'child-grass',
    src: '/story/child-grass.webp',
    alt: 'Child running through meadow grasses in Sampaje',
  },
  {
    id: 'smile',
    src: '/prints/smile.webp',
    alt: 'Candid warm portrait smile in the studio',
  },
  {
    id: 'jasmine',
    src: '/prints/jasmine.webp',
    alt: 'Bride adjusting fresh jasmine garland',
  },
  {
    id: 'print-handover',
    src: '/story/print-handover.webp',
    alt: 'Hands holding a freshly bound photography album',
  },
] as const

type ScatterProfile = {
  horizontalSpread: number
  verticalSpread: number
  verticalJitter: number
}

const MOBILE_LAYOUT_MAX = 680
const NARROW_LAYOUT_MAX = 700

const DEFAULT_SCATTER: ScatterProfile = {
  horizontalSpread: 1,
  verticalSpread: 1,
  verticalJitter: 0,
}

const MOBILE_SCATTER: ScatterProfile = {
  horizontalSpread: 1,
  verticalSpread: 1.08,
  verticalJitter: 56,
}

const NARROW_SCATTER: ScatterProfile = {
  horizontalSpread: 1.18,
  verticalSpread: 1,
  verticalJitter: 0,
}

function getScatterProfile(width?: number): ScatterProfile {
  if (width === undefined) return DEFAULT_SCATTER
  if (width <= MOBILE_LAYOUT_MAX) return MOBILE_SCATTER
  if (width <= NARROW_LAYOUT_MAX) return NARROW_SCATTER
  return DEFAULT_SCATTER
}

/** Deterministic PRNG for SSR-friendly initial render */
function seededRandom(seed: number) {
  let s = seed % 2147483647
  if (s <= 0) s += 2147483646
  return () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
}

/** Generates an organic, randomized tabletop scatter for all photographs */
function createRandomScatter(
  rng: () => number = Math.random,
  profile: ScatterProfile = DEFAULT_SCATTER,
): ShufflePhoto[] {
  // Shuffle photo order so different photos sit on top each time
  const shuffled = [...RAW_PHOTOS].sort(() => rng() - 0.5)

  return shuffled.map((photo, i) => {
    if (i === 0) {
      // Front photograph, kept near the centre but still allowed to drift
      const extraY =
        profile.verticalJitter > 0 ? (rng() - 0.5) * profile.verticalJitter : 0

      return {
        ...photo,
        initialIndex: 0,
        initX: Math.round((rng() - 0.5) * 44 * profile.horizontalSpread),
        initY: Math.round((rng() - 0.5) * 28 + extraY),
        initRotate: Math.round((rng() - 0.5) * 16 * 10) / 10,
      }
    }

    // Underlying photographs fan radially around the center with natural jitter
    const totalOuter = shuffled.length - 1
    const baseAngle = (2 * Math.PI * (i - 1)) / totalOuter
    const jitter = (rng() - 0.5) * 0.55
    const angle = baseAngle + jitter
    const radius = 72 + rng() * 128

    const x = Math.round(
      radius * Math.cos(angle) * 1.25 * profile.horizontalSpread,
    )
    const y = Math.round(
      radius * Math.sin(angle) * 0.62 * profile.verticalSpread +
        35 +
        (rng() - 0.5) * profile.verticalJitter,
    )
    const rot = Math.round((rng() - 0.5) * 28 * 10) / 10

    return {
      ...photo,
      initialIndex: i,
      initX: x,
      initY: y,
      initRotate: rot,
    }
  })
}

type DraggableCardProps = {
  card: ShufflePhoto
  zIndex: number
  reducedMotion: boolean | null
  onDismiss: (id: string) => void
  onBringToFront: (id: string) => void
  cardRef?: Ref<HTMLDivElement>
}

const DraggableCard = memo(function DraggableCard({
  card,
  zIndex,
  reducedMotion,
  onDismiss,
  onBringToFront,
  cardRef,
}: DraggableCardProps) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const opacity = useMotionValue(reducedMotion ? 1 : 0)
  const isDismissingRef = useRef(false)

  // Dynamic rotation tilts slightly as card is dragged left/right
  const rotate = useTransform(
    x,
    [-300, 300],
    [card.initRotate - 14, card.initRotate + 14],
  )

  // Staggered entrance animation runs strictly ONCE on mount
  useEffect(() => {
    if (reducedMotion) {
      x.set(0)
      y.set(0)
      opacity.set(1)
      return
    }

    isDismissingRef.current = false
    x.set(0)
    y.set(34)
    opacity.set(0)

    const timer = setTimeout(() => {
      animate(y, 0, {
        type: 'spring',
        stiffness: 340,
        damping: 24,
      })
      animate(opacity, 1, {
        duration: 0.28,
        ease: 'easeOut',
      })
    }, card.initialIndex * 32)

    return () => clearTimeout(timer)
  }, [card.initialIndex, opacity, reducedMotion, x, y])

  const dismissCard = useCallback(
    (dirX: number, velY: number = 0, dirY: number = 0) => {
      if (isDismissingRef.current) return
      isDismissingRef.current = true

      const flyDistX =
        typeof window !== 'undefined' ? window.innerWidth * 1.15 : 1200
      const flyDistY =
        typeof window !== 'undefined' ? window.innerHeight * 0.9 : 900

      const targetX = x.get() + dirX * flyDistX
      const targetY =
        y.get() + (velY !== 0 ? velY * 0.45 : dirY * (flyDistY * 0.5))

      animate(x, targetX, { duration: 0.42, ease: [0.16, 1, 0.3, 1] })
      animate(y, targetY, { duration: 0.42, ease: [0.16, 1, 0.3, 1] })
      animate(opacity, 0, {
        duration: 0.35,
        ease: 'easeOut',
        onComplete: () => {
          onDismiss(card.id)
        },
      })
    },
    [card.id, onDismiss, opacity, x, y],
  )

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: {
      offset: { x: number; y: number }
      velocity: { x: number; y: number }
    },
  ) => {
    if (isDismissingRef.current) return

    const offsetX = info.offset.x
    const offsetY = info.offset.y
    const velX = info.velocity.x
    const velY = info.velocity.y

    const THRESHOLD = 110
    const VEL_THRESHOLD = 340

    const isFlickX = Math.abs(velX) > VEL_THRESHOLD
    const isFlickY = Math.abs(velY) > VEL_THRESHOLD
    const isFarX = Math.abs(offsetX) > THRESHOLD
    const isFarY = Math.abs(offsetY) > THRESHOLD

    if (isFlickX || isFlickY || isFarX || isFarY) {
      const dirX = velX !== 0 ? Math.sign(velX) : Math.sign(offsetX || 1)
      const dirY = velY !== 0 ? Math.sign(velY) : Math.sign(offsetY || 0)
      dismissCard(dirX, velY, dirY)
    } else {
      // Snappy physics spring back to resting slot
      animate(x, 0, { type: 'spring', stiffness: 480, damping: 28 })
      animate(y, 0, { type: 'spring', stiffness: 480, damping: 28 })
    }
  }

  return (
    <motion.div
      ref={cardRef}
      tabIndex={0}
      role="button"
      aria-label={`${card.alt}. Drag or flick off screen to dismiss.`}
      className="shuffle-card"
      suppressHydrationWarning
      style={{
        left: `calc(var(--scatter-scale) * ${card.initX}px)`,
        top: `calc(var(--scatter-scale) * ${card.initY}px)`,
        x,
        y,
        rotate: reducedMotion ? card.initRotate : rotate,
        opacity,
        zIndex,
        touchAction: 'none',
      }}
      drag
      dragElastic={0.88}
      onDragEnd={handleDragEnd}
      onPointerDown={() => onBringToFront(card.id)}
      whileDrag={{
        scale: 1.05,
        cursor: 'grabbing',
        zIndex: 9999,
      }}
      whileHover={{
        scale: 1.025,
        cursor: 'grab',
      }}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight' || e.key === 'Delete') {
          e.preventDefault()
          dismissCard(1, -100)
        } else if (e.key === 'ArrowLeft' || e.key === 'Backspace') {
          e.preventDefault()
          dismissCard(-1, -100)
        }
      }}
    >
      <div className="shuffle-card-inner">
        <div className="shuffle-photo-wrap">
          <img
            src={card.src}
            alt={card.alt}
            draggable={false}
            className="shuffle-photo"
          />
        </div>
      </div>
    </motion.div>
  )
})

export function PhotoShuffle() {
  const reducedMotion = useReducedMotion()
  const [deckKey, setDeckKey] = useState(0)
  const [cards, setCards] = useState<ShufflePhoto[]>(() =>
    createRandomScatter(seededRandom(42)),
  )
  const [zMap, setZMap] = useState<Record<string, number>>(() => {
    const initialDeck = createRandomScatter(seededRandom(42))
    const initial: Record<string, number> = {}
    initialDeck.forEach((c) => {
      initial[c.id] = initialDeck.length - c.initialIndex
    })
    return initial
  })

  const topZRef = useRef(RAW_PHOTOS.length + 10)
  const resetRef = useRef<HTMLButtonElement>(null)
  const firstCardRef = useRef<HTMLDivElement>(null)
  const prevCountRef = useRef<number>(RAW_PHOTOS.length)
  const mountedRef = useRef(false)

  const isEmpty = cards.length === 0

  const handleDismiss = useCallback((id: string) => {
    setCards((prev) => prev.filter((c) => c.id !== id))
  }, [])

  const handleBringToFront = useCallback((id: string) => {
    topZRef.current += 1
    const nextZ = topZRef.current
    setZMap((prev) => ({ ...prev, [id]: nextZ }))
  }, [])

  const handleReset = useCallback(() => {
    topZRef.current = RAW_PHOTOS.length + 10
    const viewportWidth =
      typeof window === 'undefined' ? undefined : window.innerWidth
    const newDeck = createRandomScatter(
      Math.random,
      getScatterProfile(viewportWidth),
    )
    const resetZ: Record<string, number> = {}
    newDeck.forEach((c) => {
      resetZ[c.id] = newDeck.length - c.initialIndex
    })
    setZMap(resetZ)
    setCards(newDeck)
    setDeckKey((k) => k + 1)
  }, [])

  // Randomize on initial client mount so each visit has a distinct, fresh scatter
  useEffect(() => {
    handleReset()
  }, [handleReset])

  // When the last print leaves, hand focus to the only remaining control
  useEffect(() => {
    if (prevCountRef.current > 0 && cards.length === 0) {
      resetRef.current?.focus()
    }
    prevCountRef.current = cards.length
  }, [cards.length])

  // After a reshuffle, send focus back to the top photograph
  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true
      return
    }
    const timer = window.setTimeout(() => firstCardRef.current?.focus(), 60)
    return () => window.clearTimeout(timer)
  }, [deckKey])

  return (
    <section
      className="shuffle-section"
      aria-label="The unposed roll — an interactive pile of photographs"
    >
      <div className="shuffle-container">
        <header className="shuffle-header">
          <span className="shuffle-kicker">The unposed roll</span>
          <h2 className="shuffle-heading">
            THE MOMENTS
            <br />
            BETWEEN POSES.
          </h2>
          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={isEmpty ? 'empty' : 'active'}
              className="shuffle-subtext"
              initial={reducedMotion ? false : { opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -4 }}
              transition={
                reducedMotion
                  ? { duration: 0 }
                  : { duration: 0.22, ease: 'easeOut' }
              }
            >
              {isEmpty
                ? 'That’s the whole roll — deal it again.'
                : 'Drag a print off the pile — the ones underneath are just as honest.'}
            </motion.p>
          </AnimatePresence>
        </header>

        <div className="shuffle-stage" data-empty={isEmpty}>
          <div className="shuffle-center-anchor">
            {cards.map((card) => (
              <DraggableCard
                key={`${deckKey}-${card.id}`}
                card={card}
                zIndex={zMap[card.id] ?? cards.length - card.initialIndex}
                reducedMotion={reducedMotion}
                onDismiss={handleDismiss}
                onBringToFront={handleBringToFront}
                cardRef={card.initialIndex === 0 ? firstCardRef : undefined}
              />
            ))}
          </div>
        </div>

        <p className="shuffle-sr-only" role="status" aria-live="polite">
          {isEmpty
            ? 'Deck finished. Reshuffle to see the photographs again.'
            : ''}
        </p>

        <div className="shuffle-center-action" data-empty={isEmpty}>
          <button
            ref={resetRef}
            type="button"
            onClick={handleReset}
            className="shuffle-circle-btn"
            aria-label="Reshuffle deck"
            title="Reshuffle deck"
          >
            <RotateCcw size={isEmpty ? 22 : 19} strokeWidth={1.8} />
          </button>
        </div>
      </div>
    </section>
  )
}
