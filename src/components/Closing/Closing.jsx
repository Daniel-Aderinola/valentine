import React from "react";
import styles from "./Closing.module.css";

/**
 * Closing — The final emotional closing page.
 * A dark, starry background with a romantic promise.
 *
 * PERSONALIZATION TIPS:
 * - Replace "Your Name" & "Her Name" with your actual names
 * - Write your own promise / closing message
 * - Add the year you want to highlight
 */

const Closing = () => {
  return (
    <section className={styles["closing-section"]} id="closing">
      {/* Twinkling stars */}
      <div className={styles["stars-container"]}>
        {Array.from({ length: 40 }).map((_, i) => (
          <div key={i} className={styles.star} />
        ))}
      </div>

      {/* Shooting stars */}
      <div className={styles["stars-container"]}>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className={styles["shooting-star"]} />
        ))}
      </div>

      <div className={styles["closing-content"]}>
        <span className={styles["closing-heart"]}>💖</span>

        <h2 className={styles["closing-title"]}>You Are My Forever</h2>

        <p className={styles["closing-message"]}>
          Thank you for being the most beautiful part of my life. Every second
          with you is a gift, and every tomorrow with you is a dream come true.
          I will spend every day making sure you know how deeply you are loved.
          💕
        </p>

        <div className={styles["closing-promise"]}>
          <p>
            "I promise to love you on the good days and the bad days. To hold
            your hand through every storm. To be your safe place, your biggest
            fan, and your forever partner. Today, tomorrow, and every day after
            that."
          </p>
        </div>

        {/* 💡 CHANGE THESE TO YOUR REAL NAMES */}
        <div className={styles["closing-names"]}>
          Kayode
          <span className={styles.ampersand}>❤️</span>
          Seyi
        </div>

        <p className={styles["closing-forever"]}>∞ forever and always ∞</p>
      </div>
    </section>
  );
};

export default Closing;
