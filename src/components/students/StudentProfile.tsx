
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  Clock, 
  BookOpen, 
  FileText, 
  Award,
  GraduationCap,
  Bus,
  Home,
  CreditCard,
  ClipboardList
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export type StudentProfileProps = {
  student: any;
  onClose: () => void;
  onEdit: () => void;
};

const StudentProfile = ({ student, onClose, onEdit }: StudentProfileProps) => {
  const { toast } = useToast();
  
  // Sample attendance data
  const attendanceData = [
    { month: "April", present: 22, total: 23, percentage: "95.65%" },
    { month: "May", present: 19, total: 21, percentage: "90.48%" },
    { month: "June", present: 17, total: 20, percentage: "85.00%" }
  ];
  
  // Sample exam data
  const examData = [
    { 
      term: "First Term", 
      subjects: [
        { name: "English", marks: 85, maxMarks: 100, grade: "A" },
        { name: "Mathematics", marks: 92, maxMarks: 100, grade: "A+" },
        { name: "Science", marks: 78, maxMarks: 100, grade: "B+" },
        { name: "Social Studies", marks: 88, maxMarks: 100, grade: "A" },
        { name: "Hindi", marks: 75, maxMarks: 100, grade: "B" }
      ],
      percentage: 83.6,
      rank: 4,
      remarks: "Good performance, can improve in Science"
    }
  ];
  
  // Sample fee data
  const feeData = [
    { term: "Term 1", amount: 25000, paid: 25000, dueDate: "2023-05-15", status: "Paid", date: "2023-05-10" },
    { term: "Term 2", amount: 25000, paid: 25000, dueDate: "2023-08-15", status: "Paid", date: "2023-08-05" },
    { term: "Term 3", amount: 25000, paid: 0, dueDate: "2023-11-15", status: "Pending", date: "-" },
    { term: "Term 4", amount: 25000, paid: 0, dueDate: "2024-02-15", status: "Pending", date: "-" }
  ];

  return (
    <div className="max-h-[80vh] overflow-y-auto px-1">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="h-14 w-14 rounded-full bg-gray-200 flex items-center justify-center text-lg font-bold text-gray-700">
            {student.name.split(' ').map((n: string) => n[0]).join('')}
          </div>
          <div>
            <h2 className="text-xl font-bold">{student.name}</h2>
            <p className="text-muted-foreground">Class {student.class} | Roll No: {student.rollNo}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={onClose}>Close</Button>
          <Button size="sm" onClick={onEdit}>Edit Profile</Button>
        </div>
      </div>
      
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid grid-cols-5 mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="academics">Academics</TabsTrigger>
          <TabsTrigger value="fees">Fees</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>
        
        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium flex items-center gap-2">
                  <User size={16} />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-muted-foreground">Date of Birth</div>
                  <div>10 June 2008</div>
                  
                  <div className="text-muted-foreground">Gender</div>
                  <div>Male</div>
                  
                  <div className="text-muted-foreground">Category</div>
                  <div>General</div>
                  
                  <div className="text-muted-foreground">Blood Group</div>
                  <div>B+</div>
                  
                  <div className="text-muted-foreground">Nationality</div>
                  <div>Indian</div>
                  
                  <div className="text-muted-foreground">Address</div>
                  <div>123 Main Street, Bangalore, Karnataka - 560001</div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium flex items-center gap-2">
                  <Phone size={16} />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-muted-foreground">Mobile Number</div>
                  <div>{student.contactNo}</div>
                  
                  <div className="text-muted-foreground">Email</div>
                  <div>{student.email}</div>
                  
                  <div className="text-muted-foreground">Emergency Contact</div>
                  <div>9876543210</div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium flex items-center gap-2">
                  <User size={16} />
                  Parent/Guardian Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-muted-foreground">Father's Name</div>
                  <div>{student.parentName}</div>
                  
                  <div className="text-muted-foreground">Father's Contact</div>
                  <div>{student.contactNo}</div>
                  
                  <div className="text-muted-foreground">Father's Occupation</div>
                  <div>Business</div>
                  
                  <div className="text-muted-foreground">Mother's Name</div>
                  <div>Sunita Sharma</div>
                  
                  <div className="text-muted-foreground">Mother's Contact</div>
                  <div>9876543212</div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium flex items-center gap-2">
                  <BookOpen size={16} />
                  Academic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-muted-foreground">Admission Number</div>
                  <div>ADM-2023-0042</div>
                  
                  <div className="text-muted-foreground">Roll Number</div>
                  <div>{student.rollNo}</div>
                  
                  <div className="text-muted-foreground">Class & Section</div>
                  <div>{student.class}</div>
                  
                  <div className="text-muted-foreground">House/Club</div>
                  <div>Blue</div>
                  
                  <div className="text-muted-foreground">Transport</div>
                  <div>School Bus (Route 3)</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Attendance Tab */}
        <TabsContent value="attendance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Attendance Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Card className="bg-gray-50">
                  <CardContent className="flex flex-col items-center justify-center p-4">
                    <div className="text-3xl font-bold text-green-600">92%</div>
                    <div className="text-sm text-muted-foreground">Overall Attendance</div>
                  </CardContent>
                </Card>
                <Card className="bg-gray-50">
                  <CardContent className="flex flex-col items-center justify-center p-4">
                    <div className="text-3xl font-bold">58/63</div>
                    <div className="text-sm text-muted-foreground">Days Present/Total</div>
                  </CardContent>
                </Card>
                <Card className="bg-gray-50">
                  <CardContent className="flex flex-col items-center justify-center p-4">
                    <div className="text-3xl font-bold text-yellow-600">5</div>
                    <div className="text-sm text-muted-foreground">Total Absences</div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="rounded-md border">
                <div className="bg-muted py-2">
                  <div className="grid grid-cols-4 px-4 text-sm font-medium">
                    <div>Month</div>
                    <div>Present/Total</div>
                    <div>Percentage</div>
                    <div>Status</div>
                  </div>
                </div>
                <div className="divide-y">
                  {attendanceData.map((month) => (
                    <div key={month.month} className="grid grid-cols-4 px-4 py-2 text-sm">
                      <div>{month.month}</div>
                      <div>{month.present}/{month.total}</div>
                      <div>{month.percentage}</div>
                      <div>
                        {parseFloat(month.percentage) >= 90 ? (
                          <Badge className="bg-green-100 text-green-800">Excellent</Badge>
                        ) : parseFloat(month.percentage) >= 80 ? (
                          <Badge className="bg-blue-100 text-blue-800">Good</Badge>
                        ) : (
                          <Badge className="bg-yellow-100 text-yellow-800">Average</Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="text-base font-medium mb-3">Recent Absences</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between p-2 bg-red-50 rounded-md">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-red-600" />
                      <span>04 June 2023</span>
                    </div>
                    <Badge className="bg-red-100 text-red-800">Absent</Badge>
                  </div>
                  <div className="flex justify-between p-2 bg-yellow-50 rounded-md">
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-yellow-600" />
                      <span>25 May 2023</span>
                    </div>
                    <Badge className="bg-yellow-100 text-yellow-800">Half Day</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Academics Tab */}
        <TabsContent value="academics" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between">
                <CardTitle className="text-lg font-medium">Academic Performance</CardTitle>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => {
                    toast({
                      title: "Report Card",
                      description: "Downloading report card...",
                    });
                  }}
                >
                  <FileText size={16} className="mr-2" />
                  Download Report Card
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <Card className="bg-gray-50">
                  <CardContent className="flex flex-col items-center justify-center p-4">
                    <div className="text-3xl font-bold text-blue-600">83.6%</div>
                    <div className="text-sm text-muted-foreground">Average Percentage</div>
                  </CardContent>
                </Card>
                <Card className="bg-gray-50">
                  <CardContent className="flex flex-col items-center justify-center p-4">
                    <div className="text-3xl font-bold">A</div>
                    <div className="text-sm text-muted-foreground">Overall Grade</div>
                  </CardContent>
                </Card>
                <Card className="bg-gray-50">
                  <CardContent className="flex flex-col items-center justify-center p-4">
                    <div className="text-3xl font-bold">4</div>
                    <div className="text-sm text-muted-foreground">Class Rank</div>
                  </CardContent>
                </Card>
                <Card className="bg-gray-50">
                  <CardContent className="flex flex-col items-center justify-center p-4">
                    <div className="text-3xl font-bold text-green-600">92%</div>
                    <div className="text-sm text-muted-foreground">Mathematics (Best)</div>
                  </CardContent>
                </Card>
              </div>
              
              {examData.map((exam) => (
                <div key={exam.term} className="mb-4">
                  <h3 className="text-base font-medium mb-3">{exam.term} Results</h3>
                  <div className="rounded-md border">
                    <div className="bg-muted py-2">
                      <div className="grid grid-cols-5 px-4 text-sm font-medium">
                        <div>Subject</div>
                        <div>Marks Obtained</div>
                        <div>Maximum Marks</div>
                        <div>Percentage</div>
                        <div>Grade</div>
                      </div>
                    </div>
                    <div className="divide-y">
                      {exam.subjects.map((subject) => (
                        <div key={subject.name} className="grid grid-cols-5 px-4 py-2 text-sm">
                          <div>{subject.name}</div>
                          <div>{subject.marks}</div>
                          <div>{subject.maxMarks}</div>
                          <div>{(subject.marks / subject.maxMarks * 100).toFixed(1)}%</div>
                          <div>
                            <Badge 
                              className={
                                subject.grade === "A+" ? "bg-purple-100 text-purple-800" :
                                subject.grade === "A" ? "bg-green-100 text-green-800" :
                                subject.grade === "B+" ? "bg-blue-100 text-blue-800" :
                                subject.grade === "B" ? "bg-yellow-100 text-yellow-800" :
                                "bg-red-100 text-red-800"
                              }
                            >
                              {subject.grade}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="mt-4 p-4 bg-gray-50 rounded-md">
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                      <div className="space-y-2">
                        <div className="text-sm text-muted-foreground">Overall Percentage</div>
                        <div className="text-lg font-semibold">{exam.percentage}%</div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-sm text-muted-foreground">Class Rank</div>
                        <div className="text-lg font-semibold">{exam.rank}</div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-sm text-muted-foreground">Teacher's Remarks</div>
                        <div className="text-sm">{exam.remarks}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="mt-6">
                <h3 className="text-base font-medium mb-3">Academic Achievements</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 p-3 border rounded-md">
                    <Award size={20} className="text-yellow-500" />
                    <div>
                      <p className="font-medium">First Prize - Science Exhibition</p>
                      <p className="text-sm text-muted-foreground">District Level, March 2023</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 border rounded-md">
                    <GraduationCap size={20} className="text-blue-500" />
                    <div>
                      <p className="font-medium">Mathematics Olympiad - State Rank 15</p>
                      <p className="text-sm text-muted-foreground">State Level, January 2023</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Fees Tab */}
        <TabsContent value="fees" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between">
                <CardTitle className="text-lg font-medium">Fee Details</CardTitle>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => {
                    toast({
                      title: "Payment",
                      description: "Redirecting to payment gateway...",
                    });
                  }}
                >
                  <CreditCard size={16} className="mr-2" />
                  Pay Fees Online
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Card className="bg-gray-50">
                  <CardContent className="flex flex-col items-center justify-center p-4">
                    <div className="text-3xl font-bold">₹1,00,000</div>
                    <div className="text-sm text-muted-foreground">Annual Fees</div>
                  </CardContent>
                </Card>
                <Card className="bg-gray-50">
                  <CardContent className="flex flex-col items-center justify-center p-4">
                    <div className="text-3xl font-bold text-green-600">₹50,000</div>
                    <div className="text-sm text-muted-foreground">Paid Amount</div>
                  </CardContent>
                </Card>
                <Card className="bg-gray-50">
                  <CardContent className="flex flex-col items-center justify-center p-4">
                    <div className="text-3xl font-bold text-red-600">₹50,000</div>
                    <div className="text-sm text-muted-foreground">Pending Amount</div>
                  </CardContent>
                </Card>
              </div>
              
              <h3 className="text-base font-medium mb-3">Fee Payment History</h3>
              <div className="rounded-md border">
                <div className="bg-muted py-2">
                  <div className="grid grid-cols-6 px-4 text-sm font-medium">
                    <div>Term</div>
                    <div>Due Amount</div>
                    <div>Paid Amount</div>
                    <div>Due Date</div>
                    <div>Paid Date</div>
                    <div>Status</div>
                  </div>
                </div>
                <div className="divide-y">
                  {feeData.map((fee) => (
                    <div key={fee.term} className="grid grid-cols-6 px-4 py-2 text-sm">
                      <div>{fee.term}</div>
                      <div>₹{fee.amount.toLocaleString()}</div>
                      <div>₹{fee.paid.toLocaleString()}</div>
                      <div>{fee.dueDate}</div>
                      <div>{fee.date}</div>
                      <div>
                        {fee.status === "Paid" ? (
                          <Badge className="bg-green-100 text-green-800">Paid</Badge>
                        ) : (
                          <Badge className="bg-red-100 text-red-800">Pending</Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="text-base font-medium mb-3">Fee Structure Details</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-2 text-sm p-4 border rounded-md">
                    <div className="text-muted-foreground">Fee Category</div>
                    <div>Regular</div>
                    
                    <div className="text-muted-foreground">Fee Installment Plan</div>
                    <div>Quarterly (4 installments)</div>
                    
                    <div className="text-muted-foreground">Scholarship Type</div>
                    <div>None</div>
                    
                    <div className="text-muted-foreground">Late Fee Penalty</div>
                    <div>₹500 per week after due date</div>
                  </div>
                  
                  <div className="p-4 bg-yellow-50 rounded-md">
                    <div className="flex items-center gap-2 mb-2">
                      <ClipboardList size={16} className="text-yellow-600" />
                      <h4 className="font-medium">Next Payment</h4>
                    </div>
                    <p className="text-sm">Term 3 payment of ₹25,000 is due on November 15, 2023</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Documents Tab */}
        <TabsContent value="documents" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Student Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border rounded-md p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">Aadhaar Card</h3>
                    <Badge className="bg-green-100 text-green-800">Verified</Badge>
                  </div>
                  <div className="h-32 bg-gray-100 rounded-md flex items-center justify-center mb-2">
                    <FileText size={24} className="text-gray-400" />
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Uploaded on 12/04/2023</span>
                    <Button variant="ghost" size="sm" className="h-8 p-0">View</Button>
                  </div>
                </div>
                
                <div className="border rounded-md p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">Birth Certificate</h3>
                    <Badge className="bg-green-100 text-green-800">Verified</Badge>
                  </div>
                  <div className="h-32 bg-gray-100 rounded-md flex items-center justify-center mb-2">
                    <FileText size={24} className="text-gray-400" />
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Uploaded on 12/04/2023</span>
                    <Button variant="ghost" size="sm" className="h-8 p-0">View</Button>
                  </div>
                </div>
                
                <div className="border rounded-md p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">Transfer Certificate</h3>
                    <Badge className="bg-green-100 text-green-800">Verified</Badge>
                  </div>
                  <div className="h-32 bg-gray-100 rounded-md flex items-center justify-center mb-2">
                    <FileText size={24} className="text-gray-400" />
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Uploaded on 12/04/2023</span>
                    <Button variant="ghost" size="sm" className="h-8 p-0">View</Button>
                  </div>
                </div>
                
                <div className="border rounded-md p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">Previous Marksheet</h3>
                    <Badge className="bg-green-100 text-green-800">Verified</Badge>
                  </div>
                  <div className="h-32 bg-gray-100 rounded-md flex items-center justify-center mb-2">
                    <FileText size={24} className="text-gray-400" />
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Uploaded on 12/04/2023</span>
                    <Button variant="ghost" size="sm" className="h-8 p-0">View</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudentProfile;
