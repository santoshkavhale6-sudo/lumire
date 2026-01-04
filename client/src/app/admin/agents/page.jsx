import AgentChat from "@/components/AgentChat";

export const metadata = {
    title: "AI Agent Command Center | LUMIÈRE Admin",
    description: "Manage your ecommerce empire with an elite team of AI agents.",
};

export default function AgentsPage() {
    return (
        <div className="min-h-screen bg-black text-white p-8">
            <div className="max-w-7xl mx-auto space-y-8">

                <div className="text-center space-y-4 mb-12">
                    <h1 className="text-4xl md:text-5xl font-serif tracking-tight bg-gradient-to-r from-amber-200 via-white to-amber-200 bg-clip-text text-transparent">
                        Command Center
                    </h1>
                    <p className="text-white/60 max-w-2xl mx-auto text-lg font-light">
                        Coordinate your specialized AI workforce to execute strategy, development, and marketing operations.
                    </p>
                </div>

                <AgentChat />

            </div>
        </div>
    );
}
