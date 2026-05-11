const { GoogleGenAI } = require('@google/genai');
const API_KEY = 'AIzaSyAl0lYmg_fcE2j1XUHn73JmncwY_36USDc';

async function test() {
  try {
    const genAI = new GoogleGenAI({ apiKey: API_KEY });
    const response = await genAI.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: 'Say hello',
    });
    console.log("Success:", response.text);
  } catch (e) {
    console.error("Error:", e);
  }
}

test();
