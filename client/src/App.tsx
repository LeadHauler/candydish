import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Tactics from "./pages/Tactics";
import FreeGuide from "./pages/FreeGuide";
import SpeedToLead from "./pages/SpeedToLead";
import EightChannels from "./pages/EightChannels";
import RoiLanding from "./pages/RoiLanding";
import ThankYouChannels from "./pages/ThankYouChannels";
import ThankYou from "./pages/ThankYou";
import Pricing from "./pages/Pricing";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/tactics" component={Tactics} />
      <Route path="/free-guide-djpkcaah8tne" component={FreeGuide} />
      <Route path="/speed-to-lead-xk9m2pqr7" component={SpeedToLead} />
      <Route path="/8-channels-m4n7vw2x" component={EightChannels} />
        <Route path="/roi-calculator-p9q3xt5k" component={RoiLanding} />
      <Route path="/thank-you-channels" component={ThankYouChannels} />
      <Route path="/thank-you" component={ThankYou} />
      <Route path="/pricing" component={Pricing} />
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
