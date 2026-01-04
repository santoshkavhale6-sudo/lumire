import { StateGraph, END } from "@langchain/langgraph";
import { GraphState } from "./setup.mjs";
import {
    supervisorNode,
    ceoNode,
    developerNode,
    designerNode,
    marketingNode,
    supportNode,
    dataNode,
    testingNode,
} from "./nodes.mjs";

/**
 * Build the agent workflow graph
 */
// Define the function
function createAgentGraph() {
    console.log("DEBUG: createAgentGraph called");
    const workflow = new StateGraph(GraphState);

    // Add nodes
    workflow.addNode("supervisor", supervisorNode);
    workflow.addNode("ceo", ceoNode);
    workflow.addNode("developer", developerNode);
    workflow.addNode("designer", designerNode);
    workflow.addNode("marketing", marketingNode);
    workflow.addNode("support", supportNode);
    workflow.addNode("data", dataNode);
    workflow.addNode("testing", testingNode);

    // Add edges from each agent back to supervisor
    const agents = ["ceo", "developer", "designer", "marketing", "support", "data", "testing"];

    agents.forEach((agent) => {
        workflow.addEdge(agent, END);
    });

    // Conditional routing from supervisor
    workflow.addConditionalEdges("supervisor", (state) => {
        return state.next === "FINISH" ? END : state.next;
    });

    // Set entry point
    workflow.setEntryPoint("supervisor");

    return workflow.compile();
}

// Export the factory function
export { createAgentGraph };
