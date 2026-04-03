import { useState } from "react";
import { Flame, Send, ShieldCheck, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Message {
  id: number;
  text: string;
  sender: "user" | "peer";
  time: string;
}

const initialMessages: Message[] = [
  { id: 1, text: "Hey, I've been feeling really overwhelmed with semester exams coming up...", sender: "user", time: "9:42 PM" },
  { id: 2, text: "I hear you. That pressure is real. Want to talk about what's weighing on you most?", sender: "peer", time: "9:43 PM" },
  { id: 3, text: "It's just... I haven't slept properly in days and I feel so alone in this.", sender: "user", time: "9:44 PM" },
  { id: 4, text: "Sleep deprivation makes everything feel harder. You're not alone — a lot of students go through this. Have you tried any relaxation techniques before bed?", sender: "peer", time: "9:45 PM" },
];

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [riskStatus, setRiskStatus] = useState<"OK" | "REDIRECTING">("OK");

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMsg: Message = {
      id: Date.now(),
      text: input,
      sender: "user",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages((prev) => [...prev, newMsg]);

    // Simulate risk scan
    const triggerWords = ["suicide", "kill myself", "end it all", "self-harm"];
    if (triggerWords.some((w) => input.toLowerCase().includes(w))) {
      setRiskStatus("REDIRECTING");
    }

    setInput("");

    // Simulate peer response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: "Thank you for sharing that. I'm here to listen — take your time.",
          sender: "peer",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)]">
      {/* Status Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-card border-b border-border">
        <div className="flex items-center gap-3">
          {/* Microscopic red burn icon */}
          <div className="flex items-center gap-1.5">
            <Flame className="w-3 h-3 text-destructive" />
            <span className="text-[10px] font-mono text-destructive/80">TTL 24H: DATA BURNING INITIATED</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          {riskStatus === "OK" ? (
            <ShieldCheck className="w-3.5 h-3.5 text-success" />
          ) : (
            <AlertTriangle className="w-3.5 h-3.5 text-warning animate-pulse" />
          )}
          <span className={`text-[10px] font-mono ${riskStatus === "OK" ? "text-success" : "text-warning"}`}>
            Risk Scan: {riskStatus}
          </span>
        </div>
      </div>

      {/* Peer Info */}
      <div className="px-4 py-3 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-primary/15 border border-primary/25 flex items-center justify-center text-sm">
            🦉
          </div>
          <div>
            <p className="text-xs font-semibold text-foreground">Silver Owl</p>
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-success" />
              <span className="text-[10px] text-muted-foreground">Trained Peer Supporter</span>
            </div>
          </div>
        </div>
        <Button variant="destructive" size="sm" className="h-7 text-[10px] font-bold uppercase tracking-wider gap-1.5">
          <Flame className="w-3 h-3" /> End & Burn
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`${msg.sender === "user" ? "chat-bubble-user" : "chat-bubble-peer"} max-w-[320px]`}>
              <p className="text-sm text-foreground leading-relaxed">{msg.text}</p>
              <p className={`text-[10px] text-muted-foreground mt-1 ${msg.sender === "user" ? "text-right" : ""}`}>
                {msg.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="px-4 pb-4 pt-2 border-t border-border bg-card">
        <div className="flex items-center gap-2 bg-secondary rounded-xl px-4 py-2.5 border border-border">
          <input
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
            placeholder="Type anonymously..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button onClick={sendMessage} className="text-primary hover:text-primary/80 transition-colors">
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
