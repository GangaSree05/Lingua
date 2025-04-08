// Utility function to clean markdown and special characters
const cleanText = (text) => {
  return text
    .replace(/\*\*/g, '')         // bold markdown
    .replace(/\*/g, '')           // italics markdown
    .replace(/[_`~]/g, '')        // other markdown symbols
    .replace(/[\[\]()`~]/g, '')   // extra cleanup
    .replace(/\\n/g, ' ')         // literal \n
    .replace(/\n/g, ' ')          // actual newlines
    .replace(/\s+/g, ' ')         // multiple spaces
    .replace(/^\.+$/, '')         // remove only-dots text
    .trim();
};


const langMap = {
  English: 'en',
  Spanish: 'es',
  German: 'de',
  French: 'fr',
  Hindi: 'hi',
  Tamil: 'ta',
  Japanese: 'ja',
  Chinese: 'zh',
  Korean: 'ko',
  Russian: 'ru',
  Arabic: 'ar',
  Italian: 'it',
  Portuguese: 'pt',
  Dutch: 'nl',
  Turkish: 'tr',
  Bengali: 'bn',
  Urdu: 'ur',
  Greek: 'el',
  Thai: 'th',
  Vietnamese: 'vi',
};

export const speak = (text, language = 'English') => {
  const cleanedText = cleanText(text);
  const utterance = new SpeechSynthesisUtterance(cleanedText);
  utterance.lang = langMap[language] || 'en-US';

  // Select a matching voice if available
  const voices = speechSynthesis.getVoices();
  const matchingVoice = voices.find(v => v.lang === utterance.lang);
  if (matchingVoice) utterance.voice = matchingVoice;

  speechSynthesis.cancel(); // stop any ongoing speech
  speechSynthesis.speak(utterance);
};
