import React, { useState } from 'react';
import { Heart, Sparkles, Gift } from 'lucide-react';

const ValentineProposal = () => {
  const [stage, setStage] = useState(0);
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
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
    setStage(1);
  };

  const handleNextStage = () => {
    setStage(2);
  };

  const handleQuestionSubmit = () => {
    const currentKey = questions[currentQuestionIndex].key;
    if (answers[currentKey].trim() !== '') {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        setStage(3);
      }
    }
  };

  const questions = [
    {
      key: 'dreamDate',
      prompt: "What's your dream date with me?",
      icon: <Heart className="text-rose-500" size={36} />
    },
    {
      key: 'romanticGesture',
      prompt: "What's the most romantic gesture I did that you love most?",
      icon: <Sparkles className="text-rose-500" size={36} />
    },
    {
      key: 'specialMoment',
      prompt: "What's a special moment we've shared?",
      icon: <Gift className="text-rose-500" size={36} />
    }
  ];

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
      <div className="z-10 space-y-6 w-full max-w-md">
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
            <h2 className="text-3xl font-bold text-rose-600 mb-6">
              Yay!! 💕
            </h2>
            <p className="text-xl text-rose-800 mb-6">
              I wanted this to happen very badly, only with you!
            </p>
            <img 
              src="https://via.placeholder.com/400x300" 
              alt="Placeholder" 
              className="mx-auto rounded-lg mb-6"
            />
            <button 
              onClick={handleNextStage}
              className="bg-rose-500 text-white px-6 py-3 rounded-full hover:bg-rose-600 transition duration-300 text-xl font-semibold"
            >
              Continue
            </button>
          </div>
        )}

        {stage === 2 && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-2xl">
            <div className="flex justify-center mb-4">
              {questions[currentQuestionIndex].icon}
            </div>
            <h2 className="text-3xl font-bold text-rose-600 mb-6">
              Let's Get to Know Each Other Better
            </h2>
            <div className="space-y-4">
              <p className="text-xl text-rose-800 mb-4">
                {questions[currentQuestionIndex].prompt}
              </p>
              <input 
                type="text"
                value={answers[questions[currentQuestionIndex].key]}
                onChange={(e) => setAnswers(prev => ({
                  ...prev, 
                  [questions[currentQuestionIndex].key]: e.target.value
                }))}
                placeholder={`Your answer to "${questions[currentQuestionIndex].prompt}"`}
                className="w-full p-3 rounded-lg border-2 border-rose-300 focus:outline-none focus:border-rose-500"
              />
              <button 
                onClick={handleQuestionSubmit}
                className="bg-rose-500 text-white px-6 py-3 rounded-full hover:bg-rose-600 transition duration-300 text-xl font-semibold w-full"
              >
                {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish'}
              </button>
            </div>
          </div>
        )}

        {stage === 3 && (
          <>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-2xl mb-6">
              <div className="flex justify-center mb-4">
                <Heart className="text-rose-500" size={48} />
              </div>
              <h3 className="text-2xl font-bold text-rose-600 mb-4">
                My Love for You
              </h3>
              <p className="text-xl text-rose-800">
                I just love you bhot sara Love ❤️ 
                Every moment with you is a treasure, 
                and my heart beats only for you.
              </p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-2xl">
              <h4 className="text-2xl font-semibold text-rose-600 mb-4">
                Our Special Moments
              </h4>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Heart className="text-rose-500 mr-3" size={24} />
                  <p className="text-rose-800">
                    <strong>Dream Date:</strong> {answers.dreamDate}
                  </p>
                </div>
                <div className="flex items-center">
                  <Sparkles className="text-rose-500 mr-3" size={24} />
                  <p className="text-rose-800">
                    <strong>Romantic Gesture:</strong> {answers.romanticGesture}
                  </p>
                </div>
                <div className="flex items-center">
                  <Gift className="text-rose-500 mr-3" size={24} />
                  <p className="text-rose-800">
                    <strong>Special Moment:</strong> {answers.specialMoment}
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ValentineProposal;