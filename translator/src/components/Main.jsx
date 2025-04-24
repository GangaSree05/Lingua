import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import { translateWithGroq } from '../utils/groqApi';
import { speak } from '../utils/tts';
import { startSpeechRecognition } from '../utils/speechRecognition';
import { extractTextFromPDF } from '../utils/pdfReader';
import { extractTextFromImage } from '../utils/imageReader';
import SignLanguage from '../utils/SignLanguage';

const LANGUAGES = {
  English: 'en', Spanish: 'es', German: 'de', French: 'fr',
  Hindi: 'hi', Tamil: 'ta', Japanese: 'ja', Chinese: 'zh',
  Korean: 'ko', Russian: 'ru', Arabic: 'ar', Italian: 'it',
  Portuguese: 'pt', Dutch: 'nl', Turkish: 'tr', Bengali: 'bn',
  Urdu: 'ur', Greek: 'el', Thai: 'th', Vietnamese: 'vi',
};

const Main = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [sourceLang, setSourceLang] = useState('English');
  const [targetLang, setTargetLang] = useState('Tamil');
  const [showSignLanguage, setShowSignLanguage] = useState(false);

  const handleUserInput = async (type, content) => {
    if (!content.trim()) return;

    const userMessage = { sender: 'user', type, content };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);

    if (type === 'text') {
      const translated = await translateWithGroq(content, sourceLang, targetLang);
      const botMessage = { sender: 'bot', type: 'text', content: translated };
      const finalMessages = [...updatedMessages, botMessage];
      setMessages(finalMessages);
      speak(translated, targetLang);
    }

    setInput('');
  };

  const handleFileInput = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type === 'application/pdf') {
      const text = await extractTextFromPDF(file);
      handleUserInput('text', text);
    } else if (file.type.startsWith('image/')) {
      const text = await extractTextFromImage(file);
      handleUserInput('text', text);
    }
  };

  const handleSpeech = () => {
    startSpeechRecognition((text) => handleUserInput('text', text));
  };

  const handleSignResult = (text) => {
    handleUserInput('text', text);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-6">
      <Link to="/" className="text-gray-700">Home/</Link>
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-3xl shadow-2xl space-y-6">
        <h2 className="text-2xl font-bold text-center text-indigo-700 mb-2">🌍 Language Assistant Chatbot</h2>

        {/* Language selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-gray-700 mb-1">From:</label>
            <select
              className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-indigo-300"
              value={sourceLang}
              onChange={(e) => setSourceLang(e.target.value)}
            >
              {Object.keys(LANGUAGES).map((lang) => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">To:</label>
            <select
              className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-purple-300"
              value={targetLang}
              onChange={(e) => setTargetLang(e.target.value)}
            >
              {Object.keys(LANGUAGES).map((lang) => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Message Display */}
        <div className="h-[60vh] overflow-y-auto border border-gray-300 p-4 rounded-lg bg-gray-50 space-y-3">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`max-w-[80%] p-3 rounded-xl ${
                msg.sender === 'user'
                  ? 'ml-auto bg-blue-100 text-right shadow-md'
                  : 'mr-auto bg-green-100 text-left shadow-md'
              }`}
            >
              <span className="font-medium">
                {msg.sender === 'user' ? '🧑‍💬 You:' : '🤖 Bot:'}
              </span>{' '}
              {msg.content}
            </div>
          ))}
        </div>

        {/* Input & Actions */}
        <div className="flex flex-wrap gap-3">
          <input
            className="flex-1 border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
          />
          <button
            onClick={() => handleUserInput('text', input)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition"
          >
            Send
          </button>
          <button
            onClick={handleSpeech}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition"
          >
            🎤 Speak
          </button>
          <label className="cursor-pointer bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300 transition text-sm">
            📎 Upload
            <input type="file" onChange={handleFileInput} className="hidden" />
          </label>
          <button
            onClick={() => setShowSignLanguage(true)}
            className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-md transition"
          >
            🧏 Sign Language
          </button>
        </div>
      </div>

      {/* Sign Language Component */}
      {showSignLanguage && (
        <SignLanguage
          onResult={(translatedText) => {
            handleUserInput('text', translatedText);
            setShowSignLanguage(false);
          }}
          onClose={() => setShowSignLanguage(false)}
          selectedLanguage={targetLang}
        />
      )}
    </div>
  );
}

export default Main;
