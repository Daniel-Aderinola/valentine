import React from "react";
import styles from "./Landing.module.css";

/**
 * Landing — The hero section. First thing she sees.
 *
 * PERSONALIZATION TIPS:
 * - Change "My Love" to her name
 * - Update the date to your anniversary or Valentine's Day
 * - Customize the subtitle with your own words
 */
const Landing = ({ onStart }) => {
  return (
    <section className={styles.landing} id="landing">
      {/* Floating clouds background */}
      <div className={styles["clouds-container"]}>
        <div className={`${styles.cloud} ${styles.cloud1}`} />
        <div className={`${styles.cloud} ${styles.cloud2}`} />
        <div className={`${styles.cloud} ${styles.cloud3}`} />
        <div className={`${styles.cloud} ${styles.cloud4}`} />
        <div className={`${styles.cloud} ${styles.cloud5}`} />
      </div>

      <div className={styles["landing-content"]}>
        {/* 💡 Change this date to something meaningful — your anniversary, the day you met, etc. */}
        <p className={styles["landing-date"]}>February 14th, 2026</p>

        <h1 className={styles["landing-title"]}>
          To My Forever
          {/* 💡 Replace "My Love" with her name for a personal touch */}
          <span>My Love. Seyi</span>
        </h1>

        <p className={styles["landing-subtitle"]}>
          I made this little corner of the internet just for you. Because you
          deserve the world, and this is my way of showing it. 💕
        </p>

        {/* The big romantic CTA button */}
        <button className={styles["heart-button"]} onClick={onStart}>
          <span className={styles["heart-icon"]}>❤️</span>
          Tap My Heart
        </button>
      </div>

      {/* Scroll down hint — appears after a delay */}
      <div className={styles["scroll-hint"]}>
        <span>Scroll to explore our love story</span>
        <span className={styles["scroll-arrow"]}>↓</span>
      </div>

      {/* 🎵 Spotify music player — bottom right */}
      <div className={styles["music-player"]}>
        <div className={styles["music-label"]}>🎵 Our Song</div>
        <iframe
          style={{ borderRadius: '12px', overflow: 'hidden' }}
          src="https://open.spotify.com/embed/track/1Q7EgiMOuwDcB0PJC6AzON?utm_source=generator&theme=0"
          width="100%"
          height="152"
          frameBorder="0"
          scrolling="no"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          title="Our Song"
        />
      </div>
    </section>
  );
};

export default Landing;
