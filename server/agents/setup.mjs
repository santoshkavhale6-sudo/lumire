import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { Annotation, MessagesAnnotation } from "@langchain/langgraph";

// Define the shared state schema
export const GraphState = Annotation.Root({
    ...MessagesAnnotation.spec,
    next: Annotation({
        reducer: (x, y) => y ?? x ?? "supervisor",
        default: () => "supervisor",
    }),
});

// Initialize the ChatGoogleGenerativeAI model
console.error("DEBUG: setup.mjs - GOOGLE_API_KEY Length:", process.env.GOOGLE_API_KEY ? process.env.GOOGLE_API_KEY.length : "None");

let modelInstance;
try {
    modelInstance = new ChatGoogleGenerativeAI({
        modelName: "gemini-1.5-flash",
        temperature: 0.7,
        apiKey: process.env.GOOGLE_API_KEY,
    });
} catch (error) {
    console.error("FAILED TO INITIALIZE MODEL:", error);
    throw error; // FORCE SERVER CRASH to see log
}
if (!process.env.GOOGLE_API_KEY) {
    throw new Error("GOOGLE_API_KEY is missing in setup.mjs");
}

export const model = modelInstance;

// Agent definitions with their system prompts
export const AGENTS = {
    ceo: {
        name: "CEO Agent",
        systemPrompt: "You are the CEO of a luxury ecommerce brand. You make strategy decisions.",
    },
    developer: {
        name: "Developer Agent",
        systemPrompt: "You are a senior full-stack developer. You write clean production code.",
    },
    designer: {
        name: "Designer Agent",
        systemPrompt: "You are a luxury UI/UX designer.",
    },
    marketing: {
        name: "Marketing Agent",
        systemPrompt: "You are a growth marketing expert.",
    },
    support: {
        name: "Support Agent",
        systemPrompt: "You are customer support executive.",
    },
    data: {
        name: "Data Agent",
        systemPrompt: "You analyze sales, conversion, user data.",
    },
    testing: {
        name: "Testing Agent",
        systemPrompt: "You are a QA engineer specializing in automated and manual testing.",
    },
};

export const AGENT_NAMES = Object.keys(AGENTS);
