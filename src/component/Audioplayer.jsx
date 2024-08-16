import React, { useState, useEffect, useRef } from "react";

const languageCodes = {
  en: "en-US",
  es: "es-ES",
  fr: "fr-FR",
  de: "de-DE",
  it: "it-IT",
  zh: "zh-CN",
  hi: "hi-IN",
};
const Audioplayer = ({ story, language, title, img }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(0);
  const speechSynthesisUtterance = useRef(null);
  const handleSpeak = () => {
    if (story.trim() === "") {
      return;
    }

    const utterance = new SpeechSynthesisUtterance(
      story.slice(currentPosition)
    );
    utterance.lang = languageCodes[language];
    utterance.rate = 0.7;
    speechSynthesisUtterance.current = utterance;

    utterance.onboundary = (event) => {
      if (event.name === "word") {
        setCurrentPosition(event.charIndex);
      }
    };

    utterance.onend = () => {
      setCurrentPosition(0); // Reset position after speech ends
    };

    speechSynthesis.speak(utterance);
  };

  const handleStop = () => {
    setIsPlaying(false);
    if (speechSynthesisUtterance.current) {
      speechSynthesis.cancel();
    }
  };

  const handleResume = () => {
    if (currentPosition < story.length) {
      setIsPlaying(true);
      handleSpeak();
    }
  };
  useEffect(() => {
    handleStop();
    setCurrentPosition(0);
  }, [languageCodes, language]);
  return (
    <div className="flex flex-col items-center p-6 bg-gray-200 rounded-lg shadow-md lg:w-[50%] md:[50%] w-[80%]  mx-auto lg:m-8 md:m-8 h-96">
      <div className="w-full flex items-center justify-between mb-4">
        <h3 className="text-gray-800 font-bold">{title}</h3>
      </div>
      <div className="relative w-full mb-4">
        <img
          src={img}
          alt="Book Cover"
          className="w-full h-48 object-cover rounded-lg"
        />
      </div>

      <div className="w-full flex items-center justify-between mb-4">
        <button className="text-gray-500">
          <i className="fas fa-step-backward"></i>
        </button>
        <button className="text-gray-800 text-2xl">
          {isPlaying ? (
            <i onClick={handleStop} className="fas fa-pause"></i>
          ) : (
            <i onClick={handleResume} className="fas fa-play"></i>
          )}
        </button>
        <button className="text-gray-500">
          <i className="fas fa-step-forward"></i>
        </button>
      </div>
    </div>
  );
};

export default Audioplayer;
