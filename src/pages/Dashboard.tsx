
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  BarChart3, 
  Users, 
  Book, 
  CreditCard, 
  Clock, 
  Calendar, 
  Bell, 
  Settings, 
  LogOut,
  Home,
  GraduationCap
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  
  // Check if we have school data in localStorage
  const schoolDataString = localStorage.getItem('schoolOnboardingData');
  const schoolData = schoolDataString ? JSON.parse(schoolDataString) : null;
  const schoolName = schoolData?.schoolDetails?.name || "Your School";
  
  // If no school data, redirect to onboarding
  React.useEffect(() => {
    if (!schoolDataString) {
      navigate('/');
    }
  }, [schoolDataString, navigate]);
  
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
        <div className="p-4 border-b border-gray-200 flex items-center">
          <GraduationCap className="h-6 w-6 mr-2" />
          <span className="font-bold text-lg">SchoolManager</span>
        </div>
        
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="px-2 space-y-1">
            <Button variant="ghost" className="w-full justify-start">
              <Home className="mr-3 h-5 w-5" />
              Dashboard
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Users className="mr-3 h-5 w-5" />
              Students
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Book className="mr-3 h-5 w-5" />
              Classes
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Calendar className="mr-3 h-5 w-5" />
              Schedule
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <CreditCard className="mr-3 h-5 w-5" />
              Fees
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Bell className="mr-3 h-5 w-5" />
              Notifications
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Settings className="mr-3 h-5 w-5" />
              Settings
            </Button>
          </nav>
        </div>
        
        <div className="p-4 border-t border-gray-200">
          <Button variant="ghost" className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50">
            <LogOut className="mr-3 h-5 w-5" />
            Logout
          </Button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <h1 className="text-2xl font-bold text-gray-900">Welcome to {schoolName}</h1>
          </div>
        </header>
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Total Students</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Total Classes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{schoolData?.classStructure?.classes?.length || 0}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Total Subjects</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{schoolData?.subjects?.length || 0}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Fee Collection</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹0</div>
              </CardContent>
            </Card>
          </div>
          
          {/* Dashboard Tabs */}
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="classes">Classes</TabsTrigger>
              <TabsTrigger value="calendar">Calendar</TabsTrigger>
              <TabsTrigger value="fees">Fees</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Latest updates from your school</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8 text-gray-500">
                      <BarChart3 className="mx-auto h-12 w-12 text-gray-400" />
                      <p className="mt-4">No recent activity yet</p>
                      <p className="text-sm">Start adding students and staff to see updates here</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                    <CardDescription>Common tasks and actions</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <Users className="mr-2 h-4 w-4" />
                      Add New Student
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Clock className="mr-2 h-4 w-4" />
                      Schedule Class
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <CreditCard className="mr-2 h-4 w-4" />
                      Record Payment
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="classes">
              <Card>
                <CardHeader>
                  <CardTitle>Class Management</CardTitle>
                  <CardDescription>Manage your school classes</CardDescription>
                </CardHeader>
                <CardContent>
                  {schoolData?.classStructure?.classes?.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {schoolData.classStructure.classes.map((cls: any, index: number) => (
                        <div key={index} className="border rounded-lg p-4">
                          <h3 className="font-semibold">{cls.name}</h3>
                          <p className="text-sm text-gray-500 mt-1">
                            Sections: {cls.sections.join(", ")}
                          </p>
                          <Button variant="outline" size="sm" className="mt-3">View Details</Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <Book className="mx-auto h-12 w-12 text-gray-400" />
                      <p className="mt-4">No classes configured yet</p>
                      <Button className="mt-2">Add Classes</Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="calendar">
              <Card>
                <CardHeader>
                  <CardTitle>School Calendar</CardTitle>
                  <CardDescription>View and manage your school schedule</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12 text-gray-500">
                    <Calendar className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-4">Calendar view coming soon</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="fees">
              <Card>
                <CardHeader>
                  <CardTitle>Fee Management</CardTitle>
                  <CardDescription>Manage your school fees</CardDescription>
                </CardHeader>
                <CardContent>
                  {schoolData?.feeStructure?.feeTypes?.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full table-auto">
                        <thead>
                          <tr className="border-b">
                            <th className="px-4 py-2 text-left">Fee Type</th>
                            <th className="px-4 py-2 text-left">Amount</th>
                            <th className="px-4 py-2 text-left">Term Based</th>
                          </tr>
                        </thead>
                        <tbody>
                          {schoolData.feeStructure.feeTypes.map((fee: any, index: number) => (
                            <tr key={index} className="border-b">
                              <td className="px-4 py-2">{fee.name}</td>
                              <td className="px-4 py-2">₹{fee.amount}</td>
                              <td className="px-4 py-2">{fee.termBased ? "Yes" : "No"}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <CreditCard className="mx-auto h-12 w-12 text-gray-400" />
                      <p className="mt-4">No fee structure configured yet</p>
                      <Button className="mt-2">Configure Fees</Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
