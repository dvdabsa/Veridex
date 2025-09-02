
import { GoogleGenAI } from "@google/genai";

// IMPORTANT: In a real application, API keys should never be hardcoded.
// They should be stored securely on a backend server and accessed through
// environment variables (e.g., process.env.API_KEY).
// This client-side setup is for demonstration purposes only.
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    console.warn("API_KEY is not set. AI Advisor will not function.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });
const model = "gemini-2.5-flash";

const systemInstruction = `You are "Veridex AI", a highly intelligent and helpful financial advisor for a futuristic accounting system.
Your goal is to provide clear, concise, and actionable financial advice to users.
You are professional, trustworthy, and slightly futuristic in your tone.
Analyze user queries related to budgeting, expense management, forecasting, tax optimization, and business insights.
Provide personalized recommendations based on the data they might hypothetically have in the system.
Do not give legal or investment advice that would require a license. Frame your responses as educational suggestions.
Keep your answers formatted for a chat interface, using paragraphs, and bullet points where appropriate for readability.
Start your first response by introducing yourself as Veridex AI.`;

export const getFinancialAdvice = async (prompt: string): Promise<string> => {
    if (!API_KEY) {
        return "The AI Advisor is currently unavailable. The API key is missing.";
    }

    try {
        const response = await ai.models.generateContent({
            model: model,
            contents: prompt,
            config: {
                systemInstruction: systemInstruction,
            },
        });

        return response.text;
    } catch (error) {
        console.error("Error fetching from Gemini API:", error);
        if (error instanceof Error) {
            return `An error occurred while contacting the AI Advisor: ${error.message}`;
        }
        return "An unknown error occurred while contacting the AI Advisor.";
    }
};
