import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, Gift, Calendar, ChevronRight, Star } from 'lucide-react';

const ValentineProposal = () => {
  const [stage, setStage] = useState(0);
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });
  const [fadeOut, setFadeOut] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);
  const [gameActive, setGameActive] = useState(false);
  const [score, setScore] = useState(0);
  const [hearts, setHearts] = useState([]);
  const [showJoke, setShowJoke] = useState(false);
  const [currentJoke, setCurrentJoke] = useState(0);
  const [answers, setAnswers] = useState({
    dreamDate: '',
    romanticGesture: '',
    specialMoment: ''
  });

  const insideJokes = [
    {
      setup: "That time we...",
      punchline: "[Subah kiss krre the and usne bol diya pehle brush krke aa.]",
      memory: "[Remember jb hum krre the and tune bola tha ruko brush krke aati hu]"
    }
  ];

  const romanticMessages = [
    {
      message: "Every moment with you feels like a beautiful dream I never want to wake up from.",
      emoji: "✨"
    },
    {
      message: "Your smile lights up my world in ways I never knew possible.",
      emoji: "🌟"
    },
    {
      message: "In your eyes, I found my home; in your heart, I found my peace.",
      emoji: "💫"
    },
    {
      message: "You're not just my valentine, you're my favorite what if that turned into my everything.",
      emoji: "💝"
    }
  ];

  useEffect(() => {
    if (showFireworks) {
      const timer = setTimeout(() => {
        setShowFireworks(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showFireworks]);

  useEffect(() => {
    if (gameActive) {
      const interval = setInterval(() => {
        setHearts(current => {
          const newHeart = {
            id: Date.now(),
            x: Math.random() * (window.innerWidth - 50),
            y: -50
          };
          return [...current, newHeart];
        });
      }, 1000);

      const moveInterval = setInterval(() => {
        setHearts(current =>
          current
            .map(heart => ({
              ...heart,
              y: heart.y + 5
            }))
            .filter(heart => heart.y < window.innerHeight)
        );
      }, 50);

      return () => {
        clearInterval(interval);
        clearInterval(moveInterval);
      };
    }
  }, [gameActive]);

  const handleHeartClick = (heartId) => {
    setScore(prevScore => {
      const newScore = prevScore + 1;
      if (newScore >= 10) {
        setHearts([]); // Clear all hearts when game is complete
      }
      return newScore;
    });
    setHearts(current => current.filter(heart => heart.id !== heartId));
  };

  const handleNoMouseEnter = (e) => {
    const maxX = window.innerWidth - 100;
    const maxY = window.innerHeight - 50;
    setButtonPosition({
      x: Math.floor(Math.random() * maxX),
      y: Math.floor(Math.random() * maxY)
    });
  };

  const handleYesClick = () => {
    setShowFireworks(true);
    setFadeOut(true);
    setTimeout(() => {
      setStage(1);
      setFadeOut(false);
    }, 500);
  };

  const handleNextStage = () => {
    setFadeOut(true);
    setTimeout(() => {
      setStage(prev => prev + 1);
      setFadeOut(false);
    }, 500);
  };

  const nextJoke = () => {
    setCurrentJoke((prev) => (prev + 1) % insideJokes.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-200 to-rose-300 flex flex-col items-center justify-center p-4 text-center overflow-hidden relative">

      {/* Fireworks Effect */}
      {showFireworks && (
        <div className="fixed inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-firework"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`
              }}
            >
              <Sparkles
                className="text-rose-500"
                size={24 + Math.random() * 24}
              />
            </div>
          ))}
        </div>
      )}

      {/* Floating hearts background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <Heart
            key={i}
            className="absolute text-red-200/50 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              width: `${30 + Math.random() * 50}px`,
              height: `${30 + Math.random() * 50}px`
            }}
          />
        ))}
      </div>

      {/* Mini-game hearts */}
      {gameActive && hearts.map(heart => (
        <div
          key={heart.id}
          className="absolute cursor-pointer transition-transform hover:scale-110"
          style={{ left: heart.x, top: heart.y }}
          onClick={() => handleHeartClick(heart.id)}
        >
          <Heart className="text-rose-500" size={32} />
        </div>
      ))}

      {/* Main Content */}
      <div className={`z-10 space-y-6 w-full max-w-md transition-opacity duration-500 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>

        {stage === 0 && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-2xl">
            <h1 className="text-3xl font-bold text-rose-600 mb-6">
              Will You Be My Valentine?
            </h1>
            <div className="space-y-4">
              <button
                onClick={handleYesClick}
                className="bg-rose-500 text-white px-6 py-3 rounded-full hover:bg-rose-600 transition duration-300 text-xl font-semibold w-full"
              >
                Yes, I'll Be Your Valentine!
              </button>
              <button
                onMouseEnter={handleNoMouseEnter}
                style={{
                  position: 'absolute',
                  left: buttonPosition.x,
                  top: buttonPosition.y
                }}
                className="bg-gray-200 text-gray-700 px-6 py-3 rounded-full hover:bg-gray-300 transition duration-300 text-xl font-semibold"
              >
                No
              </button>
            </div>
          </div>
        )}

        {stage === 1 && (
          <>
            {!gameActive ? (
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-2xl text-center">
                <div className="flex justify-center mb-4">
                  <Heart className="text-rose-500" size={64} />
                </div>
                <img
                  src="https://i.postimg.cc/Z5fWK8jv/Her.jpg"
                  alt="Your eyes"
                  className="mx-auto rounded-lg mb-6 shadow-lg"
                />
                <div className="space-y-4 mb-8">
                  <p className="text-xl text-rose-800 italic font-serif">
                  In your eyes, the stars align,
Golden flecks in amber shine.
A universe, so deep, so wide,
                  </p>
                  <p className="text-xl text-rose-800 italic font-serif">
                    A universe of dreams within their glow,
                    Your eyes speak truths that only hearts can know.
                    In them I see my future, clear and bright,
                    A love that guides me through the darkest night.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setScore(0);
                    setGameActive(true);
                  }}
                  className="bg-rose-500 text-white px-6 py-3 rounded-full hover:bg-rose-600 transition duration-300 text-xl font-semibold"
                >
                  Play a Game With Me! ❤️
                </button>
              </div>
            ) : (
              score >= 10 ? (
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-2xl text-center">
                  <div className="flex justify-center mb-4">
                    <Heart className="text-rose-500" size={64} />
                  </div>
                  <h2 className="text-3xl font-bold text-rose-600 mb-4">Kya baat hai, Love! ❤️</h2>
                  <p className="text-xl text-rose-800 mb-4">You caught all the hearts!</p>

                  <div className="relative w-full h-64 mb-6">
                    <img
                      src="https://i.postimg.cc/rpL9czX7/Whats-App-Image-2025-02-08-at-22-29-59.jpg"
                      alt="A special photo of us"
                      className="rounded-lg shadow-lg object-cover w-full h-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-lg flex items-end justify-center p-4">
                      <p className="text-white text-lg font-medium"></p>
                    </div>
                  </div>

                  <button
                    onClick={handleNextStage}
                    className="bg-rose-500 text-white px-6 py-3 rounded-full hover:bg-rose-600 transition duration-300 text-xl font-semibold"
                  >
                    Continue Our Journey ✨
                  </button>
                </div>
              ) : (
                <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-white/80 backdrop-blur-sm rounded-full px-6 py-2 shadow-xl">
                  <span className="text-rose-600 font-semibold">Score: {score}/10 - Click the falling hearts!</span>
                </div>
              )
            )}
          </>
        )}

        {stage === 2 && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-2xl">
            <h2 className="text-2xl font-bold text-rose-600 mb-6">Our Special Memories</h2>
            <div className="mb-8">
              <div className="bg-white/60 rounded-xl p-4 mb-4">
                <h3 className="text-xl font-semibold text-rose-600 mb-2">{insideJokes[currentJoke].setup}</h3>
                <p className="text-lg text-rose-800 mb-2">{insideJokes[currentJoke].punchline}</p>
                <p className="text-md text-gray-600 italic">{insideJokes[currentJoke].memory}</p>
              </div>
              <button
                onClick={nextJoke}
                className="text-rose-600 hover:text-rose-700 font-medium"
              >
                Next Memory →
              </button>
            </div>

            <div className="space-y-4">
              {romanticMessages.map((item, index) => (
                <div
                  key={index}
                  className="bg-white/60 rounded-xl p-6 transform hover:scale-105 transition-transform duration-300"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-3xl">{item.emoji}</span>
                    <div className="h-px flex-grow mx-4 bg-rose-200"></div>
                    <Heart className="text-rose-400" size={24} />
                  </div>
                  <p className="text-lg text-rose-800 italic font-serif text-center">
                    "{item.message}"
                  </p>
                </div>
              ))}
            </div>

            <button
              onClick={handleNextStage}
              className="mt-8 bg-rose-500 text-white px-6 py-3 rounded-full hover:bg-rose-600 transition duration-300 text-xl font-semibold"
            >
              Continue to Questions ❤️
            </button>
          </div>
        )}

        {stage === 3 && (
          <form
            action="https://formspree.io/f/mpwqlrqn"
            method="POST"
            className="space-y-4 bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-2xl"
          >
            <div className="flex justify-center mb-4">
              <Heart className="text-rose-500" size={64} />
            </div>
            <h2 className="text-3xl font-bold text-rose-600 mb-6">
              Ab kuch sawalo ke jawab..
            </h2>

            <label className="block">
              What's your dream date? 🌟
              <input
                type="text"
                name="dreamDate"
                value={answers.dreamDate}
                onChange={(e) => setAnswers({ ...answers, dreamDate: e.target.value })}
                required
                className="w-full p-2 mt-1 border rounded-md"
              />
            </label>

            <label className="block">
              What's the most romantic gesture I did that you love most? 💕
              <input
                type="text"
                name="romanticGesture"
                value={answers.romanticGesture}
                onChange={(e) => setAnswers({ ...answers, romanticGesture: e.target.value })}
                required
                className="w-full p-2 mt-1 border rounded-md"
              />
            </label>

            <label className="block">
              What's a special moment we've shared? ✨
              <input
                type="text"
                name="specialMoment"
                value={answers.specialMoment}
                onChange={(e) => setAnswers({ ...answers, specialMoment: e.target.value })}
                required
                className="w-full p-2 mt-1 border rounded-md"
              />
            </label>

            <button
              type="submit"
              className="bg-rose-500 text-white px-6 py-3 rounded-full hover:bg-rose-600 transition duration-300 text-xl font-semibold w-full"
            >
              Submit 💌
            </button>
          </form>
        )}

        {stage === 4 && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-2xl text-center">
            <div className="flex justify-center mb-4">
              <Heart className="text-rose-500" size={64} />
            </div>
            <h3 className="text-3xl font-bold text-rose-600 mb-4">
              Thank You for Being My Valentine! ❤️
            </h3>
            <p className="text-lg text-rose-800 mb-4">
              Your responses mean the world to me. Every word is like a treasure I'll hold forever. 💌
            </p>
            <img
              src="https://i.postimg.cc/Z5fWK8jv/Her.jpg"
              alt="Sweet memory"
              className="w-full rounded-lg mb-6 shadow-lg"
            />
            <p className="text-lg text-gray-700">
              You're truly the best part of my life, and this journey has just begun. Here's to a lifetime of memories and love! ✨
            </p>
            <p className="text-gray-600 text-sm mt-4">
              (P.S. Don't forget to give me a big hug when you see this! 🤗)
            </p>
          </div>
        )}

      </div>
    </div>
  );
};

export default ValentineProposal;
