
import { GraduationCap, School, Users, BookOpen, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen = ({ onStart }: WelcomeScreenProps) => {
  const features = [
    {
      icon: <School className="w-5 h-5" />,
      title: "School Profile",
      description: "Set up your school's basic information like name, address, and contact details."
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: "Class Structure",
      description: "Define the classes and sections available at your school."
    },
    {
      icon: <BookOpen className="w-5 h-5" />,
      title: "Academic Setup",
      description: "Configure fee structure, subjects, and schedules for each class."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto text-center py-8">
      <div className="mb-12">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center">
            <GraduationCap className="w-10 h-10 text-white" />
          </div>
        </div>
        
        <h1 className="text-4xl font-bold mb-4">Welcome to Your School Management System</h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Let's set up your school's profile in just a few simple steps. This onboarding process will help you configure the essential aspects of your school management system.
        </p>
      </div>

      <motion.div 
        className="grid md:grid-cols-3 gap-6 mb-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {features.map((feature, index) => (
          <motion.div 
            key={index} 
            className="bg-gray-50 rounded-xl p-6 text-left border border-gray-200 hover:shadow-md transition-shadow"
            variants={itemVariants}
          >
            <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center mb-4">
              <div className="text-white">{feature.icon}</div>
            </div>
            <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </motion.div>
        ))}
      </motion.div>

      <div className="flex flex-col items-center">
        <p className="text-gray-500 mb-6">
          This process will take about 5-10 minutes to complete. You can save and continue later at any point.
        </p>
        
        <Button 
          onClick={onStart} 
          className="group bg-black text-white hover:bg-gray-800 px-8 py-6 rounded-xl text-lg font-medium flex items-center gap-2 transition-all hover:gap-3"
        >
          Start School Setup
          <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </div>
  );
};

export default WelcomeScreen;
