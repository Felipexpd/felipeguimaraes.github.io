import { useState, useRef, useCallback, forwardRef, useImperativeHandle } from 'react'
import { motion, useMotionValue, useTransform, useAnimation } from 'framer-motion'
import { rackets } from '../data/rackets'
import ActionButtons from './ActionButtons'

// ─── Card ────────────────────────────────────────────────────────────────────

const CardWrapper = forwardRef(function CardWrapper({ racket, isTop, stackIndex, onSwipe }, ref) {
  const [imgError, setImgError] = useState(false)
  const x = useMotionValue(0)
  const controls = useAnimation()

  const rotate = useTransform(x, [-200, 0, 200], [-15, 0, 15])
  const simOpacity = useTransform(x, [20, 100], [0, 1])
  const naoOpacity = useTransform(x, [-100, -20], [1, 0])

  useImperativeHandle(ref, () => ({
    triggerSwipe: async (direction) => {
      if (direction === 'sim') {
        await controls.start({ x: 600, rotate: 20, opacity: 0, transition: { duration: 0.35, ease: 'easeOut' } })
        onSwipe?.('sim')
      } else {
        await controls.start({ x: -600, rotate: -20, opacity: 0, transition: { duration: 0.35, ease: 'easeOut' } })
        onSwipe?.('nao')
      }
    },
  }))

  async function handleDragEnd(_, info) {
    if (info.offset.x > 100) {
      await controls.start({ x: 600, rotate: 20, opacity: 0, transition: { duration: 0.35, ease: 'easeOut' } })
      onSwipe?.('sim')
    } else if (info.offset.x < -100) {
      await controls.start({ x: -600, rotate: -20, opacity: 0, transition: { duration: 0.35, ease: 'easeOut' } })
      onSwipe?.('nao')
    } else {
      controls.start({ x: 0, rotate: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } })
    }
  }

  const scale = isTop ? 1 : 1 - stackIndex * 0.04
  const yOffset = isTop ? 0 : stackIndex * 10

  return (
    <motion.div
      animate={controls}
      drag={isTop ? 'x' : false}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.7}
      onDragEnd={handleDragEnd}
      style={{
        x: isTop ? x : 0,
        rotate: isTop ? rotate : 0,
        scale,
        y: yOffset,
        zIndex: 10 - stackIndex,
        position: 'absolute',
        inset: 0,
        cursor: isTop ? 'grab' : 'default',
      }}
      className="select-none"
    >
      <div
        className="relative w-full h-full rounded-[20px] overflow-hidden"
        style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.6)' }}
      >
        {/* Image */}
        {!imgError && (
          <img
            src={racket.image}
            alt={racket.name}
            className="absolute inset-0 w-full h-full object-cover"
            onError={() => setImgError(true)}
            draggable={false}
          />
        )}

        {/* Placeholder */}
        {imgError && (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-3"
            style={{ background: `linear-gradient(160deg, ${racket.gradientFrom}, ${racket.gradientTo})` }}
          >
            <div style={{ fontSize: '4.5rem', opacity: 0.5 }}>🎾</div>
            <span
              className="font-black uppercase text-white text-center px-4"
              style={{ fontSize: '2.2rem', letterSpacing: '-1px', textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}
            >
              {racket.brand}
            </span>
            <span className="text-white font-semibold text-center px-6 text-sm leading-snug" style={{ opacity: 0.6 }}>
              {racket.name}
            </span>
            {racket.subtitle ? (
              <span className="text-white italic text-xs" style={{ opacity: 0.4 }}>{racket.subtitle}</span>
            ) : null}
          </div>
        )}

        {/* Bottom gradient */}
        <div
          className="absolute bottom-0 left-0 right-0 h-2/5 pointer-events-none"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, transparent 100%)' }}
        />

        {/* Info */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <span
            className="inline-block font-black uppercase text-xs tracking-widest px-2.5 py-1 rounded-md mb-2"
            style={{
              color: racket.brandColor === '#FFFFFF' ? '#000' : '#fff',
              background: racket.brandColor,
            }}
          >
            {racket.brand}
          </span>
          <h2 className="text-white font-black text-xl leading-tight mb-1">{racket.name}</h2>
          {racket.subtitle ? (
            <p className="italic text-sm" style={{ color: 'rgba(255,255,255,0.65)' }}>{racket.subtitle}</p>
          ) : null}
        </div>

        {/* SIM stamp */}
        {isTop && (
          <motion.div
            className="absolute top-8 left-5 pointer-events-none"
            style={{ opacity: simOpacity, rotate: -15 }}
          >
            <span
              className="font-black uppercase border-4 border-[#2ECC71] text-[#2ECC71] px-3 py-1 rounded-lg block"
              style={{ fontSize: '2.2rem', textShadow: '0 0 20px rgba(46,204,113,0.5)' }}
            >
              SIM
            </span>
          </motion.div>
        )}

        {/* NÃO stamp */}
        {isTop && (
          <motion.div
            className="absolute top-8 right-5 pointer-events-none"
            style={{ opacity: naoOpacity, rotate: 15 }}
          >
            <span
              className="font-black uppercase border-4 border-[#E74C3C] text-[#E74C3C] px-3 py-1 rounded-lg block"
              style={{ fontSize: '2.2rem', textShadow: '0 0 20px rgba(231,76,60,0.5)' }}
            >
              NÃO
            </span>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
})

// ─── SwipeScreen ─────────────────────────────────────────────────────────────

export default function SwipeScreen({ startIndex = 0, onMatch, onEnd }) {
  const [currentIndex, setCurrentIndex] = useState(startIndex)
  const cardRefs = useRef({})

  const handleSwipe = useCallback(
    (direction) => {
      if (direction === 'sim') {
        onMatch(rackets[currentIndex])
      }
      const next = currentIndex + 1
      if (next >= rackets.length) {
        setTimeout(() => onEnd(), 500)
      } else {
        setCurrentIndex(next)
      }
    },
    [currentIndex, onMatch, onEnd]
  )

  const triggerNao = () => cardRefs.current[currentIndex]?.triggerSwipe?.('nao')
  const triggerSim = () => cardRefs.current[currentIndex]?.triggerSwipe?.('sim')

  const visibleRackets = rackets.slice(currentIndex, currentIndex + 2)

  return (
    <div className="flex flex-col h-full" style={{ background: '#0D0D0D' }}>
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-5 pb-2 flex-shrink-0">
        <div className="flex items-center gap-2">
          <span style={{ fontSize: '1.5rem' }}>🎾</span>
          <div>
            <span className="text-white font-black text-sm uppercase tracking-tight">RACKET</span>
            <span className="font-black text-sm uppercase tracking-tight ml-1" style={{ color: '#2ECC71' }}>
              MATCH
            </span>
          </div>
        </div>
        <div
          className="text-xs font-semibold px-3 py-1.5 rounded-full"
          style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.5)' }}
        >
          {currentIndex + 1} / {rackets.length}
        </div>
      </div>

      {/* Card stack */}
      <div className="flex-1 relative px-4 py-2">
        {visibleRackets.map((racket, stackIndex) => (
          <CardWrapper
            key={racket.id}
            racket={racket}
            isTop={stackIndex === 0}
            stackIndex={stackIndex}
            onSwipe={stackIndex === 0 ? handleSwipe : undefined}
            ref={(el) => { if (el) cardRefs.current[currentIndex + stackIndex] = el }}
          />
        ))}
      </div>

      {/* Action buttons */}
      <div className="flex-shrink-0 pb-8 pt-2 flex flex-col items-center gap-3">
        <ActionButtons onNao={triggerNao} onSim={triggerSim} />
        <p className="text-xs tracking-widest" style={{ color: 'rgba(255,255,255,0.2)' }}>
          ← NÃO &nbsp;|&nbsp; SIM →
        </p>
      </div>
    </div>
  )
}
