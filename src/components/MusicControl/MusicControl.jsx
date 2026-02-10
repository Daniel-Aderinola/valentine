import React, { useState, useRef, useEffect } from "react";
import styles from "./MusicControl.module.css";

/**
 * MusicControl — A floating play/pause button for background music.
 *
 * HOW TO ADD YOUR MUSIC:
 * 1. Place an MP3 file in the /public folder (e.g., public/love-song.mp3)
 * 2. Update the MUSIC_SRC variable below with the filename
 * 3. Choose a song that's meaningful to you both!
 *
 * MUSIC SUGGESTIONS:
 * - "Perfect" by Ed Sheeran
 * - "All of Me" by John Legend
 * - "A Thousand Years" by Christina Perri
 * - "Can't Help Falling in Love" by Elvis Presley
 * - Any song that's "your song" together ❤️
 */

// 💡 CHANGE THIS to your music file path (put the file in /public folder)
const MUSIC_SRC = "/love-song.mp3";

const MusicControl = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasMusic, setHasMusic] = useState(true);
  const audioRef = useRef(null);

  useEffect(() => {
    // Create audio element
    const audio = new Audio(MUSIC_SRC);
    audio.loop = true;
    audio.volume = 0.4;
    audioRef.current = audio;

    // Check if the music file exists
    audio.addEventListener("error", () => {
      setHasMusic(false);
    });

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current || !hasMusic) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {
        // Browser may block autoplay — that's okay
        setHasMusic(false);
      });
    }
    setIsPlaying(!isPlaying);
  };

  // Don't show the button if there's no music file
  if (!hasMusic) return null;

  return (
    <button
      className={`${styles["music-btn"]} ${isPlaying ? styles.playing : ""}`}
      onClick={toggleMusic}
      title={isPlaying ? "Pause music" : "Play music"}
      aria-label={
        isPlaying ? "Pause background music" : "Play background music"
      }
    >
      {isPlaying ? "🔊" : "🔇"}
    </button>
  );
};

export default MusicControl;
