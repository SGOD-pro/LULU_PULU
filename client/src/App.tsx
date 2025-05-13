
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import RecipePredictor from "./pages/RecipePredictor";
import EssayScorer from "./pages/EssayScorer";
import TextDetector from "./pages/TextDetector";
import SweetBot from "./pages/SweetBot";
import NotFound from "./pages/NotFound";
import { useEffect } from "react";
import Toxic from "./pages/Toxic";

const queryClient = new QueryClient();

const App = () => (

  
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout><Index /></Layout>} />
          <Route path="/recipe-predictor" element={<Layout><RecipePredictor /></Layout>} />
          <Route path="/essay-scorer" element={<Layout><EssayScorer /></Layout>} />
          <Route path="/text-detector" element={<Layout><TextDetector /></Layout>} />
          <Route path="/sweet-bot" element={<Layout><SweetBot /></Layout>} />
          <Route path="/toxic" element={<Layout><Toxic /></Layout>} />
          <Route path="*" element={<Layout><NotFound /></Layout>} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;