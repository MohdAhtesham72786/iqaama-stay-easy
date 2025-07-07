
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Buy from "./pages/Buy";
import Rent from "./pages/Rent";
import Shared from "./pages/Shared";
import Commercial from "./pages/Commercial";
import DailyRentals from "./pages/DailyRentals";
import SignIn from "./pages/SignIn";
import ListProperty from "./pages/ListProperty";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/buy" element={<Buy />} />
          <Route path="/rent" element={<Rent />} />
          <Route path="/shared" element={<Shared />} />
          <Route path="/commercial" element={<Commercial />} />
          <Route path="/daily-rentals" element={<DailyRentals />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/list-property" element={<ListProperty />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
