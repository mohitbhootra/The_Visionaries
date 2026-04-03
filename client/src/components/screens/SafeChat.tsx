import { Flame, Send } from "lucide-react";

const SafeChat = () => {
  return (
    <div className="flex flex-col h-[480px]">
      {/* Chat Header */}
      <div className="px-4 py-3 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-sm">
              🦉
            </div>
            <div>
              <p className="text-xs font-semibold text-foreground">Silver Owl</p>
              <div className="flex items-center gap-1">
                <div className="status-dot bg-success" />
                <span className="text-[10px] text-muted-foreground">Peer Supporter</span>
              </div>
            </div>
          </div>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-destructive/15 border border-destructive/30 text-destructive text-[10px] font-bold uppercase tracking-wider">
            <Flame className="w-3 h-3" /> End & Burn
          </button>
        </div>
      </div>

      {/* TTL Indicator */}
      <div className="mx-4 mt-3 mb-2 flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-accent/10 border border-accent/20">
        <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
        <span className="text-[9px] text-accent font-medium">24h TTL · Auto-delete active</span>
      </div>

      {/* Messages */}
      <div className="flex-1 px-4 py-3 space-y-3 overflow-hidden">
        <div className="flex justify-end">
          <div className="chat-bubble-user max-w-[220px]">
            <p className="text-xs text-foreground">I've been feeling really overwhelmed with semester exams coming up...</p>
            <p className="text-[9px] text-muted-foreground mt-1 text-right">9:42 PM</p>
          </div>
        </div>
        <div className="flex justify-start">
          <div className="chat-bubble-peer max-w-[220px]">
            <p className="text-xs text-foreground">I hear you. That pressure is real. Want to talk about what's weighing on you most?</p>
            <p className="text-[9px] text-muted-foreground mt-1">9:43 PM</p>
          </div>
        </div>
        <div className="flex justify-end">
          <div className="chat-bubble-user max-w-[220px]">
            <p className="text-xs text-foreground">It's just... I haven't slept properly in days and I feel so alone</p>
            <p className="text-[9px] text-muted-foreground mt-1 text-right">9:44 PM</p>
          </div>
        </div>
      </div>

      {/* Trigger Detection Status */}
      <div className="mx-4 mb-2 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted">
        <div className="status-dot bg-success" />
        <span className="text-[9px] text-muted-foreground font-mono">Trigger Word Detection: CLEAR</span>
      </div>

      {/* Input */}
      <div className="px-4 pb-4">
        <div className="flex items-center gap-2 bg-secondary rounded-xl px-3 py-2.5 border border-border">
          <input
            className="flex-1 bg-transparent text-xs text-foreground placeholder:text-muted-foreground outline-none"
            placeholder="Type anonymously..."
            readOnly
          />
          <Send className="w-4 h-4 text-primary" />
        </div>
      </div>
    </div>
  );
};

export default SafeChat;
