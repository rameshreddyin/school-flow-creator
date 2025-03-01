
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight, School, Users, BookOpen, CreditCard, Clock, GraduationCap } from "lucide-react";
import OnboardingFlow from "@/components/onboarding/OnboardingFlow";
import { motion } from "framer-motion";

const Index = () => {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [resumeAvailable, setResumeAvailable] = useState(false);

  useEffect(() => {
    // Check if there's a saved onboarding session
    const savedData = localStorage.getItem('schoolOnboardingData');
    if (savedData) {
      setResumeAvailable(true);
    }
  }, []);

  const features = [
    {
      icon: <School className="h-6 w-6"/>,
      title: "School Profile",
      description: "Set up your school's basic information",
    },
    {
      icon: <Users className="h-6 w-6"/>,
      title: "Class Structure",
      description: "Define classes and sections",
    },
    {
      icon: <BookOpen className="h-6 w-6"/>,
      title: "Subjects",
      description: "Add subjects for each class",
    },
    {
      icon: <CreditCard className="h-6 w-6"/>,
      title: "Fee Structure",
      description: "Configure fee types and amounts",
    },
    {
      icon: <Clock className="h-6 w-6"/>,
      title: "Scheduling",
      description: "Set school and class timings",
    },
  ];

  const clearSavedData = () => {
    localStorage.removeItem('schoolOnboardingData');
    setResumeAvailable(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f5f7] relative overflow-hidden">
      {!showOnboarding ? (
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="w-full px-6 py-4 flex justify-between items-center bg-white shadow-sm z-10">
            <div className="flex items-center space-x-2">
              <GraduationCap className="h-6 w-6" />
              <span className="font-bold text-lg">SchoolManager</span>
            </div>
            <Button variant="outline" className="rounded-full px-4 py-2 text-sm">
              Already have an account? Sign in
            </Button>
          </header>

          {/* Hero Section */}
          <div className="flex-1 flex flex-col items-center justify-center px-6 py-16 relative">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-100 pointer-events-none" />
            
            <motion.div 
              className="max-w-4xl mx-auto text-center space-y-8 z-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="space-y-3">
                <div className="inline-block px-3 py-1 text-xs font-medium bg-black text-white rounded-full mb-4">
                  School Management System
                </div>
                <h1 className="text-5xl md:text-6xl font-bold text-gray-900 tracking-tight">
                  Streamline Your School Administration
                </h1>
                <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
                  Set up your school profile, classes, fee structure, and schedule in minutes with our intuitive onboarding process.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button 
                  onClick={() => setShowOnboarding(true)}
                  className="group bg-black hover:bg-gray-800 text-white rounded-full px-8 py-6 text-lg font-medium transition-all duration-300 ease-in-out transform hover:shadow-xl hover:scale-[1.02] flex items-center gap-2 w-full sm:w-auto"
                >
                  Get Started
                  <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Button>
                
                {resumeAvailable && (
                  <div className="flex gap-2 w-full sm:w-auto">
                    <Button 
                      onClick={() => setShowOnboarding(true)}
                      variant="outline"
                      className="rounded-full px-8 py-6 text-lg font-medium border-gray-300 hover:bg-gray-50 flex-1 sm:flex-initial"
                    >
                      Resume Setup
                    </Button>
                    <Button 
                      onClick={clearSavedData}
                      variant="ghost"
                      className="text-gray-500 hover:text-gray-700"
                    >
                      Clear Data
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Features Section */}
          <div className="py-16 px-6 bg-white">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Everything You Need to Get Started</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    className="bg-gray-50 rounded-xl p-6 flex flex-col items-center text-center border border-gray-100 hover:shadow-md transition-all"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mb-4">
                      <div className="text-white">{feature.icon}</div>
                    </div>
                    <h3 className="font-bold mb-2">{feature.title}</h3>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="bg-gray-900 text-white py-8 px-6">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center space-x-2 mb-4 md:mb-0">
                <GraduationCap className="h-6 w-6" />
                <span className="font-bold">SchoolManager</span>
              </div>
              <div className="text-gray-400 text-sm">
                © {new Date().getFullYear()} SchoolManager. All rights reserved.
              </div>
            </div>
          </footer>
        </div>
      ) : (
        <div className="flex-1 p-6 md:p-12 flex items-center justify-center">
          <OnboardingFlow />
        </div>
      )}
    </div>
  );
};

export default Index;
