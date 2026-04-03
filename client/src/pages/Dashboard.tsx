import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Wind, Brain, Users, Sparkles, Heart, BookOpen, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { startSession } from "@/services/api";

const stressTags = [
  "Academic Stress", "Exam Anxiety", "Social Isolation", "Hostel Issues",
  "Family Pressure", "Placement Stress", "Financial Worry", "Relationship Issues",
];

const quickTools = [
  {
    icon: Wind,
    title: "4-7-8 Breathing",
    desc: "Guided breathing exercise to calm your nervous system",
    color: "text-accent",
    bgColor: "bg-accent/10",
    link: "/toolkit",
  },
  {
    icon: Brain,
    title: "Brain Dump",
    desc: "Unload your thoughts in a private, auto-deleting note",
    color: "text-primary",
    bgColor: "bg-primary/10",
    link: "/toolkit",
  },
  {
    icon: Heart,
    title: "Mindful Check-in",
    desc: "Quick emotional self-assessment with guided prompts",
    color: "text-accent",
    bgColor: "bg-accent/10",
    link: "/toolkit",
  },
];

export default function Dashboard() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isStarting, setIsStarting] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const beginAnonymousChat = async () => {
    if (selectedTags.length === 0 || isStarting) return;

    setError("");
    setIsStarting(true);

    try {
      await startSession(selectedTags);
      navigate("/chat");
    } catch {
      setError("Unable to start a secure session right now. Please try again.");
    } finally {
      setIsStarting(false);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Welcome back.</h1>
        <p className="text-sm text-muted-foreground">
          Your identity is protected. Everything here is anonymous and ephemeral.
        </p>
      </div>

      {/* Quick Relief Tools */}
      <section>
        <h2 className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-4">Quick Relief</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickTools.map((tool) => (
            <Card
              key={tool.title}
              className="cursor-pointer hover:border-primary/40 transition-colors group"
              onClick={() => navigate(tool.link)}
            >
              <CardContent className="p-5 flex items-start gap-4">
                <div className={`p-2.5 rounded-lg ${tool.bgColor} shrink-0`}>
                  <tool.icon className={`w-5 h-5 ${tool.color}`} />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                    {tool.title}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{tool.desc}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Find a Peer */}
      <section>
        <Card className="border-primary/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              Find a Peer Supporter
            </CardTitle>
            <p className="text-xs text-muted-foreground">
              Select what you're experiencing. You'll be matched with a trained, anonymous peer.
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            {error ? (
              <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive">
                {error}
              </div>
            ) : null}
            <div className="flex flex-wrap gap-2">
              {stressTags.map((tag) => (
                <Badge
                  key={tag}
                  variant={selectedTags.includes(tag) ? "default" : "outline"}
                  className={`cursor-pointer transition-all text-xs py-1.5 px-3 ${
                    selectedTags.includes(tag)
                      ? "bg-primary text-primary-foreground"
                      : "hover:border-primary/50"
                  }`}
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
            <Button
              className="w-full"
              disabled={selectedTags.length === 0 || isStarting}
              onClick={beginAnonymousChat}
            >
              <Sparkles className="w-4 h-4 mr-2" />
              {isStarting ? "Starting Secure Session..." : "Get Matched Anonymously"}
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Resource Links */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card
          className="cursor-pointer hover:border-accent/40 transition-colors"
          onClick={() => navigate("/toolkit")}
        >
          <CardContent className="p-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BookOpen className="w-5 h-5 text-accent" />
              <div>
                <p className="text-sm font-semibold text-foreground">Coping Toolkit</p>
                <p className="text-xs text-muted-foreground">Evidence-based exercises and tools</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </CardContent>
        </Card>
        <Card
          className="cursor-pointer hover:border-warning/40 transition-colors"
          onClick={() => navigate("/support")}
        >
          <CardContent className="p-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Heart className="w-5 h-5 text-warning" />
              <div>
                <p className="text-sm font-semibold text-foreground">Support Hub</p>
                <p className="text-xs text-muted-foreground">Emergency contacts & escalation</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
