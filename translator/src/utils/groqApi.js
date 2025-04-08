import axios from 'axios';

/**
 * Translates text using the Groq API and the LLaMA3 model.
 * @param {string} text - The text to translate.
 * @param {string} sourceLang - The language to translate from.
 * @param {string} targetLang - The language to translate to.
 * @returns {Promise<string>} - The translated text.
 */
export const translateWithGroq = async (text, sourceLang, targetLang) => {
  const prompt = `Translate from ${sourceLang} to ${targetLang}. Only output the translated sentence:\n\n${text}`;

  try {
    const res = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: 'llama3-70b-8192',
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.3,
      },
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return res.data.choices[0].message.content.trim();
  } catch (err) {
    console.error('Groq API Error:', err.response?.data || err.message);
    return 'Translation failed. Please try again.';
  }
};
