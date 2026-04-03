import { ReactNode } from "react";
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
  SidebarInset,
  useSidebar,
} from "@/components/ui/sidebar";
import { NavLink } from "@/components/NavLink";
import { LayoutDashboard, MessageCircle, BookOpen, LifeBuoy, Users } from "lucide-react";

const navItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Safe Chat", url: "/chat", icon: MessageCircle },
  { title: "Coping Toolkit", url: "/toolkit", icon: BookOpen },
  { title: "Support Hub", url: "/support", icon: LifeBuoy },
  { title: "Volunteer Portal", url: "/volunteer", icon: Users },
];

function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarContent className="pt-4 gap-2">
        <div className="px-4 pb-4 mb-2 border-b border-sidebar-border flex items-center justify-end">
          <SidebarTrigger className="text-sidebar-foreground hover:bg-sidebar-accent" />
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
                      className="text-sidebar-foreground/80 hover:text-sidebar-foreground hover:bg-sidebar-accent/70"
                      activeClassName="bg-sidebar-accent text-sidebar-accent-foreground font-semibold"
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
    <SidebarProvider defaultOpen={false}>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <SidebarInset className="flex-1 flex flex-col min-w-0 transition-[padding] duration-300 ease-in-out md:pl-[--sidebar-width] peer-data-[state=collapsed]:md:pl-[--sidebar-width-icon]">
          {/* Header */}
          <AppHeader alias={alias} />
          <main className="flex-1 overflow-y-auto">
            <div className="mx-auto w-full max-w-6xl px-5 py-6 sm:px-6 lg:px-8">
              {children}
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

function AppHeader({ alias }: { alias: string }) {
  return (
    <header className="h-16 flex items-center justify-between border-b border-border/70 bg-card/80 px-5 shrink-0 backdrop-blur">
      <div className="flex items-center gap-3">
        <SidebarTrigger className="h-8 w-8" />
        <span className="text-sm text-muted-foreground">|</span>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center text-xs">
            🦅
          </div>
          <span className="text-base font-semibold text-foreground">Sukun</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
        <span className="text-[11px] text-muted-foreground font-mono">ANONYMOUS SESSION</span>
      </div>
    </header>
  );
}
