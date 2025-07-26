import React, { useState, useEffect } from 'react'
import { useAudio } from '../hooks/useAudio'
import { useConfig } from '../hooks/useConfig'
import './Splash.css'

const Splash = ({ onComplete }) => {
  const [showWarning, setShowWarning] = useState(true)
  const [showWelcome, setShowWelcome] = useState(false)
  const [canContinue, setCanContinue] = useState(false)
  const { playSFX } = useAudio()
  const { userConfig } = useConfig()

  useEffect(() => {
    // Check if we should skip warning
    const urlParams = new URLSearchParams(window.location.search)
    if (urlParams.has('skipwarn')) {
      handleSkipWarning()
    } else {
      // Show continue prompt after 3 seconds
      setTimeout(() => {
        setCanContinue(true)
      }, 3000)
    }
  }, [])

  const handleSkipWarning = () => {
    setShowWarning(false)
    setShowWelcome(true)
    setTimeout(() => {
      handleComplete()
    }, 100)
  }

  const handleWarningClick = () => {
    if (!canContinue) return
    
    playSFX('button-select.mp3', userConfig.sfxVol)
    setShowWarning(false)
    setTimeout(() => {
      handleComplete()
    }, 500)
  }

  const handleComplete = () => {
    playSFX('startup.mp3', userConfig.musicVol)
    setTimeout(() => {
      onComplete()
    }, 3000)
  }

  if (!showWarning && !showWelcome) return null

  return (
    <div className="splash">
      {showWarning && (
        <div className="warning" onClick={handleWarningClick}>
          <div className="warning-container">
            <div className="text">
              <h2><div className="warn-icon">⚠&nbsp;</div>WARNING-HEALTH AND SAFETY</h2>
              <p className="desc">
                BEFORE PLAYING, READ YOUR OPERATIONS MANUAL
                FOR IMPORTANT INFORMATION ABOUT YOUR HEALTH
                AND SAFETY.
              </p>
              <p className="bottom">
                Also online at<br />
                <a href="">www.nintendo.com/healthsafety</a>
              </p>
            </div>
            {canContinue && (
              <span>Press left click to continue.</span>
            )}
          </div>
        </div>
      )}

      {showWelcome && (
        <div className="welcomeback">
          <img src="/assets/return.gif" className="channels" />
          <span className="tip"><strong>PRO TIP:</strong>&nbsp;Right-click to open the Wii pause menu</span>
        </div>
      )}
    </div>
  )
}

export default Splash