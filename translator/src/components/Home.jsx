import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import hero from "../assets/hero.png"

const Main = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-br from-blue-100 to-purple-200">
      <header className="p-6 flex justify-between items-center bg-white shadow-md">
        <h1 className="text-2xl md:text-3xl font-bold text-purple-700">🌐 Lingua</h1>
        <button
          onClick={() => navigate('/main')}
          className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-xl shadow transition"
        >
          Try Now
        </button>
      </header>

      <main className="flex-1 p-8 md:p-16 flex flex-col md:flex-row items-center gap-12">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-1 text-center md:text-left"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-800">
            Break Language Barriers with AI ✨
          </h2>
          <p className="text-lg md:text-xl text-gray-700 mb-6">
            Empower your communication in 20+ languages through text, voice, images, PDFs, and even sign language.
          </p>
          <ul className="list-disc list-inside text-gray-600 mb-8 space-y-2">
            <li>🔤 Real-time translation</li>
            <li>🎙 Speech-to-text & text-to-speech</li>
            <li>📄 PDF & 🖼 image text extraction</li>
            <li>🧏‍♂️ Sign language recognition</li>
            <li>🎯 AI powered by Groq</li>
          </ul>
          <button
            onClick={() => navigate('/main')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 text-lg rounded-2xl shadow-md transition"
          >
            🚀 Get Started
          </button>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-1"
        >
          <img
            src={hero}
            alt="Multilingual Assistant"
            className="rounded-2xl shadow-xl w-full max-w-md mx-auto"
          />
        </motion.div>
      </main>

      <footer className="text-center p-4 bg-white shadow-inner text-gray-500 text-sm">
        © 2025 Multilingual AI Assistant | Built using React + Groq
      </footer>
    </div>
  );
};

export default Main;
