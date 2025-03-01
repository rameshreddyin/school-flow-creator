
import { CheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  steps: { name: string }[];
  currentStep: number;
  onStepClick: (step: number) => void;
}

const ProgressBar = ({ steps, currentStep, onStepClick }: ProgressBarProps) => {
  return (
    <div className="hidden md:flex items-center justify-between w-full">
      {steps.map((step, index) => (
        <div key={index} className="flex items-center relative w-full">
          {/* Step Circle */}
          <button
            onClick={() => onStepClick(index)}
            className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center z-10 transition-all duration-300",
              index < currentStep
                ? "bg-black text-white"
                : index === currentStep
                ? "bg-black text-white ring-4 ring-gray-100"
                : "bg-gray-100 text-gray-400"
            )}
          >
            {index < currentStep ? (
              <CheckIcon className="w-5 h-5" />
            ) : (
              index + 1
            )}
          </button>

          {/* Step Name */}
          <div
            className={cn(
              "absolute top-12 left-1/2 -translate-x-1/2 whitespace-nowrap font-medium transition-colors duration-300",
              index <= currentStep ? "text-black" : "text-gray-400"
            )}
          >
            {step.name}
          </div>

          {/* Progress Line */}
          {index < steps.length - 1 && (
            <div className="flex-1 h-[2px] mx-2">
              <div
                className={cn(
                  "h-full transition-all duration-500 ease-in-out",
                  index < currentStep ? "bg-black" : "bg-gray-200"
                )}
              ></div>
            </div>
          )}
        </div>
      ))}

      {/* Mobile Progress Indicator */}
      <div className="md:hidden text-center mb-6 text-gray-400">
        Step {currentStep + 1} of {steps.length}
      </div>
    </div>
  );
};

export default ProgressBar;
