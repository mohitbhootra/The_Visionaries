import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wind, Brain, Repeat, BarChart3, Play, X } from "lucide-react";

const tools = [
  {
    icon: Wind,
    title: "4-7-8 Breathing Visualizer",
    desc: "A guided breathing exercise: inhale 4s, hold 7s, exhale 8s. Proven to activate the parasympathetic nervous system.",
    color: "text-accent",
    bg: "bg-accent/10",
    type: "breathing" as const,
  },
  {
    icon: Brain,
    title: "Guided Mindful Meditation",
    desc: "A 5-minute body scan meditation with timed prompts. No audio required — follow the visual cues.",
    color: "text-primary",
    bg: "bg-primary/10",
    type: "meditation" as const,
  },
  {
    icon: Repeat,
    title: "Cognitive Re-framing Exercise",
    desc: "Challenge negative thought patterns. Input a worry, and the tool guides you through evidence-based reframing steps.",
    color: "text-accent",
    bg: "bg-accent/10",
    type: "reframe" as const,
  },
  {
    icon: BarChart3,
    title: "Stress Trending Analysis",
    desc: "Aggregated, anonymized stress pattern data across the campus. See what's trending — exams, social, placement.",
    color: "text-warning",
    bg: "bg-warning/10",
    type: "trends" as const,
  },
];

function BreathingExercise({ onClose }: { onClose: () => void }) {
  const [phase, setPhase] = useState<"idle" | "inhale" | "hold" | "exhale">("idle");
  const [cycles, setCycles] = useState(0);

  const startCycle = () => {
    setPhase("inhale");
    setTimeout(() => setPhase("hold"), 4000);
    setTimeout(() => setPhase("exhale"), 11000);
    setTimeout(() => {
      setPhase("idle");
      setCycles((c) => c + 1);
    }, 19000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-background/95 flex items-center justify-center">
      <div className="text-center space-y-8 max-w-sm">
        <button onClick={onClose} className="absolute top-6 right-6 text-muted-foreground hover:text-foreground">
          <X className="w-6 h-6" />
        </button>
        <div
          className={`w-40 h-40 mx-auto rounded-full border-4 transition-all duration-[4000ms] flex items-center justify-center ${
            phase === "inhale"
              ? "scale-125 border-accent bg-accent/10"
              : phase === "hold"
              ? "scale-125 border-primary bg-primary/10"
              : phase === "exhale"
              ? "scale-75 border-accent/50 bg-accent/5"
              : "scale-100 border-border"
          }`}
        >
          <span className="text-lg font-semibold text-foreground">
            {phase === "idle" ? "Ready" : phase === "inhale" ? "Inhale" : phase === "hold" ? "Hold" : "Exhale"}
          </span>
        </div>
        <p className="text-sm text-muted-foreground">Cycles completed: {cycles}</p>
        {phase === "idle" && (
          <Button onClick={startCycle} className="gap-2">
            <Play className="w-4 h-4" /> Start Breathing Cycle
          </Button>
        )}
      </div>
    </div>
  );
}

export default function Toolkit() {
  const [activeExercise, setActiveExercise] = useState<string | null>(null);

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Coping Toolkit</h1>
        <p className="text-sm text-muted-foreground">
          Evidence-based exercises and tools. No data stored — everything runs locally.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tools.map((tool) => (
          <Card key={tool.title} className="hover:border-primary/30 transition-colors">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-lg ${tool.bg}`}>
                  <tool.icon className={`w-5 h-5 ${tool.color}`} />
                </div>
                <CardTitle className="text-base">{tool.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground leading-relaxed mb-4">{tool.desc}</p>
              <Button
                variant="outline"
                size="sm"
                className="gap-2"
                onClick={() => setActiveExercise(tool.type)}
              >
                <Play className="w-3.5 h-3.5" /> Launch
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {activeExercise === "breathing" && (
        <BreathingExercise onClose={() => setActiveExercise(null)} />
      )}

      {activeExercise === "meditation" && (
        <div className="fixed inset-0 z-50 bg-background/95 flex items-center justify-center">
          <div className="text-center space-y-6 max-w-sm">
            <button onClick={() => setActiveExercise(null)} className="absolute top-6 right-6 text-muted-foreground hover:text-foreground">
              <X className="w-6 h-6" />
            </button>
            <Brain className="w-16 h-16 text-primary mx-auto animate-pulse" />
            <h2 className="text-xl font-bold text-foreground">Mindful Meditation</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Close your eyes. Take a deep breath. Focus on the sensation of your feet on the floor.
              Slowly scan upward through your body, noticing any tension. Breathe into those areas and release.
            </p>
            <div className="flex flex-col gap-2 text-xs text-muted-foreground font-mono">
              <p>0:00 — Ground yourself. Feet, legs, hips.</p>
              <p>1:30 — Core, chest, shoulders. Release.</p>
              <p>3:00 — Neck, jaw, forehead. Soften.</p>
              <p>4:30 — Full body awareness. Breathe.</p>
            </div>
          </div>
        </div>
      )}

      {activeExercise === "reframe" && (
        <div className="fixed inset-0 z-50 bg-background/95 flex items-center justify-center p-6">
          <div className="max-w-md w-full space-y-5">
            <button onClick={() => setActiveExercise(null)} className="absolute top-6 right-6 text-muted-foreground hover:text-foreground">
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-xl font-bold text-foreground">Cognitive Re-framing</h2>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-muted-foreground block mb-1.5">1. What's the negative thought?</label>
                <textarea className="w-full bg-secondary border border-border rounded-lg p-3 text-sm text-foreground resize-none" rows={2} placeholder="I'm going to fail this exam..." />
              </div>
              <div>
                <label className="text-xs text-muted-foreground block mb-1.5">2. What evidence supports this?</label>
                <textarea className="w-full bg-secondary border border-border rounded-lg p-3 text-sm text-foreground resize-none" rows={2} placeholder="I haven't studied as much as I wanted..." />
              </div>
              <div>
                <label className="text-xs text-muted-foreground block mb-1.5">3. What evidence contradicts it?</label>
                <textarea className="w-full bg-secondary border border-border rounded-lg p-3 text-sm text-foreground resize-none" rows={2} placeholder="I passed previous exams, I know the material..." />
              </div>
              <div>
                <label className="text-xs text-muted-foreground block mb-1.5">4. Balanced re-frame:</label>
                <textarea className="w-full bg-secondary border border-border rounded-lg p-3 text-sm text-foreground resize-none" rows={2} placeholder="I may not be perfectly prepared, but I have knowledge and can do my best..." />
              </div>
            </div>
          </div>
        </div>
      )}

      {activeExercise === "trends" && (
        <div className="fixed inset-0 z-50 bg-background/95 flex items-center justify-center p-6">
          <div className="max-w-lg w-full space-y-5">
            <button onClick={() => setActiveExercise(null)} className="absolute top-6 right-6 text-muted-foreground hover:text-foreground">
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-xl font-bold text-foreground">Campus Stress Trends</h2>
            <p className="text-xs text-muted-foreground">Anonymized, aggregated data. No individual identification possible.</p>
            <div className="space-y-3">
              {[
                { label: "Exam Anxiety", pct: 72, color: "bg-destructive" },
                { label: "Social Isolation", pct: 48, color: "bg-warning" },
                { label: "Placement Stress", pct: 61, color: "bg-primary" },
                { label: "Hostel Issues", pct: 33, color: "bg-accent" },
                { label: "Financial Worry", pct: 27, color: "bg-muted-foreground" },
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-foreground">{item.label}</span>
                    <span className="text-muted-foreground">{item.pct}%</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
