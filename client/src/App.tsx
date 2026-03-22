import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Campaigns from "./pages/Campaigns";
import Tactics from "./pages/Tactics";
import ROIDashboard from "./pages/ROIDashboard";
import Partners from "./pages/Partners";
import Templates from "./pages/Templates";
import Community from "./pages/Community";
import AppLayout from "./components/AppLayout";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/dashboard">
        <AppLayout>
          <Dashboard />
        </AppLayout>
      </Route>
      <Route path="/campaigns">
        <AppLayout>
          <Campaigns />
        </AppLayout>
      </Route>
      <Route path="/tactics">
        <AppLayout>
          <Tactics />
        </AppLayout>
      </Route>
      <Route path="/roi">
        <AppLayout>
          <ROIDashboard />
        </AppLayout>
      </Route>
      <Route path="/partners">
        <AppLayout>
          <Partners />
        </AppLayout>
      </Route>
      <Route path="/templates">
        <AppLayout>
          <Templates />
        </AppLayout>
      </Route>
      <Route path="/community">
        <AppLayout>
          <Community />
        </AppLayout>
      </Route>
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster richColors position="top-right" />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
