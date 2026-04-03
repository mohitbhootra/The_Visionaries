import { AlertTriangle, Phone, ArrowRight, ShieldAlert } from "lucide-react";

const EmergencyRoute = () => {
  return (
    <div className="px-5 pb-5 flex flex-col h-[480px]">
      {/* Alert Banner */}
      <div className="mt-3 mb-4 flex items-center gap-2.5 px-4 py-3 rounded-xl bg-destructive/15 border border-destructive/30">
        <AlertTriangle className="w-5 h-5 text-destructive shrink-0" />
        <div>
          <p className="text-xs font-bold text-destructive">Crisis Detected</p>
          <p className="text-[10px] text-destructive/80">Auto-routed via Zod Middleware</p>
        </div>
      </div>

      {/* Flow Visualization */}
      <div className="space-y-3 mb-auto">
        <div className="rounded-xl bg-secondary/60 border border-border p-3.5">
          <div className="flex items-center gap-2 mb-2">
            <ShieldAlert className="w-4 h-4 text-accent" />
            <p className="text-[10px] font-bold text-accent uppercase tracking-wider">Trigger Detected</p>
          </div>
          <p className="text-[10px] text-muted-foreground font-mono leading-relaxed">
            Keywords: "self-harm", "can't go on"
          </p>
          <p className="text-[10px] text-muted-foreground font-mono">
            → Zod validation flagged
          </p>
        </div>

        <div className="flex justify-center">
          <ArrowRight className="w-4 h-4 text-muted-foreground rotate-90" />
        </div>

        <div className="rounded-xl bg-secondary/60 border border-border p-3.5">
          <p className="text-[10px] font-bold text-foreground uppercase tracking-wider mb-2">Chat Queue Bypassed</p>
          <p className="text-[10px] text-muted-foreground">Direct route to emergency contacts</p>
        </div>

        <div className="flex justify-center">
          <ArrowRight className="w-4 h-4 text-muted-foreground rotate-90" />
        </div>

        {/* Contacts */}
        <div className="space-y-2">
          {[
            { name: "Campus Counselor", number: "1800-XXX-001", available: true },
            { name: "iCall Helpline", number: "9152987821", available: true },
            { name: "Vandrevala Foundation", number: "1860-2662-345", available: true },
          ].map((contact) => (
            <div
              key={contact.name}
              className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-secondary/60 border border-border"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-destructive/15 border border-destructive/25 flex items-center justify-center">
                  <Phone className="w-3.5 h-3.5 text-destructive" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground">{contact.name}</p>
                  <p className="text-[10px] text-muted-foreground font-mono">{contact.number}</p>
                </div>
              </div>
              <div className="status-dot bg-success" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmergencyRoute;
