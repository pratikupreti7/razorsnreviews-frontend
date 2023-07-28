
import { useState } from 'react'

const slideStyles = {
  width: '100%',
  height: '100%',
  borderRadius: '10px',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  // Add additional responsive styles if needed
}

const expandedSlideStyles = {
  position: 'fixed',
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
  zIndex: '9999',
  background: 'rgba(0, 0, 0, 0.8)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'auto',
}

const rightArrowStyles = {
  position: 'absolute',
  top: '50%',
  transform: 'translate(0, -50%)',
  right: '32px',
  fontSize: '45px',
  color: '#fff',
  zIndex: 1,
  cursor: 'pointer',
  // Add additional responsive styles if needed
}

const leftArrowStyles = {
  position: 'absolute',
  top: '50%',
  transform: 'translate(0, -50%)',
  left: '32px',
  fontSize: '45px',
  color: '#fff',
  zIndex: 1,
  cursor: 'pointer',
  // Add additional responsive styles if needed
}

const sliderStyles = {
  position: 'relative',
  height: '100%',
  // Add additional responsive styles if needed
}

const dotsContainerStyles = {
  display: 'flex',
  justifyContent: 'center',
  // Add additional responsive styles if needed
}

const dotStyle = {
  margin: '2px',
  cursor: 'pointer',
  fontSize: '14px',
  color: '#f0efed',
}

const ImageSlider = ({ imageUrls }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isExpanded, setIsExpanded] = useState(false)

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0
    const newIndex = isFirstSlide
      ? (imageUrls?.length || 0) - 1
      : currentIndex - 1
    setCurrentIndex(newIndex)
  }

  const goToNext = () => {
    const isLastSlide = currentIndex === (imageUrls?.length || 0) - 1
    const newIndex = isLastSlide ? 0 : currentIndex + 1
    setCurrentIndex(newIndex)
  }

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex)
  }

  const expandImage = (event) => {
    if (!event.target.classList.contains('arrow-button')) {
      setIsExpanded(true)
    }
  }

  const closeExpandedImage = () => {
    setIsExpanded(false)
  }

  const slideStylesWithBackground = {
    ...slideStyles,
    backgroundImage:
      imageUrls && imageUrls[currentIndex]
        ? `url(${imageUrls[currentIndex]})`
        : `url(${process.env.PUBLIC_URL + '/no-image.png'})`,
    cursor: 'pointer',
  }

  if (!imageUrls || imageUrls.length === 0) {
    return (
      <div style={sliderStyles}>
        <div
          onClick={goToPrevious}
          style={leftArrowStyles}
          className="arrow-button"
        >
          ❰
        </div>
        <div
          onClick={goToNext}
          style={rightArrowStyles}
          className="arrow-button"
        >
          ❱
        </div>
        <div style={slideStylesWithBackground}></div>
        <div style={dotsContainerStyles}>
          <div style={dotStyle} onClick={() => {}}>
            ●
          </div>
        </div>
      </div>
    )
  }

  if (isExpanded) {
    return (
      <div style={expandedSlideStyles} onClick={closeExpandedImage}>
        <img
          src={imageUrls[currentIndex]}
          alt=""
          style={{ maxHeight: '90%', maxWidth: '90%' }}
        />
      </div>
    )
  }

  return (
    <div style={sliderStyles} onClick={expandImage}>
      <div
        onClick={goToPrevious}
        style={leftArrowStyles}
        className="arrow-button"
      >
        ❰
      </div>
      <div onClick={goToNext} style={rightArrowStyles} className="arrow-button">
        ❱
      </div>
      <div style={slideStylesWithBackground}></div>
      <div style={dotsContainerStyles}>
        {imageUrls.map((url, index) => (
          <div style={dotStyle} key={index} onClick={() => goToSlide(index)}>
            ●
          </div>
        ))}
      </div>
    </div>
  )
}

export default ImageSlider
