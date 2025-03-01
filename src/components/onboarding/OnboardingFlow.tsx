
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SchoolDetails from "./steps/SchoolDetails";
import ClassStructure from "./steps/ClassStructure";
import FeeStructure from "./steps/FeeStructure";
import Schedule from "./steps/Schedule";
import Subjects from "./steps/Subjects";
import Completion from "./steps/Completion";
import WelcomeScreen from "./steps/WelcomeScreen";
import ProgressBar from "./ProgressBar";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Save } from "lucide-react";
import { toast } from "sonner";

export type SchoolData = {
  schoolDetails: {
    name: string;
    address: string;
    email: string;
    phone: string;
    principal: string;
    established: string;
    website: string;
    logo: string;
  };
  classStructure: {
    classes: {
      name: string;
      sections: string[];
    }[];
  };
  feeStructure: {
    terms: string[];
    feeTypes: {
      name: string;
      amount: number;
      termBased: boolean;
    }[];
    classFees: {
      className: string;
      fees: {
        type: string;
        amount: number;
      }[];
    }[];
  };
  schedule: {
    startTime: string;
    endTime: string;
    breakTime: string;
    breakDuration: string;
    lunchTime: string;
    lunchDuration: string;
    classDuration: number;
    customSchedules: {
      className: string;
      schedule: {
        startTime: string;
        endTime: string;
      };
    }[];
  };
  subjects: {
    name: string;
    code: string;
    description: string;
    forClasses: string[];
  }[];
};

const defaultData: SchoolData = {
  schoolDetails: {
    name: "",
    address: "",
    email: "",
    phone: "",
    principal: "",
    established: "",
    website: "",
    logo: "",
  },
  classStructure: {
    classes: [
      { name: "Class 1", sections: ["A", "B"] },
      { name: "Class 2", sections: ["A", "B"] },
    ],
  },
  feeStructure: {
    terms: ["Term 1", "Term 2", "Term 3"],
    feeTypes: [
      { name: "Tuition Fee", amount: 5000, termBased: true },
      { name: "Admission Fee", amount: 2000, termBased: false },
    ],
    classFees: [
      {
        className: "Class 1",
        fees: [
          { type: "Tuition Fee", amount: 5000 },
          { type: "Admission Fee", amount: 2000 },
        ],
      },
    ],
  },
  schedule: {
    startTime: "08:00",
    endTime: "15:00",
    breakTime: "10:30",
    breakDuration: "15",
    lunchTime: "12:30",
    lunchDuration: "45",
    classDuration: 45,
    customSchedules: [],
  },
  subjects: [
    {
      name: "Mathematics",
      code: "MATH",
      description: "Basic mathematics concepts",
      forClasses: ["Class 1", "Class 2"],
    },
  ],
};

const steps = [
  { name: "Welcome", component: WelcomeScreen },
  { name: "School Details", component: SchoolDetails },
  { name: "Class Structure", component: ClassStructure },
  { name: "Fee Structure", component: FeeStructure },
  { name: "Schedule", component: Schedule },
  { name: "Subjects", component: Subjects },
  { name: "Complete", component: Completion },
];

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

const OnboardingFlow = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(0);
  const [schoolData, setSchoolData] = useState<SchoolData>(() => {
    // Try to load saved data from localStorage
    const savedData = localStorage.getItem('schoolOnboardingData');
    if (savedData) {
      try {
        return JSON.parse(savedData) as SchoolData;
      } catch (e) {
        console.error("Failed to parse saved data:", e);
      }
    }
    return defaultData;
  });
  
  const [stepValidity, setStepValidity] = useState({
    0: true, // Welcome is always valid
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: true, // Completion is always valid
  });

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('schoolOnboardingData', JSON.stringify(schoolData));
  }, [schoolData]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      if (!stepValidity[currentStep as keyof typeof stepValidity] && currentStep !== 0 && currentStep !== steps.length - 1) {
        toast.error("Please complete all required fields before proceeding.");
        return;
      }
      setDirection(1);
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleUpdateValidity = (step: number, isValid: boolean) => {
    setStepValidity((prev) => ({
      ...prev,
      [step]: isValid,
    }));
  };

  const handleUpdateData = (section: keyof SchoolData, data: any) => {
    setSchoolData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        ...data,
      },
    }));
  };

  const handleSaveProgress = () => {
    toast.success("Your progress has been saved! You can continue later.");
  };

  const handleWelcomeStart = () => {
    setDirection(1);
    setCurrentStep(1);
  };

  const StepComponent = steps[currentStep].component;

  // Special case for welcome screen
  if (currentStep === 0) {
    return (
      <div className="w-full max-w-6xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="p-8 md:p-12 lg:p-16">
          <WelcomeScreen onStart={handleWelcomeStart} />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="p-8 md:p-12 lg:p-16">
        {/* Progress Indicator */}
        <div className="mb-12">
          <ProgressBar 
            steps={steps.slice(1)} // Skip welcome step in progress bar
            currentStep={currentStep - 1} // Adjust for welcome step
            onStepClick={(step) => {
              const actualStep = step + 1; // Adjust for welcome step
              if (actualStep < currentStep) {
                setDirection(-1);
                setCurrentStep(actualStep);
              } else if (stepValidity[currentStep as keyof typeof stepValidity] || currentStep === 0 || currentStep === steps.length - 1) {
                setDirection(1);
                setCurrentStep(actualStep);
              } else {
                toast.error("Please complete the current step before skipping ahead.");
              }
            }} 
          />
        </div>

        {/* Step Content */}
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={currentStep}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="min-h-[400px]"
          >
            {currentStep === 0 ? (
              <WelcomeScreen onStart={handleWelcomeStart} />
            ) : (
              <StepComponent
                data={schoolData}
                updateData={handleUpdateData}
                setValidity={(isValid: boolean) => handleUpdateValidity(currentStep, isValid)}
                // Passing onStart for WelcomeScreen to avoid the TypeScript error
                onStart={handleWelcomeStart}
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-12 pt-8 border-t border-gray-100">
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep <= 1} // Skip going back to welcome
              className="group flex items-center gap-2 px-6 py-3 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              Back
            </Button>
            
            {currentStep > 1 && currentStep < steps.length - 1 && (
              <Button
                variant="outline"
                onClick={handleSaveProgress}
                className="flex items-center gap-2 px-6 py-3 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
              >
                <Save className="w-4 h-4" />
                Save Progress
              </Button>
            )}
          </div>
          
          <Button
            onClick={handleNext}
            disabled={currentStep === steps.length - 1}
            className="group flex items-center gap-2 px-8 py-3 rounded-xl bg-black text-white hover:bg-gray-800 transition-all shadow-sm hover:shadow-md"
          >
            {currentStep === steps.length - 1 ? "Complete" : "Continue"}
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingFlow;
