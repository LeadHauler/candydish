import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Tactics from "./pages/Tactics";
import FreeGuide from "./pages/FreeGuide";
import ThankYou from "./pages/ThankYou";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/tactics" component={Tactics} />
      <Route path="/free-guide-djpkcaah8tne" component={FreeGuide} />
      <Route path="/thank-you" component={ThankYou} />
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
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
