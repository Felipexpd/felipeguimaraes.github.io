import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import SplashScreen from './components/SplashScreen'
import SwipeScreen from './components/SwipeScreen'
import MatchScreen from './components/MatchScreen'
import EndScreen from './components/EndScreen'
import { rackets } from './data/rackets'
import './index.css'

export default function App() {
  const [screen, setScreen] = useState('splash')
  const [matchedRacket, setMatchedRacket] = useState(null)
  const [swipeIndex, setSwipeIndex] = useState(0)
  const [showMatch, setShowMatch] = useState(false)

  function handleStart() {
    setScreen('swipe')
  }

  function handleMatch(racket) {
    setMatchedRacket(racket)
    setShowMatch(true)
  }

  function handleEnd() {
    setScreen('end')
  }

  function handleContinueFromMatch() {
    const currentIdx = rackets.findIndex((r) => r.id === matchedRacket.id)
    const nextIdx = currentIdx + 1
    setShowMatch(false)
    if (nextIdx >= rackets.length) {
      setTimeout(() => setScreen('end'), 300)
    } else {
      setSwipeIndex(nextIdx)
    }
  }

  const hasMore = matchedRacket
    ? rackets.findIndex((r) => r.id === matchedRacket.id) + 1 < rackets.length
    : false

  return (
    <div id="root">
      <div className="app-shell">
        <AnimatePresence mode="wait">
          {screen === 'splash' && (
            <motion.div
              key="splash"
              className="absolute inset-0"
              exit={{ y: '-100%', transition: { duration: 0.4, ease: 'easeInOut' } }}
            >
              <SplashScreen onStart={handleStart} />
            </motion.div>
          )}

          {screen === 'swipe' && (
            <motion.div
              key="swipe"
              className="absolute inset-0"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              <SwipeScreen
                key={swipeIndex}
                startIndex={swipeIndex}
                onMatch={handleMatch}
                onEnd={handleEnd}
              />
              <AnimatePresence>
                {showMatch && matchedRacket && (
                  <MatchScreen
                    key={`match-${matchedRacket.id}`}
                    racket={matchedRacket}
                    onContinue={handleContinueFromMatch}
                    hasMore={hasMore}
                  />
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {screen === 'end' && (
            <motion.div
              key="end"
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <EndScreen />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
