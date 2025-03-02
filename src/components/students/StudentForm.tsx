
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { User, Upload, BookOpen, Users, Home, Bus, Clipboard, FileCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export type StudentFormProps = {
  onClose: () => void;
  onSuccess?: (data: any) => void;
  initialData?: any;
};

const StudentForm = ({ onClose, onSuccess, initialData }: StudentFormProps) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("personal");
  const isEditMode = !!initialData;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: isEditMode ? "Student Updated" : "Student Added",
      description: isEditMode 
        ? "The student information has been updated successfully." 
        : "New student has been added to the database.",
    });
    
    if (onSuccess) {
      onSuccess({});
    }
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="max-h-[80vh] overflow-y-auto px-1">
      <Tabs defaultValue="personal" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-6 mb-6">
          <TabsTrigger value="personal">
            <User className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Personal</span>
          </TabsTrigger>
          <TabsTrigger value="parents">
            <Users className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Parents</span>
          </TabsTrigger>
          <TabsTrigger value="academic">
            <BookOpen className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Academic</span>
          </TabsTrigger>
          <TabsTrigger value="documents">
            <FileCheck className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Documents</span>
          </TabsTrigger>
          <TabsTrigger value="attendance">
            <Clipboard className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Attendance</span>
          </TabsTrigger>
          <TabsTrigger value="fees">
            <Home className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Fees</span>
          </TabsTrigger>
        </TabsList>

        {/* Personal Details Tab */}
        <TabsContent value="personal" className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Personal Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="col-span-1">
                    <div className="border border-dashed border-gray-300 rounded-lg p-4 text-center h-40 flex flex-col items-center justify-center">
                      <Upload className="h-8 w-8 text-gray-400 mb-2" />
                      <p className="text-sm text-muted-foreground">Click to upload photo</p>
                      <p className="text-xs text-muted-foreground mt-1">JPG, PNG (Max 2MB)</p>
                      <input type="file" className="hidden" accept="image/*" />
                    </div>
                  </div>
                  <div className="col-span-3 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="col-span-2 md:col-span-1">
                        <Label htmlFor="firstName">First Name*</Label>
                        <Input id="firstName" placeholder="First Name" defaultValue={initialData?.firstName || ""} required />
                      </div>
                      <div className="col-span-2 md:col-span-1">
                        <Label htmlFor="lastName">Last Name*</Label>
                        <Input id="lastName" placeholder="Last Name" defaultValue={initialData?.lastName || ""} required />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="col-span-2 md:col-span-1">
                        <Label htmlFor="dob">Date of Birth*</Label>
                        <Input id="dob" type="date" defaultValue={initialData?.dob || ""} required />
                      </div>
                      <div className="col-span-2 md:col-span-1">
                        <Label htmlFor="gender">Gender*</Label>
                        <Select defaultValue={initialData?.gender || "male"}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="category">Category*</Label>
                    <Select defaultValue={initialData?.category || "general"}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General</SelectItem>
                        <SelectItem value="obc">OBC</SelectItem>
                        <SelectItem value="sc">SC</SelectItem>
                        <SelectItem value="st">ST</SelectItem>
                        <SelectItem value="ews">EWS</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="nationality">Nationality*</Label>
                    <Input id="nationality" placeholder="Nationality" defaultValue={initialData?.nationality || "Indian"} required />
                  </div>
                  <div>
                    <Label htmlFor="religion">Religion</Label>
                    <Input id="religion" placeholder="Religion" defaultValue={initialData?.religion || ""} />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="bloodGroup">Blood Group</Label>
                    <Select defaultValue={initialData?.bloodGroup || ""}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Blood Group" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="A+">A+</SelectItem>
                        <SelectItem value="A-">A-</SelectItem>
                        <SelectItem value="B+">B+</SelectItem>
                        <SelectItem value="B-">B-</SelectItem>
                        <SelectItem value="AB+">AB+</SelectItem>
                        <SelectItem value="AB-">AB-</SelectItem>
                        <SelectItem value="O+">O+</SelectItem>
                        <SelectItem value="O-">O-</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="medicalConditions">Medical Conditions</Label>
                    <Textarea id="medicalConditions" placeholder="Any medical conditions or allergies" defaultValue={initialData?.medicalConditions || ""} />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="address">Address*</Label>
                  <Textarea id="address" placeholder="Full address" defaultValue={initialData?.address || ""} required />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="mobileNumber">Mobile Number*</Label>
                    <Input id="mobileNumber" placeholder="Mobile Number" defaultValue={initialData?.mobileNumber || ""} required />
                  </div>
                  <div>
                    <Label htmlFor="emergencyContact">Emergency Contact*</Label>
                    <Input id="emergencyContact" placeholder="Emergency Contact" defaultValue={initialData?.emergencyContact || ""} required />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="Email" defaultValue={initialData?.email || ""} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Parents Details Tab */}
        <TabsContent value="parents" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Parent/Guardian Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">Father's Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="fatherName">Father's Name*</Label>
                    <Input id="fatherName" placeholder="Father's Name" defaultValue={initialData?.fatherName || ""} required />
                  </div>
                  <div>
                    <Label htmlFor="fatherOccupation">Occupation</Label>
                    <Input id="fatherOccupation" placeholder="Occupation" defaultValue={initialData?.fatherOccupation || ""} />
                  </div>
                  <div>
                    <Label htmlFor="fatherMobile">Mobile Number*</Label>
                    <Input id="fatherMobile" placeholder="Mobile Number" defaultValue={initialData?.fatherMobile || ""} required />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fatherIncome">Annual Income</Label>
                    <Input id="fatherIncome" placeholder="Annual Income" defaultValue={initialData?.fatherIncome || ""} />
                  </div>
                  <div>
                    <Label htmlFor="fatherAadhaar">Aadhaar Number</Label>
                    <Input id="fatherAadhaar" placeholder="Aadhaar Number" defaultValue={initialData?.fatherAadhaar || ""} />
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-medium">Mother's Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="motherName">Mother's Name*</Label>
                    <Input id="motherName" placeholder="Mother's Name" defaultValue={initialData?.motherName || ""} required />
                  </div>
                  <div>
                    <Label htmlFor="motherOccupation">Occupation</Label>
                    <Input id="motherOccupation" placeholder="Occupation" defaultValue={initialData?.motherOccupation || ""} />
                  </div>
                  <div>
                    <Label htmlFor="motherMobile">Mobile Number</Label>
                    <Input id="motherMobile" placeholder="Mobile Number" defaultValue={initialData?.motherMobile || ""} />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="motherIncome">Annual Income</Label>
                    <Input id="motherIncome" placeholder="Annual Income" defaultValue={initialData?.motherIncome || ""} />
                  </div>
                  <div>
                    <Label htmlFor="motherAadhaar">Aadhaar Number</Label>
                    <Input id="motherAadhaar" placeholder="Aadhaar Number" defaultValue={initialData?.motherAadhaar || ""} />
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Guardian's Details (If different from parents)</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="guardianName">Guardian Name</Label>
                    <Input id="guardianName" placeholder="Guardian Name" defaultValue={initialData?.guardianName || ""} />
                  </div>
                  <div>
                    <Label htmlFor="guardianRelation">Relation</Label>
                    <Input id="guardianRelation" placeholder="Relation" defaultValue={initialData?.guardianRelation || ""} />
                  </div>
                  <div>
                    <Label htmlFor="guardianMobile">Mobile Number</Label>
                    <Input id="guardianMobile" placeholder="Mobile Number" defaultValue={initialData?.guardianMobile || ""} />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="guardianOccupation">Occupation</Label>
                    <Input id="guardianOccupation" placeholder="Occupation" defaultValue={initialData?.guardianOccupation || ""} />
                  </div>
                  <div>
                    <Label htmlFor="guardianAadhaar">Aadhaar Number</Label>
                    <Input id="guardianAadhaar" placeholder="Aadhaar Number" defaultValue={initialData?.guardianAadhaar || ""} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Academic Details Tab */}
        <TabsContent value="academic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Academic Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="admissionNumber">Admission Number*</Label>
                  <Input id="admissionNumber" placeholder="Admission Number" defaultValue={initialData?.admissionNumber || ""} required />
                </div>
                <div>
                  <Label htmlFor="rollNumber">Roll Number*</Label>
                  <Input id="rollNumber" placeholder="Roll Number" defaultValue={initialData?.rollNumber || ""} required />
                </div>
                <div>
                  <Label htmlFor="admissionDate">Admission Date*</Label>
                  <Input id="admissionDate" type="date" defaultValue={initialData?.admissionDate || ""} required />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="class">Class*</Label>
                  <Select defaultValue={initialData?.class || ""}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="nursery">Nursery</SelectItem>
                      <SelectItem value="kg">KG</SelectItem>
                      <SelectItem value="1">Class 1</SelectItem>
                      <SelectItem value="2">Class 2</SelectItem>
                      <SelectItem value="3">Class 3</SelectItem>
                      <SelectItem value="4">Class 4</SelectItem>
                      <SelectItem value="5">Class 5</SelectItem>
                      <SelectItem value="6">Class 6</SelectItem>
                      <SelectItem value="7">Class 7</SelectItem>
                      <SelectItem value="8">Class 8</SelectItem>
                      <SelectItem value="9">Class 9</SelectItem>
                      <SelectItem value="10">Class 10</SelectItem>
                      <SelectItem value="11">Class 11</SelectItem>
                      <SelectItem value="12">Class 12</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="section">Section*</Label>
                  <Select defaultValue={initialData?.section || ""}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Section" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A">A</SelectItem>
                      <SelectItem value="B">B</SelectItem>
                      <SelectItem value="C">C</SelectItem>
                      <SelectItem value="D">D</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="house">House/Club</Label>
                  <Select defaultValue={initialData?.house || ""}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select House" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="red">Red</SelectItem>
                      <SelectItem value="blue">Blue</SelectItem>
                      <SelectItem value="green">Green</SelectItem>
                      <SelectItem value="yellow">Yellow</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-4">
                <Label>Subject Selection</Label>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label>Core Subjects</Label>
                    <div className="p-3 border rounded-md">
                      <p className="text-sm">All core subjects are mandatory</p>
                    </div>
                  </div>
                  <div className="md:col-span-3 space-y-2">
                    <Label>Elective Subjects (Choose any 2)</Label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <div className="flex items-center space-x-2 border p-2 rounded-md">
                        <input type="checkbox" id="physics" className="rounded border-gray-300 text-primary focus:ring-primary" />
                        <Label htmlFor="physics" className="cursor-pointer">Physics</Label>
                      </div>
                      <div className="flex items-center space-x-2 border p-2 rounded-md">
                        <input type="checkbox" id="chemistry" className="rounded border-gray-300 text-primary focus:ring-primary" />
                        <Label htmlFor="chemistry" className="cursor-pointer">Chemistry</Label>
                      </div>
                      <div className="flex items-center space-x-2 border p-2 rounded-md">
                        <input type="checkbox" id="biology" className="rounded border-gray-300 text-primary focus:ring-primary" />
                        <Label htmlFor="biology" className="cursor-pointer">Biology</Label>
                      </div>
                      <div className="flex items-center space-x-2 border p-2 rounded-md">
                        <input type="checkbox" id="computer" className="rounded border-gray-300 text-primary focus:ring-primary" />
                        <Label htmlFor="computer" className="cursor-pointer">Computer Science</Label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="hostel">Hostel / Day Scholar*</Label>
                  <Select defaultValue={initialData?.hostelStatus || "day"}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="day">Day Scholar</SelectItem>
                      <SelectItem value="hostel">Hostel</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="transportMode">Transport Mode</Label>
                  <Select defaultValue={initialData?.transportMode || ""}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Mode" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="school_bus">School Bus</SelectItem>
                      <SelectItem value="own">Own Transport</SelectItem>
                      <SelectItem value="public">Public Transport</SelectItem>
                      <SelectItem value="walker">Walker</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="busRoute">Bus Route</Label>
                  <Input id="busRoute" placeholder="Bus Route (if applicable)" defaultValue={initialData?.busRoute || ""} />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Documents Tab */}
        <TabsContent value="documents" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Document Uploads</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <Label>Aadhaar Card*</Label>
                  <div className="border border-dashed border-gray-300 rounded-lg p-4 text-center flex flex-col items-center justify-center h-36">
                    <Upload className="h-8 w-8 text-gray-400 mb-2" />
                    <p className="text-sm text-muted-foreground">Click to upload Aadhaar Card</p>
                    <p className="text-xs text-muted-foreground mt-1">PDF, JPG, PNG (Max 5MB)</p>
                    <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <Label>Birth Certificate*</Label>
                  <div className="border border-dashed border-gray-300 rounded-lg p-4 text-center flex flex-col items-center justify-center h-36">
                    <Upload className="h-8 w-8 text-gray-400 mb-2" />
                    <p className="text-sm text-muted-foreground">Click to upload Birth Certificate</p>
                    <p className="text-xs text-muted-foreground mt-1">PDF, JPG, PNG (Max 5MB)</p>
                    <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <Label>Transfer Certificate (TC)</Label>
                  <div className="border border-dashed border-gray-300 rounded-lg p-4 text-center flex flex-col items-center justify-center h-36">
                    <Upload className="h-8 w-8 text-gray-400 mb-2" />
                    <p className="text-sm text-muted-foreground">Click to upload Transfer Certificate</p>
                    <p className="text-xs text-muted-foreground mt-1">PDF, JPG, PNG (Max 5MB)</p>
                    <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <Label>Caste Certificate (if applicable)</Label>
                  <div className="border border-dashed border-gray-300 rounded-lg p-4 text-center flex flex-col items-center justify-center h-36">
                    <Upload className="h-8 w-8 text-gray-400 mb-2" />
                    <p className="text-sm text-muted-foreground">Click to upload Caste Certificate</p>
                    <p className="text-xs text-muted-foreground mt-1">PDF, JPG, PNG (Max 5MB)</p>
                    <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <Label>Medical Certificate (if applicable)</Label>
                  <div className="border border-dashed border-gray-300 rounded-lg p-4 text-center flex flex-col items-center justify-center h-36">
                    <Upload className="h-8 w-8 text-gray-400 mb-2" />
                    <p className="text-sm text-muted-foreground">Click to upload Medical Certificate</p>
                    <p className="text-xs text-muted-foreground mt-1">PDF, JPG, PNG (Max 5MB)</p>
                    <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Attendance Tab */}
        <TabsContent value="attendance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Attendance Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="attendanceNotification">Absence Notifications</Label>
                  <Select defaultValue="sms">
                    <SelectTrigger>
                      <SelectValue placeholder="Select Notification Method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sms">SMS</SelectItem>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="both">Both SMS & Email</SelectItem>
                      <SelectItem value="none">None</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="attendanceThreshold">Attendance Alert Threshold</Label>
                  <Select defaultValue="75">
                    <SelectTrigger>
                      <SelectValue placeholder="Select Threshold" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="90">Below 90%</SelectItem>
                      <SelectItem value="85">Below 85%</SelectItem>
                      <SelectItem value="80">Below 80%</SelectItem>
                      <SelectItem value="75">Below 75%</SelectItem>
                      <SelectItem value="70">Below 70%</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-4">
                <Label>Special Attendance Considerations</Label>
                <Textarea placeholder="Any special arrangements or considerations for attendance" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Fees Tab */}
        <TabsContent value="fees" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Fees & Scholarship Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="feeCategory">Fee Category*</Label>
                  <Select defaultValue="regular">
                    <SelectTrigger>
                      <SelectValue placeholder="Select Fee Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="regular">Regular</SelectItem>
                      <SelectItem value="rte">RTE</SelectItem>
                      <SelectItem value="staff">Staff Ward</SelectItem>
                      <SelectItem value="scholarship">Scholarship</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="feeInstallment">Fee Installment Plan</Label>
                  <Select defaultValue="quarterly">
                    <SelectTrigger>
                      <SelectValue placeholder="Select Installment Plan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="annual">Annual (One-time)</SelectItem>
                      <SelectItem value="biannual">Bi-annual (2 installments)</SelectItem>
                      <SelectItem value="quarterly">Quarterly (4 installments)</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="scholarshipType">Scholarship Type</Label>
                  <Select defaultValue="none">
                    <SelectTrigger>
                      <SelectValue placeholder="Select Scholarship Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="merit">Merit Based</SelectItem>
                      <SelectItem value="sports">Sports Quota</SelectItem>
                      <SelectItem value="cultural">Cultural Achievements</SelectItem>
                      <SelectItem value="financial">Financial Need</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="scholarshipPercentage">Discount/Concession %</Label>
                  <Input id="scholarshipPercentage" placeholder="Discount Percentage" defaultValue="0" />
                </div>
              </div>
              
              <div className="space-y-4">
                <Label>Additional Fee Notes</Label>
                <Textarea placeholder="Special arrangements, payment schedules, etc." />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-2 mt-6">
        <Button variant="outline" type="button" onClick={onClose}>Cancel</Button>
        <Button type="submit">{isEditMode ? "Update Student" : "Add Student"}</Button>
      </div>
    </form>
  );
};

export default StudentForm;
