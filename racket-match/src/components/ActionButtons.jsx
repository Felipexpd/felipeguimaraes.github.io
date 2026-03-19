import { motion } from 'framer-motion'

export default function ActionButtons({ onNao, onSim }) {
  return (
    <div className="flex items-center justify-center gap-10">
      {/* NÃO button */}
      <motion.button
        onClick={onNao}
        whileTap={{ scale: 0.88 }}
        whileHover={{ scale: 1.08 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-black"
        style={{
          background: 'rgba(231,76,60,0.15)',
          border: '2.5px solid #E74C3C',
          color: '#E74C3C',
          boxShadow: '0 4px 20px rgba(231,76,60,0.2)',
        }}
        aria-label="Não gostei"
      >
        ✕
      </motion.button>

      {/* SIM button */}
      <motion.button
        onClick={onSim}
        whileTap={{ scale: 0.88 }}
        whileHover={{ scale: 1.08 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        className="w-20 h-20 rounded-full flex items-center justify-center text-3xl font-black"
        style={{
          background: 'linear-gradient(135deg, #2ECC71, #27AE60)',
          border: '2.5px solid #2ECC71',
          color: '#fff',
          boxShadow: '0 4px 25px rgba(46,204,113,0.4)',
        }}
        aria-label="Sim, gostei"
      >
        ♥
      </motion.button>
    </div>
  )
}
