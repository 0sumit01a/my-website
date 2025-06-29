import React, { useState, useEffect, useRef } from "react";
import styles from "../styles/StoryViewer.module.css";

const StoryViewer = ({ story, onClose }) => {
  const slides = story?.content || [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const viewerRef = useRef(null);
  const touchStartRef = useRef(null);

  useEffect(() => {
    if (!isPlaying || slides.length === 0) return;

    const timer = setTimeout(() => {
      if (currentIndex < slides.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        onClose(); // end of slides
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [currentIndex, isPlaying, slides]);

  const goToNext = () => {
    if (currentIndex < slides.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const goToPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const togglePlay = () => setIsPlaying((prev) => !prev);

  const toggleFullscreen = () => {
    const elem = viewerRef.current;
    if (!document.fullscreenElement) {
      elem?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const shareStory = async () => {
    try {
      await navigator.share({
        title: story?.title || "Web Story",
        url: window.location.href,
      });
    } catch {
      alert("Sharing not supported.");
    }
  };

  const handleTouchStart = (e) => {
    touchStartRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const delta = e.changedTouches[0].clientX - touchStartRef.current;
    if (delta > 50) goToPrev();
    else if (delta < -50) goToNext();
  };

  const currentSlide = slides[currentIndex];

  if (!currentSlide) {
    return (
      <div className={styles.viewer}>
        <p style={{ color: "white" }}>No content available</p>
        <button onClick={onClose} className={styles.closeBtn}>✕</button>
      </div>
    );
  }

  return (
    <div
      className={styles.viewer}
      ref={viewerRef}
      onClick={togglePlay}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <button className={styles.closeBtn} onClick={onClose}>✕</button>

      <div className={styles.controls}>
        <button onClick={togglePlay}>{isPlaying ? "Pause" : "Play"}</button>
        <button onClick={toggleFullscreen}>Fullscreen</button>
        <button onClick={shareStory}>Share</button>
      </div>

      <div className={styles.progressBar}>
        {slides.map((_, i) => (
          <div
            key={i}
            className={`${styles.progressSegment} ${i <= currentIndex ? styles.filled : ""}`}
          ></div>
        ))}
      </div>

      <div className={styles.slide}>
        {currentSlide.type === "image" ? (
          <img
            src={currentSlide.src}
            alt={currentSlide.alt || "story image"}
            className={styles.slideImage}
          />
        ) : (
          <div className={styles.textSlide}>
            <p>{currentSlide.text}</p>
          </div>
        )}
      </div>

      {currentIndex > 0 && (
        <button className={styles.leftArrow} onClick={goToPrev}>←</button>
      )}
      {currentIndex < slides.length - 1 && (
        <button className={styles.rightArrow} onClick={goToNext}>→</button>
      )}
    </div>
  );
};

export default StoryViewer;
