import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { StateGraph } from "@langchain/langgraph";

console.log("Import successful!");

try {
    const model = new ChatGoogleGenerativeAI({
        modelName: "gemini-1.5-flash",
        apiKey: "TEST_KEY"
    });
    console.log("Model initialized successfully!");
} catch (e) {
    console.error("Initialization error:", e);
}
