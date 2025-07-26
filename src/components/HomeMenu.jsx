import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAudio } from '../hooks/useAudio'
import { useConfig } from '../hooks/useConfig'
import './HomeMenu.css'

const HomeMenu = ({ isVisible, onClose }) => {
  const [showReturnDialog, setShowReturnDialog] = useState(false)
  const { playSFX, getBGMusicState, bgMusicToggle } = useAudio()
  const { userConfig } = useConfig()
  const navigate = useNavigate()
  const [lastBgMusicState, setLastBgMusicState] = useState(null)

  useEffect(() => {
    if (isVisible) {
      setLastBgMusicState(getBGMusicState())
      // Pause music when home menu opens
      if (getBGMusicState().intro) bgMusicToggle()
      if (getBGMusicState().main) bgMusicToggle()
    }
  }, [isVisible])

  const handleClose = () => {
    playSFX('button-cancel.mp3', userConfig.sfxVol)
    // Restore music state
    if (lastBgMusicState?.intro) bgMusicToggle()
    if (lastBgMusicState?.main) bgMusicToggle()
    onClose()
  }

  const handleBackToMenu = () => {
    playSFX('button-select-big.mp3', userConfig.sfxVol)
    setShowReturnDialog(true)
  }

  const handleReturnConfirm = () => {
    playSFX('returntomenu.mp3', userConfig.sfxVol)
    setTimeout(() => {
      navigate('/?skipwarn=true')
      window.location.reload()
    }, 1500)
  }

  const handleReturnCancel = () => {
    playSFX('button-cancel.mp3', userConfig.sfxVol)
    setShowReturnDialog(false)
  }

  if (!isVisible) return null

  return (
    <>
      <div className="home-menu">
        <div className="bar-top" onClick={handleClose}>
          <span>HOME Menu</span>
          <img src="/assets/home-close.png" />
        </div>
        <div className="in-between">
          <a 
            className="buttonlike backtomenu" 
            onMouseEnter={() => playSFX('button-hover.mp3', userConfig.sfxVol)}
            onClick={handleBackToMenu}
          >
            Wii Menu
          </a>
        </div>
        <div className="bar-bottom">
          <img src="/assets/remote.png" className="remote" />
          <div>
            <div className="battery">
              <div>
                <span>P1</span>
                <img src="/assets/power-full.png" />
              </div>
              <div>
                <span>P2</span>
                <img src="/assets/power-empty.png" />
              </div>
              <div>
                <span>P3</span>
                <img src="/assets/power-empty.png" />
              </div>
              <div>
                <span>P4</span>
                <img src="/assets/power-empty.png" />
              </div>
            </div>
            <div className="text">Wii Remote Settings</div>
          </div>
        </div>
      </div>

      {showReturnDialog && (
          )
          }
        <div className="returndialog">
          <div className="msgbox">
            <div className="text">
              Return to the Wii Menu?<br>
              (Anything not saved will be lost.)
            </div>
            <div className="actions">
              <a 
                onMouseEnter={() => playSFX('button-hover.mp3', userConfig.sfxVol)}
                onClick={handleReturnConfirm}
              >
                Yes
              </a>
              <a 
                className="closedialog" 
                onMouseEnter={() => playSFX('button-hover.mp3', userConfig.sfxVol)}
                onClick={handleReturnCancel}
              >
                No
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default HomeMenu