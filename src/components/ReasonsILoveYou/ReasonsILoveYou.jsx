import React, { useState } from "react";
import styles from "./ReasonsILoveYou.module.css";

/**
 * ReasonsILoveYou — An interactive grid of clickable hearts.
 * Each heart reveals a reason why you love her.
 *
 * PERSONALIZATION TIPS:
 * - Replace each reason with something personal about her
 * - Use inside jokes, shared memories, specific things you adore
 * - The more personal, the more she'll love it!
 */

// 💡 REPLACE THESE WITH YOUR REAL REASONS!
const reasons = [
  "Your smile makes my entire world brighter ,",
  "The way you laugh — it's my favorite sound ,",
  "You believe in me even when I don't ",
  "Your hugs feel like home ",
  "I love your strength, even when you don’t see it ",
  "Your kindness to everyone around you ,",
  "love that when I think about the future, you naturally appear in it ",
  "You make the boring moments fun ",
  "Your passion for the things you love ,",
  "I love how being with you makes me want to be a better man, not just for you, but for myself too ",
  "love you because what we have feels genuine — not forced, not rushed, just real ",
  "Because you chose me — and I'm the luckiest ",
];

const ReasonsILoveYou = () => {
  const [revealedCards, setRevealedCards] = useState(new Set());

  const handleCardClick = (index) => {
    setRevealedCards((prev) => {
      const newSet = new Set(prev);
      newSet.add(index);
      return newSet;
    });
  };

  return (
    <section className={styles["reasons-section"]} id="reasons">
      {/* Rising dots background */}
      <div className={styles["dots-container"]}>
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className={styles.dot} />
        ))}
      </div>

      <div className={styles["reasons-header"]}>
        <h2>Reasons I Love You</h2>
        <p>Tap each heart to reveal a reason 💖</p>
      </div>

      <div className={styles["hearts-grid"]}>
        {reasons.map((reason, index) => (
          <div
            key={index}
            className={`${styles["heart-card"]} ${revealedCards.has(index) ? styles.revealed : ""}`}
            onClick={() => handleCardClick(index)}
          >
            {revealedCards.has(index) ? (
              <>
                <span className={styles["heart-card-emoji"]}>💖</span>
                <p className={styles["heart-card-reason"]}>{reason}</p>
              </>
            ) : (
              <>
                <span className={styles["heart-card-emoji"]}>❤️</span>
                <span className={styles["heart-card-number"]}>
                  #{index + 1}
                </span>
                <span className={styles["heart-card-hint"]}>tap me</span>
              </>
            )}
          </div>
        ))}
      </div>

      <p className={styles["reasons-counter"]}>
        {revealedCards.size === reasons.length
          ? "💕 You found all my reasons! But the real list is infinite..."
          : `${revealedCards.size} of ${reasons.length} reasons revealed`}
      </p>
    </section>
  );
};

export default ReasonsILoveYou;
