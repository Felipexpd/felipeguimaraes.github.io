import { useState } from 'react'
import { motion, useMotionValue, useTransform, useAnimation } from 'framer-motion'

export default function RacketCard({ racket, onSwipe, isTop, stackIndex }) {
  const [imgError, setImgError] = useState(false)
  const x = useMotionValue(0)
  const controls = useAnimation()

  // Rotation based on drag
  const rotate = useTransform(x, [-200, 0, 200], [-15, 0, 15])

  // SIM/NÃO overlay opacity
  const simOpacity = useTransform(x, [20, 100], [0, 1])
  const naoOpacity = useTransform(x, [-100, -20], [1, 0])

  // Border glow
  const simBorder = useTransform(x, [20, 100], ['rgba(46,204,113,0)', 'rgba(46,204,113,0.8)'])
  const naoBorder = useTransform(x, [-100, -20], ['rgba(231,76,60,0.8)', 'rgba(231,76,60,0)'])

  async function handleDragEnd(_, info) {
    const threshold = 100
    if (info.offset.x > threshold) {
      await controls.start({
        x: 600,
        rotate: 20,
        opacity: 0,
        transition: { duration: 0.4, ease: 'easeOut' },
      })
      onSwipe('sim')
    } else if (info.offset.x < -threshold) {
      await controls.start({
        x: -600,
        rotate: -20,
        opacity: 0,
        transition: { duration: 0.4, ease: 'easeOut' },
      })
      onSwipe('nao')
    } else {
      controls.start({ x: 0, rotate: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } })
    }
  }

  // Expose controls for button-triggered swipes
  RacketCard.triggerSwipe = async (direction) => {
    if (direction === 'sim') {
      await controls.start({ x: 600, rotate: 20, opacity: 0, transition: { duration: 0.4 } })
      onSwipe('sim')
    } else {
      await controls.start({ x: -600, rotate: -20, opacity: 0, transition: { duration: 0.4 } })
      onSwipe('nao')
    }
  }

  const scale = isTop ? 1 : 1 - stackIndex * 0.04
  const translateY = isTop ? 0 : stackIndex * 10

  return (
    <motion.div
      animate={controls}
      drag={isTop ? 'x' : false}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.8}
      onDragEnd={handleDragEnd}
      style={{
        x: isTop ? x : 0,
        rotate: isTop ? rotate : 0,
        scale,
        translateY,
        zIndex: 10 - stackIndex,
        position: 'absolute',
        width: '100%',
        cursor: isTop ? 'grab' : 'default',
      }}
      className="h-full select-none"
    >
      {/* Card */}
      <div
        className="relative w-full h-full rounded-[20px] overflow-hidden"
        style={{
          boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
        }}
      >
        {/* Image or Placeholder */}
        {!imgError ? (
          <img
            src={racket.image}
            alt={racket.name}
            className="absolute inset-0 w-full h-full object-cover"
            onError={() => setImgError(true)}
            draggable={false}
          />
        ) : null}

        {/* Placeholder (shown if no image or error) */}
        {(imgError || !racket.image) && (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center"
            style={{
              background: `linear-gradient(160deg, ${racket.gradientFrom}, ${racket.gradientTo})`,
            }}
          >
            <div className="text-6xl mb-4 opacity-60">🎾</div>
            <span
              className="font-black uppercase text-white tracking-widest text-center px-4"
              style={{ fontSize: '2rem', textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}
            >
              {racket.brand}
            </span>
            <span
              className="text-white/70 font-semibold text-center mt-2 px-6"
              style={{ fontSize: '0.85rem' }}
            >
              {racket.name}
            </span>
          </div>
        )}

        {/* Bottom gradient overlay */}
        <div
          className="absolute bottom-0 left-0 right-0 h-2/5 pointer-events-none"
          style={{
            background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, transparent 100%)',
          }}
        />

        {/* Card info */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <span
            className="inline-block font-black uppercase text-xs tracking-widest px-2 py-1 rounded mb-2"
            style={{
              color: racket.brandColor === '#FFFFFF' ? '#000' : '#fff',
              background: racket.brandColor,
            }}
          >
            {racket.brand}
          </span>
          <h2 className="text-white font-black text-xl leading-tight mb-1">{racket.name}</h2>
          {racket.subtitle && (
            <p className="text-white/70 italic text-sm">{racket.subtitle}</p>
          )}
        </div>

        {/* SIM overlay (right swipe) */}
        {isTop && (
          <motion.div
            className="absolute top-10 left-6 pointer-events-none"
            style={{ opacity: simOpacity }}
          >
            <span
              className="font-black uppercase text-4xl border-4 border-[#2ECC71] text-[#2ECC71] px-3 py-1 rounded-lg"
              style={{ transform: 'rotate(-15deg)', display: 'block', textShadow: '0 0 20px rgba(46,204,113,0.5)' }}
            >
              SIM
            </span>
          </motion.div>
        )}

        {/* NÃO overlay (left swipe) */}
        {isTop && (
          <motion.div
            className="absolute top-10 right-6 pointer-events-none"
            style={{ opacity: naoOpacity }}
          >
            <span
              className="font-black uppercase text-4xl border-4 border-[#E74C3C] text-[#E74C3C] px-3 py-1 rounded-lg"
              style={{ transform: 'rotate(15deg)', display: 'block', textShadow: '0 0 20px rgba(231,76,60,0.5)' }}
            >
              NÃO
            </span>
          </motion.div>
        )}

        {/* Border glow */}
        {isTop && (
          <>
            <motion.div
              className="absolute inset-0 rounded-[20px] pointer-events-none"
              style={{ boxShadow: simBorder.get() ? `0 0 0 3px ${simBorder.get()}` : undefined }}
            />
          </>
        )}
      </div>
    </motion.div>
  )
}
