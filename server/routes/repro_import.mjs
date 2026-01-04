
try {
    const importedModule = await import("../agents/graph.mjs");
    console.log("Keys:", Object.keys(importedModule));
    console.log("agentGraph:", importedModule.agentGraph);
    if (importedModule.agentGraph) {
        console.log("Type:", typeof importedModule.agentGraph);
        console.log("Has invoke:", typeof importedModule.agentGraph.invoke);
    }
} catch (error) {
    console.error("Import failed:", error);
}
