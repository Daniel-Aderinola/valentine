import React, { useState, useEffect, useCallback, useRef } from "react";
import styles from "./Proposal.module.css";
import img1 from "../../images/1.jpeg";
import img2 from "../../images/2.jpeg";
import img3 from "../../images/3.jpeg";
import img4 from "../../images/4.jpeg";
import img5 from "../../images/5.jpeg";
import img6 from "../../images/6.jpeg";
import img7 from "../../images/7.jpeg";

/**
 * PhotoGallery — Auto-sliding carousel of your photos together 📸
 */

const photos = [
  {
    src: img1,
    caption: "You’re my forever kind of beautiful. 💕",
   
  },
  {
    src: img2,
    caption: "Our first date — I was so nervous! 😁",
   
  },
  {
    src: img3,
    caption: "The vieeeeeeeeeeeeeeew 😍",
    
  },
  {
    src: img4,
    caption: "You make everything feel okay. ❤️",
    
  },
  {
    src: img5,
    caption: "I choose you, today and always.💫",
    date: "August 2024",
  },
  {
    src: img6,
    caption: "My happy place is with you 🥰",
    
  },
  {
    src: img7,
    caption: "Making memories that last forever ✨",
  
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
  // useEffect(() => {
  //   if (isPaused) return;

  //   intervalRef.current = setInterval(nextSlide, AUTO_SLIDE_INTERVAL);
  //   return () => clearInterval(intervalRef.current);
  // }, [isPaused, nextSlide]);

  // Handle image load error — show placeholder instead
  const handleImageError = (index) => {
    setImageErrors((prev) => ({ ...prev, [index]: true }));
  };

  // Placeholder emojis for photos not yet added
  const placeholderEmojis = ["📸", "💑", "🥰", "🌅", "✈️", "🎉", "🎄", "💕"];

  return (
    <section className={styles["gallery-section"]} id="proposal">
      {/* Faded photo icons floating up */}
      <div className={styles["icons-container"]}>
        {[
          "📷",
          "🖼️",
          "📸",
          "🎞️",
          "📷",
          "🖼️",
          "📸",
          "🎞️",
          "📷",
          "🖼️",
          "📸",
          "🎞️",
          "📷",
          "🖼️",
          "📸",
          "🎞️",
        ].map((icon, i) => (
          <span key={i} className={styles["photo-icon"]}>
            {icon}
          </span>
        ))}
      </div>

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

    </section>
  );
};

export default Proposal;
