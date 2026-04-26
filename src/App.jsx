import React, { useState, useEffect, useRef } from 'react';

// --- Alphabet Data (5-Year-Old) ---
const alphabetData = [
  { letter: "A", word: "Apple", hebrew: "תפוח", icon: "🍎" },
  { letter: "B", word: "Ball", hebrew: "כדור", icon: "⚽" },
  { letter: "C", word: "Cat", hebrew: "חתול", icon: "🐱" },
  { letter: "D", word: "Dog", hebrew: "כלב", icon: "🐶" },
  { letter: "E", word: "Elephant", hebrew: "פיל", icon: "🐘" },
  { letter: "F", word: "Fish", hebrew: "דג", icon: "🐠" },
  { letter: "G", word: "Giraffe", hebrew: "ג'ירפה", icon: "🦒" },
  { letter: "H", word: "House", hebrew: "בית", icon: "🏠" },
  { letter: "I", word: "Ice Cream", hebrew: "גלידה", icon: "🍦" },
  { letter: "J", word: "Jellyfish", hebrew: "מדוזה", icon: "🪼" }
];

// --- First Words (5-Year-Old) ---
const firstWordsData = [
  { en: "Sun", he: "שמש", icon: "☀️", letters: ["S", "u", "n"] },
  { en: "Bus", he: "אוטובוס", icon: "🚌", letters: ["B", "u", "s"] },
  { en: "Car", he: "מכונית", icon: "🚗", letters: ["C", "a", "r"] },
  { en: "Bug", he: "חרק", icon: "🐛", letters: ["B", "u", "g"] },
  { en: "Pig", he: "חזיר", icon: "🐷", letters: ["P", "i", "g"] },
  { en: "Cow", he: "פרה", icon: "🐄", letters: ["C", "o", "w"] },
  { en: "Bat", he: "עטלף", icon: "🦇", letters: ["B", "a", "t"] },
  { en: "Bed", he: "מיטה", icon: "🛏️", letters: ["B", "e", "d"] }
];

// --- Simple Sentences (5-Year-Old) ---
const simpleSentencesData = [
  { text: "I see a cat", audio: "I see a cat", icon: "👀 🐱" },
  { text: "The sun is hot", audio: "The sun is hot", icon: "☀️ 🔥" },
  { text: "I like the dog", audio: "I like the dog", icon: "❤️ 🐶" },
  { text: "The car is red", audio: "The car is red", icon: "🚗 ❤️" }
];

export default function App() {
  const [currentView, setCurrentView] = useState('menu');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedLetters, setSelectedLetters] = useState([]);
  const [cardsFlipped, setCardsFlipped] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [gameMessage, setGameMessage] = useState('');

  const speechSynthRef = useRef(null);

  // Speak text function
  const speakText = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.75; // Slower for young learners
    utterance.pitch = 1.2; // Slightly higher pitch
    speechSynthesis.speak(utterance);
  };

  // --- ABC Game ---
  const handleAbcNext = () => {
    setCurrentIndex((currentIndex + 1) % alphabetData.length);
  };

  const handleAbcPrev = () => {
    setCurrentIndex((currentIndex - 1 + alphabetData.length) % alphabetData.length);
  };

  const abcView = () => {
    const current = alphabetData[currentIndex];
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-300 to-blue-100 flex flex-col items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
          <div className="text-center mb-6">
            <div className="text-9xl mb-4">{current.icon}</div>
            <div className="text-6xl font-bold text-blue-600 mb-4">{current.letter}</div>
            <div className="text-3xl font-semibold text-gray-800 mb-2">{current.word}</div>
            <div className="text-xl text-gray-600">{current.hebrew}</div>
          </div>

          <button
            onClick={() => speakText(current.word)}
            className="w-full bg-green-400 hover:bg-green-500 text-white font-bold py-3 px-4 rounded-lg mb-4 text-xl"
          >
            🔊 Hear it!
          </button>

          <div className="flex gap-3 justify-center">
            <button
              onClick={handleAbcPrev}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg text-lg"
            >
              ← Back
            </button>
            <button
              onClick={handleAbcNext}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg text-lg"
            >
              Next →
            </button>
          </div>

          <button
            onClick={() => setCurrentView('menu')}
            className="w-full mt-4 bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg"
          >
            Back to Menu
          </button>
        </div>
      </div>
    );
  };

  // --- Words Game ---
  const wordsView = () => {
    const current = firstWordsData[currentIndex];
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-300 to-purple-100 flex flex-col items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
          <div className="text-center mb-6">
            <div className="text-7xl mb-4">{current.icon}</div>
            <div className="text-4xl font-bold text-purple-600 mb-4">{current.en}</div>
            <div className="text-2xl text-gray-600">{current.he}</div>
          </div>

          <div className="mb-6">
            <p className="text-center font-bold mb-3 text-gray-700">Letter Sounds:</p>
            <div className="flex gap-2 justify-center flex-wrap">
              {current.letters.map((letter, idx) => (
                <button
                  key={idx}
                  onClick={() => speakText(letter)}
                  className="bg-yellow-300 hover:bg-yellow-400 text-black font-bold py-2 px-4 rounded-lg text-lg"
                >
                  {letter}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => speakText(current.en)}
            className="w-full bg-green-400 hover:bg-green-500 text-white font-bold py-3 px-4 rounded-lg mb-4 text-xl"
          >
            🔊 Hear Word!
          </button>

          <div className="flex gap-3 justify-center">
            <button
              onClick={() => setCurrentIndex((currentIndex - 1 + firstWordsData.length) % firstWordsData.length)}
              className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-6 rounded-lg text-lg"
            >
              ← Back
            </button>
            <button
              onClick={() => setCurrentIndex((currentIndex + 1) % firstWordsData.length)}
              className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-6 rounded-lg text-lg"
            >
              Next →
            </button>
          </div>

          <button
            onClick={() => setCurrentView('menu')}
            className="w-full mt-4 bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg"
          >
            Back to Menu
          </button>
        </div>
      </div>
    );
  };

  // --- Find It Game ---
  const findItGame = () => {
    const gameItems = alphabetData;
    const randomIndex = Math.floor(Math.random() * gameItems.length);
    const target = gameItems[randomIndex];
    const [targetIndex] = useState(randomIndex);
    const [answered, setAnswered] = useState(false);
    const [correct, setCorrect] = useState(false);

    // Get 4 random items (ensure target is included)
    const [options] = useState(() => {
      const opts = [targetIndex];
      while (opts.length < 4) {
        const idx = Math.floor(Math.random() * gameItems.length);
        if (!opts.includes(idx)) opts.push(idx);
      }
      return opts.sort(() => Math.random() - 0.5);
    });

    useEffect(() => {
      if (!answered) {
        speakText(`Find the ${target.word}!`);
      }
    }, []);

    const handleChoice = (idx) => {
      setAnswered(true);
      if (idx === targetIndex) {
        setCorrect(true);
        setScore(score + 1);
        setGameMessage('🎉 Correct! Great job!');
      } else {
        setGameMessage('Try again!');
      }
    };

    return (
      <div className="min-h-screen bg-gradient-to-b from-pink-300 to-pink-100 flex flex-col items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-2xl">
          <h2 className="text-3xl font-bold text-center mb-6 text-pink-600">Find the {target.word}!</h2>

          <div className="grid grid-cols-2 gap-4 mb-6">
            {options.map((optIdx, i) => (
              <button
                key={i}
                onClick={() => handleChoice(optIdx)}
                className="bg-gradient-to-b from-yellow-200 to-yellow-300 hover:from-yellow-300 hover:to-yellow-400 rounded-2xl p-6 shadow-lg transform hover:scale-105 transition"
              >
                <div className="text-7xl mb-2">{gameItems[optIdx].icon}</div>
                <div className="text-2xl font-bold">{gameItems[optIdx].letter}</div>
              </button>
            ))}
          </div>

          {gameMessage && (
            <div className="text-center mb-4 text-2xl font-bold text-green-600">{gameMessage}</div>
          )}

          <div className="flex gap-3 justify-center">
            <button
              onClick={() => {
                setCurrentView('findIt');
              }}
              className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-6 rounded-lg text-lg"
            >
              Play Again
            </button>
            <button
              onClick={() => setCurrentView('menu')}
              className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-6 rounded-lg text-lg"
            >
              Menu
            </button>
          </div>
        </div>
      </div>
    );
  };

  // --- Match Game ---
  const matchGame = () => {
    const gameData = alphabetData.slice(0, 3); // 3 pairs
    const [cardData] = useState(() => {
      const data = [];
      gameData.forEach((item, idx) => {
        data.push({ type: 'letter', value: item.letter, pair: idx });
        data.push({ type: 'icon', value: item.icon, pair: idx });
      });
      return data.sort(() => Math.random() - 0.5);
    });

    const [flipped, setFlipped] = useState([]);
    const [matched, setMatched] = useState([]);

    const handleCardClick = (idx) => {
      if (matched.includes(idx) || flipped.includes(idx)) return;
      const newFlipped = [...flipped, idx];
      setFlipped(newFlipped);

      if (newFlipped.length === 2) {
        if (
          cardData[newFlipped[0]].pair === cardData[newFlipped[1]].pair
        ) {
          setMatched([...matched, ...newFlipped]);
          setScore(score + 1);
        }
        setTimeout(() => setFlipped([]), 1000);
      }
    };

    if (matched.length === cardData.length) {
      return (
        <div className="min-h-screen bg-gradient-to-b from-green-300 to-green-100 flex flex-col items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl p-8 text-center w-full max-w-md">
            <div className="text-8xl mb-4">🎉</div>
            <h2 className="text-4xl font-bold text-green-600 mb-4">You Won!</h2>
            <p className="text-2xl mb-6">Great Memory!</p>
            <button
              onClick={() => {
                setCurrentView('match');
              }}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg text-xl mb-3"
            >
              Play Again
            </button>
            <button
              onClick={() => setCurrentView('menu')}
              className="w-full bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg"
            >
              Back to Menu
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-300 to-orange-100 flex flex-col items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-2xl">
          <h2 className="text-3xl font-bold text-center mb-6 text-orange-600">Match Game!</h2>
          <div className="grid grid-cols-3 gap-3 mb-6">
            {cardData.map((card, idx) => (
              <button
                key={idx}
                onClick={() => handleCardClick(idx)}
                className={`p-6 rounded-xl text-4xl font-bold transition transform ${
                  flipped.includes(idx) || matched.includes(idx)
                    ? 'bg-white text-center'
                    : 'bg-blue-400 hover:bg-blue-500'
                } ${matched.includes(idx) ? 'opacity-50' : ''}`}
              >
                {flipped.includes(idx) || matched.includes(idx) ? card.value : '?'}
              </button>
            ))}
          </div>
          <button
            onClick={() => setCurrentView('menu')}
            className="w-full bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg"
          >
            Back to Menu
          </button>
        </div>
      </div>
    );
  };

  // --- Sentences View ---
  const sentencesView = () => {
    const current = simpleSentencesData[currentIndex];
    return (
      <div className="min-h-screen bg-gradient-to-b from-teal-300 to-teal-100 flex flex-col items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
          <div className="text-center mb-6">
            <div className="text-6xl mb-4">{current.icon}</div>
            <div className="text-3xl font-bold text-teal-600 mb-4">{current.text}</div>
          </div>

          <button
            onClick={() => speakText(current.audio)}
            className="w-full bg-green-400 hover:bg-green-500 text-white font-bold py-3 px-4 rounded-lg mb-4 text-xl"
          >
            🔊 Hear it!
          </button>

          <div className="flex gap-3 justify-center">
            <button
              onClick={() => setCurrentIndex((currentIndex - 1 + simpleSentencesData.length) % simpleSentencesData.length)}
              className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-6 rounded-lg text-lg"
            >
              ← Back
            </button>
            <button
              onClick={() => setCurrentIndex((currentIndex + 1) % simpleSentencesData.length)}
              className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-6 rounded-lg text-lg"
            >
              Next →
            </button>
          </div>

          <button
            onClick={() => setCurrentView('menu')}
            className="w-full mt-4 bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg"
          >
            Back to Menu
          </button>
        </div>
      </div>
    );
  };

  // --- Menu ---
  const menuView = () => {
    return (
      <div className="min-h-screen bg-gradient-to-b from-indigo-400 to-indigo-200 flex flex-col items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md text-center">
          <div className="text-8xl mb-4">🌟</div>
          <h1 className="text-5xl font-bold text-indigo-600 mb-2">Eyal's</h1>
          <h2 className="text-4xl font-bold text-indigo-600 mb-8">Learning Games</h2>

          <div className="space-y-3">
            <button
              onClick={() => {
                setCurrentIndex(0);
                setCurrentView('abc');
              }}
              className="w-full bg-blue-400 hover:bg-blue-500 text-white font-bold py-4 px-4 rounded-xl text-2xl"
            >
              🔤 ABC's
            </button>
            <button
              onClick={() => {
                setCurrentIndex(0);
                setCurrentView('words');
              }}
              className="w-full bg-purple-400 hover:bg-purple-500 text-white font-bold py-4 px-4 rounded-xl text-2xl"
            >
              📚 First Words
            </button>
            <button
              onClick={() => {
                setScore(0);
                setCurrentView('findIt');
              }}
              className="w-full bg-pink-400 hover:bg-pink-500 text-white font-bold py-4 px-4 rounded-xl text-2xl"
            >
              🔍 Find It!
            </button>
            <button
              onClick={() => {
                setScore(0);
                setCurrentView('match');
              }}
              className="w-full bg-orange-400 hover:bg-orange-500 text-white font-bold py-4 px-4 rounded-xl text-2xl"
            >
              🎮 Match Game
            </button>
            <button
              onClick={() => {
                setCurrentIndex(0);
                setCurrentView('sentences');
              }}
              className="w-full bg-teal-400 hover:bg-teal-500 text-white font-bold py-4 px-4 rounded-xl text-2xl"
            >
              📖 Sentences
            </button>
          </div>

          <p className="mt-6 text-lg text-gray-600">Score: {score}</p>
        </div>
      </div>
    );
  };

  // --- Main Render ---
  return (
    <div className="font-sans">
      {currentView === 'menu' && menuView()}
      {currentView === 'abc' && abcView()}
      {currentView === 'words' && wordsView()}
      {currentView === 'findIt' && findItGame()}
      {currentView === 'match' && matchGame()}
      {currentView === 'sentences' && sentencesView()}
    </div>
  );
}
