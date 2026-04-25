import { GoogleGenerativeAI } from "@google/generative-ai";

// To use the Gemini API, you need an API key from Google AI Studio.
// 1. Visit https://aistudio.google.com/
// 2. Create a new API Key.
// 3. Add it to your .env file as VITE_GEMINI_API_KEY=your_key_here

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  console.warn("VITE_GEMINI_API_KEY is missing. AI features will be disabled.");
}

const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;
const model = genAI ? genAI.getGenerativeModel({ model: "gemini-1.5-flash" }) : null;

export const askGemini = async (userQuestion: string, context: string): Promise<string> => {
  if (!model) {
    throw new Error("Gemini API key is not configured.");
  }

  if (!userQuestion.trim()) {
    throw new Error("Please enter a question.");
  }

  const prompt = `
    You are VoteWise AI, a simple and friendly election education assistant for first-time and student voters.
    The user has just completed a guided voting readiness check.
    
    Context about the user's situation:
    ${context}
    
    User Question:
    ${userQuestion}
    
    Instructions:
    - Explain election concepts in very simple, beginner-friendly language.
    - Avoid large blocks of text; use bullet points if helpful.
    - Be encouraging and neutral.
    - If the question is not about elections or voting, politely decline to answer.
    - Keep the response concise.
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to get an answer from the AI. Please try again later.");
  }
};
