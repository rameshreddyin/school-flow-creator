
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { getAccessibleModules, getIconByName } from "@/lib/auth";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import {
  Bell,
  Calendar,
  ChevronRight,
  IndianRupee,
  Menu,
  MessageSquare,
  Users,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";

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

const performanceData = [
  { name: "Class 1", value: 85 },
  { name: "Class 2", value: 78 },
  { name: "Class 3", value: 82 },
  { name: "Class 4", value: 88 },
  { name: "Class 5", value: 75 },
  { name: "Class 6", value: 80 },
];

const COLORS = ['#9b87f5', '#7E69AB', '#D6BCFA', '#8E9196', '#F2FCE2', '#F97316'];

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

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  if (!user) {
    return null; // Protected route should handle this
  }
  
  const modules = getAccessibleModules(user.role);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside 
        className={cn(
          "bg-white border-r border-gray-200 h-screen transition-all duration-300 ease-in-out overflow-y-auto fixed top-0 left-0 bottom-0 z-30",
          sidebarOpen ? "w-64" : "w-20"
        )}
      >
        <div className="p-4 flex items-center justify-between border-b border-gray-100">
          <div className="flex items-center gap-2">
            {sidebarOpen ? (
              <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-indigo-500">
                SchoolManager
              </h1>
            ) : (
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-indigo-500">
                SM
              </span>
            )}
          </div>
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1 rounded-lg hover:bg-gray-100 text-gray-500"
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
              <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                <span className="text-purple-700 font-medium">{user.name.charAt(0)}</span>
              </div>
              {sidebarOpen && (
                <div className="flex flex-col">
                  <span className="font-medium text-sm">{user.name}</span>
                  <span className="text-xs text-gray-500">
                    {user.role.replace('_', ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
                  </span>
                </div>
              )}
            </div>
          </div>
          
          <div className="space-y-1">
            {modules.map((module) => {
              const IconComponent = getIconByName(module.icon);
              
              return (
                <button
                  key={module.id}
                  className={cn(
                    "w-full rounded-lg text-left transition-colors",
                    "flex items-center gap-3 py-2 px-3 hover:bg-gray-100",
                    module.id === "dashboard" ? "bg-purple-50 text-purple-700" : "text-gray-700"
                  )}
                >
                  <IconComponent className={cn(
                    "h-5 w-5",
                    module.id === "dashboard" ? "text-purple-700" : "text-gray-500"
                  )} />
                  {sidebarOpen && (
                    <span className="font-medium text-sm truncate">
                      {module.name}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100">
          <Button 
            variant="outline" 
            className={cn(
              "w-full justify-center gap-2",
              !sidebarOpen && "p-2"
            )}
            onClick={logout}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 text-gray-500" 
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
        {/* Dashboard Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-500">Welcome back, {user.name}!</p>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-lg bg-white border border-gray-200 text-gray-500 relative">
              <Bell size={20} />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
            </button>
            <button className="p-2 rounded-lg bg-white border border-gray-200 text-gray-500">
              <MessageSquare size={20} />
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <motion.div 
            className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-5">
              <div className="flex items-center justify-between">
                <span className="text-gray-500 text-sm">Total Students</span>
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Users className="h-5 w-5 text-blue-500" />
                </div>
              </div>
              <div className="mt-2">
                <h3 className="text-2xl font-bold">1,248</h3>
                <p className="text-xs text-green-500 flex items-center mt-1">
                  <span className="mr-1">↑</span> 4.5% from last month
                </p>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <button className="text-sm text-gray-600 flex items-center">
                View Details <ChevronRight className="h-4 w-4 ml-1" />
              </button>
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
                <span className="text-gray-500 text-sm">Teachers</span>
                <div className="p-2 bg-purple-50 rounded-lg">
                  <Users className="h-5 w-5 text-purple-500" />
                </div>
              </div>
              <div className="mt-2">
                <h3 className="text-2xl font-bold">78</h3>
                <p className="text-xs text-green-500 flex items-center mt-1">
                  <span className="mr-1">↑</span> 2.5% from last month
                </p>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <button className="text-sm text-gray-600 flex items-center">
                View Details <ChevronRight className="h-4 w-4 ml-1" />
              </button>
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
                <span className="text-gray-500 text-sm">Total Revenue</span>
                <div className="p-2 bg-green-50 rounded-lg">
                  <IndianRupee className="h-5 w-5 text-green-500" />
                </div>
              </div>
              <div className="mt-2">
                <h3 className="text-2xl font-bold">₹9.48L</h3>
                <p className="text-xs text-green-500 flex items-center mt-1">
                  <span className="mr-1">↑</span> 12.5% from last month
                </p>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <button className="text-sm text-gray-600 flex items-center">
                View Details <ChevronRight className="h-4 w-4 ml-1" />
              </button>
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
                <span className="text-gray-500 text-sm">Attendance Today</span>
                <div className="p-2 bg-yellow-50 rounded-lg">
                  <Calendar className="h-5 w-5 text-yellow-500" />
                </div>
              </div>
              <div className="mt-2">
                <h3 className="text-2xl font-bold">92.4%</h3>
                <p className="text-xs text-red-500 flex items-center mt-1">
                  <span className="mr-1">↓</span> 1.2% from yesterday
                </p>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <button className="text-sm text-gray-600 flex items-center">
                View Details <ChevronRight className="h-4 w-4 ml-1" />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Charts and Data */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <motion.div 
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Attendance Overview</h3>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={attendanceData}
                  margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                  <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                  <Tooltip />
                  <Bar dataKey="present" fill="#9b87f5" name="Present" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="absent" fill="#ffcccb" name="Absent" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
          
          <motion.div 
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Fee Collection Status</h3>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={feeCollectionData}
                  margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                  <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                  <Tooltip />
                  <Bar dataKey="collected" fill="#7E69AB" name="Collected" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="pending" fill="#F97316" name="Pending" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div 
            className="bg-white rounded-xl shadow-sm border border-gray-100 lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Tabs defaultValue="events" className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-gray-900">School Activities</h3>
                <TabsList>
                  <TabsTrigger value="events">Upcoming Events</TabsTrigger>
                  <TabsTrigger value="notifications">Notifications</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="events" className="mt-0">
                <div className="space-y-4">
                  {upcomingEvents.map((event) => (
                    <div 
                      key={event.id} 
                      className="p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-shrink-0 h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                          <Calendar className="h-6 w-6 text-purple-700" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-gray-900 truncate">{event.title}</h4>
                          <p className="mt-1 text-xs text-gray-500">{event.date} • {event.time}</p>
                          <p className="mt-1 text-xs text-gray-500">{event.location}</p>
                        </div>
                        <Button size="sm" variant="ghost" className="flex-shrink-0">
                          View
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="notifications" className="mt-0">
                <div className="space-y-4">
                  {recentNotifications.map((notification) => (
                    <div 
                      key={notification.id} 
                      className="p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <Bell className="h-5 w-5 text-blue-700" />
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
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
          
          <motion.div 
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Academic Performance</h3>
            </div>
            <div className="h-64 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={performanceData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {performanceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              {performanceData.map((entry, index) => (
                <div key={`legend-${index}`} className="flex items-center gap-1">
                  <div 
                    className="h-3 w-3 rounded-full" 
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  ></div>
                  <span className="text-xs text-gray-600">{entry.name}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
