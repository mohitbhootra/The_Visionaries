import { BarChart3, TrendingUp, Users, AlertCircle } from "lucide-react";

const WardenDashboard = () => {
  const stressBars = [
    { label: "Exam Stress", value: 78, color: "bg-destructive" },
    { label: "Hostel Anxiety", value: 54, color: "bg-accent" },
    { label: "Loneliness", value: 42, color: "bg-primary" },
    { label: "Financial", value: 31, color: "bg-primary/60" },
    { label: "Ragging", value: 18, color: "bg-muted-foreground" },
  ];

  return (
    <div className="px-5 pb-5 flex flex-col h-[480px]">
      {/* Header */}
      <div className="flex items-center justify-between pt-3 pb-4">
        <div>
          <p className="text-xs font-bold text-foreground">Warden Dashboard</p>
          <p className="text-[10px] text-muted-foreground">Aggregated · Anonymized</p>
        </div>
        <div className="tag-pill flex items-center gap-1">
          <div className="status-dot bg-success" />
          <span>Live</span>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {[
          { icon: Users, label: "Active", value: "127", color: "text-primary" },
          { icon: TrendingUp, label: "Spike", value: "+34%", color: "text-accent" },
          { icon: AlertCircle, label: "Alerts", value: "3", color: "text-destructive" },
        ].map(({ icon: Icon, label, value, color }) => (
          <div key={label} className="rounded-xl bg-secondary/60 border border-border p-2.5 text-center">
            <Icon className={`w-4 h-4 ${color} mx-auto mb-1`} />
            <p className={`text-sm font-bold ${color}`}>{value}</p>
            <p className="text-[9px] text-muted-foreground">{label}</p>
          </div>
        ))}
      </div>

      {/* Stress Distribution */}
      <div className="rounded-xl bg-secondary/60 border border-border p-3.5 mb-4">
        <div className="flex items-center gap-1.5 mb-3">
          <BarChart3 className="w-3.5 h-3.5 text-muted-foreground" />
          <p className="text-[10px] font-bold text-foreground uppercase tracking-wider">Stress Tag Distribution</p>
        </div>
        <div className="space-y-2.5">
          {stressBars.map((bar) => (
            <div key={bar.label}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] text-muted-foreground">{bar.label}</span>
                <span className="text-[10px] font-mono text-foreground">{bar.value}%</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-muted">
                <div
                  className={`h-full rounded-full ${bar.color} transition-all`}
                  style={{ width: `${bar.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Alert */}
      <div className="rounded-xl bg-accent/10 border border-accent/25 p-3 mt-auto">
        <p className="text-[10px] font-bold text-accent mb-0.5">⚡ Exam Stress Spike Detected</p>
        <p className="text-[9px] text-muted-foreground">Block C, Hostel 3 · Recommend deploying counselor</p>
      </div>
    </div>
  );
};

export default WardenDashboard;
