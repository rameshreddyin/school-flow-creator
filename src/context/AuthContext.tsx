
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User, UserRole } from "@/types/auth";
import { dummyUsers } from "@/lib/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string, schoolCode: string) => Promise<boolean>;
  logout: () => void;
  createStaffAccount: (email: string, name: string, role: UserRole) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for existing user in localStorage
    const storedUser = localStorage.getItem("schoolUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, schoolCode: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // In a real app, this would be an API call
      // For now, simulate a delay and use dummy data
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const foundUser = dummyUsers.find(u => 
        u.email.toLowerCase() === email.toLowerCase() && 
        u.schoolCode === schoolCode
      );
      
      if (foundUser) {
        // In a real app, we would validate the password here
        // For demo purposes, we're accepting any password
        setUser(foundUser);
        localStorage.setItem("schoolUser", JSON.stringify(foundUser));
        toast.success(`Welcome back, ${foundUser.name}!`);
        return true;
      } else {
        toast.error("Invalid credentials. Please try again.");
        return false;
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An error occurred during login.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("schoolUser");
    navigate("/login");
    toast.success("You have been logged out.");
  };

  const createStaffAccount = async (email: string, name: string, role: UserRole): Promise<boolean> => {
    try {
      // In a real app, this would create a new user in the database
      // Here we're just simulating the process
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success(`Account for ${name} created successfully!`);
      return true;
    } catch (error) {
      console.error("Error creating account:", error);
      toast.error("Failed to create account.");
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, createStaffAccount }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
