import { useEffect, useState } from "react";
import { Flame, Send, ShieldCheck, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  getChatHistory,
  sendMessage as sendMessageApi,
  startSession,
  getAnonymousSessionTags,
} from "@/services/api";

interface Message {
  id: number;
  text: string;
  sender: "user" | "peer";
  time: string;
}

interface EmergencyContact {
  name: string;
  phone: string;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [riskStatus, setRiskStatus] = useState<"OK" | "REDIRECTING">("OK");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [emergencyContacts, setEmergencyContacts] = useState<EmergencyContact[]>([]);
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    let isActive = true;

    const initSession = async () => {
      try {
        if (!localStorage.getItem("sessionId")) {
          await startSession(getAnonymousSessionTags());
        }
        const history = await getChatHistory();
        if (!isActive) return;
        if (history?.alias) {
          localStorage.setItem("alias", history.alias);
        }
        const mapped: Message[] = Array.isArray(history?.messages)
          ? history.messages.map((msg: { sender: string; text: string; timestamp?: string }, index: number) => ({
            id: msg.timestamp ? new Date(msg.timestamp).getTime() : index,
            text: msg.text,
            sender: msg.sender === "student" ? "user" : "peer",
            time: msg.timestamp
              ? new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
              : "",
          }))
          : [];
        setMessages(mapped);
      } catch (err) {
        if (!isActive) return;
        setError("Unable to connect to chat. Please try again.");
      } finally {
        if (isActive) setIsLoading(false);
      }
    };

    initSession();
    return () => {
      isActive = false;
    };
  }, []);

  const sendMessage = async () => {
    if (!input.trim() || isSending) return;
    setError("");
    setIsSending(true);

    const newMsg: Message = {
      id: Date.now(),
      text: input,
      sender: "user",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages((prev) => [...prev, newMsg]);
    setInput("");

    try {
      const response = await sendMessageApi(newMsg.text);
      if (response?.scanResult?.riskLevel === "emergency") {
        setRiskStatus("REDIRECTING");
        setEmergencyContacts(response.emergencyContacts || []);
      } else {
        setRiskStatus("OK");
        setEmergencyContacts([]);
      }
    } catch (err) {
      setError("Message failed to send. Please retry.");
      setMessages((prev) => prev.filter((msg) => msg.id !== newMsg.id));
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col">
      <div className="flex min-h-[70vh] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        {/* Status Bar */}
        <div className="flex items-center justify-between gap-4 px-5 py-2.5 border-b border-border bg-surface-elevated">
          <div className="flex items-center gap-2.5">
            <Flame className="w-3.5 h-3.5 text-destructive" />
            <span className="text-[11px] font-mono text-destructive/80">TTL 24H: DATA BURNING INITIATED</span>
          </div>
          <div className="flex items-center gap-1.5">
            {riskStatus === "OK" ? (
              <ShieldCheck className="w-3.5 h-3.5 text-success" />
            ) : (
              <AlertTriangle className="w-3.5 h-3.5 text-warning animate-pulse" />
            )}
            <span className={`text-[11px] font-mono ${riskStatus === "OK" ? "text-success" : "text-warning"}`}>
              Risk Scan: {riskStatus}
            </span>
            {isLoading ? <span className="text-[11px] text-muted-foreground">· Connecting...</span> : null}
            {isSending ? <span className="text-[11px] text-muted-foreground">· Sending...</span> : null}
          </div>
        </div>

        {/* Peer Info */}
        <div className="px-5 py-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-primary/15 border border-primary/25 flex items-center justify-center text-sm">
              🦉
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Anonymous Peer Support</p>
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-success" />
                <span className="text-[11px] text-muted-foreground">Trained Peer Supporter</span>
              </div>
            </div>
          </div>
          <Button
            variant="destructive"
            size="sm"
            className="h-8 text-[11px] font-semibold uppercase tracking-wider gap-1.5"
          >
            <Flame className="w-3 h-3" /> End & Burn
          </Button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-5 py-5 space-y-4 bg-background">
          {error ? (
            <div className="rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-xs text-destructive">
              {error}
            </div>
          ) : null}
          {!isLoading && messages.length === 0 ? (
            <div className="rounded-xl border border-dashed border-border bg-secondary/30 px-4 py-8 text-center text-sm text-muted-foreground">
              Your secure chat is ready. Start by sharing what’s on your mind.
            </div>
          ) : null}
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`${msg.sender === "user" ? "chat-bubble-user" : "chat-bubble-peer"} max-w-[420px]`}
              >
                <p className="text-sm text-foreground leading-relaxed">{msg.text}</p>
                <p className={`text-[10px] text-muted-foreground mt-1 ${msg.sender === "user" ? "text-right" : ""}`}>
                  {msg.time}
                </p>
              </div>
            </div>
          ))}
        </div>

        {riskStatus === "REDIRECTING" && emergencyContacts.length > 0 ? (
          <div className="px-5 pb-3">
            <div className="rounded-xl border border-warning/30 bg-warning/10 p-4 space-y-2">
              <p className="text-sm font-semibold text-warning">Emergency support available now</p>
              <div className="space-y-1 text-xs text-foreground">
                {emergencyContacts.map((contact) => (
                  <div key={contact.phone} className="flex items-center justify-between gap-3">
                    <span>{contact.name}</span>
                    <span className="font-mono text-primary">{contact.phone}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}

        {/* Input */}
        <div className="px-5 pb-5 pt-3 border-t border-border bg-surface-elevated">
          <div className="flex items-center gap-2 bg-background rounded-xl px-4 py-3 border border-border shadow-sm">
            <input
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
              placeholder="Type anonymously..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              onClick={sendMessage}
              className="text-primary hover:text-primary/80 transition-colors disabled:opacity-50"
              disabled={isSending}
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
