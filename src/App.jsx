import React, { useState, useEffect, useRef } from "react";
import "./App.css";

// Components
import FloatingHearts from "./components/FloatingHearts/FloatingHearts";
import Landing from "./components/Landing/Landing";
import LoveLetter from "./components/LoveLetter/LoveLetter";
import MemoryTimeline from "./components/MemoryTimeline/MemoryTimeline";
import ReasonsILoveYou from "./components/ReasonsILoveYou/ReasonsILoveYou";
import MiniGame from "./components/MiniGame/MiniGame";
import Proposal from "./components/Proposal/Proposal";
import Closing from "./components/Closing/Closing";
import MusicControl from "./components/MusicControl/MusicControl";

/**
 * ============================================
 *  Valentine's Day Website — Main App
 * ============================================
 *
 * This is the main shell that orchestrates all sections.
 *
 * FLOW:
 * 1. She lands on the hero page and taps "Tap My Heart ❤️"
 * 2. The rest of the site smoothly reveals
 * 3. She scrolls through each section:
 *    - Love Letter (typewriter effect)
 *    - Memory Timeline (your love story)
 *    - Reasons I Love You (clickable hearts)
 *    - Mini Game (catch the hearts)
 *    - Will You Be My Valentine? (celebration!)
 *    - Closing message (romantic promise)
 *
 * PERSONALIZATION CHECKLIST:
 * ✅ Update names in Landing.jsx and Closing.jsx
 * ✅ Rewrite the love letter in LoveLetter.jsx
 * ✅ Add your real memories in MemoryTimeline.jsx
 * ✅ Write your real reasons in ReasonsILoveYou.jsx
 * ✅ Add a love song MP3 in /public/love-song.mp3
 * ✅ Add your photos (optional) in the memory cards
 */

// Section IDs for navigation dots
const sections = [
  "landing",
  "love-letter",
  "timeline",
  "reasons",
  "game",
  "proposal",
  "closing",
];

function App() {
  const [started, setStarted] = useState(false); // Has she tapped the heart?
  const [activeSection, setActiveSection] = useState(0);
  const sectionRefs = useRef([]);

  // Handle the "Tap My Heart" button click
  const handleStart = () => {
    setStarted(true);
    // Smooth scroll to the love letter after a short delay
    setTimeout(() => {
      document.getElementById("love-letter")?.scrollIntoView({
        behavior: "smooth",
      });
    }, 300);
  };

  // Track which section is currently in view (for nav dots)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sections.indexOf(entry.target.id);
            if (index !== -1) setActiveSection(index);
          }
        });
      },
      { threshold: 0.4 },
    );

    // Observe all sections
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [started]);

  // Scroll-reveal animation for section wrappers
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.15 },
    );

    document.querySelectorAll(".section-wrapper").forEach((el) => {
      observer.observe(el);
    });

    // Also handle the generic .reveal elements
    document.querySelectorAll(".reveal").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [started]);

  // Navigate to a section when a nav dot is clicked
  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <div className="app">
      {/* Floating hearts in the background — always visible */}
      <FloatingHearts />

      {/* Background music control */}
      <MusicControl />

      {/* Navigation dots on the right side */}
      {started && (
        <nav className="nav-dots" aria-label="Section navigation">
          {sections.map((id, index) => (
            <button
              key={id}
              className={`nav-dot ${activeSection === index ? "active" : ""}`}
              onClick={() => scrollToSection(id)}
              title={id.replace("-", " ")}
              aria-label={`Go to ${id.replace("-", " ")}`}
            />
          ))}
        </nav>
      )}

      {/* === SECTION 1: Landing Page === */}
      <Landing onStart={handleStart} />

      {/* === Remaining sections — revealed after tapping the heart === */}
      {started && (
        <>
          {/* === SECTION 2: Love Letter === */}
          <div className="section-wrapper">
            <LoveLetter />
          </div>

          {/* === SECTION 3: Memory Timeline === */}
          <div className="section-wrapper">
            <MemoryTimeline />
          </div>

          {/* === SECTION 4: Reasons I Love You === */}
          <div className="section-wrapper">
            <ReasonsILoveYou />
          </div>

          {/* === SECTION 5: Mini Game === */}
          <div className="section-wrapper">
            <MiniGame />
          </div>

          {/* === SECTION 6: Valentine Proposal === */}
          <div className="section-wrapper">
            <Proposal />
          </div>

          {/* === SECTION 7: Closing Page === */}
          <div className="section-wrapper">
            <Closing />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
