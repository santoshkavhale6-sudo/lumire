"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles, Loader2, Cpu, Briefcase, Palette, TrendingUp, Headset, BarChart3, FlaskConical } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const AGENT_CONFIG = {
    supervisor: { color: "text-purple-400", bg: "bg-purple-400/10", icon: Bot, label: "Supervisor" },
    ceo: { color: "text-amber-400", bg: "bg-amber-400/10", icon: Briefcase, label: "CEO" },
    developer: { color: "text-blue-400", bg: "bg-blue-400/10", icon: Cpu, label: "Developer" },
    designer: { color: "text-pink-400", bg: "bg-pink-400/10", icon: Palette, label: "Designer" },
    marketing: { color: "text-green-400", bg: "bg-green-400/10", icon: TrendingUp, label: "Marketing" },
    support: { color: "text-orange-400", bg: "bg-orange-400/10", icon: Headset, label: "Support" },
    data: { color: "text-cyan-400", bg: "bg-cyan-400/10", icon: BarChart3, label: "Data" },
    testing: { color: "text-red-400", bg: "bg-red-400/10", icon: FlaskConical, label: "QA Testing" },
};

export default function AgentChat() {
    const [messages, setMessages] = useState([
        {
            role: "assistant",
            content: "Welcome to the LUMIÈRE AI Headquarters. I am the Supervisor. How can our team of experts assist you today?",
            agent: "supervisor",
        },
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [activeAgent, setActiveAgent] = useState(null);
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, activeAgent]);

    const sendMessage = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage = input;
        setInput("");
        setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
        setIsLoading(true);
        setActiveAgent("supervisor"); // Supervisor thinks first

        try {
            const response = await fetch("http://localhost:5004/api/agents/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: userMessage }),
            });

            const data = await response.json();

            if (data.success) {
                setMessages((prev) => [
                    ...prev,
                    { role: "assistant", content: data.response, agent: data.agent },
                ]);
                setActiveAgent(data.agent); // Show who answered
            } else {
                throw new Error(data.error || "Failed to get response");
            }
        } catch (error) {
            console.error("Chat Error:", error);
            setMessages((prev) => [
                ...prev,
                { role: "assistant", content: "I apologize, but we are experiencing connection issues with the neural network.", agent: "supervisor" },
            ]);
        } finally {
            setIsLoading(false);
            setTimeout(() => setActiveAgent(null), 3000); // Clear active agent status after a bit
        }
    };

    return (
        <div className="flex flex-col h-[700px] w-full max-w-4xl mx-auto rounded-3xl overflow-hidden border border-white/10 bg-black/40 backdrop-blur-xl shadow-2xl relative">
            {/* Header */}
            <div className="bg-white/5 border-b border-white/5 p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-amber-400 to-purple-600 flex items-center justify-center">
                        <Sparkles className="h-5 w-5 text-white" />
                    </div>
                    <div>
                        <h2 className="text-white font-serif text-lg tracking-wide">LUMIÈRE Intelligence</h2>
                        <p className="text-white/40 text-xs">Multi-Agent Neural Network Active</p>
                    </div>
                </div>

                {/* Active Agent Indicator */}
                <AnimatePresence>
                    {activeAgent && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border border-white/5 ${AGENT_CONFIG[activeAgent]?.bg || "bg-white/5"
                                } ${AGENT_CONFIG[activeAgent]?.color || "text-white"}`}
                        >
                            {isLoading ? <Loader2 className="h-3 w-3 animate-spin" /> : <div className="h-2 w-2 rounded-full bg-current animate-pulse" />}
                            {isLoading ? "Routing..." : `${AGENT_CONFIG[activeAgent]?.label} Active`}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent" ref={scrollRef}>
                {messages.map((msg, idx) => {
                    const isUser = msg.role === "user";
                    const agentInfo = !isUser ? AGENT_CONFIG[msg.agent] || AGENT_CONFIG.supervisor : null;
                    const AgentIcon = agentInfo?.icon;

                    return (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`flex gap-4 ${isUser ? "flex-row-reverse" : "flex-row"}`}
                        >
                            {/* Avatar */}
                            <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center border border-white/10 ${isUser ? "bg-white/10" : agentInfo.bg
                                }`}>
                                {isUser ? <User className="h-5 w-5 text-white" /> : <AgentIcon className={`h-5 w-5 ${agentInfo.color}`} />}
                            </div>

                            {/* Message Bubble */}
                            <div className={`flex flex-col max-w-[80%] ${isUser ? "items-end" : "items-start"}`}>
                                {!isUser && (
                                    <span className={`text-xs ml-1 mb-1 font-medium ${agentInfo.color}`}>
                                        {agentInfo.label}
                                    </span>
                                )}
                                <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-lg ${isUser
                                    ? "bg-white text-black rounded-tr-sm"
                                    : "bg-white/5 text-white/90 border border-white/5 rounded-tl-sm backdrop-blur-md"
                                    }`}>
                                    {msg.content}
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
                {isLoading && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-4">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 animate-pulse">
                            <Loader2 className="h-5 w-5 text-white/50 animate-spin" />
                        </div>
                        <div className="flex items-center gap-1">
                            <div className="h-2 w-2 bg-white/20 rounded-full animate-bounce delay-0"></div>
                            <div className="h-2 w-2 bg-white/20 rounded-full animate-bounce delay-150"></div>
                            <div className="h-2 w-2 bg-white/20 rounded-full animate-bounce delay-300"></div>
                        </div>
                    </motion.div>
                )}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white/5 border-t border-white/5">
                <div className="relative flex items-center">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                        placeholder="Ask the team (e.g., 'Analyze our latest sales data' or 'Design a new banner')"
                        className="w-full bg-black/20 border border-white/10 text-white placeholder-white/30 rounded-xl py-4 pl-6 pr-14 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all"
                        disabled={isLoading}
                    />
                    <button
                        onClick={sendMessage}
                        disabled={isLoading || !input.trim()}
                        className="absolute right-2 p-2 bg-white text-black rounded-lg hover:bg-amber-400 disabled:opacity-50 disabled:hover:bg-white transition-colors"
                    >
                        <Send className="h-5 w-5" />
                    </button>
                </div>
                <p className="text-center text-white/20 text-xs mt-3">
                    Powered by Google Gemini 1.5 Flash • LangGraph Multi-Agent System
                </p>
            </div>
        </div>
    );
}
