
import { User, UserRole, Module } from "@/types/auth";
import { 
  Users, 
  BookOpen, 
  CreditCard, 
  Calendar, 
  Settings, 
  BarChart3, 
  MessageSquare, 
  GraduationCap 
} from "lucide-react";

// Dummy users for testing
export const dummyUsers: User[] = [
  { 
    id: "1", 
    email: "admin@school.com", 
    name: "Admin User", 
    role: "admin",
    schoolCode: "SCH001"
  },
  { 
    id: "2", 
    email: "super@school.com", 
    name: "Super Admin", 
    role: "super_admin",
    schoolCode: "SCH001"
  },
];

// Available modules in the system
export const availableModules: Module[] = [
  {
    id: "dashboard",
    name: "Dashboard",
    description: "Overview of school statistics and activities",
    icon: "BarChart3",
    path: "/dashboard",
    allowedRoles: ["super_admin", "admin", "teacher", "staff"]
  },
  {
    id: "students",
    name: "Students",
    description: "Manage student records and information",
    icon: "Users",
    path: "/students",
    allowedRoles: ["super_admin", "admin", "teacher"]
  },
  {
    id: "classes",
    name: "Classes",
    description: "Manage classes, sections and timetables",
    icon: "GraduationCap",
    path: "/classes",
    allowedRoles: ["super_admin", "admin", "teacher"]
  },
  {
    id: "subjects",
    name: "Subjects",
    description: "Manage subjects and teaching materials",
    icon: "BookOpen",
    path: "/subjects",
    allowedRoles: ["super_admin", "admin", "teacher"]
  },
  {
    id: "fees",
    name: "Fees",
    description: "Manage fee structure and payments",
    icon: "CreditCard",
    path: "/fees",
    allowedRoles: ["super_admin", "admin"]
  },
  {
    id: "schedule",
    name: "Schedule",
    description: "School calendar and event management",
    icon: "Calendar",
    path: "/schedule",
    allowedRoles: ["super_admin", "admin", "teacher", "staff"]
  },
  {
    id: "communication",
    name: "Communication",
    description: "Send notifications and messages to parents and staff",
    icon: "MessageSquare",
    path: "/communication",
    allowedRoles: ["super_admin", "admin"]
  },
  {
    id: "settings",
    name: "Settings",
    description: "School configuration and system settings",
    icon: "Settings",
    path: "/settings",
    allowedRoles: ["super_admin", "admin"]
  }
];

// Function to get icon component by name
export const getIconByName = (iconName: string) => {
  const icons: Record<string, any> = {
    Users,
    BookOpen,
    CreditCard,
    Calendar,
    Settings,
    BarChart3,
    MessageSquare,
    GraduationCap
  };
  
  return icons[iconName] || BarChart3;
};

// Function to get modules accessible by role
export const getAccessibleModules = (role: UserRole): Module[] => {
  return availableModules.filter(module => 
    module.allowedRoles.includes(role)
  );
};

// Function to create new user
export const createUser = (
  email: string, 
  name: string, 
  role: UserRole, 
  schoolCode: string
): User => {
  return {
    id: `user-${Date.now()}`, // Generate a unique ID
    email,
    name,
    role,
    schoolCode
  };
};
