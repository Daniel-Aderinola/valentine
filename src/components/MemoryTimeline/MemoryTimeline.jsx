import React, { useEffect, useRef } from "react";
import styles from "./MemoryTimeline.module.css";

/**
 * MemoryTimeline — A vertical timeline of your love story.
 *
 * PERSONALIZATION TIPS:
 * - Replace each memory with real dates, events, and descriptions
 * - Add photos by using <img> tags inside the cards
 * - Add or remove memories as needed
 * - Change emojis to match each memory
 */

// 💡 REPLACE THESE WITH YOUR REAL LOVE STORY MEMORIES!
const memories = [
  {
    emoji: "✨",
    date: "06th December 2025",
    title: "The Day We Met",
    description:
      "I didn't know it yet, but my whole life was about to change. One look, one smile, and I was yours.",
  },
  {
    emoji: "🌊",
    date: " 11th December 2025",
    title: "Our First Date",
    description:
      "Sat at the side of the water, the view was lovly but your smile was the real highlight. I knew then that I wanted to see you again and again.",
  },
  {
    emoji: "⛪",
    date: "14th December 2025",
    title: "Went to church together",
    description:
      'it wad a wonderful day, we had a great time together and I felt so happy to be with you. I knew then that I wanted to spend the rest of my life with you.',
  },
  {
    emoji: "🚗",
    date: "14th December 2025",
    title: "Our First Trip Together",
    description:
      "After church we went to watch a game then we went to a concert together, still one of my favorite memories. I had so much fun with you and I felt so happy to be with you.",
  },
  {
    emoji: "🎄",
    date: "December 2025/ January 2026",
    title: "Our First Holiday Season",
    description:
      "We entered the New year together, can forget how cold i was but it was all worth it because i was with you. ",
  },
  {
    emoji: "❤️",
    date: " 14th February 2026",
    title: "Today — Still Falling for You",
    description:
      "Every single day, I fall a little more in love with you. And I know tomorrow I'll love you even more.",
  },
];

const MemoryTimeline = () => {
  const itemRefs = useRef([]);

  // Scroll-reveal for each timeline card
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.2 },
    );

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles["timeline-section"]} id="timeline">
      {/* Animated background orbs */}
      <div className={styles["bg-orbs"]}>
        <div className={`${styles.orb} ${styles.orb1}`} />
        <div className={`${styles.orb} ${styles.orb2}`} />
        <div className={`${styles.orb} ${styles.orb3}`} />
        <div className={`${styles.orb} ${styles.orb4}`} />
      </div>

      {/* Floating sparkles */}
      <div className={styles.sparkles}>
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className={styles.sparkle} />
        ))}
      </div>

      <div className={styles["timeline-header"]}>
        <h2>Our Love Story</h2>
        <p>Every moment with you is a memory I treasure 💕</p>
      </div>

      <div className={styles.timeline}>
        {memories.map((memory, index) => (
          <div
            key={index}
            className={`${styles["timeline-item"]} reveal`}
            ref={(el) => (itemRefs.current[index] = el)}
          >
            <div className={styles["timeline-dot"]} />
            <span className={styles["timeline-emoji"]}>{memory.emoji}</span>
            <p className={styles["timeline-date"]}>{memory.date}</p>
            <h3 className={styles["timeline-title"]}>{memory.title}</h3>
            <p className={styles["timeline-desc"]}>{memory.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MemoryTimeline;
