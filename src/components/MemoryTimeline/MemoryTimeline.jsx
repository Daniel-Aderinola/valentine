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
    date: "January 2024",
    title: "The Day We Met",
    description:
      "I didn't know it yet, but my whole life was about to change. One look, one smile, and I was yours.",
  },
  {
    emoji: "☕",
    date: "February 2024",
    title: "Our First Date",
    description:
      "Coffee, nervous laughter, and a conversation that felt like we'd known each other forever. I didn't want the night to end.",
  },
  {
    emoji: "💑",
    date: "April 2024",
    title: "We Made It Official",
    description:
      'The day you said "yes" to being mine. I swear my heart skipped three beats. Best day of my life.',
  },
  {
    emoji: "🌅",
    date: "July 2024",
    title: "Our First Trip Together",
    description:
      "Sunsets, sandy toes, and your laugh echoing across the water. I realized I could travel anywhere, as long as it's with you.",
  },
  {
    emoji: "🎄",
    date: "December 2024",
    title: "Our First Holiday Season",
    description:
      "Cozy sweaters, warm cocoa, and decorating together. You made the holidays feel magical in a way they never had before.",
  },
  {
    emoji: "❤️",
    date: "February 2026",
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
