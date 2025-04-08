🌐 Multilingual AI Chat Assistant
An AI-powered language assistant that breaks communication barriers by supporting real-time translation, text-to-speech, speech-to-text, PDF/image text extraction, 
and even sign language interpretation. Designed for seamless multilingual interaction and accessibility across the globe.

🚀 Features
📝 Text Translation: Translate typed messages between 20+ languages using Groq-powered AI.
🎤 Speech-to-Text: Speak directly, and the assistant will convert your voice to text and translate it.
🔊 Text-to-Speech: Listen to the translated messages in your chosen language.
📄 PDF & Image Translation: Upload PDFs or images and extract translatable text using pdf.js and Tesseract.js.
🧏 Sign Language Detection: Use your webcam to input ASL signs. The app detects the sign, converts it to text, and translates it to your selected language.
💬 Real-time Multilingual Chat: Chat back and forth in multiple languages smoothly.
📱 Responsive UI: Clean, modern, and mobile-friendly interface built with React + Tailwind CSS.

🛠 Tech Stack
Frontend: React.js, Tailwind CSS
AI Integration: Groq LLM (for translation and understanding)
Speech Utilities: Web Speech API (Text-to-Speech + Speech-to-Text)
Sign Detection: TensorFlow.js, Handpose, Fingerpose
PDF/Image Handling: pdf.js, Tesseract.js
Routing: React Router

📂 Project Structure
src/
├── App.jsx                  # Main Router Setup
├── utils/
│   ├── groqApi.js           # Groq API integration for translation
│   ├── aslGesture.js        # sign-language logic
│   ├── tts.js               # Text-to-speech logic
│   ├── speechRecognition.js # Voice-to-text logic
│   ├── pdfReader.js         # PDF to text extraction
│   ├── imageReader.js       # Image to text extraction
│   └── SignLanguage.jsx     # Sign language to text conversion

🧑‍💻 Getting Started
Clone the repository
bash
git clone https://github.com/yourusername/language-assistant.git
cd language-assistant
Install dependencies

npm install
Run the app

npm start
The app will run at http://localhost:5173.

🌍 Supported Languages
Supports over 20 languages including:
English, Tamil, Hindi, Spanish, French, German, Japanese, Korean, Chinese, Russian, Arabic, and more!
