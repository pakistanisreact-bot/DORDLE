const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Constants
const MIN_WORD_LENGTH = 3;
const MAX_WORD_LENGTH = 8;
const MAX_USED_WORDS_IN_PROMPT = 50;

// Helper function to get new word
const getNewWord = async (usedWords) => {
  try {
    let prompt = `Generate a single, common South Asian (Desi) daily language word, romanized in English script. The word should be between ${MIN_WORD_LENGTH} and ${MAX_WORD_LENGTH} letters long.`;
    
    if (usedWords && usedWords.length > 0) {
      const exclusionList = usedWords.join(', ');
      prompt += ` Do not generate any of these words: ${exclusionList}.`;
    }
    
    prompt += ` Do not include any explanation, definition, or punctuation. Just return the word itself.`;
    
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const word = response.text().trim().toLowerCase().replace(/[^a-z]/g, '');
    
    if (word.length < MIN_WORD_LENGTH || word.length > MAX_WORD_LENGTH) {
      console.warn(`Gemini returned a word with invalid length: "${word}". Fetching a new one.`);
      return getNewWord(usedWords);
    }
    
    return word;
  } catch (error) {
    console.error("Error fetching new word from Gemini:", error);
    throw new Error("Failed to fetch a new word from the AI service. Please check your API key and network connection.");
  }
};

// Helper function to get clue
const getClue = async (word) => {
  try {
    const prompt = `Give me a short, one-sentence clue for the desi word "${word}". Do not use the word "${word}" in your clue. The clue should hint at its meaning or use.`;
    
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    
    return response.text().trim();
  } catch (error) {
    console.error("Error fetching clue from Gemini:", error);
    throw new Error("Could not fetch a clue. The AI service might be unavailable.");
  }
};

// Routes
app.post('/api/get-word', async (req, res) => {
  try {
    const { usedWords } = req.body;
    const word = await getNewWord(usedWords || []);
    res.json({ word });
  } catch (error) {
    console.error('Error in /api/get-word:', error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/get-clue', async (req, res) => {
  try {
    const { word } = req.body;
    if (!word) {
      return res.status(400).json({ error: 'Word is required' });
    }
    const clue = await getClue(word);
    res.json({ clue });
  } catch (error) {
    console.error('Error in /api/get-clue:', error);
    res.status(500).json({ error: error.message });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Desi Wordle API is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Desi Wordle API server running on port ${PORT}`);
  console.log(`📡 Health check: http://localhost:${PORT}/api/health`);
});

module.exports = app;
