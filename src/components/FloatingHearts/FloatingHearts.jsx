import React from "react";
import styles from "./FloatingHearts.module.css";

/**
 * FloatingHearts — Background floating heart particles
 * Creates a dreamy romantic atmosphere with hearts
 * gently floating upward across the screen.
 */
const FloatingHearts = () => {
  // Array of heart emojis for variety
  const hearts = [
    "❤️",
    "💕",
    "💗",
    "💖",
    "💓",
    "🩷",
    "❤️",
    "💕",
    "💗",
    "💖",
    "💓",
    "🩷",
    "❤️",
    "💕",
    "💗",
  ];

  return (
    <div className={styles["floating-hearts-container"]}>
      {hearts.map((heart, index) => (
        <span key={index} className={styles["floating-heart"]}>
          {heart}
        </span>
      ))}
    </div>
  );
};

export default FloatingHearts;
