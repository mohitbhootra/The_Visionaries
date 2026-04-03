import DeviceFrame from "@/components/DeviceFrame";
import ZeroPiiEntry from "@/components/screens/ZeroPiiEntry";
import SafeChat from "@/components/screens/SafeChat";
import EmergencyRoute from "@/components/screens/EmergencyRoute";
import WardenDashboard from "@/components/screens/WardenDashboard";
import { ArrowRight } from "lucide-react";

const Index = () => {
  const sections = [
    {
      screen: <ZeroPiiEntry />,
      label: "Zero-PII Entry",
      sublabel: "Friction-free anonymous access",
      step: "01",
      title: "Remove Every Barrier",
      description:
        "Students get an auto-assigned alias like 'Blue Falcon' — zero sign-up, no personal data captured. They select stress tags and get instant support.",
      glow: "primary" as const,
    },
    {
      screen: <SafeChat />,
      label: "Anonymous Safe Chat",
      sublabel: "Ephemeral peer-to-peer support",
      step: "02",
      title: "Total Privacy Control",
      description:
        "Clean, familiar chat with ephemeral aliases. The 'END & BURN' button connects directly to the 24-hour TTL database — giving students total control over their data footprint.",
      glow: "primary" as const,
    },
    {
      screen: <EmergencyRoute />,
      label: "Crisis Auto-Route",
      sublabel: "Zod middleware trigger detection",
      step: "03",
      title: "Automated Safeguards",
      description:
        "Trigger word detection via Zod validation middleware. If acute crisis is detected, the system bypasses the chat queue and routes directly to emergency contacts.",
      glow: "accent" as const,
    },
    {
      screen: <WardenDashboard />,
      label: "Warden Dashboard",
      sublabel: "Anonymized systemic intelligence",
      step: "04",
      title: "Preventive Insights",
      description:
        "Admins see aggregated, anonymized stress tags — no names, just patterns. Spot exam stress spikes or hostel anxiety clusters and deploy resources proactively.",
      glow: "primary" as const,
    },
  ];

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Hero */}
      <section className="relative px-6 pt-20 pb-16 text-center section-glow">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 tag-pill mb-6">
            <div className="status-dot bg-primary" />
            <span className="text-primary font-semibold">High-Fidelity Wireframes</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.1] mb-5">
            SafeSpace{" "}
            <span className="gradient-text">Architecture</span>
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Anonymous peer support with zero PII, ephemeral chats, automated crisis routing, and preventive administration intelligence.
          </p>
        </div>
      </section>

      {/* Sections */}
      {sections.map((section, i) => (
        <section
          key={section.step}
          className={`px-6 py-16 md:py-24 ${i % 2 === 0 ? "" : "bg-muted/20"}`}
        >
          <div className="max-w-6xl mx-auto">
            <div
              className={`flex flex-col ${
                i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              } items-center gap-12 lg:gap-20`}
            >
              {/* Device */}
              <div className="shrink-0">
                <DeviceFrame
                  label={section.label}
                  sublabel={section.sublabel}
                  glowColor={section.glow}
                >
                  {section.screen}
                </DeviceFrame>
              </div>

              {/* Text */}
              <div className="max-w-lg">
                <span className="text-xs font-mono text-primary tracking-widest uppercase mb-3 block">
                  Step {section.step}
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 leading-tight">
                  {section.title}
                </h2>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-6">
                  {section.description}
                </p>
                {i < sections.length - 1 && (
                  <div className="flex items-center gap-2 text-primary text-sm font-medium">
                    <span>Next: {sections[i + 1].title}</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Footer */}
      <footer className="px-6 py-12 text-center border-t border-border">
        <p className="text-xs text-muted-foreground">
          SafeSpace · Privacy-First Anonymous Peer Support · Architecture Walkthrough
        </p>
      </footer>
    </div>
  );
};

export default Index;
