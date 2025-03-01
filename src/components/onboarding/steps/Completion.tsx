
import { Button } from "@/components/ui/button";
import { CheckCircle2, BookOpen, Users, Calendar, CreditCard, School, ArrowRight } from "lucide-react";
import { SchoolData } from "../OnboardingFlow";
import { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

interface CompletionProps {
  data: SchoolData;
  updateData: (section: keyof SchoolData, data: any) => void;
  setValidity: (isValid: boolean) => void;
  onStart?: () => void; // Add this to match WelcomeScreenProps pattern
}

const Completion = ({ data }: CompletionProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleFinish = () => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success("Your school has been successfully set up!");
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    }, 1000);
  };

  return (
    <div className="animate-fade-in text-center">
      <div className="mb-8 flex flex-col items-center">
        <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="h-8 w-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900">
          School Setup Complete!
        </h2>
        <p className="text-gray-600 mt-3 max-w-md mx-auto">
          Congratulations! You've successfully set up {data.schoolDetails.name || "your school"}. You're now ready to start using the school management system.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-12">
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
          <div className="flex items-center mb-4">
            <School className="h-5 w-5 mr-2 text-black" />
            <h3 className="font-semibold">School Details</h3>
          </div>
          <div className="text-sm text-left">
            <p className="text-gray-600">Name: <span className="text-gray-900">{data.schoolDetails.name || "Not provided"}</span></p>
            <p className="text-gray-600 mt-1">Principal: <span className="text-gray-900">{data.schoolDetails.principal || "Not provided"}</span></p>
            <p className="text-gray-600 mt-1">Contact: <span className="text-gray-900">{data.schoolDetails.phone || "Not provided"}</span></p>
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
          <div className="flex items-center mb-4">
            <Users className="h-5 w-5 mr-2 text-black" />
            <h3 className="font-semibold">Class Structure</h3>
          </div>
          <div className="text-sm text-left">
            <p className="text-gray-600">Total Classes: <span className="text-gray-900">{data.classStructure.classes.length}</span></p>
            <p className="text-gray-600 mt-1">Class Names: </p>
            <div className="flex flex-wrap gap-1 mt-1">
              {data.classStructure.classes.slice(0, 5).map((cls, index) => (
                <span key={index} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-200 text-gray-800">
                  {cls.name}
                </span>
              ))}
              {data.classStructure.classes.length > 5 && (
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-200 text-gray-800">
                  +{data.classStructure.classes.length - 5} more
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
          <div className="flex items-center mb-4">
            <CreditCard className="h-5 w-5 mr-2 text-black" />
            <h3 className="font-semibold">Fee Structure</h3>
          </div>
          <div className="text-sm text-left">
            <p className="text-gray-600">Academic Terms: <span className="text-gray-900">{data.feeStructure.terms.length}</span></p>
            <p className="text-gray-600 mt-1">Fee Types: <span className="text-gray-900">{data.feeStructure.feeTypes.length}</span></p>
            <div className="flex flex-wrap gap-1 mt-1">
              {data.feeStructure.feeTypes.slice(0, 3).map((fee, index) => (
                <span key={index} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-200 text-gray-800">
                  {fee.name}
                </span>
              ))}
              {data.feeStructure.feeTypes.length > 3 && (
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-200 text-gray-800">
                  +{data.feeStructure.feeTypes.length - 3} more
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
          <div className="flex items-center mb-4">
            <Calendar className="h-5 w-5 mr-2 text-black" />
            <h3 className="font-semibold">Schedule</h3>
          </div>
          <div className="text-sm text-left">
            <p className="text-gray-600">School Hours: <span className="text-gray-900">{data.schedule.startTime} - {data.schedule.endTime}</span></p>
            <p className="text-gray-600 mt-1">Class Duration: <span className="text-gray-900">{data.schedule.classDuration} mins</span></p>
            <p className="text-gray-600 mt-1">Custom Schedules: <span className="text-gray-900">{data.schedule.customSchedules.length}</span></p>
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 md:col-span-2">
          <div className="flex items-center mb-4">
            <BookOpen className="h-5 w-5 mr-2 text-black" />
            <h3 className="font-semibold">Subjects</h3>
          </div>
          <div className="text-sm">
            <p className="text-gray-600 text-left">Total Subjects: <span className="text-gray-900">{Array.isArray(data.subjects) ? data.subjects.length : 0}</span></p>
            <div className="flex flex-wrap gap-1 mt-2 justify-center">
              {Array.isArray(data.subjects) && data.subjects.map((subject, index) => (
                <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-200 text-gray-800 m-1">
                  {subject.name} ({subject.code})
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto">
        <Button
          onClick={handleFinish}
          disabled={isSubmitting}
          className="w-full py-6 bg-black text-white hover:bg-gray-800 rounded-xl transition-all shadow-sm hover:shadow-md text-lg flex items-center justify-center gap-2"
        >
          {isSubmitting ? "Setting up your school..." : "Go to Dashboard"}
          {!isSubmitting && <ArrowRight className="h-5 w-5" />}
        </Button>
        
        <p className="text-sm text-gray-500 mt-4">
          Welcome aboard, {user?.name}! You can always make changes to these settings later from your school administration panel.
        </p>
      </div>
    </div>
  );
};

export default Completion;
