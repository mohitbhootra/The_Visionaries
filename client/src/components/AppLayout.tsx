import { ReactNode } from "react";
import { useLocation, Link } from "react-router-dom";
import { useAlias } from "@/hooks/useAlias";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { NavLink } from "@/components/NavLink";
import { LayoutDashboard, MessageCircle, BookOpen, LifeBuoy, Users, Shield } from "lucide-react";

const navItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Safe Chat", url: "/chat", icon: MessageCircle },
  { title: "Coping Toolkit", url: "/toolkit", icon: BookOpen },
  { title: "Support Hub", url: "/support", icon: LifeBuoy },
  { title: "Volunteer Portal", url: "/volunteer", icon: Users },
];

function AppSidebar() {
  const location = useLocation();

  return (
    <Sidebar collapsible="icon">
      <SidebarContent className="pt-4">
        <div className="px-4 pb-4 mb-2 border-b border-sidebar-border">
          <Link to="/" className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-primary shrink-0" />
            <span className="text-sm font-bold text-foreground tracking-tight">SafeSpace</span>
          </Link>
        </div>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === "/"}
                      className="hover:bg-sidebar-accent/60"
                      activeClassName="bg-sidebar-accent text-primary font-medium"
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

export default function AppLayout({ children }: { children: ReactNode }) {
  const alias = useAlias();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header */}
          <header className="h-14 flex items-center justify-between border-b border-border bg-card px-4 shrink-0">
            <div className="flex items-center gap-3">
              <SidebarTrigger />
              <span className="text-sm text-muted-foreground">|</span>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center text-xs">
                  🦅
                </div>
                <span className="text-sm font-semibold text-foreground">{alias}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <span className="text-[11px] text-muted-foreground font-mono">ANONYMOUS SESSION</span>
            </div>
          </header>
          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
