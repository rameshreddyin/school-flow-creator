
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";

import Index from "./pages/Index";
import Login from "./pages/Login";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            
            <Route 
              path="/onboarding" 
              element={
                <ProtectedRoute>
                  <Onboarding />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            
            {/* Module Routes */}
            <Route 
              path="/students" 
              element={
                <ProtectedRoute allowedRoles={["super_admin", "admin", "teacher"]}>
                  <div className="p-8">Students Module (Coming Soon)</div>
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/classes" 
              element={
                <ProtectedRoute allowedRoles={["super_admin", "admin", "teacher"]}>
                  <div className="p-8">Classes Module (Coming Soon)</div>
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/subjects" 
              element={
                <ProtectedRoute allowedRoles={["super_admin", "admin", "teacher"]}>
                  <div className="p-8">Subjects Module (Coming Soon)</div>
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/fees" 
              element={
                <ProtectedRoute allowedRoles={["super_admin", "admin"]}>
                  <div className="p-8">Fees Module (Coming Soon)</div>
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/schedule" 
              element={
                <ProtectedRoute allowedRoles={["super_admin", "admin", "teacher", "staff"]}>
                  <div className="p-8">Schedule Module (Coming Soon)</div>
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/communication" 
              element={
                <ProtectedRoute allowedRoles={["super_admin", "admin"]}>
                  <div className="p-8">Communication Module (Coming Soon)</div>
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/settings" 
              element={
                <ProtectedRoute allowedRoles={["super_admin", "admin"]}>
                  <div className="p-8">Settings Module (Coming Soon)</div>
                </ProtectedRoute>
              } 
            />
            
            {/* Redirect any unknown paths to 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
