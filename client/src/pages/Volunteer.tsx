import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Lock, MessageSquare, BarChart3, User, Clock, TrendingUp } from "lucide-react";
import { requestMatch, toggleAvailability, volunteerLogin } from "@/services/api";

const pendingQueue = [
  { id: 1, alias: "Amber Fox", tags: ["Exam Anxiety", "Sleep Issues"], waitTime: "2m" },
  { id: 2, alias: "Cobalt Raven", tags: ["Social Isolation"], waitTime: "5m" },
  { id: 3, alias: "Jade Tiger", tags: ["Placement Stress", "Family Pressure"], waitTime: "1m" },
];

const heatmapData = [
  { label: "Exams", intensity: 85, trend: "up" },
  { label: "Social", intensity: 42, trend: "stable" },
  { label: "Placement", intensity: 67, trend: "up" },
  { label: "Financial", intensity: 28, trend: "down" },
  { label: "Hostel", intensity: 35, trend: "stable" },
];

export default function Volunteer() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true);
  const [username, setUsername] = useState("testpeer1");
  const [password, setPassword] = useState("password123");
  const [loginError, setLoginError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [matchTags, setMatchTags] = useState("Placements, Academics");
  const [matchResult, setMatchResult] = useState<null | { found?: boolean; volunteerAlias?: string; message?: string; note?: string; matchedTags?: string[] }>(null);
  const [isSavingAvailability, setIsSavingAvailability] = useState(false);
  const [isMatching, setIsMatching] = useState(false);

  const handleLogin = async () => {
    setLoginError("");
    setIsLoggingIn(true);

    try {
      await volunteerLogin(username.trim(), password);
      setIsUnlocked(true);
    } catch (err) {
      setLoginError("Login failed. Check your volunteer credentials.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleAvailabilityChange = async (nextAvailable: boolean) => {
    setIsAvailable(nextAvailable);
    setIsSavingAvailability(true);

    try {
      await toggleAvailability(nextAvailable);
    } catch {
      setIsAvailable((prev) => !prev);
    } finally {
      setIsSavingAvailability(false);
    }
  };

  const handleFindMatch = async () => {
    setIsMatching(true);
    setMatchResult(null);

    try {
      const tags = matchTags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean);
      const result = await requestMatch(tags);
      setMatchResult(result);
    } catch {
      setMatchResult({ found: false, message: "Unable to contact the match service right now." });
    } finally {
      setIsMatching(false);
    }
  };

  if (!isUnlocked) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-3.5rem)] p-6">
        <Card className="max-w-sm w-full text-center">
          <CardContent className="p-8 space-y-5">
            <Lock className="w-12 h-12 text-muted-foreground mx-auto" />
            <div>
              <h2 className="text-lg font-bold text-foreground mb-2">Volunteer Portal</h2>
              <p className="text-xs text-muted-foreground leading-relaxed">
                This portal is restricted to vetted, trained peer supporters. 
                Enter your volunteer access code to continue.
              </p>
            </div>
            <input
              type="text"
              className="w-full bg-secondary border border-border rounded-lg px-4 py-2.5 text-sm text-foreground text-center"
              placeholder="Volunteer username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              className="w-full bg-secondary border border-border rounded-lg px-4 py-2.5 text-sm text-foreground text-center"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleLogin();
              }}
            />
            {loginError ? <p className="text-xs text-destructive">{loginError}</p> : null}
            <Button className="w-full" onClick={handleLogin} disabled={isLoggingIn}>
              {isLoggingIn ? "Unlocking..." : "Unlock Portal"}
            </Button>
            <p className="text-[10px] text-muted-foreground">Demo credentials: testpeer1 / password123</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-1">Volunteer Dashboard</h1>
          <p className="text-sm text-muted-foreground">Manage your peer support sessions.</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground">Availability</span>
          <Switch checked={isAvailable} onCheckedChange={handleAvailabilityChange} />
          <Badge variant={isAvailable ? "default" : "secondary"} className="text-xs">
            {isSavingAvailability ? "Saving..." : isAvailable ? "Online" : "Offline"}
          </Badge>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Chats Today", value: "7", icon: MessageSquare, color: "text-primary" },
          { label: "Avg Response", value: "1.2m", icon: Clock, color: "text-accent" },
          { label: "Students Helped", value: "142", icon: User, color: "text-primary" },
          { label: "Satisfaction", value: "4.8/5", icon: TrendingUp, color: "text-accent" },
        ].map((s) => (
          <Card key={s.label}>
            <CardContent className="p-4 flex items-center gap-3">
              <s.icon className={`w-5 h-5 ${s.color} shrink-0`} />
              <div>
                <p className="text-lg font-bold text-foreground">{s.value}</p>
                <p className="text-[10px] text-muted-foreground">{s.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chat Queue */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-primary" />
              Active Chat Queue
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {pendingQueue.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 border border-border">
                <div>
                  <p className="text-sm font-medium text-foreground">{item.alias}</p>
                  <div className="flex items-center gap-1.5 mt-1">
                    {item.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-[10px] py-0 h-5">{tag}</Badge>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] text-muted-foreground font-mono">{item.waitTime}</span>
                  <Button size="sm" className="h-7 text-xs">Accept</Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Stress Heatmap */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-warning" />
              Stress Tag Heatmap
            </CardTitle>
            <p className="text-[10px] text-muted-foreground">Aggregated, anonymized data</p>
          </CardHeader>
          <CardContent className="space-y-3">
            {heatmapData.map((item) => (
              <div key={item.label}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-foreground">{item.label}</span>
                  <span className="text-muted-foreground flex items-center gap-1">
                    {item.intensity}%
                    {item.trend === "up" && <TrendingUp className="w-3 h-3 text-destructive" />}
                    {item.trend === "down" && <TrendingUp className="w-3 h-3 text-success rotate-180" />}
                  </span>
                </div>
                <div className="h-2.5 bg-secondary rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      item.intensity > 70 ? "bg-destructive" : item.intensity > 50 ? "bg-warning" : "bg-accent"
                    }`}
                    style={{ width: `${item.intensity}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <User className="w-4 h-4 text-primary" />
            Find a Match
          </CardTitle>
          <p className="text-[10px] text-muted-foreground">Request a backend match using comma-separated tags.</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <input
            className="w-full bg-secondary border border-border rounded-lg px-4 py-2.5 text-sm text-foreground"
            value={matchTags}
            onChange={(e) => setMatchTags(e.target.value)}
            placeholder="Placements, Academics"
          />
          <Button onClick={handleFindMatch} disabled={isMatching}>
            {isMatching ? "Matching..." : "Find Match"}
          </Button>
          {matchResult ? (
            <div className="rounded-lg border border-border bg-secondary/40 p-4 text-sm space-y-1">
              <p className="font-semibold text-foreground">
                {matchResult.found ? `Matched with ${matchResult.volunteerAlias}` : "No match found"}
              </p>
              {matchResult.note ? <p className="text-xs text-muted-foreground">{matchResult.note}</p> : null}
              {matchResult.message ? <p className="text-xs text-muted-foreground">{matchResult.message}</p> : null}
              {matchResult.matchedTags?.length ? (
                <p className="text-xs text-muted-foreground">Matched tags: {matchResult.matchedTags.join(", ")}</p>
              ) : null}
            </div>
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
}
