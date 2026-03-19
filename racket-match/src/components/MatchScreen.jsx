import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function Confetti() {
  const pieces = Array.from({ length: 24 }, (_, i) => i)
  const colors = ['#2ECC71', '#F7E000', '#FFFFFF', '#27AE60', '#F1C40F']

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {pieces.map((i) => {
        const color = colors[i % colors.length]
        const left = Math.random() * 100
        const delay = Math.random() * 0.8
        const size = 6 + Math.random() * 8
        const duration = 1.5 + Math.random() * 1.5
        const rotate = Math.random() * 360

        return (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              left: `${left}%`,
              top: '-10px',
              width: size,
              height: size,
              background: color,
              borderRadius: i % 3 === 0 ? '50%' : '2px',
            }}
            initial={{ y: -20, opacity: 1, rotate: 0 }}
            animate={{
              y: 900,
              opacity: [1, 1, 0],
              rotate: rotate,
              x: (Math.random() - 0.5) * 100,
            }}
            transition={{ duration, delay, ease: 'easeIn' }}
          />
        )
      })}
    </div>
  )
}

export default function MatchScreen({ racket, onContinue, hasMore }) {
  const [imgError, setImgError] = useState(false)

  useEffect(() => {
    setImgError(false)
  }, [racket])

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-between py-10 px-6"
      style={{
        background: 'radial-gradient(ellipse at 50% 30%, rgba(46,204,113,0.25) 0%, #0D0D0D 65%)',
        zIndex: 50,
      }}
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <Confetti />

      {/* Top */}
      <div />

      {/* Center */}
      <div className="flex flex-col items-center gap-6">
        {/* Overlapping circles */}
        <div className="relative flex items-center justify-center mb-2" style={{ width: 200, height: 120 }}>
          {/* Left circle — event logo */}
          <motion.div
            className="w-28 h-28 rounded-full flex items-center justify-center text-4xl border-4 border-[#2ECC71] absolute"
            style={{
              left: 0,
              background: 'linear-gradient(135deg, #1a1a1a, #0D0D0D)',
              boxShadow: '0 0 30px rgba(46,204,113,0.4)',
              zIndex: 1,
            }}
            initial={{ scale: 0, x: 0 }}
            animate={{ scale: 1, x: 0 }}
            transition={{ delay: 0.4, type: 'spring', stiffness: 300, damping: 25 }}
          >
            🎾
          </motion.div>

          {/* Right circle — racket image */}
          <motion.div
            className="w-28 h-28 rounded-full overflow-hidden border-4 border-white absolute"
            style={{
              right: 0,
              background: `linear-gradient(160deg, ${racket.gradientFrom}, ${racket.gradientTo})`,
              boxShadow: '0 0 30px rgba(255,255,255,0.2)',
              zIndex: 2,
            }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: 'spring', stiffness: 300, damping: 25 }}
          >
            {!imgError ? (
              <img
                src={racket.image}
                alt={racket.name}
                className="w-full h-full object-cover"
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="font-black text-white text-xs text-center uppercase px-1" style={{ fontSize: '0.65rem' }}>
                  {racket.brand}
                </span>
              </div>
            )}
          </motion.div>

          {/* Sparkle stars */}
          {['⭐', '✨', '⭐'].map((star, i) => (
            <motion.span
              key={i}
              className="absolute text-lg"
              style={{
                top: i === 1 ? '-20px' : '10px',
                left: i === 0 ? '-10px' : i === 1 ? '50%' : undefined,
                right: i === 2 ? '-10px' : undefined,
                transform: i === 1 ? 'translateX(-50%)' : undefined,
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.3, 1], opacity: [0, 1, 0.8] }}
              transition={{ delay: 0.7 + i * 0.1, duration: 0.5 }}
            >
              {star}
            </motion.span>
          ))}
        </div>

        {/* Match text */}
        <motion.div
          className="flex flex-col items-center gap-3"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6, type: 'spring', stiffness: 400, damping: 20 }}
        >
          <h1
            className="font-black uppercase text-white text-4xl tracking-tight"
            style={{ textShadow: '0 0 40px rgba(46,204,113,0.5)' }}
          >
            É UM MATCH!
          </h1>
          <p className="text-white/60 text-base text-center leading-relaxed">
            Você escolheu a{' '}
            <span className="text-white font-bold">{racket.brand} {racket.name}</span>
          </p>
          <p className="text-white/35 text-sm italic text-center">{racket.description}</p>
        </motion.div>
      </div>

      {/* Bottom */}
      <motion.div
        className="w-full flex flex-col items-center gap-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
      >
        <motion.button
          onClick={onContinue}
          whileTap={{ scale: 0.94 }}
          className="w-full py-4 rounded-2xl font-bold text-base text-black uppercase tracking-widest"
          style={{
            background: 'linear-gradient(135deg, #2ECC71, #27AE60)',
            boxShadow: '0 4px 20px rgba(46,204,113,0.4)',
          }}
        >
          {hasMore ? 'Ver mais raquetes →' : 'Finalizar'}
        </motion.button>
        <p className="text-white/25 text-xs text-center tracking-wide">
          Racket Match · 16 de Maio · São Paulo
        </p>
      </motion.div>
    </motion.div>
  )
}
