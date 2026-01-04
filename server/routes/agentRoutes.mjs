import express from "express";
import { HumanMessage } from "@langchain/core/messages";
// import { agentGraph } from "../agents/graph.mjs";

const router = express.Router();

/**
 * POST /api/agents/chat
 * Chat with the AI agent team
 */
router.post("/chat", async (req, res) => {
    try {
        const { message, targetAgent } = req.body;

        if (!message) {
            return res.status(400).json({ error: "Message is required" });
        }

        // Create initial state
        const initialState = {
            messages: [new HumanMessage(message)],
            next: targetAgent || "supervisor",
        };

        // Dynamic import to avoid initialization issues
        const importedModule = await import("../agents/graph.mjs");
        const { createAgentGraph } = importedModule;

        // Instantiate graph
        const agentGraph = createAgentGraph();

        // Run the graph
        const result = await agentGraph.invoke(initialState);

        // Extract the last AI message
        const lastMessage = result.messages[result.messages.length - 1];

        res.json({
            response: lastMessage.content,
            agent: lastMessage.name || "supervisor",
            success: true,
        });
    } catch (error) {
        console.error("Agent chat error structure:", error);
        console.error("Agent chat error stack:", error.stack);
        res.status(500).json({
            error: "Failed to process agent request",
            details: error.message,
            stack: error.stack
        });
    }
});

/**
 * GET /api/agents/list
 * Get list of available agents
 */
router.get("/list", (req, res) => {
    const agents = [
        { id: "ceo", name: "CEO Agent", description: "Strategy and business decisions" },
        { id: "developer", name: "Developer Agent", description: "Technical implementation" },
        { id: "designer", name: "Designer Agent", description: "UI/UX design" },
        { id: "marketing", name: "Marketing Agent", description: "Growth strategies" },
        { id: "support", name: "Support Agent", description: "Customer service" },
        { id: "data", name: "Data Agent", description: "Analytics and insights" },
        { id: "testing", name: "Testing Agent", description: "Quality assurance" },
    ];

    res.json({ agents, success: true });
});

export default router;
