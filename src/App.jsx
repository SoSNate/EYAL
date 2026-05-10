import React, { useState, useEffect } from 'react';

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
  { letter: "J", word: "Juice", hebrew: "מיץ", icon: "🧃" },
  { letter: "K", word: "Kite", hebrew: "עפיפון", icon: "🪁" },
  { letter: "L", word: "Lion", hebrew: "אריה", icon: "🦁" },
  { letter: "M", word: "Monkey", hebrew: "קוף", icon: "🐒" },
  { letter: "N", word: "Nest", hebrew: "קן", icon: "🪹" },
  { letter: "O", word: "Octopus", hebrew: "תמנון", icon: "🐙" },
  { letter: "P", word: "Penguin", hebrew: "פינגווין", icon: "🐧" },
  { letter: "Q", word: "Queen", hebrew: "מלכה", icon: "👑" },
  { letter: "R", word: "Rabbit", hebrew: "ארנב", icon: "🐇" },
  { letter: "S", word: "Snake", hebrew: "נחש", icon: "🐍" },
  { letter: "T", word: "Turtle", hebrew: "צב", icon: "🐢" },
  { letter: "U", word: "Umbrella", hebrew: "מטריה", icon: "☂️" },
  { letter: "V", word: "Violin", hebrew: "כינור", icon: "🎻" },
  { letter: "W", word: "Whale", hebrew: "לוויתן", icon: "🐳" },
  { letter: "X", word: "Xylophone", hebrew: "קסילופון", icon: "🎼" },
  { letter: "Y", word: "Yoyo", hebrew: "יו-יו", icon: "🪀" },
  { letter: "Z", word: "Zebra", hebrew: "זברה", icon: "🦓" }
];

// UPDATED: Only Animals!
const animalsData = [
  { en: "Cat", he: "חתול", icon: "🐱", letters: ["C", "a", "t"] },
  { en: "Dog", he: "כלב", icon: "🐶", letters: ["D", "o", "g"] },
  { en: "Pig", he: "חזיר", icon: "🐷", letters: ["P", "i", "g"] },
  { en: "Cow", he: "פרה", icon: "🐮", letters: ["C", "o", "w"] },
  { en: "Bat", he: "עטלף", icon: "🦇", letters: ["B", "a", "t"] },
  { en: "Bug", he: "חרק", icon: "🐞", letters: ["B", "u", "g"] },
  { en: "Ant", he: "נמלה", icon: "🐜", letters: ["A", "n", "t"] },
  { en: "Fox", he: "שועל", icon: "🦊", letters: ["F", "o", "x"] },
  { en: "Hen", he: "תרנגולת", icon: "🐔", letters: ["H", "e", "n"] },
  { en: "Owl", he: "ינשוף", icon: "🦉", letters: ["O", "w", "l"] }
];

// UPDATED: Colors with dynamic Tailwind themes
const colorsData = [
  { en: "Red", he: "אדום", icon: "🔴", textColor: "text-red-600", bgActive: "bg-red-500", borderCard: "border-red-500" },
  { en: "Blue", he: "כחול", icon: "🔵", textColor: "text-blue-600", bgActive: "bg-blue-500", borderCard: "border-blue-500" },
  { en: "Yellow", he: "צהוב", icon: "🟡", textColor: "text-yellow-500", bgActive: "bg-yellow-400", borderCard: "border-yellow-400" },
  { en: "Green", he: "ירוק", icon: "🟢", textColor: "text-green-600", bgActive: "bg-green-500", borderCard: "border-green-500" },
  { en: "Orange", he: "כתום", icon: "🟠", textColor: "text-orange-500", bgActive: "bg-orange-500", borderCard: "border-orange-500" },
  { en: "Pink", he: "ורוד", icon: "🩷", textColor: "text-pink-500", bgActive: "bg-pink-400", borderCard: "border-pink-400" },
  { en: "Purple", he: "סגול", icon: "🟣", textColor: "text-purple-600", bgActive: "bg-purple-500", borderCard: "border-purple-500" },
  { en: "Black", he: "שחור", icon: "⚫", textColor: "text-slate-900", bgActive: "bg-slate-800", borderCard: "border-slate-800" },
  { en: "White", he: "לבן", icon: "⚪", textColor: "text-white", bgActive: "bg-slate-800", borderCard: "border-slate-800", customStyle: { WebkitTextStroke: '2px #1e293b' } } 
];

const pronounsData = [
  { en: "I", he: "אני", icon: "🙋‍♂️" },
  { en: "You", he: "אתה / את", icon: "🫵" },
  { en: "He", he: "הוא", icon: "👦" },
  { en: "She", he: "היא", icon: "👧" },
  { en: "We", he: "אנחנו", icon: "👨‍👩‍👧‍👦" },
  { en: "They", he: "הם", icon: "🧑‍🤝‍🧑" }
];

const simpleSentencesData = [
  { text: "I see a red car", audio: "I see a red car", icon: "👀 🔴 🚗" },
  { text: "I see a big elephant", audio: "I see a big elephant", icon: "👀 🐘" },
  { text: "I can run fast", audio: "I can run fast", icon: "🏃 💨" },
  { text: "I can jump", audio: "I can jump", icon: "🦘 ⬆️" },
  { text: "I like yellow bananas", audio: "I like yellow bananas", icon: "❤️ 🟡 🍌" },
  { text: "I like ice cream", audio: "I like ice cream", icon: "❤️ 🍦" },
  { text: "I like to play", audio: "I like to play", icon: "❤️ ⚽" }
];

// Combine arrays for games
const allPlayableItems = [...animalsData, ...colorsData, ...pronounsData];

export default function App() {
  const [view, setView] = useState('abc');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeAnim, setActiveAnim] = useState(null);

  const [findItTarget, setFindItTarget] = useState(null);
  const [findItOptions, setFindItOptions] = useState([]);

  const [matchCards, setMatchCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);

  const speak = (text) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.85; 
    utterance.pitch = 1.3; 

    const voices = window.speechSynthesis.getVoices();
    const preferredVoices = ["Microsoft Jenny Online", "Microsoft Aria Online", "Google US English", "Samantha", "Victoria"];
    
    let selectedVoice = voices.find(v => 
      v.lang.startsWith('en') && preferredVoices.some(p => v.name.includes(p))
    );

    if (!selectedVoice) {
      selectedVoice = voices.find(v => v.lang.startsWith('en') && (v.name.toLowerCase().includes('female') || v.name.toLowerCase().includes('woman')));
    }

    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

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

  const startFindItGame = () => {
    const target = allPlayableItems[Math.floor(Math.random() * allPlayableItems.length)];
    const others = allPlayableItems.filter(w => w.en !== target.en).sort(() => 0.5 - Math.random()).slice(0, 3);
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
      speak(`No, that is ${selected.en}. Where is the ${findItTarget.en}?`);
    }
  };

  const startMatchGame = () => {
    const selected = allPlayableItems.sort(() => 0.5 - Math.random()).slice(0, 3);
    let cards = [];
    selected.forEach((item, i) => {
      cards.push({ id: `en-${i}`, display: item.en, type: 'text', pairId: i, sound: item.en });
      cards.push({ id: `icon-${i}`, display: item.icon, type: 'icon', pairId: i, sound: item.en });
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

  const NavButton = ({ icon, label, target, action, color }) => (
    <button
      onClick={() => { if(action) action(); else { setView(target); setCurrentIndex(0); } }}
      className={`flex flex-col items-center justify-center py-3 px-1 rounded-2xl border-b-8 active:border-b-0 active:translate-y-2 transition-all shadow-sm ${view === target ? `bg-${color}-500 text-white border-${color}-700` : `bg-white text-slate-700 border-${color}-200 hover:bg-${color}-50`}`}
    >
      <span className="text-3xl sm:text-4xl mb-1">{icon}</span>
      <span className="font-black text-xs sm:text-sm">{label}</span>
    </button>
  );

  const renderFlashcard = (dataArray, defaultBgColor, defaultBorderColor, defaultTextColor, defaultLightBg) => {
    const currentItem = dataArray[currentIndex];
    
    // ניצן די ספּעציפֿישע טעמעס פֿון די דאַטן אויב פֿאַראַנען
    const cardBorder = currentItem.borderCard || defaultBorderColor;
    const wordColor = currentItem.textColor || defaultTextColor;
    const btnBg = currentItem.bgActive || defaultBgColor;
    const lightBg = currentItem.bgLight || defaultLightBg || "bg-slate-100";
    const customStyle = currentItem.customStyle || {};

    return (
      <div className={`bg-white rounded-[3rem] p-8 md:p-10 shadow-2xl border-4 ${cardBorder} text-center transition-colors duration-300`}>
        <span className="text-[120px] drop-shadow-xl inline-block mb-6" dir="ltr">{currentItem.icon}</span>

        <div className="mb-8" dir="ltr">
          <h2 className={`text-6xl font-black ${wordColor} mb-2 transition-colors duration-300`} style={customStyle}>{currentItem.en}</h2>
          
          {/* If the item has a 'letters' array (like the Animals), show the spelling breakdown */}
          {currentItem.letters && (
            <div className="flex justify-center gap-4 mt-8 mb-4" dir="ltr">
              {currentItem.letters.map((char, i) => (
                <button
                  key={i}
                  onClick={() => speak(char)}
                  className={`w-20 h-28 sm:w-24 sm:h-32 ${lightBg} border-4 ${cardBorder} rounded-2xl flex items-center justify-center text-5xl sm:text-7xl font-black ${wordColor} hover:${btnBg} hover:text-white transition-colors`}
                  style={customStyle}
                >
                  {char}
                </button>
              ))}
            </div>
          )}
        </div>

        <p className="text-3xl text-slate-400 font-bold mb-10">{currentItem.he}</p>

        <div className="flex justify-between mt-4">
          {/* Fixed RTL Arrows: Right arrow means Previous, Left arrow means Next */}
          <button onClick={() => setCurrentIndex(prev => (prev - 1 + dataArray.length) % dataArray.length)} className="w-16 h-16 sm:w-20 sm:h-20 bg-slate-100 rounded-full text-2xl sm:text-3xl flex items-center justify-center border-b-4 border-slate-300 active:border-b-0 active:translate-y-1">➡️</button>
          
          <button onClick={() => speak(currentItem.en)} className={`px-6 sm:px-10 h-16 sm:h-20 ${btnBg} rounded-3xl text-2xl sm:text-3xl font-black flex items-center justify-center border-b-8 active:border-b-0 active:translate-y-2 transition-colors duration-300 text-white`}>
            השמע 🔊
          </button>
          
          <button onClick={() => setCurrentIndex(prev => (prev + 1) % dataArray.length)} className="w-16 h-16 sm:w-20 sm:h-20 bg-slate-100 rounded-full text-2xl sm:text-3xl flex items-center justify-center border-b-4 border-slate-300 active:border-b-0 active:translate-y-1">⬅️</button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-sky-100 p-4 md:p-8 font-sans select-none" dir="rtl">
      <div className="max-w-4xl mx-auto">

        {/* Animations */}
        {activeAnim === 'success-check' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none bg-white/40 backdrop-blur-sm">
             <div className="text-[150px] animate-bounce">✅</div>
          </div>
        )}
        {activeAnim === 'confetti' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none bg-white/40 backdrop-blur-sm">
            <div className="text-[150px] animate-spin">🎉</div>
          </div>
        )}

        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-black text-yellow-500 drop-shadow-md mb-6 tracking-wide" style={{ WebkitTextStroke: '2px #d97706' }}>
            הספארי של אייל 🦁
          </h1>
          <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 sm:gap-4">
            <NavButton icon="🅰️" label="אותיות" target="abc" color="red" />
            <NavButton icon="🐱" label="חיות" target="words" color="blue" />
            <NavButton icon="🎨" label="צבעים" target="colors" color="pink" />
            <NavButton icon="🙋‍♂️" label="אנשים" target="pronouns" color="teal" />
            <NavButton icon="🗣️" label="משפטים" target="sentences" color="orange" />
            <NavButton icon="🔍" label="חפש!" target="find" action={startFindItGame} color="green" />
            <NavButton icon="🃏" label="זוגות" target="match" action={startMatchGame} color="purple" />
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
              <button onClick={() => setCurrentIndex(prev => (prev - 1 + alphabetData.length) % alphabetData.length)} className="w-20 h-20 bg-slate-100 rounded-full text-3xl flex items-center justify-center hover:bg-slate-200 border-b-4 border-slate-300 active:border-b-0 active:translate-y-1">➡️</button>
              <button onClick={() => speak(alphabetData[currentIndex].word)} className="w-24 h-24 bg-red-500 rounded-full text-5xl flex items-center justify-center hover:bg-red-400 border-b-8 border-red-700 active:border-b-0 active:translate-y-2 text-white">🔊</button>
              <button onClick={() => setCurrentIndex(prev => (prev + 1) % alphabetData.length)} className="w-20 h-20 bg-slate-100 rounded-full text-3xl flex items-center justify-center hover:bg-slate-200 border-b-4 border-slate-300 active:border-b-0 active:translate-y-1">⬅️</button>
            </div>
          </div>
        )}

        {/* --- WORDS VIEW --- */}
        {view === 'words' && renderFlashcard(animalsData, "bg-blue-500", "border-blue-200", "text-blue-600", "bg-blue-100")}

        {/* --- COLORS VIEW --- */}
        {view === 'colors' && renderFlashcard(colorsData, "bg-pink-500", "border-pink-200", "text-pink-600", "bg-pink-100")}

        {/* --- PRONOUNS VIEW --- */}
        {view === 'pronouns' && renderFlashcard(pronounsData, "bg-teal-500", "border-teal-200", "text-teal-600", "bg-teal-100")}

        {/* --- FIND IT GAME --- */}
        {view === 'find' && findItTarget && (
          <div className="bg-white rounded-[3rem] p-8 md:p-10 shadow-2xl border-4 border-green-200 text-center">
            <h2 className="text-4xl font-black text-green-600 mb-2">איפה אני? 🔍</h2>
            <p className="text-xl font-bold text-slate-500 mb-8">לחץ על הרמקול ואז חפש את התמונה</p>

            <button
              onClick={() => speak(`Where is the ${findItTarget.en}?`)}
              className="w-32 h-32 bg-green-500 rounded-full mx-auto flex items-center justify-center text-6xl mb-12 border-b-8 border-green-700 active:border-b-0 active:translate-y-2 text-white"
            >
              🔊
            </button>

            <div className="grid grid-cols-2 gap-4 md:gap-6">
              {findItOptions.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleFindItClick(opt)}
                  className="bg-slate-50 h-32 md:h-40 rounded-3xl border-4 border-slate-200 flex items-center justify-center text-[70px] md:text-[80px] hover:bg-green-50 hover:border-green-300 hover:scale-105 transition-all"
                  dir="ltr"
                >
                  {opt.icon}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* --- MATCH GAME --- */}
        {view === 'match' && (
          <div className="bg-white rounded-[3rem] p-6 md:p-10 shadow-2xl border-4 border-purple-200 text-center min-h-[500px]">
            <h2 className="text-3xl md:text-4xl font-black text-purple-600 mb-8">התאם מילה לתמונה 🃏</h2>

            {matchedPairs.length === 3 ? (
              <div className="py-10">
                <div className="text-[100px] mb-6">🎉</div>
                <h3 className="text-5xl font-black text-purple-500 mb-8">כל הכבוד אייל! אלוף!</h3>
                <button onClick={startMatchGame} className="px-10 py-5 bg-purple-500 text-white rounded-3xl text-3xl font-black border-b-8 border-purple-700 active:border-b-0 active:translate-y-2">שחק שוב!</button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-6">
                {matchCards.map((card, i) => {
                  const isFlipped = flippedCards.some(c => c.id === card.id);
                  const isMatched = matchedPairs.includes(card.pairId);
                  return (
                    <button
                      key={i}
                      onClick={() => handleCardClick(card)}
                      disabled={isFlipped || isMatched}
                      className={`h-28 md:h-40 rounded-3xl font-black text-3xl md:text-5xl transition-all flex items-center justify-center border-b-8 active:border-b-0 active:translate-y-2
                        ${isMatched ? 'opacity-0 scale-90 cursor-default'
                        : isFlipped ? 'bg-purple-100 border-purple-300 text-purple-700 scale-105 border-b-4 translate-y-1'
                        : 'bg-white border-slate-300 text-slate-300 hover:bg-slate-50'}`}
                        dir="ltr"
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
          <div className="bg-white rounded-[3rem] p-6 md:p-10 shadow-2xl border-4 border-orange-200 text-center">
            <h2 className="text-4xl font-black text-orange-600 mb-8">משפטים ראשונים 🗣️</h2>

            {/* Added dir="ltr" to properly align multi-emoji sequences like Eyes->Red->Car */}
            <div className="text-[80px] md:text-[100px] mb-6 md:mb-10 drop-shadow-lg leading-none" dir="ltr">
              {simpleSentencesData[currentIndex].icon}
            </div>

            <button
              onClick={() => speak(simpleSentencesData[currentIndex].audio)}
              className="bg-orange-100 border-4 border-orange-300 rounded-3xl p-6 md:p-8 w-full block hover:bg-orange-200 transition-colors"
              dir="ltr"
            >
              <p className="text-3xl md:text-5xl font-black text-slate-800 leading-tight">{simpleSentencesData[currentIndex].text}</p>
              <p className="text-lg text-orange-600 font-bold mt-4" dir="rtl">לחץ כדי לשמוע 🔊</p>
            </button>

            <div className="flex justify-between mt-10 md:mt-12">
              <button onClick={() => setCurrentIndex(prev => (prev - 1 + simpleSentencesData.length) % simpleSentencesData.length)} className="w-16 h-16 md:w-20 md:h-20 bg-slate-100 rounded-full text-2xl md:text-3xl flex items-center justify-center border-b-4 border-slate-300 active:border-b-0 active:translate-y-1">➡️</button>
              <button onClick={() => setCurrentIndex(prev => (prev + 1) % simpleSentencesData.length)} className="w-16 h-16 md:w-20 md:h-20 bg-slate-100 rounded-full text-2xl md:text-3xl flex items-center justify-center border-b-4 border-slate-300 active:border-b-0 active:translate-y-1">⬅️</button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}