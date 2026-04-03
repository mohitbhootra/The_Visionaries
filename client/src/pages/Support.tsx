import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, Building2, HeartHandshake, ShieldAlert, ExternalLink } from "lucide-react";

const contacts = [
  {
    icon: ShieldAlert,
    title: "Campus Police",
    number: "100 / Campus Extension: 1234",
    desc: "For immediate physical safety concerns on campus.",
    color: "text-destructive",
    bg: "bg-destructive/10",
  },
  {
    icon: Building2,
    title: "Counseling Center",
    number: "+91 98765 43210",
    desc: "Professional on-campus counseling. Confidential appointments available.",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: Phone,
    title: "iCall Helpline",
    number: "9152987821",
    desc: "Professional, free, and confidential psychosocial helpline (Mon–Sat, 8am–10pm).",
    color: "text-accent",
    bg: "bg-accent/10",
  },
  {
    icon: Phone,
    title: "Vandrevala Foundation",
    number: "1860-2662-345",
    desc: "24/7 mental health helpline. Multilingual support available.",
    color: "text-accent",
    bg: "bg-accent/10",
  },
  {
    icon: Phone,
    title: "AASRA",
    number: "91-22-27546669",
    desc: "Crisis intervention and suicide prevention. 24/7 availability.",
    color: "text-warning",
    bg: "bg-warning/10",
  },
];

export default function Support() {
  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Support Hub</h1>
        <p className="text-sm text-muted-foreground">
          Verified, vetted support contacts. Tap to connect. Your identity remains anonymous.
        </p>
      </div>

      <div className="space-y-3">
        {contacts.map((c) => (
          <Card key={c.title} className="hover:border-primary/30 transition-colors">
            <CardContent className="p-4 flex items-center gap-4">
              <div className={`p-2.5 rounded-lg ${c.bg} shrink-0`}>
                <c.icon className={`w-5 h-5 ${c.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground">{c.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{c.desc}</p>
                <p className="text-xs font-mono text-primary mt-1">{c.number}</p>
              </div>
              <Button variant="outline" size="sm" className="shrink-0 gap-1.5 h-8">
                <Phone className="w-3.5 h-3.5" /> Call
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-warning/30 bg-warning/5">
        <CardContent className="p-5 text-center space-y-3">
          <HeartHandshake className="w-8 h-8 text-warning mx-auto" />
          <div>
            <p className="text-sm font-semibold text-foreground">Need Professional Support?</p>
            <p className="text-xs text-muted-foreground mt-1">
              If you feel peer support isn't enough, escalate to a certified counselor.
              Your anonymity is preserved throughout.
            </p>
          </div>
          <Button className="gap-2">
            <ExternalLink className="w-4 h-4" /> Escalate to Professional Counselor
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
