import React, { useState, useEffect, useCallback } from "react";
import styles from "./MiniGame.module.css";

/**
 * MiniGame — Love Memory Match 💕
 *
 * A romantic card-matching game! She flips cards to find
 * matching emoji pairs. When all pairs are found, she gets
 * a beautiful love message.
 *
 * Much more interactive and fun than the old falling-hearts game!
 */

// 8 romantic emoji pairs = 16 cards total
const EMOJI_PAIRS = ["💕", "🌹", "💖", "💌", "🦋", "✨", "💍", "🥰"];

// Shuffle an array (Fisher-Yates)
const shuffle = (array) => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

// Create the deck: each emoji appears twice, shuffled
const createDeck = () =>
  shuffle(
    [...EMOJI_PAIRS, ...EMOJI_PAIRS].map((emoji, index) => ({
      id: index,
      emoji,
      flipped: false,
      matched: false,
    })),
  );

const MiniGame = () => {
  const [gameState, setGameState] = useState("idle"); // idle | playing | won
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]); // indices of currently flipped
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [locked, setLocked] = useState(false); // prevent clicks during comparison
  const [timer, setTimer] = useState(0);

  // Start or restart the game
  const startGame = () => {
    setCards(createDeck());
    setFlippedCards([]);
    setMoves(0);
    setMatches(0);
    setLocked(false);
    setTimer(0);
    setGameState("playing");
  };

  // Timer — counts up while playing
  useEffect(() => {
    if (gameState !== "playing") return;
    const interval = setInterval(() => setTimer((t) => t + 1), 1000);
    return () => clearInterval(interval);
  }, [gameState]);

  // Check for a win
  useEffect(() => {
    if (gameState === "playing" && matches === EMOJI_PAIRS.length) {
      // Small delay so the last match animation plays
      setTimeout(() => setGameState("won"), 600);
    }
  }, [matches, gameState]);

  // Handle card flip
  const handleCardClick = useCallback(
    (index) => {
      if (locked) return;
      const card = cards[index];
      if (card.flipped || card.matched) return;

      // Flip this card
      const newCards = [...cards];
      newCards[index] = { ...newCards[index], flipped: true };
      setCards(newCards);

      const newFlipped = [...flippedCards, index];
      setFlippedCards(newFlipped);

      // If two cards are flipped, check for a match
      if (newFlipped.length === 2) {
        setMoves((m) => m + 1);
        setLocked(true);

        const [first, second] = newFlipped;

        if (newCards[first].emoji === newCards[second].emoji) {
          // Match found! 🎉
          setTimeout(() => {
            setCards((prev) =>
              prev.map((c, i) =>
                i === first || i === second ? { ...c, matched: true } : c,
              ),
            );
            setMatches((m) => m + 1);
            setFlippedCards([]);
            setLocked(false);
          }, 400);
        } else {
          // No match — flip back after a peek
          setTimeout(() => {
            setCards((prev) =>
              prev.map((c, i) =>
                i === first || i === second ? { ...c, flipped: false } : c,
              ),
            );
            setFlippedCards([]);
            setLocked(false);
          }, 800);
        }
      }
    },
    [cards, flippedCards, locked],
  );

  // Get a love message based on performance
  const getWinMessage = () => {
    if (moves <= 12)
      return "Perfect memory! Just like how I'll never forget the day I fell for you 💕";
    if (moves <= 18)
      return "Amazing! You matched all the love — just like we're a perfect match! 🥰";
    if (moves <= 25)
      return "You found every pair! That's how easy it is to find love when it's real 💖";
    return "You never gave up — just like I'll never give up on us! Every try was worth it 🌹";
  };

  return (
    <section className={styles["game-section"]} id="game">
      <div className={styles["game-header"]}>
        <h2>Love Memory Match 💕</h2>
        <p>Flip the cards and find all the matching pairs!</p>
      </div>

      {/* Start screen */}
      {gameState === "idle" && (
        <div className={styles["start-screen"]}>
          <span className={styles["start-emoji"]}>🃏💕</span>
          <h3>Ready to Play?</h3>
          <p>
            Match all the romantic pairs to unlock a special message! How few
            moves can you do it in? 😉
          </p>
          <button className={styles["game-btn"]} onClick={startGame}>
            Let's Play! ❤️
          </button>
        </div>
      )}

      {/* Playing state */}
      {gameState === "playing" && (
        <>
          <div className={styles["game-stats"]}>
            <span className={styles.stat}>💖 Moves: {moves}</span>
            <span className={styles.stat}>
              ✨ Pairs: {matches}/{EMOJI_PAIRS.length}
            </span>
            <span className={styles.stat}>⏱️ {timer}s</span>
          </div>

          <div className={styles["card-grid"]}>
            {cards.map((card, index) => (
              <div
                key={card.id}
                className={`${styles.card} ${card.flipped ? styles.flipped : ""} ${card.matched ? styles.matched : ""}`}
                onClick={() => handleCardClick(index)}
              >
                <div className={styles["card-inner"]}>
                  {/* Back of card */}
                  <div
                    className={`${styles["card-face"]} ${styles["card-back"]}`}
                  >
                    <span className={styles["card-back-emoji"]}>❤️</span>
                  </div>
                  {/* Front of card */}
                  <div
                    className={`${styles["card-face"]} ${styles["card-front"]}`}
                  >
                    {card.emoji}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Win screen! 🎉 */}
      {gameState === "won" && (
        <div className={styles["win-overlay"]}>
          <span className={styles["win-emoji"]}>🏆</span>
          <h2 className={styles["win-title"]}>You Found All the Love!</h2>
          <p className={styles["win-message"]}>{getWinMessage()}</p>
          <p className={styles["win-stats"]}>
            Completed in {moves} moves & {timer} seconds
          </p>
          <button className={styles["game-btn"]} onClick={startGame}>
            Play Again 🔄
          </button>
        </div>
      )}
    </section>
  );
};

export default MiniGame;
