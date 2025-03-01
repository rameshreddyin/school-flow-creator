
import { CheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ProgressBarProps {
  steps: { name: string }[];
  currentStep: number;
  onStepClick: (step: number) => void;
}

const ProgressBar = ({ steps, currentStep, onStepClick }: ProgressBarProps) => {
  return (
    <div>
      {/* Desktop Progress Bar */}
      <div className="hidden md:flex items-center justify-between w-full">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center relative w-full">
            {/* Step Circle */}
            <motion.button
              onClick={() => onStepClick(index)}
              className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center z-10 transition-all duration-300 shadow-sm",
                index < currentStep
                  ? "bg-black text-white"
                  : index === currentStep
                  ? "bg-black text-white ring-4 ring-gray-100"
                  : "bg-gray-100 text-gray-400"
              )}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ 
                scale: 1, 
                opacity: 1,
                transition: { delay: index * 0.1, duration: 0.3 }
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {index < currentStep ? (
                <CheckIcon className="w-6 h-6" />
              ) : (
                <span className="text-base font-medium">{index + 1}</span>
              )}
            </motion.button>

            {/* Step Name */}
            <motion.div
              className={cn(
                "absolute top-16 left-1/2 -translate-x-1/2 whitespace-nowrap font-medium text-sm transition-colors duration-300",
                index <= currentStep ? "text-black" : "text-gray-400"
              )}
              initial={{ y: 10, opacity: 0 }}
              animate={{ 
                y: 0, 
                opacity: 1,
                transition: { delay: index * 0.1 + 0.2, duration: 0.3 }
              }}
            >
              {step.name}
            </motion.div>

            {/* Progress Line */}
            {index < steps.length - 1 && (
              <div className="flex-1 h-[3px] mx-2">
                <motion.div
                  className={cn(
                    "h-full transition-all duration-500 ease-in-out",
                    index < currentStep 
                      ? "bg-black" 
                      : index === currentStep 
                      ? "bg-gradient-to-r from-black to-gray-200" 
                      : "bg-gray-200"
                  )}
                  initial={{ scaleX: 0, transformOrigin: "left" }}
                  animate={{ 
                    scaleX: index < currentStep ? 1 : index === currentStep ? 0.5 : 0,
                    transition: { delay: index * 0.1 + 0.3, duration: 0.5 }
                  }}
                ></motion.div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Mobile Progress Indicator */}
      <div className="md:hidden flex flex-col items-center mb-6">
        <div className="flex items-center justify-center space-x-1 mb-2">
          {steps.map((_, index) => (
            <motion.div
              key={index}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                index === currentStep 
                  ? "w-6 bg-black" 
                  : index < currentStep 
                  ? "w-3 bg-black" 
                  : "w-3 bg-gray-200"
              )}
              initial={{ width: 0, opacity: 0 }}
              animate={{ 
                width: index === currentStep ? 24 : 12,
                opacity: 1,
                transition: { duration: 0.3, delay: index * 0.05 }
              }}
              onClick={() => onStepClick(index)}
            />
          ))}
        </div>
        <motion.div 
          className="text-sm font-medium text-gray-600"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          key={currentStep} // Re-animate when step changes
          transition={{ duration: 0.3 }}
        >
          Step {currentStep + 1} of {steps.length}: <span className="text-black">{steps[currentStep].name}</span>
        </motion.div>
      </div>
    </div>
  );
};

export default ProgressBar;
