import React, { useState, useEffect, useRef } from 'react';

// --- Data for 5-Year-Old (Visual & Audio Heavy) ---

const alphabetData = [
  { letter: "A", word: "Apple", hebrew: "תפוח", icon: "🍎" },
  { letter: "B", word: "Ball", hebrew: "כדור", icon: "⚽" },
  { letter: "C", word: "Cat", hebrew: "חתול", icon: "🐱" },
  { letter: "D", word: "Dog", hebrew: "כלב", icon: "🐶" },
  { letter: "E", word: "Elephant", hebrew: "פיל", icon: "🐘" },
  { letter: "F", word: "Fish", hebrew: "דג", icon: "🐟" },
  { letter: "G", word: "Gorilla", hebrew: "גורילה", icon: "🦍" },
  { letter: "H", word: "Hat", hebrew: "כובע", icon: "🎩" },
  { letter: "I", word: "Ice cream", hebrew: "גלידה", icon: "🍦" },
  { letter: "J", word: "Juice", hebrew: "מיץ", icon: "🧃" }
];

const firstWordsData = [
  { en: "Sun", he: "שמש", icon: "☀️", letters: ["S", "u", "n"] },
  { en: "Bus", he: "אוטובוס", icon: "🚌", letters: ["B", "u", "s"] },
  { en: "Car", he: "אוטו", icon: "🚗", letters: ["C", "a", "r"] },
  { en: "Bug", he: "חרק", icon: "🐞", letters: ["B", "u", "g"] },
  { en: "Pig", he: "חזיר", icon: "🐷", letters: ["P", "i", "g"] },
  { en: "Cow", he: "פרה", icon: "🐮", letters: ["C", "o", "w"] },
  { en: "Bat", he: "עטלף", icon: "🦇", letters: ["B", "a", "t"] },
  { en: "Bed", he: "מיטה", icon: "🛏️", letters: ["B", "e", "d"] }
];

const simpleSentencesData = [
  { text: "I see a cat", audio: "I see a cat", icon: "👀 🐱" },
  { text: "The sun is hot", audio: "The sun is hot", icon: "☀️ 🥵" },
  { text: "I like ice cream", audio: "I like ice cream", icon: "❤️ 🍦" },
  { text: "The dog can run", audio: "The dog can run", icon: "🐶 🏃" }
];

export default function App() {
  // Lottie Animation setup
  useEffect(() => {
    if (!customElements.get('dotlottie-wc')) {
      const script = document.createElement('script');
      script.src = "https://unpkg.com/@lottiefiles/dotlottie-wc@0.9.3/dist/dotlottie-wc.js";
      script.type = "module";
      document.head.appendChild(script);
    }
  }, []);

  const [view, setView] = useState('abc');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeAnim, setActiveAnim] = useState(null);

  // Find It Game State
  const [findItTarget, setFindItTarget] = useState(null);
  const [findItOptions, setFindItOptions] = useState([]);

  // Match Game State
  const [matchCards, setMatchCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);

  // Audio function specifically tuned for young kids (slow and enthusiastic)
  const speak = (text) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.75; // Very slow and clear
    utterance.pitch = 1.2; // Friendly pitch
    window.speechSynthesis.speak(utterance);
  };

  const playSound = (type) => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      if (type === 'success') {
        osc.frequency.setValueAtTime(400, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.2);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
      } else {
        osc.frequency.setValueAtTime(200, ctx.currentTime);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
      }
      osc.start();
      osc.stop(ctx.currentTime + 0.5);
    } catch (e) {}
  };

  const triggerAnim = (type) => {
    setActiveAnim(type);
    setTimeout(() => setActiveAnim(null), 2000);
  };

  // --- Games Logic ---

  const startFindItGame = () => {
    const target = firstWordsData[Math.floor(Math.random() * firstWordsData.length)];
    const others = firstWordsData.filter(w => w.en !== target.en).sort(() => 0.5 - Math.random()).slice(0, 3);
    const options = [...others, target].sort(() => 0.5 - Math.random());

    setFindItTarget(target);
    setFindItOptions(options);
    setView('find');

    setTimeout(() => {
      speak(`Where is the ${target.en}?`);
    }, 500);
  };

  const handleFindItClick = (selected) => {
    if (selected.en === findItTarget.en) {
      playSound('success');
      triggerAnim('success-check');
      speak(`Yes! ${selected.en}!`);
      setTimeout(startFindItGame, 2000);
    } else {
      playSound('error');
      speak(`No, that is a ${selected.en}. Where is the ${findItTarget.en}?`);
    }
  };

  const startMatchGame = () => {
    // We match Letter to Icon for 5yo
    const selected = alphabetData.sort(() => 0.5 - Math.random()).slice(0, 3);
    let cards = [];
    selected.forEach((item, i) => {
      cards.push({ id: `letter-${i}`, display: item.letter, type: 'letter', pairId: i, sound: item.letter });
      cards.push({ id: `icon-${i}`, display: item.icon, type: 'icon', pairId: i, sound: item.word });
    });
    setMatchCards(cards.sort(() => 0.5 - Math.random()));
    setFlippedCards([]);
    setMatchedPairs([]);
    setView('match');
  };

  const handleCardClick = (card) => {
    if (flippedCards.length === 2 || flippedCards.some(c => c.id === card.id) || matchedPairs.includes(card.pairId)) return;

    speak(card.sound);
    const newFlipped = [...flippedCards, card];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      if (newFlipped[0].pairId === newFlipped[1].pairId) {
        playSound('success');
        setTimeout(() => {
          setMatchedPairs(prev => [...prev, newFlipped[0].pairId]);
          setFlippedCards([]);
          if (matchedPairs.length + 1 === 3) triggerAnim('confetti');
        }, 800);
      } else {
        playSound('error');
        setTimeout(() => setFlippedCards([]), 1200);
      }
    }
  };

  // --- Render Helpers ---

  const NavButton = ({ icon, label, target, action, color }) => (
    <button
      onClick={() => { if(action) action(); else { setView(target); setCurrentIndex(0); } }}
      className={`flex flex-col items-center justify-center p-3 rounded-3xl border-b-8 active:border-b-0 active:translate-y-2 transition-all ${view === target ? `bg-${color}-500 text-white border-${color}-700` : `bg-white text-slate-700 border-${color}-200 hover:bg-${color}-50`}`}
    >
      <span className="text-4xl mb-1">{icon}</span>
      <span className="font-black text-sm">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-sky-100 p-4 md:p-8 font-sans select-none" dir="rtl">
      <div className="max-w-4xl mx-auto">

        {/* Animations */}
        {activeAnim === 'success-check' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none bg-white/40 backdrop-blur-sm">
            {/* Removed lottie component due to 403 error. Replaced with simple text animation. */}
             <div className="text-[150px] animate-bounce">✅</div>
          </div>
        )}
        {activeAnim === 'confetti' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none bg-white/40 backdrop-blur-sm">
             {/* Removed lottie component due to 403 error. Replaced with simple text animation. */}
            <div className="text-[150px] animate-spin">🎉</div>
          </div>
        )}

        <header className="text-center mb-8">
          <h1 className="text-5xl font-black text-yellow-500 drop-shadow-md mb-6 tracking-wide" style={{ WebkitTextStroke: '2px #d97706' }}>
            הספארי של אייל 🦁
          </h1>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <NavButton icon="🅰️" label="אותיות" target="abc" color="red" />
            <NavButton icon="🐱" label="מילים" target="words" color="blue" />
            <NavButton icon="🔍" label="איפה אני?" target="find" action={startFindItGame} color="green" />
            <NavButton icon="🃏" label="זוגות" target="match" action={startMatchGame} color="purple" />
            <NavButton icon="🗣️" label="משפטים" target="sentences" color="orange" />
          </div>
        </header>

        {/* --- ABC VIEW --- */}
        {view === 'abc' && (
          <div className="bg-white rounded-[3rem] p-10 shadow-2xl border-4 border-red-200 text-center relative overflow-hidden">
            <div className="absolute top-4 right-4 bg-red-100 text-red-600 font-bold px-4 py-2 rounded-full border-2 border-red-300">
              {currentIndex + 1} / {alphabetData.length}
            </div>

            <button
              onClick={() => speak(`${alphabetData[currentIndex].letter} is for ${alphabetData[currentIndex].word}`)}
              className="mt-8 text-[150px] leading-none font-black text-red-500 hover:scale-110 transition-transform cursor-pointer drop-shadow-lg"
              dir="ltr"
            >
              {alphabetData[currentIndex].letter}
            </button>

            <div className="flex justify-center items-center gap-6 mt-8">
              <span className="text-8xl animate-bounce">{alphabetData[currentIndex].icon}</span>
              <div className="text-left" dir="ltr">
                <p className="text-5xl font-black text-slate-800">{alphabetData[currentIndex].word}</p>
                <p className="text-2xl text-slate-400 font-bold" dir="rtl">{alphabetData[currentIndex].hebrew}</p>
              </div>
            </div>

            <div className="flex justify-between mt-12">
              <button onClick={() => setCurrentIndex(prev => (prev - 1 + alphabetData.length) % alphabetData.length)} className="w-20 h-20 bg-slate-100 rounded-full text-3xl flex items-center justify-center hover:bg-slate-200 border-b-4 border-slate-300 active:border-b-0 active:translate-y-1">⬅️</button>
              <button onClick={() => speak(alphabetData[currentIndex].word)} className="w-24 h-24 bg-red-500 rounded-full text-5xl flex items-center justify-center hover:bg-red-400 border-b-8 border-red-700 active:border-b-0 active:translate-y-2 text-white">🔊</button>
              <button onClick={() => setCurrentIndex(prev => (prev + 1) % alphabetData.length)} className="w-20 h-20 bg-slate-100 rounded-full text-3xl flex items-center justify-center hover:bg-slate-200 border-b-4 border-slate-300 active:border-b-0 active:translate-y-1">➡️</button>
            </div>
          </div>
        )}

        {/* --- WORDS VIEW --- */}
        {view === 'words' && (
          <div className="bg-white rounded-[3rem] p-10 shadow-2xl border-4 border-blue-200 text-center">
            <span className="text-[120px] drop-shadow-xl">{firstWordsData[currentIndex].icon}</span>

            <div className="flex justify-center gap-4 mt-8 mb-4" dir="ltr">
              {firstWordsData[currentIndex].letters.map((char, i) => (
                <button
                  key={i}
                  onClick={() => speak(char)}
                  className="w-24 h-32 bg-blue-100 border-4 border-blue-300 rounded-2xl flex items-center justify-center text-7xl font-black text-blue-600 hover:bg-blue-500 hover:text-white transition-colors"
                >
                  {char}
                </button>
              ))}
            </div>

            <p className="text-2xl text-slate-400 font-bold mb-10">{firstWordsData[currentIndex].hebrew}</p>

            <div className="flex justify-between mt-4">
              <button onClick={() => setCurrentIndex(prev => (prev - 1 + firstWordsData.length) % firstWordsData.length)} className="w-20 h-20 bg-slate-100 rounded-full text-3xl flex items-center justify-center border-b-4 border-slate-300 active:border-b-0 active:translate-y-1">⬅️</button>
              <button onClick={() => speak(firstWordsData[currentIndex].en)} className="px-10 h-20 bg-blue-500 rounded-3xl text-3xl font-black text-white flex items-center justify-center border-b-8 border-blue-700 active:border-b-0 active:translate-y-2">השמע מילה 🔊</button>
              <button onClick={() => setCurrentIndex(prev => (prev + 1) % firstWordsData.length)} className="w-20 h-20 bg-slate-100 rounded-full text-3xl flex items-center justify-center border-b-4 border-slate-300 active:border-b-0 active:translate-y-1">➡️</button>
            </div>
          </div>
        )}

        {/* --- FIND IT GAME --- */}
        {view === 'find' && findItTarget && (
          <div className="bg-white rounded-[3rem] p-10 shadow-2xl border-4 border-green-200 text-center">
            <h2 className="text-4xl font-black text-green-600 mb-2">איפה אני? 🔍</h2>
            <p className="text-xl font-bold text-slate-500 mb-8">לחץ על הרמקול ואז חפש את התמונה</p>

            <button
              onClick={() => speak(`Where is the ${findItTarget.en}?`)}
              className="w-32 h-32 bg-green-500 rounded-full mx-auto flex items-center justify-center text-6xl mb-12 border-b-8 border-green-700 active:border-b-0 active:translate-y-2 text-white"
            >
              🔊
            </button>

            <div className="grid grid-cols-2 gap-6">
              {findItOptions.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleFindItClick(opt)}
                  className="bg-slate-50 h-40 rounded-3xl border-4 border-slate-200 flex items-center justify-center text-[80px] hover:bg-green-50 hover:border-green-300 hover:scale-105 transition-all"
                >
                  {opt.icon}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* --- MATCH GAME --- */}
        {view === 'match' && (
          <div className="bg-white rounded-[3rem] p-10 shadow-2xl border-4 border-purple-200 text-center min-h-[500px]">
            <h2 className="text-4xl font-black text-purple-600 mb-8">התאם אות לתמונה 🃏</h2>

            {matchedPairs.length === 3 ? (
              <div className="py-10">
                <div className="text-[100px] mb-6">🎉</div>
                <h3 className="text-5xl font-black text-purple-500 mb-8">כל הכבוד אייל! אלוף!</h3>
                <button onClick={startMatchGame} className="px-10 py-5 bg-purple-500 text-white rounded-3xl text-3xl font-black border-b-8 border-purple-700 active:border-b-0 active:translate-y-2">שחק שוב!</button>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-4 md:gap-6">
                {matchCards.map((card, i) => {
                  const isFlipped = flippedCards.some(c => c.id === card.id);
                  const isMatched = matchedPairs.includes(card.pairId);
                  return (
                    <button
                      key={i}
                      onClick={() => handleCardClick(card)}
                      disabled={isFlipped || isMatched}
                      className={`h-32 md:h-40 rounded-3xl font-black text-6xl transition-all flex items-center justify-center border-b-8 active:border-b-0 active:translate-y-2
                        ${isMatched ? 'opacity-0 scale-90 cursor-default'
                        : isFlipped ? 'bg-purple-100 border-purple-300 text-purple-700 scale-105 border-b-4 translate-y-1'
                        : 'bg-white border-slate-300 text-slate-300 hover:bg-slate-50'}`}
                    >
                      {isFlipped || isMatched ? card.display : '❔'}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* --- SENTENCES --- */}
        {view === 'sentences' && (
          <div className="bg-white rounded-[3rem] p-10 shadow-2xl border-4 border-orange-200 text-center">
            <h2 className="text-4xl font-black text-orange-600 mb-12">משפטים ראשונים 🗣️</h2>

            <div className="text-[100px] mb-10 drop-shadow-lg">{simpleSentencesData[currentIndex].icon}</div>

            <button
              onClick={() => speak(simpleSentencesData[currentIndex].audio)}
              className="bg-orange-100 border-4 border-orange-300 rounded-3xl p-8 w-full block hover:bg-orange-200 transition-colors"
              dir="ltr"
            >
              <p className="text-5xl font-black text-slate-800">{simpleSentencesData[currentIndex].text}</p>
              <p className="text-lg text-orange-600 font-bold mt-4">לחץ כדי לשמוע 🔊</p>
            </button>

            <div className="flex justify-between mt-12">
              <button onClick={() => setCurrentIndex(prev => (prev - 1 + simpleSentencesData.length) % simpleSentencesData.length)} className="w-20 h-20 bg-slate-100 rounded-full text-3xl flex items-center justify-center border-b-4 border-slate-300 active:border-b-0 active:translate-y-1">⬅️</button>
              <button onClick={() => setCurrentIndex(prev => (prev + 1) % simpleSentencesData.length)} className="w-20 h-20 bg-slate-100 rounded-full text-3xl flex items-center justify-center border-b-4 border-slate-300 active:border-b-0 active:translate-y-1">➡️</button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
