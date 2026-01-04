import { HumanMessage, AIMessage } from "@langchain/core/messages";
import { model, AGENTS } from "./setup.mjs";

/**
 * Create an agent node that processes messages with a specific system prompt
 */
function createAgentNode(agentKey) {
    return async (state) => {
        const agent = AGENTS[agentKey];
        const systemMessage = {
            role: "system",
            content: agent.systemPrompt,
        };

        const messages = [systemMessage, ...state.messages];

        const response = await model.invoke(messages);

        return {
            messages: [
                new AIMessage({
                    content: response.content,
                    name: agentKey,
                }),
            ],
        };
    };
}

// Create individual agent nodes
export const ceoNode = createAgentNode("ceo");
export const developerNode = createAgentNode("developer");
export const designerNode = createAgentNode("designer");
export const marketingNode = createAgentNode("marketing");
export const supportNode = createAgentNode("support");
export const dataNode = createAgentNode("data");
export const testingNode = createAgentNode("testing");

/**
 * Supervisor node that routes to the appropriate agent
 */
export async function supervisorNode(state) {
    const systemPrompt = `You are a supervisor managing a team of specialists for a luxury ecommerce brand.
Your team members are:
- CEO: Strategy and business decisions
- Developer: Technical implementation and code
- Designer: UI/UX and visual design
- Marketing: Growth strategies and campaigns
- Support: Customer service and support
- Data: Analytics and data analysis
- Testing: Quality assurance and testing

Based on the user's question, respond with ONLY the name of the most appropriate team member to handle this (ceo, developer, designer, marketing, support, data, or testing).
If the query requires synthesis or multiple perspectives, YOU should answer as the supervisor and respond with "FINISH".`;

    const messages = [
        { role: "system", content: systemPrompt },
        ...state.messages,
    ];

    const response = await model.invoke(messages);
    const nextAgent = response.content.toLowerCase().trim();

    // Validate the response
    const validAgents = ["ceo", "developer", "designer", "marketing", "support", "data", "testing", "finish"];

    if (validAgents.includes(nextAgent)) {
        return { next: nextAgent };
    }

    // Default to finish if invalid response
    return { next: "FINISH" };
}
