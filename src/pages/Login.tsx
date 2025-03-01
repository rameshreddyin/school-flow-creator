
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { GraduationCap, Lock, Mail, Building, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [schoolCode, setSchoolCode] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    
    try {
      const success = await login(email, password, schoolCode);
      if (success) {
        // Check if the school has completed onboarding
        const onboardingCompleted = localStorage.getItem('schoolOnboardingCompleted');
        if (onboardingCompleted) {
          navigate("/dashboard");
        } else {
          navigate("/onboarding");
        }
      }
    } finally {
      setIsLoggingIn(false);
    }
  };

  const setDemoCredentials = (userType: 'admin' | 'super_admin') => {
    setSchoolCode("SCH001");
    setPassword("password123");
    
    if (userType === 'admin') {
      setEmail("admin@school.com");
    } else {
      setEmail("super@school.com");
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f7] flex flex-col items-center justify-center p-6">
      <motion.div 
        className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="p-8">
          <div className="flex justify-center mb-8">
            <motion.div 
              className="w-16 h-16 bg-black rounded-full flex items-center justify-center"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
            >
              <GraduationCap className="w-8 h-8 text-white" />
            </motion.div>
          </div>
          
          <motion.h2 
            className="text-3xl font-bold text-center mb-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Welcome Back
          </motion.h2>
          
          <motion.p 
            className="text-gray-600 text-center mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Log in to access your school management system
          </motion.p>

          {/* Demo account notice */}
          <motion.div
            className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-800"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <div className="flex items-start gap-2">
              <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">Demo Accounts Available</p>
                <p className="mt-1">For testing, you can use these accounts:</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="text-xs border-blue-300 hover:bg-blue-100"
                    onClick={() => setDemoCredentials('admin')}
                  >
                    Use Admin Account
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="text-xs border-blue-300 hover:bg-blue-100"
                    onClick={() => setDemoCredentials('super_admin')}
                  >
                    Use Super Admin Account
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.form 
            onSubmit={handleLogin}
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="schoolCode">School Code</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-5 p-0 text-gray-500 hover:text-gray-900 text-xs">
                      <Info className="h-3 w-3 mr-1" />
                      What's this?
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="text-sm">
                      <h4 className="font-medium mb-1">School Code</h4>
                      <p className="text-gray-600 text-xs">
                        Every school in our system has a unique code for security.
                        Use "SCH001" for this demo.
                      </p>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
              <div className="relative">
                <Building className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  id="schoolCode"
                  placeholder="Enter your school code"
                  className="pl-10"
                  value={schoolCode}
                  onChange={(e) => setSchoolCode(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="name@school.com"
                  className="pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <a href="#" className="text-sm text-gray-600 hover:text-black">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="pl-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <p className="text-xs text-gray-500">
                Demo: any password will work
              </p>
            </div>
            
            <Button 
              type="submit" 
              className="w-full py-6 rounded-xl text-lg font-medium bg-black text-white hover:bg-gray-800 transition-all shadow-sm hover:shadow-md"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? "Logging in..." : "Log In"}
            </Button>
          </motion.form>
        </div>
      </motion.div>
      
      <motion.p 
        className="mt-8 text-sm text-gray-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        Need help? Contact your school administrator
      </motion.p>
    </div>
  );
};

export default Login;
