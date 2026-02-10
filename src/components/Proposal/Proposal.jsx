import React, { useState, useEffect, useCallback, useRef } from "react";
import styles from "./Proposal.module.css";

/**
 * PhotoGallery — Auto-sliding carousel of your photos together 📸
 *
 * HOW TO ADD YOUR PHOTOS:
 * 1. Put your photos in the /public/photos/ folder
 *    (e.g., public/photos/photo1.jpg, public/photos/photo2.jpg, etc.)
 * 2. Update the `photos` array below with filenames and captions
 * 3. Write a sweet caption and date for each photo!
 *
 * The slideshow auto-advances every 4 seconds,
 * and she can also swipe or click arrows to navigate.
 */

// 💡 ADD YOUR PHOTOS HERE!
// Place image files in /public/photos/ and update this list
const photos = [
  {
    src: "/photos/photo1.jpg",
    caption: "The day it all started 💕",
    date: "January 2024",
  },
  {
    src: "/photos/photo2.jpg",
    caption: "Our first date — I was so nervous! ☕",
    date: "February 2024",
  },
  {
    src: "/photos/photo3.jpg",
    caption: "That time we couldn't stop laughing 😂",
    date: "April 2024",
  },
  {
    src: "/photos/photo4.jpg",
    caption: "You looked so beautiful that day 🌸",
    date: "June 2024",
  },
  {
    src: "/photos/photo5.jpg",
    caption: "Adventures with my favorite person 🌍",
    date: "August 2024",
  },
  {
    src: "/photos/photo6.jpg",
    caption: "My happy place is with you 🥰",
    date: "October 2024",
  },
  {
    src: "/photos/photo7.jpg",
    caption: "Making memories that last forever ✨",
    date: "December 2024",
  },
  {
    src: "/photos/photo8.jpg",
    caption: "Every moment with you is a gift 💖",
    date: "February 2026",
  },
];

const AUTO_SLIDE_INTERVAL = 4000; // 4 seconds per slide

const Proposal = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [imageErrors, setImageErrors] = useState({});
  const intervalRef = useRef(null);

  const totalSlides = photos.length;

  // Go to next slide
  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  // Go to previous slide
  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  // Go to a specific slide
  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // Auto-slide timer
  useEffect(() => {
    if (isPaused) return;

    intervalRef.current = setInterval(nextSlide, AUTO_SLIDE_INTERVAL);
    return () => clearInterval(intervalRef.current);
  }, [isPaused, nextSlide]);

  // Handle image load error — show placeholder instead
  const handleImageError = (index) => {
    setImageErrors((prev) => ({ ...prev, [index]: true }));
  };

  // Placeholder emojis for photos not yet added
  const placeholderEmojis = ["📸", "💑", "🥰", "🌅", "✈️", "🎉", "🎄", "💕"];

  return (
    <section className={styles["gallery-section"]} id="proposal">
      <div className={styles["gallery-header"]}>
        <h2>Our Memories Together 📸</h2>
        <p>Every picture tells a piece of our story 💕</p>
      </div>

      <div className={styles["carousel-wrapper"]}>
        {/* Left arrow */}
        <button
          className={`${styles["nav-arrow"]} ${styles["nav-prev"]}`}
          onClick={prevSlide}
          aria-label="Previous photo"
        >
          ‹
        </button>

        {/* Slides */}
        <div className={styles["carousel-track-container"]}>
          <div
            className={styles["carousel-track"]}
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {photos.map((photo, index) => (
              <div key={index} className={styles.slide}>
                <div className={styles["slide-image-wrapper"]}>
                  {imageErrors[index] ? (
                    // Show a cute placeholder if the image isn't found yet
                    <div className={styles["slide-placeholder"]}>
                      <span className={styles["slide-placeholder-emoji"]}>
                        {placeholderEmojis[index % placeholderEmojis.length]}
                      </span>
                      <span className={styles["slide-placeholder-text"]}>
                        Add photo to /public/photos/
                      </span>
                    </div>
                  ) : (
                    <img
                      className={styles["slide-image"]}
                      src={photo.src}
                      alt={photo.caption}
                      onError={() => handleImageError(index)}
                      loading="lazy"
                    />
                  )}
                </div>
                <div className={styles["slide-caption"]}>
                  <p className={styles["slide-caption-text"]}>
                    {photo.caption}
                  </p>
                  <p className={styles["slide-caption-date"]}>{photo.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right arrow */}
        <button
          className={`${styles["nav-arrow"]} ${styles["nav-next"]}`}
          onClick={nextSlide}
          aria-label="Next photo"
        >
          ›
        </button>
      </div>

      {/* Dots indicator */}
      <div className={styles.dots}>
        {photos.map((_, index) => (
          <button
            key={index}
            className={`${styles.dot} ${currentIndex === index ? styles.active : ""}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to photo ${index + 1}`}
          />
        ))}
      </div>

      {/* Auto-slide label with pause control */}
      <div className={styles["auto-label"]}>
        <button
          className={styles["pause-btn"]}
          onClick={() => setIsPaused(!isPaused)}
          aria-label={isPaused ? "Resume slideshow" : "Pause slideshow"}
        >
          {isPaused ? "▶️" : "⏸️"}
        </button>
        <span>{isPaused ? "Paused" : "Auto-playing"}</span>
      </div>
    </section>
  );
};

export default Proposal;
