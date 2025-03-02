
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { getAccessibleModules, getIconByName } from "@/lib/auth";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle, 
  CardFooter 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  LineChart,
  Line
} from "recharts";
import {
  ArrowUpRight,
  BadgeCheck,
  Bell,
  BookOpen,
  Calendar,
  ChevronRight,
  CircleUser,
  ClipboardList,
  Clock,
  FileText,
  GraduationCap,
  HelpCircle,
  Home,
  IndianRupee,
  Info,
  LineChart as LineChartIcon,
  Mail,
  Menu,
  MessageSquare,
  PieChart as PieChartIcon,
  Search,
  Settings,
  Tablet,
  User,
  UserPlus,
  Users,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock data for charts and tables
const attendanceData = [
  { name: "Class 1", present: 45, absent: 5 },
  { name: "Class 2", present: 40, absent: 10 },
  { name: "Class 3", present: 38, absent: 7 },
  { name: "Class 4", present: 42, absent: 8 },
  { name: "Class 5", present: 44, absent: 6 },
  { name: "Class 6", present: 39, absent: 11 },
];

const feeCollectionData = [
  { name: "Apr", collected: 150000, pending: 35000 },
  { name: "May", collected: 180000, pending: 25000 },
  { name: "Jun", collected: 210000, pending: 15000 },
  { name: "Jul", collected: 195000, pending: 30000 },
  { name: "Aug", collected: 220000, pending: 20000 },
  { name: "Sep", collected: 200000, pending: 40000 },
];

const admissionTrendData = [
  { name: "Jan", value: 5 },
  { name: "Feb", value: 7 },
  { name: "Mar", value: 10 },
  { name: "Apr", value: 15 },
  { name: "May", value: 20 },
  { name: "Jun", value: 18 },
  { name: "Jul", value: 12 },
  { name: "Aug", value: 8 },
  { name: "Sep", value: 9 },
];

const examResultsData = [
  { name: "Class 1", excellent: 20, good: 15, average: 10, poor: 5 },
  { name: "Class 2", excellent: 18, good: 16, average: 12, poor: 4 },
  { name: "Class 3", excellent: 15, good: 15, average: 15, poor: 5 },
  { name: "Class 4", excellent: 22, good: 12, average: 8, poor: 8 },
  { name: "Class 5", excellent: 25, good: 10, average: 10, poor: 5 },
  { name: "Class 6", excellent: 19, good: 14, average: 11, poor: 6 },
];

const performanceData = [
  { name: "Class 1", value: 85 },
  { name: "Class 2", value: 78 },
  { name: "Class 3", value: 82 },
  { name: "Class 4", value: 88 },
  { name: "Class 5", value: 75 },
  { name: "Class 6", value: 80 },
];

const COLORS = ['#6B7280', '#9B9B9B', '#D1D5DB', '#374151', '#4B5563', '#1F2937'];

const upcomingEvents = [
  { 
    id: 1, 
    title: "Parent-Teacher Meeting", 
    date: "Oct 15, 2023", 
    time: "10:00 AM - 1:00 PM",
    location: "School Auditorium" 
  },
  { 
    id: 2, 
    title: "Annual Sports Day", 
    date: "Oct 20, 2023", 
    time: "8:00 AM - 5:00 PM",
    location: "School Grounds" 
  },
  { 
    id: 3, 
    title: "Science Exhibition", 
    date: "Oct 25, 2023", 
    time: "10:00 AM - 3:00 PM",
    location: "School Labs" 
  },
  { 
    id: 4, 
    title: "Cultural Program", 
    date: "Nov 5, 2023", 
    time: "4:00 PM - 8:00 PM",
    location: "School Auditorium" 
  },
];

const recentLeads = [
  { 
    id: 1, 
    name: "Arjun Sharma", 
    phone: "9876543210", 
    class: "Class 5",
    status: "New", 
    date: "Oct 12, 2023"
  },
  { 
    id: 2, 
    name: "Priya Patel", 
    phone: "9876543211", 
    class: "Class 3",
    status: "Contacted", 
    date: "Oct 11, 2023"
  },
  { 
    id: 3, 
    name: "Rahul Verma", 
    phone: "9876543212", 
    class: "Class 8",
    status: "Follow-up", 
    date: "Oct 10, 2023"
  },
  { 
    id: 4, 
    name: "Anjali Gupta", 
    phone: "9876543213", 
    class: "Class 2",
    status: "Enrolled", 
    date: "Oct 9, 2023"
  },
];

const recentNotifications = [
  { 
    id: 1, 
    title: "Fee Payment Reminder", 
    message: "Last date for Term 2 fee payment is October 15th.",
    time: "2 hours ago" 
  },
  { 
    id: 2, 
    title: "New Circular Issued", 
    message: "New circular regarding winter uniform has been issued.",
    time: "5 hours ago" 
  },
  { 
    id: 3, 
    title: "Staff Meeting", 
    message: "Staff meeting scheduled for October 10th at 3:00 PM.",
    time: "1 day ago" 
  },
  { 
    id: 4, 
    title: "Exam Schedule Released", 
    message: "Mid-term examination schedule has been released.",
    time: "2 days ago" 
  },
];

const recentMessages = [
  {
    id: 1,
    sender: "Rajesh Kumar (Parent)",
    message: "Request for leave for my son Amit Kumar for 3 days due to family function.",
    time: "1 hour ago",
    read: false
  },
  {
    id: 2,
    sender: "Sunita Sharma (Teacher)",
    message: "Submitting the list of students for Science Olympiad.",
    time: "3 hours ago",
    read: true
  },
  {
    id: 3,
    sender: "Mohan Singh (Parent)",
    message: "Need to discuss my daughter's progress in mathematics.",
    time: "Yesterday",
    read: true
  },
  {
    id: 4,
    sender: "Pooja Verma (Staff)",
    message: "Request for advance salary for medical emergency.",
    time: "2 days ago",
    read: true
  }
];

const upcomingExams = [
  {
    id: 1,
    subject: "Mathematics",
    class: "Class 10",
    date: "Oct 20, 2023",
    time: "10:00 AM - 1:00 PM"
  },
  {
    id: 2,
    subject: "Science",
    class: "Class 9",
    date: "Oct 21, 2023",
    time: "10:00 AM - 1:00 PM"
  },
  {
    id: 3,
    subject: "English",
    class: "Class 8",
    date: "Oct 22, 2023",
    time: "10:00 AM - 1:00 PM"
  },
  {
    id: 4,
    subject: "Hindi",
    class: "Class 7",
    date: "Oct 23, 2023",
    time: "10:00 AM - 1:00 PM"
  }
];

const feeStatus = [
  {
    id: 1,
    class: "Class 1",
    total: 50,
    paid: 45,
    partial: 3,
    unpaid: 2,
    amount: 250000
  },
  {
    id: 2,
    class: "Class 2",
    total: 45,
    paid: 40,
    partial: 4,
    unpaid: 1,
    amount: 225000
  },
  {
    id: 3,
    class: "Class 3",
    total: 50,
    paid: 42,
    partial: 5,
    unpaid: 3,
    amount: 250000
  },
  {
    id: 4,
    class: "Class 4",
    total: 48,
    paid: 40,
    partial: 6,
    unpaid: 2,
    amount: 240000
  }
];

// Navigation modules definition
const navigationModules = [
  {
    title: "Main",
    items: [
      { name: "Dashboard", icon: Home, path: "/dashboard", active: true },
      { name: "Leads & Enrollments", icon: UserPlus, path: "/leads" },
      { name: "Students", icon: Users, path: "/students" },
      { name: "Staff", icon: CircleUser, path: "/staff" },
    ]
  },
  {
    title: "Academic",
    items: [
      { name: "Classes", icon: GraduationCap, path: "/classes" },
      { name: "Subjects", icon: BookOpen, path: "/subjects" },
      { name: "Attendance", icon: ClipboardList, path: "/attendance" },
      { name: "Exams", icon: FileText, path: "/exams" },
      { name: "Timetable", icon: Clock, path: "/timetable" },
    ]
  },
  {
    title: "Administration",
    items: [
      { name: "Finance", icon: IndianRupee, path: "/finance" },
      { name: "Events", icon: Calendar, path: "/events" },
      { name: "Messages", icon: MessageSquare, path: "/communication" },
      { name: "Settings", icon: Settings, path: "/settings" },
    ]
  }
];

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  
  if (!user) {
    return null; // Protected route should handle this
  }
  
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside 
        className={cn(
          "bg-gray-900 h-screen transition-all duration-300 ease-in-out overflow-y-auto fixed top-0 left-0 bottom-0 z-30",
          sidebarOpen ? "w-64" : "w-20"
        )}
      >
        <div className="p-4 flex items-center justify-between border-b border-gray-800">
          <div className="flex items-center gap-2">
            {sidebarOpen ? (
              <h1 className="text-xl font-bold text-white">
                EduManager
              </h1>
            ) : (
              <span className="text-xl font-bold text-white">
                EM
              </span>
            )}
          </div>
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1 rounded-lg hover:bg-gray-800 text-gray-400"
          >
            {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
        
        <div className="py-3 px-3">
          <div className="mb-4">
            <div className={cn(
              "flex items-center gap-3 mb-3 py-2 px-3 rounded-lg",
              sidebarOpen ? "justify-start" : "justify-center"
            )}>
              <div className="h-10 w-10 rounded-full bg-gray-700 flex items-center justify-center">
                <span className="text-gray-200 font-medium">{user.name.charAt(0)}</span>
              </div>
              {sidebarOpen && (
                <div className="flex flex-col">
                  <span className="font-medium text-sm text-gray-200">{user.name}</span>
                  <span className="text-xs text-gray-400">
                    {user.role.replace('_', ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
                  </span>
                </div>
              )}
            </div>
          </div>
          
          {navigationModules.map((module, index) => (
            <div key={index} className="mb-6">
              {sidebarOpen && (
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-3">
                  {module.title}
                </h3>
              )}
              <div className="space-y-1">
                {module.items.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={cn(
                      "w-full rounded-lg text-left transition-colors flex items-center gap-3 py-2 px-3",
                      item.active ? "bg-gray-800 text-white" : "text-gray-400 hover:bg-gray-800 hover:text-white"
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    {sidebarOpen && (
                      <span className="font-medium text-sm truncate">
                        {item.name}
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800">
          <Button 
            variant="outline" 
            className={cn(
              "w-full justify-center gap-2 border-gray-700 text-gray-400 hover:text-white hover:bg-gray-800",
              !sidebarOpen && "p-2"
            )}
            onClick={logout}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" 
              />
            </svg>
            {sidebarOpen && <span>Logout</span>}
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={cn(
        "flex-1 p-6 transition-all duration-300 ease-in-out",
        sidebarOpen ? "ml-64" : "ml-20"
      )}>
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-500">Welcome back, {user.name}!</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
              <Input 
                type="text" 
                placeholder="Search..." 
                className="pl-8 bg-white" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <button className="p-2 rounded-lg bg-white border border-gray-200 text-gray-500 relative">
              <Bell size={20} />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
            </button>
            <button className="p-2 rounded-lg bg-white border border-gray-200 text-gray-500">
              <MessageSquare size={20} />
            </button>
            <button className="p-2 rounded-lg bg-white border border-gray-200 text-gray-500">
              <HelpCircle size={20} />
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
          <motion.div 
            className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-5">
              <div className="flex items-center justify-between">
                <span className="text-gray-500 text-sm">Total Students</span>
                <div className="p-2 bg-gray-100 rounded-lg">
                  <Users className="h-5 w-5 text-gray-600" />
                </div>
              </div>
              <div className="mt-2">
                <h3 className="text-2xl font-bold">1,248</h3>
                <p className="text-xs text-green-500 flex items-center mt-1">
                  <span className="mr-1">↑</span> 4.5% from last month
                </p>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3 border-t border-gray-100">
              <Link to="/students" className="text-sm text-gray-600 flex items-center">
                View Details <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          </motion.div>
          
          <motion.div 
            className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <div className="p-5">
              <div className="flex items-center justify-between">
                <span className="text-gray-500 text-sm">Teachers & Staff</span>
                <div className="p-2 bg-gray-100 rounded-lg">
                  <User className="h-5 w-5 text-gray-600" />
                </div>
              </div>
              <div className="mt-2">
                <h3 className="text-2xl font-bold">98</h3>
                <p className="text-xs text-green-500 flex items-center mt-1">
                  <span className="mr-1">↑</span> 2.5% from last month
                </p>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3 border-t border-gray-100">
              <Link to="/staff" className="text-sm text-gray-600 flex items-center">
                View Details <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          </motion.div>
          
          <motion.div 
            className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <div className="p-5">
              <div className="flex items-center justify-between">
                <span className="text-gray-500 text-sm">Revenue (Monthly)</span>
                <div className="p-2 bg-gray-100 rounded-lg">
                  <IndianRupee className="h-5 w-5 text-gray-600" />
                </div>
              </div>
              <div className="mt-2">
                <h3 className="text-2xl font-bold">₹12.4L</h3>
                <p className="text-xs text-green-500 flex items-center mt-1">
                  <span className="mr-1">↑</span> 12.5% from last month
                </p>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3 border-t border-gray-100">
              <Link to="/finance" className="text-sm text-gray-600 flex items-center">
                View Details <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          </motion.div>
          
          <motion.div 
            className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <div className="p-5">
              <div className="flex items-center justify-between">
                <span className="text-gray-500 text-sm">Leads (Monthly)</span>
                <div className="p-2 bg-gray-100 rounded-lg">
                  <UserPlus className="h-5 w-5 text-gray-600" />
                </div>
              </div>
              <div className="mt-2">
                <h3 className="text-2xl font-bold">124</h3>
                <p className="text-xs text-green-500 flex items-center mt-1">
                  <span className="mr-1">↑</span> 8.2% from last month
                </p>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3 border-t border-gray-100">
              <Link to="/leads" className="text-sm text-gray-600 flex items-center">
                View Details <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Overview Tabs */}
        <Tabs defaultValue="overview" className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">School Performance</h2>
            <TabsList className="bg-gray-100">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="academic">Academic</TabsTrigger>
              <TabsTrigger value="financial">Financial</TabsTrigger>
              <TabsTrigger value="admissions">Admissions</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-sm">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold">Attendance Overview</CardTitle>
                    <Select defaultValue="thisWeek">
                      <SelectTrigger className="w-[160px] h-8 text-xs">
                        <SelectValue placeholder="Select period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="today">Today</SelectItem>
                        <SelectItem value="thisWeek">This Week</SelectItem>
                        <SelectItem value="thisMonth">This Month</SelectItem>
                        <SelectItem value="lastMonth">Last Month</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={attendanceData}
                      margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                      <XAxis dataKey="name" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                      <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                      <RechartsTooltip contentStyle={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: "4px" }} />
                      <Bar dataKey="present" name="Present" fill="#4B5563" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="absent" name="Absent" fill="#D1D5DB" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <Card className="shadow-sm">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold">Admission Trends</CardTitle>
                    <Select defaultValue="thisYear">
                      <SelectTrigger className="w-[160px] h-8 text-xs">
                        <SelectValue placeholder="Select period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="thisYear">This Year</SelectItem>
                        <SelectItem value="lastYear">Last Year</SelectItem>
                        <SelectItem value="last3Years">Last 3 Years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={admissionTrendData}
                      margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                      <XAxis dataKey="name" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                      <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                      <RechartsTooltip contentStyle={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: "4px" }} />
                      <Line type="monotone" dataKey="value" stroke="#1F2937" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="academic" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-sm">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold">Examination Results</CardTitle>
                    <Select defaultValue="lastTerm">
                      <SelectTrigger className="w-[160px] h-8 text-xs">
                        <SelectValue placeholder="Select term" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="currentTerm">Current Term</SelectItem>
                        <SelectItem value="lastTerm">Last Term</SelectItem>
                        <SelectItem value="annualResults">Annual Results</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <CardDescription className="text-xs text-gray-500">
                    Performance across different classes
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={examResultsData}
                      margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                      <XAxis dataKey="name" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                      <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                      <RechartsTooltip contentStyle={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: "4px" }} />
                      <Bar dataKey="excellent" name="Excellent" stackId="a" fill="#1F2937" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="good" name="Good" stackId="a" fill="#4B5563" radius={[0, 0, 0, 0]} />
                      <Bar dataKey="average" name="Average" stackId="a" fill="#9B9B9B" radius={[0, 0, 0, 0]} />
                      <Bar dataKey="poor" name="Needs Improvement" stackId="a" fill="#D1D5DB" radius={[0, 0, 4, 4]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <Card className="shadow-sm">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold">Class Performance</CardTitle>
                    <Select defaultValue="allSubjects">
                      <SelectTrigger className="w-[160px] h-8 text-xs">
                        <SelectValue placeholder="Select subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="allSubjects">All Subjects</SelectItem>
                        <SelectItem value="mathematics">Mathematics</SelectItem>
                        <SelectItem value="science">Science</SelectItem>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="hindi">Hindi</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <CardDescription className="text-xs text-gray-500">
                    Average performance score
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-[300px] flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={performanceData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {performanceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <RechartsTooltip contentStyle={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: "4px" }} />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="financial" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-sm">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold">Fee Collection Status</CardTitle>
                    <Select defaultValue="currentTerm">
                      <SelectTrigger className="w-[160px] h-8 text-xs">
                        <SelectValue placeholder="Select term" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="currentTerm">Current Term</SelectItem>
                        <SelectItem value="lastTerm">Last Term</SelectItem>
                        <SelectItem value="annual">Annual</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={feeCollectionData}
                      margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                      <XAxis dataKey="name" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                      <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                      <RechartsTooltip contentStyle={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: "4px" }} formatter={(value) => `₹${value.toLocaleString()}`} />
                      <Bar dataKey="collected" name="Collected" fill="#1F2937" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="pending" name="Pending" fill="#D1D5DB" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <Card className="shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-semibold">Fee Collection by Class</CardTitle>
                  <CardDescription className="text-xs text-gray-500">
                    Current term payment status
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-lg border border-gray-200 overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class</th>
                          <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Students</th>
                          <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Paid</th>
                          <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                          <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {feeStatus.map((row) => (
                          <tr key={row.id}>
                            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{row.class}</td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{row.total}</td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                              {row.paid} <span className="text-gray-400">({Math.round((row.paid / row.total) * 100)}%)</span>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">₹{row.amount.toLocaleString()}</td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-gray-800 h-2 rounded-full" 
                                  style={{ width: `${(row.paid / row.total) * 100}%` }}
                                ></div>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="admissions" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-sm">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold">Recent Leads</CardTitle>
                    <Button size="sm" variant="outline" className="h-8 gap-1">
                      <UserPlus className="h-3.5 w-3.5" />
                      <span className="text-xs">Add New</span>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="rounded-lg border border-gray-200 overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                          <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class</th>
                          <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                          <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {recentLeads.map((lead) => (
                          <tr key={lead.id}>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                                  <span className="text-xs font-medium text-gray-600">{lead.name.charAt(0)}</span>
                                </div>
                                <div className="ml-3">
                                  <p className="text-sm font-medium text-gray-900">{lead.name}</p>
                                  <p className="text-xs text-gray-500">{lead.phone}</p>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{lead.class}</td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <span className={cn(
                                "px-2 inline-flex text-xs leading-5 font-semibold rounded-full",
                                lead.status === "New" && "bg-blue-100 text-blue-800",
                                lead.status === "Contacted" && "bg-yellow-100 text-yellow-800",
                                lead.status === "Follow-up" && "bg-purple-100 text-purple-800",
                                lead.status === "Enrolled" && "bg-green-100 text-green-800"
                              )}>
                                {lead.status}
                              </span>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{lead.date}</td>
                            <td className="px-4 py-3 whitespace-nowrap text-right text-sm">
                              <Button size="sm" variant="ghost" className="h-8 px-2 text-xs">
                                Details
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
                <CardFooter className="border-t border-gray-100 pt-4 flex justify-center">
                  <Button variant="outline" size="sm" className="w-full">
                    View All Leads
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="shadow-sm">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold">Admission Sources</CardTitle>
                    <Select defaultValue="thisYear">
                      <SelectTrigger className="w-[160px] h-8 text-xs">
                        <SelectValue placeholder="Select period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="thisYear">This Year</SelectItem>
                        <SelectItem value="lastYear">Last Year</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>
                <CardContent className="h-[300px] flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: "Website", value: 35 },
                          { name: "Referrals", value: 25 },
                          { name: "Social Media", value: 15 },
                          { name: "School Events", value: 10 },
                          { name: "Direct Inquiry", value: 15 }
                        ]}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {[...Array(5)].map((_, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <RechartsTooltip contentStyle={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: "4px" }} />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Bottom Section - Activity and Upcoming */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {/* Recent Activity */}
          <Card className="shadow-sm lg:col-span-2">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[130px] h-8 text-xs">
                    <SelectValue placeholder="Filter" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Activities</SelectItem>
                    <SelectItem value="notifications">Notifications</SelectItem>
                    <SelectItem value="messages">Messages</SelectItem>
                    <SelectItem value="events">Events</SelectItem>
                    <SelectItem value="exams">Exams</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="notifications" className="mt-0">
                <TabsList className="w-full bg-gray-100 p-1 rounded-lg">
                  <TabsTrigger value="notifications" className="flex-1 text-xs">Notifications</TabsTrigger>
                  <TabsTrigger value="messages" className="flex-1 text-xs">Messages</TabsTrigger>
                  <TabsTrigger value="events" className="flex-1 text-xs">Events</TabsTrigger>
                  <TabsTrigger value="exams" className="flex-1 text-xs">Exams</TabsTrigger>
                </TabsList>
                
                <TabsContent value="notifications" className="mt-4 space-y-4">
                  {recentNotifications.map((notification) => (
                    <div 
                      key={notification.id} 
                      className="p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center">
                          <Bell className="h-5 w-5 text-gray-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-medium text-gray-900 truncate">{notification.title}</h4>
                            <span className="text-xs text-gray-500">{notification.time}</span>
                          </div>
                          <p className="mt-1 text-xs text-gray-500">{notification.message}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </TabsContent>
                
                <TabsContent value="messages" className="mt-4 space-y-4">
                  {recentMessages.map((message) => (
                    <div 
                      key={message.id} 
                      className={cn(
                        "p-4 border rounded-lg transition-colors",
                        message.read ? "border-gray-100 hover:bg-gray-50" : "border-gray-200 bg-gray-50 hover:bg-gray-100"
                      )}
                    >
                      <div className="flex items-start gap-4">
                        <div className={cn(
                          "flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center",
                          message.read ? "bg-gray-100" : "bg-gray-200"
                        )}>
                          <MessageSquare className="h-5 w-5 text-gray-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className={cn(
                              "text-sm truncate",
                              message.read ? "font-medium text-gray-900" : "font-semibold text-gray-900"
                            )}>
                              {message.sender}
                              {!message.read && <span className="ml-2 inline-block h-2 w-2 rounded-full bg-blue-500"></span>}
                            </h4>
                            <span className="text-xs text-gray-500">{message.time}</span>
                          </div>
                          <p className="mt-1 text-xs text-gray-500 line-clamp-1">{message.message}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </TabsContent>
                
                <TabsContent value="events" className="mt-4 space-y-4">
                  {upcomingEvents.map((event) => (
                    <div 
                      key={event.id} 
                      className="p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center">
                          <Calendar className="h-5 w-5 text-gray-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-medium text-gray-900 truncate">{event.title}</h4>
                            <span className="text-xs text-gray-500">{event.date}</span>
                          </div>
                          <p className="mt-1 text-xs text-gray-500">{event.time} • {event.location}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </TabsContent>
                
                <TabsContent value="exams" className="mt-4 space-y-4">
                  {upcomingExams.map((exam) => (
                    <div 
                      key={exam.id} 
                      className="p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center">
                          <FileText className="h-5 w-5 text-gray-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-medium text-gray-900 truncate">{exam.subject}</h4>
                            <span className="text-xs text-gray-500">{exam.date}</span>
                          </div>
                          <p className="mt-1 text-xs text-gray-500">{exam.class} • {exam.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="border-t border-gray-100 pt-4 flex justify-center">
              <Button variant="outline" size="sm" className="w-full">
                View All Activity
              </Button>
            </CardFooter>
          </Card>
          
          {/* Quick Actions */}
          <Card className="shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
              <CardDescription className="text-xs text-gray-500">
                Commonly used actions and tools
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="h-auto py-4 px-3 flex flex-col items-center justify-center gap-3 border-gray-200 hover:bg-gray-50 hover:border-gray-300">
                  <UserPlus className="h-6 w-6 text-gray-700" />
                  <span className="text-xs text-gray-700">Add Student</span>
                </Button>
                <Button variant="outline" className="h-auto py-4 px-3 flex flex-col items-center justify-center gap-3 border-gray-200 hover:bg-gray-50 hover:border-gray-300">
                  <User className="h-6 w-6 text-gray-700" />
                  <span className="text-xs text-gray-700">Add Staff</span>
                </Button>
                <Button variant="outline" className="h-auto py-4 px-3 flex flex-col items-center justify-center gap-3 border-gray-200 hover:bg-gray-50 hover:border-gray-300">
                  <Clock className="h-6 w-6 text-gray-700" />
                  <span className="text-xs text-gray-700">Take Attendance</span>
                </Button>
                <Button variant="outline" className="h-auto py-4 px-3 flex flex-col items-center justify-center gap-3 border-gray-200 hover:bg-gray-50 hover:border-gray-300">
                  <MessageSquare className="h-6 w-6 text-gray-700" />
                  <span className="text-xs text-gray-700">Send Message</span>
                </Button>
                <Button variant="outline" className="h-auto py-4 px-3 flex flex-col items-center justify-center gap-3 border-gray-200 hover:bg-gray-50 hover:border-gray-300">
                  <IndianRupee className="h-6 w-6 text-gray-700" />
                  <span className="text-xs text-gray-700">Record Payment</span>
                </Button>
                <Button variant="outline" className="h-auto py-4 px-3 flex flex-col items-center justify-center gap-3 border-gray-200 hover:bg-gray-50 hover:border-gray-300">
                  <FileText className="h-6 w-6 text-gray-700" />
                  <span className="text-xs text-gray-700">Create Report</span>
                </Button>
              </div>
              
              <Separator className="my-3" />
              
              <div className="rounded-lg border border-gray-100 p-4 bg-gray-50">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <Info className="h-4 w-4 text-gray-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Help & Resources</h4>
                    <p className="text-xs text-gray-500">Access tutorials and support</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Button variant="ghost" size="sm" className="w-full justify-start text-xs text-gray-700">
                    <BadgeCheck className="h-4 w-4 mr-2" /> Getting Started Guide
                  </Button>
                  <Button variant="ghost" size="sm" className="w-full justify-start text-xs text-gray-700">
                    <Tablet className="h-4 w-4 mr-2" /> Video Tutorials
                  </Button>
                  <Button variant="ghost" size="sm" className="w-full justify-start text-xs text-gray-700">
                    <HelpCircle className="h-4 w-4 mr-2" /> Contact Support
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
