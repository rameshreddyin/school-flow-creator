
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
  CalendarDays,
  Pencil,
  BookOpen,
  History
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

// Sample student data
const studentData = [
  { 
    id: 1, 
    name: "Aarav Kumar", 
    rollNo: "S001", 
    class: "10-A", 
    parentName: "Ramesh Kumar", 
    contactNo: "9876543210", 
    email: "ramesh.kumar@example.com", 
    attendance: "92%", 
    fees: "Paid",
    performance: "Excellent"
  },
  { 
    id: 2, 
    name: "Diya Sharma", 
    rollNo: "S002", 
    class: "9-B", 
    parentName: "Suresh Sharma", 
    contactNo: "9876543211", 
    email: "suresh.sharma@example.com", 
    attendance: "85%", 
    fees: "Partial",
    performance: "Good"
  },
  { 
    id: 3, 
    name: "Vihaan Patel", 
    rollNo: "S003", 
    class: "8-A", 
    parentName: "Nitesh Patel", 
    contactNo: "9876543212", 
    email: "nitesh.patel@example.com", 
    attendance: "78%", 
    fees: "Pending",
    performance: "Average"
  },
  { 
    id: 4, 
    name: "Ananya Reddy", 
    rollNo: "S004", 
    class: "11-C", 
    parentName: "Sunil Reddy", 
    contactNo: "9876543213", 
    email: "sunil.reddy@example.com", 
    attendance: "95%", 
    fees: "Paid",
    performance: "Excellent"
  },
  { 
    id: 5, 
    name: "Ishaan Singh", 
    rollNo: "S005", 
    class: "7-A", 
    parentName: "Harpreet Singh", 
    contactNo: "9876543214", 
    email: "harpreet.singh@example.com", 
    attendance: "88%", 
    fees: "Paid",
    performance: "Good"
  },
  { 
    id: 6, 
    name: "Aditi Gupta", 
    rollNo: "S006", 
    class: "12-B", 
    parentName: "Vishal Gupta", 
    contactNo: "9876543215", 
    email: "vishal.gupta@example.com", 
    attendance: "81%", 
    fees: "Partial",
    performance: "Good"
  },
];

// Fee status badge color mapping
const getFeeStatusColor = (status: string) => {
  switch(status) {
    case "Paid":
      return "bg-green-100 text-green-800";
    case "Pending":
      return "bg-red-100 text-red-800";
    case "Partial":
      return "bg-yellow-100 text-yellow-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

// Performance badge color mapping
const getPerformanceColor = (performance: string) => {
  switch(performance) {
    case "Excellent":
      return "bg-green-100 text-green-800";
    case "Good":
      return "bg-blue-100 text-blue-800";
    case "Average":
      return "bg-yellow-100 text-yellow-800";
    case "Below Average":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

// Attendance color mapping
const getAttendanceColor = (attendance: string) => {
  const attendanceNum = parseInt(attendance);
  if (attendanceNum >= 90) {
    return "text-green-600";
  } else if (attendanceNum >= 80) {
    return "text-blue-600";
  } else if (attendanceNum >= 70) {
    return "text-yellow-600";
  } else {
    return "text-red-600";
  }
};

const Students = () => {
  const [activeTab, setActiveTab] = useState("allStudents");
  const { toast } = useToast();

  const handleAddStudent = () => {
    toast({
      title: "Add New Student",
      description: "Form would open to add a new student.",
    });
  };

  return (
    <div className="p-6 max-w-[1600px] mx-auto">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Student Management</h1>
            <p className="text-muted-foreground">Manage all student records and information</p>
          </div>
          <div className="flex items-center gap-3">
            <Button 
              variant="outline"
              onClick={() => {
                toast({
                  title: "Export Student Data",
                  description: "Student data has been exported successfully.",
                });
              }}
            >
              <FileSpreadsheet className="mr-2 h-4 w-4" />
              Export Data
            </Button>
            <Button onClick={handleAddStudent}>
              <UserPlus className="mr-2 h-4 w-4" />
              Add Student
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Students</CardTitle>
              <CardDescription className="text-2xl font-bold">1,247</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">
                <span className="text-green-500 font-medium">↑ 7%</span> from last year
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Average Attendance</CardTitle>
              <CardDescription className="text-2xl font-bold">89.3%</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">
                <span className="text-green-500 font-medium">↑ 2.5%</span> from last month
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Fee Collection</CardTitle>
              <CardDescription className="text-2xl font-bold">87.4%</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">
                <span className="text-green-500 font-medium">↑ 4.3%</span> from last term
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Graduation Rate</CardTitle>
              <CardDescription className="text-2xl font-bold">97.8%</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">
                <span className="text-green-500 font-medium">↑ 1.2%</span> from last year
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="allStudents" className="w-full" onValueChange={setActiveTab}>
          <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-4 mb-4">
            <TabsList>
              <TabsTrigger value="allStudents">All Students</TabsTrigger>
              <TabsTrigger value="primary">Primary (1-5)</TabsTrigger>
              <TabsTrigger value="middle">Middle (6-8)</TabsTrigger>
              <TabsTrigger value="secondary">Secondary (9-12)</TabsTrigger>
            </TabsList>
            
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search students..."
                  className="w-full pl-8"
                />
              </div>
              
              <Select defaultValue="all">
                <SelectTrigger className="w-[130px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Classes</SelectItem>
                  <SelectItem value="class1">Class 1</SelectItem>
                  <SelectItem value="class2">Class 2</SelectItem>
                  <SelectItem value="class3">Class 3</SelectItem>
                  <SelectItem value="class4">Class 4</SelectItem>
                  <SelectItem value="class5">Class 5</SelectItem>
                  <SelectItem value="class6">Class 6</SelectItem>
                  <SelectItem value="class7">Class 7</SelectItem>
                  <SelectItem value="class8">Class 8</SelectItem>
                  <SelectItem value="class9">Class 9</SelectItem>
                  <SelectItem value="class10">Class 10</SelectItem>
                  <SelectItem value="class11">Class 11</SelectItem>
                  <SelectItem value="class12">Class 12</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <TabsContent value="allStudents" className="m-0">
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="py-3 px-4 text-left font-medium">Name</th>
                        <th className="py-3 px-4 text-left font-medium">Roll No</th>
                        <th className="py-3 px-4 text-left font-medium">Class</th>
                        <th className="py-3 px-4 text-left font-medium">Parent Name</th>
                        <th className="py-3 px-4 text-left font-medium">Attendance</th>
                        <th className="py-3 px-4 text-left font-medium">Fees Status</th>
                        <th className="py-3 px-4 text-left font-medium">Performance</th>
                        <th className="py-3 px-4 text-left font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {studentData.map((student) => (
                        <tr key={student.id} className="border-b hover:bg-muted/50">
                          <td className="py-3 px-4 font-medium">{student.name}</td>
                          <td className="py-3 px-4">{student.rollNo}</td>
                          <td className="py-3 px-4">{student.class}</td>
                          <td className="py-3 px-4">{student.parentName}</td>
                          <td className={`py-3 px-4 ${getAttendanceColor(student.attendance)}`}>{student.attendance}</td>
                          <td className="py-3 px-4">
                            <Badge className={getFeeStatusColor(student.fees)}>
                              {student.fees}
                            </Badge>
                          </td>
                          <td className="py-3 px-4">
                            <Badge className={getPerformanceColor(student.performance)}>
                              {student.performance}
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
                                    title: "View Student Profile",
                                    description: `Viewing profile for ${student.name}`,
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
                                    title: "Edit Student",
                                    description: `Editing information for ${student.name}`,
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
                                    title: "View Academic Record",
                                    description: `Viewing academic records for ${student.name}`,
                                  });
                                }}
                              >
                                <BookOpen className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                className="h-8 w-8 p-0"
                                onClick={() => {
                                  toast({
                                    title: "View Attendance",
                                    description: `Viewing attendance for ${student.name}`,
                                  });
                                }}
                              >
                                <CalendarDays className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                className="h-8 w-8 p-0"
                                onClick={() => {
                                  toast({
                                    title: "View History",
                                    description: `Viewing history for ${student.name}`,
                                  });
                                }}
                              >
                                <History className="h-4 w-4" />
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

          <TabsContent value="primary" className="m-0">
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-muted-foreground">Primary section students (Grades 1-5)</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => {
                    setActiveTab("allStudents");
                    toast({
                      title: "Filter Applied",
                      description: "Showing primary section students.",
                    });
                  }}
                >
                  View Students
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="middle" className="m-0">
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-muted-foreground">Middle section students (Grades 6-8)</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => {
                    setActiveTab("allStudents");
                    toast({
                      title: "Filter Applied",
                      description: "Showing middle section students.",
                    });
                  }}
                >
                  View Students
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="secondary" className="m-0">
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-muted-foreground">Secondary section students (Grades 9-12)</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => {
                    setActiveTab("allStudents");
                    toast({
                      title: "Filter Applied",
                      description: "Showing secondary section students.",
                    });
                  }}
                >
                  View Students
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Students;
