import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { OnlineProvider } from "@/contexts/OnlineContext";
import { OfflineBanner } from "@/components/layout/OfflineBanner";

// Pages
import RoleSelection from "./pages/RoleSelection";
import StudentDashboard from "./pages/student/StudentDashboard";
import NotesPage from "./pages/student/NotesPage";
import TestsPage from "./pages/student/TestsPage";
import AssignmentsPage from "./pages/student/AssignmentsPage";
import FlashcardsPage from "./pages/student/FlashcardsPage";
import DoubtChatPage from "./pages/student/DoubtChatPage";
import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import ParentDashboard from "./pages/parent/ParentDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <OnlineProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <OfflineBanner />
        <BrowserRouter>
          <Routes>
            {/* Role Selection - First Screen */}
            <Route path="/" element={<RoleSelection />} />
            
            {/* Student Routes */}
            <Route path="/student" element={<StudentDashboard />} />
            <Route path="/student/notes" element={<NotesPage />} />
            <Route path="/student/tests" element={<TestsPage />} />
            <Route path="/student/assignments" element={<AssignmentsPage />} />
            <Route path="/student/flashcards" element={<FlashcardsPage />} />
            <Route path="/student/doubt-chat" element={<DoubtChatPage />} />
            
            {/* Teacher Routes */}
            <Route path="/teacher" element={<TeacherDashboard />} />
            
            {/* Parent Routes */}
            <Route path="/parent" element={<ParentDashboard />} />
            
            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </OnlineProvider>
  </QueryClientProvider>
);

export default App;
