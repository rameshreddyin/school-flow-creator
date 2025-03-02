
import React, { useState } from "react";
import { 
  Search, 
  Filter, 
  UserPlus, 
  FileText, 
  Mail, 
  Phone, 
  MoreHorizontal, 
  FileSpreadsheet,
  Pencil,
  Calendar,
  Briefcase,
  Award,
  Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

// Sample staff data
const staffData = [
  { 
    id: 1, 
    name: "Dr. Rajesh Verma", 
    employeeId: "EMP001", 
    department: "Science", 
    designation: "Principal", 
    joiningDate: "15 Jan 2015", 
    email: "rajesh.verma@school.com", 
    phone: "9876543201",
    status: "Active",
    experience: "15 years"
  },
  { 
    id: 2, 
    name: "Mrs. Anjali Singh", 
    employeeId: "EMP002", 
    department: "Mathematics", 
    designation: "HOD", 
    joiningDate: "12 Jun 2017", 
    email: "anjali.singh@school.com", 
    phone: "9876543202",
    status: "Active",
    experience: "12 years"
  },
  { 
    id: 3, 
    name: "Mr. Sanjay Patel", 
    employeeId: "EMP003", 
    department: "English", 
    designation: "Senior Teacher", 
    joiningDate: "05 Apr 2019", 
    email: "sanjay.patel@school.com", 
    phone: "9876543203",
    status: "Active",
    experience: "8 years"
  },
  { 
    id: 4, 
    name: "Ms. Priya Sharma", 
    employeeId: "EMP004", 
    department: "Social Science", 
    designation: "Teacher", 
    joiningDate: "23 Jul 2020", 
    email: "priya.sharma@school.com", 
    phone: "9876543204",
    status: "On Leave",
    experience: "5 years"
  },
  { 
    id: 5, 
    name: "Mr. Vikram Reddy", 
    employeeId: "EMP005", 
    department: "Physical Education", 
    designation: "Sports Coach", 
    joiningDate: "18 Feb 2021", 
    email: "vikram.reddy@school.com", 
    phone: "9876543205",
    status: "Active",
    experience: "7 years"
  },
  { 
    id: 6, 
    name: "Mrs. Deepa Joshi", 
    employeeId: "EMP006", 
    department: "Administration", 
    designation: "Office Manager", 
    joiningDate: "10 Sep 2018", 
    email: "deepa.joshi@school.com", 
    phone: "9876543206",
    status: "Active",
    experience: "10 years"
  },
];

// Status badge color mapping
const getStatusColor = (status: string) => {
  switch(status) {
    case "Active":
      return "bg-green-100 text-green-800";
    case "On Leave":
      return "bg-yellow-100 text-yellow-800";
    case "Inactive":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const Staff = () => {
  const [activeTab, setActiveTab] = useState("allStaff");
  const { toast } = useToast();

  const handleAddStaff = () => {
    toast({
      title: "Add New Staff",
      description: "Form would open to add a new staff member.",
    });
  };

  return (
    <div className="p-6 max-w-[1600px] mx-auto">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Staff Management</h1>
            <p className="text-muted-foreground">Manage all staff records and information</p>
          </div>
          <div className="flex items-center gap-3">
            <Button 
              variant="outline"
              onClick={() => {
                toast({
                  title: "Export Staff Data",
                  description: "Staff data has been exported successfully.",
                });
              }}
            >
              <FileSpreadsheet className="mr-2 h-4 w-4" />
              Export Data
            </Button>
            <Button onClick={handleAddStaff}>
              <UserPlus className="mr-2 h-4 w-4" />
              Add Staff
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Staff</CardTitle>
              <CardDescription className="text-2xl font-bold">127</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">
                <span className="text-green-500 font-medium">↑ 5%</span> from last year
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Teaching Staff</CardTitle>
              <CardDescription className="text-2xl font-bold">84</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">
                <span className="text-foreground font-medium">66%</span> of total staff
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Non-Teaching Staff</CardTitle>
              <CardDescription className="text-2xl font-bold">43</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">
                <span className="text-foreground font-medium">34%</span> of total staff
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Average Experience</CardTitle>
              <CardDescription className="text-2xl font-bold">8.7 yrs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">
                <span className="text-foreground font-medium">Highly experienced</span> team
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="allStaff" className="w-full" onValueChange={setActiveTab}>
          <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-4 mb-4">
            <TabsList>
              <TabsTrigger value="allStaff">All Staff</TabsTrigger>
              <TabsTrigger value="teaching">Teaching</TabsTrigger>
              <TabsTrigger value="nonTeaching">Non-Teaching</TabsTrigger>
              <TabsTrigger value="administration">Administration</TabsTrigger>
            </TabsList>
            
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search staff..."
                  className="w-full pl-8"
                />
              </div>
              
              <Select defaultValue="all">
                <SelectTrigger className="w-[130px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="science">Science</SelectItem>
                  <SelectItem value="mathematics">Mathematics</SelectItem>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="social">Social Science</SelectItem>
                  <SelectItem value="physical">Physical Education</SelectItem>
                  <SelectItem value="admin">Administration</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <TabsContent value="allStaff" className="m-0">
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="py-3 px-4 text-left font-medium">Name</th>
                        <th className="py-3 px-4 text-left font-medium">Employee ID</th>
                        <th className="py-3 px-4 text-left font-medium">Department</th>
                        <th className="py-3 px-4 text-left font-medium">Designation</th>
                        <th className="py-3 px-4 text-left font-medium">Joining Date</th>
                        <th className="py-3 px-4 text-left font-medium">Experience</th>
                        <th className="py-3 px-4 text-left font-medium">Status</th>
                        <th className="py-3 px-4 text-left font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {staffData.map((staff) => (
                        <tr key={staff.id} className="border-b hover:bg-muted/50">
                          <td className="py-3 px-4 font-medium">{staff.name}</td>
                          <td className="py-3 px-4">{staff.employeeId}</td>
                          <td className="py-3 px-4">{staff.department}</td>
                          <td className="py-3 px-4">{staff.designation}</td>
                          <td className="py-3 px-4">{staff.joiningDate}</td>
                          <td className="py-3 px-4">{staff.experience}</td>
                          <td className="py-3 px-4">
                            <Badge className={getStatusColor(staff.status)}>
                              {staff.status}
                            </Badge>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-1">
                              <Button 
                                variant="ghost" 
                                size="sm"
                                className="h-8 w-8 p-0"
                                onClick={() => {
                                  toast({
                                    title: "View Staff Profile",
                                    description: `Viewing profile for ${staff.name}`,
                                  });
                                }}
                              >
                                <FileText className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                className="h-8 w-8 p-0"
                                onClick={() => {
                                  toast({
                                    title: "Edit Staff",
                                    description: `Editing information for ${staff.name}`,
                                  });
                                }}
                              >
                                <Pencil className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                className="h-8 w-8 p-0"
                                onClick={() => {
                                  toast({
                                    title: "Email Staff",
                                    description: `Sending email to ${staff.email}`,
                                  });
                                }}
                              >
                                <Mail className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                className="h-8 w-8 p-0"
                                onClick={() => {
                                  toast({
                                    title: "Schedule Meeting",
                                    description: `Scheduling meeting with ${staff.name}`,
                                  });
                                }}
                              >
                                <Calendar className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                className="h-8 w-8 p-0"
                                onClick={() => {
                                  toast({
                                    title: "More Options",
                                    description: "Showing additional options",
                                  });
                                }}
                              >
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="teaching" className="m-0">
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-muted-foreground">Teaching staff members</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => {
                    setActiveTab("allStaff");
                    toast({
                      title: "Filter Applied",
                      description: "Showing teaching staff members.",
                    });
                  }}
                >
                  View Teaching Staff
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="nonTeaching" className="m-0">
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-muted-foreground">Non-teaching staff members</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => {
                    setActiveTab("allStaff");
                    toast({
                      title: "Filter Applied",
                      description: "Showing non-teaching staff members.",
                    });
                  }}
                >
                  View Non-Teaching Staff
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="administration" className="m-0">
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-muted-foreground">Administrative staff members</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => {
                    setActiveTab("allStaff");
                    toast({
                      title: "Filter Applied",
                      description: "Showing administrative staff members.",
                    });
                  }}
                >
                  View Administrative Staff
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Staff;
