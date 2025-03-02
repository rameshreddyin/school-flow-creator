
import React, { useState } from "react";
import { 
  Plus, 
  Search, 
  FileText, 
  Mail, 
  Phone, 
  Calendar, 
  Filter, 
  MoreHorizontal, 
  Download,
  UserPlus,
  GraduationCap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

// Sample lead data
const leadData = [
  { 
    id: 1, 
    name: "Aditya Sharma", 
    parentName: "Rajesh Sharma", 
    contact: "9876543210", 
    email: "rajesh.sharma@example.com", 
    grade: "Grade 8", 
    date: "12 Mar 2024", 
    status: "New Lead",
    notes: "Interested in science programs"
  },
  { 
    id: 2, 
    name: "Priya Patel", 
    parentName: "Sunil Patel", 
    contact: "9876543211", 
    email: "sunil.patel@example.com", 
    grade: "Grade 5", 
    date: "10 Mar 2024", 
    status: "Follow-up",
    notes: "Second visit scheduled"
  },
  { 
    id: 3, 
    name: "Rohit Verma", 
    parentName: "Anita Verma", 
    contact: "9876543212", 
    email: "anita.verma@example.com", 
    grade: "Grade 11", 
    date: "08 Mar 2024", 
    status: "Application",
    notes: "Forms submitted, pending review"
  },
  { 
    id: 4, 
    name: "Sneha Gupta", 
    parentName: "Manoj Gupta", 
    contact: "9876543213", 
    email: "manoj.gupta@example.com", 
    grade: "Grade 3", 
    date: "05 Mar 2024", 
    status: "Enrolled",
    notes: "Fees paid, starting next session"
  },
  { 
    id: 5, 
    name: "Karan Singh", 
    parentName: "Harpreet Singh", 
    contact: "9876543214", 
    email: "harpreet.singh@example.com", 
    grade: "Grade 9", 
    date: "03 Mar 2024", 
    status: "New Lead",
    notes: "Inquired about sports facilities"
  },
];

// Sample enrollment data
const enrollmentData = [
  { 
    id: 1, 
    name: "Sneha Gupta", 
    parentName: "Manoj Gupta", 
    grade: "Grade 3", 
    admissionDate: "15 Mar 2024", 
    feesStatus: "Pending", 
    documentsStatus: "Complete"
  },
  { 
    id: 2, 
    name: "Vikram Joshi", 
    parentName: "Prakash Joshi", 
    grade: "Grade 6", 
    admissionDate: "14 Mar 2024", 
    feesStatus: "Paid", 
    documentsStatus: "Complete"
  },
  { 
    id: 3, 
    name: "Ananya Reddy", 
    parentName: "Srinivas Reddy", 
    grade: "Grade 1", 
    admissionDate: "12 Mar 2024", 
    feesStatus: "Partial", 
    documentsStatus: "Incomplete"
  },
  { 
    id: 4, 
    name: "Arjun Malhotra", 
    parentName: "Vivek Malhotra", 
    grade: "Grade 10", 
    admissionDate: "10 Mar 2024", 
    feesStatus: "Paid", 
    documentsStatus: "Complete"
  },
];

// Status badge color mapping
const getStatusColor = (status: string) => {
  switch(status) {
    case "New Lead":
      return "bg-blue-100 text-blue-800";
    case "Follow-up":
      return "bg-yellow-100 text-yellow-800";
    case "Application":
      return "bg-purple-100 text-purple-800";
    case "Enrolled":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

// Fees status badge color mapping
const getFeesStatusColor = (status: string) => {
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

// Documents status badge color mapping
const getDocumentsStatusColor = (status: string) => {
  switch(status) {
    case "Complete":
      return "bg-green-100 text-green-800";
    case "Incomplete":
      return "bg-yellow-100 text-yellow-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const Leads = () => {
  const [activeTab, setActiveTab] = useState("leads");
  const { toast } = useToast();

  const handleNewLead = () => {
    toast({
      title: "Add New Lead",
      description: "Form would open to add a new lead.",
    });
  };

  const handleNewEnrollment = () => {
    toast({
      title: "New Enrollment",
      description: "Form would open to process a new enrollment.",
    });
  };

  return (
    <div className="p-6 max-w-[1600px] mx-auto">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Admissions Management</h1>
            <p className="text-muted-foreground">Manage leads and enrollments for your school</p>
          </div>
          <div className="flex items-center gap-3">
            <Button onClick={() => {
              toast({
                title: "Report Downloaded",
                description: "Admissions report has been downloaded successfully.",
              });
            }}>
              <Download className="mr-2 h-4 w-4" />
              Download Report
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Leads</CardTitle>
              <CardDescription className="text-2xl font-bold">127</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">
                <span className="text-green-500 font-medium">↑ 12%</span> from last month
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Conversion Rate</CardTitle>
              <CardDescription className="text-2xl font-bold">32.8%</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">
                <span className="text-green-500 font-medium">↑ 3.2%</span> from last month
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">New Enrollments</CardTitle>
              <CardDescription className="text-2xl font-bold">42</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">
                <span className="text-green-500 font-medium">↑ 8%</span> from last month
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="leads" className="w-full" onValueChange={setActiveTab}>
          <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-4 mb-4">
            <TabsList>
              <TabsTrigger value="leads" className="relative">
                Leads
                <Badge className="ml-2 bg-gray-200 text-gray-800">35</Badge>
              </TabsTrigger>
              <TabsTrigger value="enrollments">
                Enrollments
                <Badge className="ml-2 bg-gray-200 text-gray-800">12</Badge>
              </TabsTrigger>
            </TabsList>
            
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-full pl-8"
                />
              </div>
              
              <Select defaultValue="all">
                <SelectTrigger className="w-[130px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="new">New Lead</SelectItem>
                  <SelectItem value="follow-up">Follow-up</SelectItem>
                  <SelectItem value="application">Application</SelectItem>
                  <SelectItem value="enrolled">Enrolled</SelectItem>
                </SelectContent>
              </Select>
              
              {activeTab === "leads" ? (
                <Button onClick={handleNewLead}>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Add Lead
                </Button>
              ) : (
                <Button onClick={handleNewEnrollment}>
                  <GraduationCap className="mr-2 h-4 w-4" />
                  New Enrollment
                </Button>
              )}
            </div>
          </div>

          <TabsContent value="leads" className="m-0">
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="py-3 px-4 text-left font-medium">Student Name</th>
                        <th className="py-3 px-4 text-left font-medium">Parent Name</th>
                        <th className="py-3 px-4 text-left font-medium">Contact</th>
                        <th className="py-3 px-4 text-left font-medium">Grade</th>
                        <th className="py-3 px-4 text-left font-medium">Date</th>
                        <th className="py-3 px-4 text-left font-medium">Status</th>
                        <th className="py-3 px-4 text-left font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leadData.map((lead) => (
                        <tr key={lead.id} className="border-b hover:bg-muted/50">
                          <td className="py-3 px-4">{lead.name}</td>
                          <td className="py-3 px-4">{lead.parentName}</td>
                          <td className="py-3 px-4">{lead.contact}</td>
                          <td className="py-3 px-4">{lead.grade}</td>
                          <td className="py-3 px-4">{lead.date}</td>
                          <td className="py-3 px-4">
                            <Badge className={getStatusColor(lead.status)}>
                              {lead.status}
                            </Badge>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="h-8 px-2"
                                onClick={() => {
                                  toast({
                                    title: "View Lead Details",
                                    description: `Viewing details for ${lead.name}`,
                                  });
                                }}
                              >
                                <FileText className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="h-8 px-2"
                                onClick={() => {
                                  toast({
                                    title: "Contact Lead",
                                    description: `Contacting ${lead.name}'s parent`,
                                  });
                                }}
                              >
                                <Mail className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="h-8 px-2"
                                onClick={() => {
                                  toast({
                                    title: "Call Lead",
                                    description: `Calling ${lead.contact}`,
                                  });
                                }}
                              >
                                <Phone className="h-4 w-4" />
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

          <TabsContent value="enrollments" className="m-0">
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="py-3 px-4 text-left font-medium">Student Name</th>
                        <th className="py-3 px-4 text-left font-medium">Parent Name</th>
                        <th className="py-3 px-4 text-left font-medium">Grade</th>
                        <th className="py-3 px-4 text-left font-medium">Admission Date</th>
                        <th className="py-3 px-4 text-left font-medium">Fees Status</th>
                        <th className="py-3 px-4 text-left font-medium">Documents</th>
                        <th className="py-3 px-4 text-left font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {enrollmentData.map((enrollment) => (
                        <tr key={enrollment.id} className="border-b hover:bg-muted/50">
                          <td className="py-3 px-4">{enrollment.name}</td>
                          <td className="py-3 px-4">{enrollment.parentName}</td>
                          <td className="py-3 px-4">{enrollment.grade}</td>
                          <td className="py-3 px-4">{enrollment.admissionDate}</td>
                          <td className="py-3 px-4">
                            <Badge className={getFeesStatusColor(enrollment.feesStatus)}>
                              {enrollment.feesStatus}
                            </Badge>
                          </td>
                          <td className="py-3 px-4">
                            <Badge className={getDocumentsStatusColor(enrollment.documentsStatus)}>
                              {enrollment.documentsStatus}
                            </Badge>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="h-8 px-2"
                                onClick={() => {
                                  toast({
                                    title: "View Enrollment Details",
                                    description: `Viewing details for ${enrollment.name}`,
                                  });
                                }}
                              >
                                <FileText className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="h-8 px-2"
                                onClick={() => {
                                  toast({
                                    title: "Edit Enrollment",
                                    description: `Editing enrollment for ${enrollment.name}`,
                                  });
                                }}
                              >
                                <Calendar className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="h-8 px-2"
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
        </Tabs>
      </div>
    </div>
  );
};

export default Leads;
