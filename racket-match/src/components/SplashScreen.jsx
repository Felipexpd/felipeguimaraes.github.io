import { motion } from 'framer-motion'

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

export default function SplashScreen({ onStart }) {
  return (
    <div className="relative flex flex-col items-center justify-between h-full bg-[#0D0D0D] px-8 py-12">
      {/* Background radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 40%, rgba(46,204,113,0.12) 0%, transparent 70%)',
        }}
      />

      {/* Top partner logos */}
      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        className="text-white/50 text-xs font-semibold tracking-[0.25em] uppercase pt-4"
      >
        PRÓ SPIN × PLAY TÊNIS
      </motion.div>

      {/* Center content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center gap-4"
      >
        {/* Tennis ball icon */}
        <motion.div variants={itemVariants} className="text-6xl mb-2">
          🎾
        </motion.div>

        {/* Logo */}
        <motion.div variants={itemVariants} className="flex flex-col items-center leading-none">
          <span
            className="text-white font-black uppercase tracking-tight"
            style={{ fontSize: '3.5rem', letterSpacing: '-1px' }}
          >
            RACKET
          </span>
          <span
            className="font-black uppercase tracking-tight"
            style={{ fontSize: '3.5rem', letterSpacing: '-1px', color: '#2ECC71' }}
          >
            MATCH
          </span>
        </motion.div>

        {/* Tagline */}
        <motion.p
          variants={itemVariants}
          className="text-white/40 italic text-base font-light tracking-wide"
        >
          Encontre seu par ideal
        </motion.p>
      </motion.div>

      {/* CTA Button */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.5 }}
        className="w-full"
      >
        <motion.button
          onClick={onStart}
          whileTap={{ scale: 0.95 }}
          className="w-full py-5 rounded-2xl font-black text-lg uppercase tracking-widest text-black"
          style={{
            background: 'linear-gradient(135deg, #2ECC71, #27AE60)',
            boxShadow: '0 0 30px rgba(46,204,113,0.4)',
          }}
          animate={{
            boxShadow: [
              '0 0 20px rgba(46,204,113,0.3)',
              '0 0 40px rgba(46,204,113,0.6)',
              '0 0 20px rgba(46,204,113,0.3)',
            ],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          COMEÇAR
        </motion.button>

        {/* Event info */}
        <p className="text-white/25 text-xs text-center mt-4 tracking-wide">
          16 de Maio · São Paulo
        </p>
      </motion.div>
    </div>
  )
}
