import { ReactNode } from "react";

interface DeviceFrameProps {
  children: ReactNode;
  label?: string;
  sublabel?: string;
  glowColor?: "primary" | "accent";
}

const DeviceFrame = ({ children, label, sublabel, glowColor = "primary" }: DeviceFrameProps) => {
  return (
    <div className="flex flex-col items-center gap-5">
      <div
        className={`device-frame w-[320px] min-h-[520px] overflow-hidden relative ${
          glowColor === "accent" ? "glow-accent" : "glow-primary"
        }`}
      >
        {/* Status bar */}
        <div className="flex items-center justify-between px-5 py-2 text-[10px] text-muted-foreground">
          <span>9:41</span>
          <div className="flex items-center gap-1">
            <div className="w-4 h-2 rounded-sm border border-muted-foreground/40 relative">
              <div className="absolute inset-[1px] right-[3px] bg-muted-foreground/60 rounded-[1px]" />
            </div>
          </div>
        </div>
        {children}
      </div>
      {label && (
        <div className="text-center">
          <p className="text-sm font-semibold text-foreground">{label}</p>
          {sublabel && <p className="text-xs text-muted-foreground mt-1">{sublabel}</p>}
        </div>
      )}
    </div>
  );
};

export default DeviceFrame;
