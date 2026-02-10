import React, { useState, useEffect, useRef } from "react";
import styles from "./LoveLetter.module.css";

/**
 * LoveLetter — A heartfelt letter with a typewriter effect.
 *
 * PERSONALIZATION TIPS:
 * - Rewrite the letter text with your own memories and feelings
 * - Change the greeting to her pet name
 * - Update the signature with your name
 */

// 💡 PERSONALIZE THIS LETTER — Write from your heart!
const LETTER_TEXT = `From the moment you walked into my life, everything changed. 
The world became more colorful, laughter became easier, and love became something I could finally understand.

Every day with you feels like a beautiful dream I never want to wake up from. Your smile lights up even my darkest days, and your love gives me strength I never knew I had.

I want you to know that you are my favorite person, my best friend, and the love of my life. Thank you for being you — perfectly, wonderfully, beautifully you.

I love you more than words could ever say, but I'll spend forever trying anyway. 💕`;

const LoveLetter = () => {
  const [displayedText, setDisplayedText] = useState("");
  const [isTypingDone, setIsTypingDone] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const sectionRef = useRef(null);

  // Start typing when the section comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.3 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasStarted]);

  // Typewriter effect — types one character at a time
  useEffect(() => {
    if (!hasStarted) return;

    let index = 0;
    const speed = 30; // milliseconds per character — adjust for faster/slower

    const timer = setInterval(() => {
      if (index < LETTER_TEXT.length) {
        setDisplayedText(LETTER_TEXT.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
        setIsTypingDone(true);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [hasStarted]);

  return (
    <section
      className={styles["love-letter"]}
      id="love-letter"
      ref={sectionRef}
    >
      {/* Floating roses & love petals */}
      <div className={styles["roses-container"]}>
        {[
          "🌹",
          "🤍",
          "❤️",
          "🥀",
          "🤍",
          "🌹",
          "❤️",
          "🤍",
          "🥀",
          "🌹",
          "❤️",
          "🌹",
          "🤍",
          "❤️",
        ].map((emoji, i) => (
          <span key={i} className={styles.rose}>
            {emoji}
          </span>
        ))}
      </div>

      <div
        className={`${styles["letter-container"]} reveal ${hasStarted ? "visible" : ""}`}
      >
        {/* 💡 Change "My Dearest" to her name or your pet name for her */}
        <h2 className={styles["letter-greeting"]}>My Dearest Love,</h2>

        <div className={styles["letter-body"]}>
          {displayedText}
          {!isTypingDone && <span className={styles["typing-cursor"]} />}
        </div>

        {/* Signature fades in when typing is done */}
        <p
          className={`${styles["letter-signature"]} ${isTypingDone ? styles.visible : ""}`}
        >
          {/* 💡 Change this to your name */}
          Forever yours, ❤️
        </p>
      </div>
    </section>
  );
};

export default LoveLetter;
