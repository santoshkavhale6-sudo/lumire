import 'dotenv/config';
import { agentGraph } from "./agents/graph.mjs";

console.log("Graph imported successfully");

try {
    const result = await agentGraph.invoke({ messages: [{ role: "user", content: "hi" }] });
    console.log("Graph execution result:", result);
} catch (e) {
    console.error("Graph execution error:", e);
}
