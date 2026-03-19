import { motion } from 'framer-motion'

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export default function EndScreen() {
  return (
    <motion.div
      className="flex flex-col items-center justify-between h-full bg-[#0D0D0D] px-8 py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        background: 'radial-gradient(ellipse at 50% 50%, rgba(46,204,113,0.08) 0%, #0D0D0D 70%)',
      }}
    >
      {/* Top spacer */}
      <div />

      {/* Center content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center gap-5 text-center"
      >
        {/* Tennis ball */}
        <motion.div
          variants={itemVariants}
          className="text-7xl mb-2"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          🎾
        </motion.div>

        {/* Main message */}
        <motion.h1
          variants={itemVariants}
          className="text-white font-black text-3xl leading-tight"
        >
          Venha testar
          <br />
          <span style={{ color: '#2ECC71' }}>pessoalmente!</span>
        </motion.h1>

        {/* Brand */}
        <motion.div variants={itemVariants} className="flex flex-col items-center leading-none mb-2">
          <span className="text-white font-black uppercase tracking-tight text-2xl">RACKET</span>
          <span className="font-black uppercase tracking-tight text-2xl" style={{ color: '#2ECC71' }}>MATCH</span>
        </motion.div>

        {/* Event details */}
        <motion.div variants={itemVariants} className="flex flex-col gap-3">
          <div className="flex items-center gap-3 justify-center">
            <span className="text-xl">📅</span>
            <span className="text-white/70 font-semibold text-base">16 de Maio de 2026</span>
          </div>
          <div className="flex items-center gap-3 justify-center">
            <span className="text-xl">📍</span>
            <span className="text-white/70 font-semibold text-base">São Paulo — Play Tênis</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom */}
      <motion.div
        className="w-full flex flex-col items-center gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        {/* CTA Button */}
        <motion.a
          href="#"
          whileTap={{ scale: 0.94 }}
          className="w-full py-4 rounded-2xl font-bold text-base text-black uppercase tracking-widest text-center block"
          style={{
            background: 'linear-gradient(135deg, #2ECC71, #27AE60)',
            boxShadow: '0 4px 20px rgba(46,204,113,0.4)',
          }}
        >
          Saiba mais
        </motion.a>

        {/* Partner logos */}
        <p className="text-white/30 text-xs tracking-[0.2em] uppercase font-semibold">
          PRÓ SPIN × PLAY TÊNIS
        </p>
      </motion.div>
    </motion.div>
  )
}
