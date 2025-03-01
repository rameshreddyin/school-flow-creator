
import OnboardingFlow from "@/components/onboarding/OnboardingFlow";
import { GraduationCap } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const Onboarding = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f5f7]">
      {/* Header */}
      <header className="w-full px-6 py-4 bg-white shadow-sm z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <GraduationCap className="h-6 w-6" />
            <span className="font-bold text-lg">SchoolManager</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-sm text-gray-600">
              Logged in as <span className="font-medium">{user?.name}</span>
            </div>
            <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center font-medium text-sm">
              {user?.name.charAt(0)}
            </div>
          </div>
        </div>
      </header>

      {/* Onboarding Content */}
      <div className="flex-1 p-6 md:p-12 flex items-center justify-center">
        <OnboardingFlow />
      </div>
    </div>
  );
};

export default Onboarding;
