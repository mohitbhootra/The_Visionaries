import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import AppLayout from "@/components/AppLayout";
import Dashboard from "@/pages/Dashboard";
import Chat from "@/pages/Chat";
import Toolkit from "@/pages/Toolkit";
import Support from "@/pages/Support";
import Volunteer from "@/pages/Volunteer";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout><Dashboard /></AppLayout>} path="/" />
          <Route element={<AppLayout><Chat /></AppLayout>} path="/chat" />
          <Route element={<AppLayout><Toolkit /></AppLayout>} path="/toolkit" />
          <Route element={<AppLayout><Support /></AppLayout>} path="/support" />
          <Route element={<AppLayout><Volunteer /></AppLayout>} path="/volunteer" />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
