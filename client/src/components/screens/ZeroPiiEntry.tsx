import { Shield, ArrowRight } from "lucide-react";

const ZeroPiiEntry = () => {
  const tags = ["Academic Stress", "Hostel Issues", "Ragging", "Financial Anxiety", "Loneliness", "Exam Pressure"];

  return (
    <div className="px-5 pb-5 flex flex-col h-[480px]">
      {/* Header */}
      <div className="text-center pt-4 pb-5">
        <div className="w-12 h-12 rounded-2xl bg-primary/15 border border-primary/25 flex items-center justify-center mx-auto mb-3">
          <Shield className="w-6 h-6 text-primary" />
        </div>
        <h2 className="text-lg font-bold text-foreground">SafeSpace</h2>
        <p className="text-[10px] text-muted-foreground mt-1 tracking-wider uppercase font-medium">
          Zero Sign-up · No Personal Data Captured
        </p>
      </div>

      {/* Alias Assignment */}
      <div className="rounded-xl bg-secondary/60 border border-border p-4 mb-5">
        <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-2 font-medium">Your Anonymous Alias</p>
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-lg">
            🦅
          </div>
          <div>
            <p className="font-bold text-foreground text-sm">Blue Falcon</p>
            <p className="text-[10px] text-muted-foreground">Auto-assigned · Not linked to you</p>
          </div>
        </div>
      </div>

      {/* Tags */}
      <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-2.5 font-medium">What's on your mind?</p>
      <div className="flex flex-wrap gap-2 mb-auto">
        {tags.map((tag, i) => (
          <span
            key={tag}
            className={`tag-pill cursor-pointer transition-all ${
              i === 0 || i === 3
                ? "bg-primary/15 border-primary/30 text-primary"
                : ""
            }`}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* CTA */}
      <button className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm flex items-center justify-center gap-2 mt-4">
        Get Support <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};

export default ZeroPiiEntry;
