import React, { useState } from 'react';
import { Heart, Sparkles, Gift } from 'lucide-react';

const ValentineProposal = () => {
  const [stage, setStage] = useState(0);
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });
  const [fadeOut, setFadeOut] = useState(false);
  const [answers, setAnswers] = useState({
    dreamDate: '',
    romanticGesture: '',
    specialMoment: ''
  });

  const handleNoMouseEnter = (e) => {
    const maxX = window.innerWidth - 100;
    const maxY = window.innerHeight - 50;
    setButtonPosition({
      x: Math.floor(Math.random() * maxX),
      y: Math.floor(Math.random() * maxY)
    });
  };

  const handleYesClick = () => {
    setFadeOut(true);
    setTimeout(() => {
      setStage(1);
      setFadeOut(false);
    }, 500);
  };

  const handleNextStage = () => {
    setFadeOut(true);
    setTimeout(() => {
      setStage(2);
      setFadeOut(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-200 to-rose-300 flex flex-col items-center justify-center p-4 text-center overflow-hidden relative">
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
                In depths of amber, honey-touched with gold,
                Your eyes hold stories that remain untold.
                Like starlit pools in evening's gentle grace,
                They shine with warmth that time cannot erase.
              </p>
              <p className="text-xl text-rose-800 italic font-serif">
                A universe of dreams within their glow,
                Your eyes speak truths that only hearts can know.
                In them I see my future, clear and bright,
                A love that guides me through the darkest night.
              </p>
            </div>
            <button 
              onClick={handleNextStage}
              className="bg-rose-500 text-white px-6 py-3 rounded-full hover:bg-rose-600 transition duration-300 text-xl font-semibold"
            >
              Continue
            </button>
          </div>
        )}

        {stage === 2 && (
          <form
            action="https://formspree.io/f/mpwqlrqn"
            method="POST"
            className="space-y-4 bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-2xl"
          >
            <div className="flex justify-center mb-4">
              <Heart className="text-rose-500" size={64} />
            </div>
            <h2 className="text-3xl font-bold text-rose-600 mb-6">
              Ab kuch questions ke answers 
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

        {stage === 3 && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-2xl">
            <div className="flex justify-center mb-4">
              <Heart className="text-rose-500" size={48} />
            </div>
            <h3 className="text-2xl font-bold text-rose-600 mb-4">
              Thank You for Answering! ❤️
            </h3>
            <p className="text-xl text-rose-800">
              Thank You Love and i love you soo much. 💕
            </p>
            <p className="text-gray-600 text-sm mt-4">
              (Check your email if you used a valid one!)
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ValentineProposal;