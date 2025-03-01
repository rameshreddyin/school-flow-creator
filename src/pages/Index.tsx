
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import OnboardingFlow from "@/components/onboarding/OnboardingFlow";

const Index = () => {
  const [showOnboarding, setShowOnboarding] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f5f5f7] p-6">
      {!showOnboarding ? (
        <div className="max-w-3xl mx-auto text-center space-y-8 animate-fade-in">
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

          <Button 
            onClick={() => setShowOnboarding(true)}
            className="group bg-black hover:bg-gray-800 text-white rounded-full px-8 py-6 text-lg font-medium transition-all duration-300 ease-in-out transform hover:shadow-xl hover:scale-[1.02] flex items-center gap-2"
          >
            Get Started
            <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      ) : (
        <OnboardingFlow />
      )}
    </div>
  );
};

export default Index;
