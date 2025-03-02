
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { 
  Calendar, 
  FileText, 
  Download, 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  UserRound, 
  Bus,
  DollarSign
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const StudentReports = () => {
  const { toast } = useToast();
  const [classFilter, setClassFilter] = useState<string>("all");
  const [reportType, setReportType] = useState<string>("attendance");
  
  const handleGenerateReport = () => {
    toast({
      title: "Report Generated",
      description: `${reportType.charAt(0).toUpperCase() + reportType.slice(1)} report has been generated successfully.`,
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="col-span-3 md:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Generate Reports</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="reportType">Report Type</Label>
              <Select defaultValue="attendance" onValueChange={setReportType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Report Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="attendance">Attendance Report</SelectItem>
                  <SelectItem value="academic">Academic Performance</SelectItem>
                  <SelectItem value="fee">Fee Collection Report</SelectItem>
                  <SelectItem value="transport">Transport Report</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="classFilter">Class</Label>
              <Select defaultValue="all" onValueChange={setClassFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Classes</SelectItem>
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
            
            {reportType === "attendance" && (
              <div>
                <Label htmlFor="dateRange">Select Month</Label>
                <Select defaultValue="current">
                  <SelectTrigger>
                    <SelectValue placeholder="Select Month" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="current">Current Month</SelectItem>
                    <SelectItem value="previous">Previous Month</SelectItem>
                    <SelectItem value="custom">Custom Range</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
            
            {reportType === "academic" && (
              <div>
                <Label htmlFor="examType">Exam Type</Label>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue placeholder="Select Exam Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Exams</SelectItem>
                    <SelectItem value="unit_test">Unit Tests</SelectItem>
                    <SelectItem value="midterm">Mid-Term Exams</SelectItem>
                    <SelectItem value="final">Final Exams</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
            
            {reportType === "fee" && (
              <div>
                <Label htmlFor="feeStatus">Fee Status</Label>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue placeholder="Select Fee Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="partial">Partially Paid</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
            
            <Button 
              className="w-full" 
              onClick={handleGenerateReport}
            >
              Generate Report
            </Button>
            
            <div className="border-t border-gray-200 pt-4">
              <h3 className="font-medium mb-2">Recent Reports</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between items-center p-2 bg-gray-50 rounded-md">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <span>May Attendance Report</span>
                  </div>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Download size={14} />
                  </Button>
                </li>
                <li className="flex justify-between items-center p-2 bg-gray-50 rounded-md">
                  <div className="flex items-center gap-2">
                    <FileText size={16} />
                    <span>Mid-Term Academic Report</span>
                  </div>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Download size={14} />
                  </Button>
                </li>
                <li className="flex justify-between items-center p-2 bg-gray-50 rounded-md">
                  <div className="flex items-center gap-2">
                    <DollarSign size={16} />
                    <span>Q1 Fee Collection Report</span>
                  </div>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Download size={14} />
                  </Button>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-3 md:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Report Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="attendance" value={reportType} className="w-full">
              <TabsList className="grid grid-cols-4 mb-4">
                <TabsTrigger value="attendance" onClick={() => setReportType("attendance")}>
                  <Calendar size={16} className="mr-2" />
                  Attendance
                </TabsTrigger>
                <TabsTrigger value="academic" onClick={() => setReportType("academic")}>
                  <BarChart3 size={16} className="mr-2" />
                  Academic
                </TabsTrigger>
                <TabsTrigger value="fee" onClick={() => setReportType("fee")}>
                  <DollarSign size={16} className="mr-2" />
                  Fees
                </TabsTrigger>
                <TabsTrigger value="transport" onClick={() => setReportType("transport")}>
                  <Bus size={16} className="mr-2" />
                  Transport
                </TabsTrigger>
              </TabsList>
              
              {/* Attendance Report Preview */}
              <TabsContent value="attendance" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <Card className="bg-gray-50">
                    <CardContent className="p-4 text-center">
                      <div className="text-3xl font-bold text-green-600">87.5%</div>
                      <div className="text-sm text-muted-foreground">Overall Attendance</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-gray-50">
                    <CardContent className="p-4 text-center">
                      <div className="text-3xl font-bold">245</div>
                      <div className="text-sm text-muted-foreground">Total Students</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-gray-50">
                    <CardContent className="p-4 text-center">
                      <div className="text-3xl font-bold text-red-600">15</div>
                      <div className="text-sm text-muted-foreground">Below 75% Attendance</div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="rounded-md border">
                  <div className="bg-muted py-2">
                    <div className="grid grid-cols-5 px-4 text-sm font-medium">
                      <div>Class</div>
                      <div>Total Students</div>
                      <div>Present (Avg.)</div>
                      <div>Attendance %</div>
                      <div>Action</div>
                    </div>
                  </div>
                  <div className="divide-y">
                    <div className="grid grid-cols-5 px-4 py-2 text-sm">
                      <div>Class 10-A</div>
                      <div>42</div>
                      <div>38</div>
                      <div>90.5%</div>
                      <div>
                        <Button variant="outline" size="sm">Details</Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-5 px-4 py-2 text-sm">
                      <div>Class 9-B</div>
                      <div>45</div>
                      <div>39</div>
                      <div>86.7%</div>
                      <div>
                        <Button variant="outline" size="sm">Details</Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-5 px-4 py-2 text-sm">
                      <div>Class 8-A</div>
                      <div>40</div>
                      <div>36</div>
                      <div>90.0%</div>
                      <div>
                        <Button variant="outline" size="sm">Details</Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-5 px-4 py-2 text-sm">
                      <div>Class 7-C</div>
                      <div>38</div>
                      <div>31</div>
                      <div>81.6%</div>
                      <div>
                        <Button variant="outline" size="sm">Details</Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-5 px-4 py-2 text-sm">
                      <div>Class 6-B</div>
                      <div>36</div>
                      <div>30</div>
                      <div>83.3%</div>
                      <div>
                        <Button variant="outline" size="sm">Details</Button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button variant="outline" className="gap-2">
                    <Download size={16} />
                    Download Complete Report
                  </Button>
                </div>
              </TabsContent>
              
              {/* Academic Report Preview */}
              <TabsContent value="academic" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <Card className="bg-gray-50">
                    <CardContent className="p-4 text-center">
                      <div className="text-3xl font-bold text-blue-600">78.4%</div>
                      <div className="text-sm text-muted-foreground">Average Score</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-gray-50">
                    <CardContent className="p-4 text-center">
                      <div className="text-3xl font-bold text-green-600">85.2%</div>
                      <div className="text-sm text-muted-foreground">Highest Subject Avg.</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-gray-50">
                    <CardContent className="p-4 text-center">
                      <div className="text-3xl font-bold text-yellow-600">65.8%</div>
                      <div className="text-sm text-muted-foreground">Lowest Subject Avg.</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-gray-50">
                    <CardContent className="p-4 text-center">
                      <div className="text-3xl font-bold">42</div>
                      <div className="text-sm text-muted-foreground">Top Performers</div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="rounded-md border">
                  <div className="bg-muted py-2">
                    <div className="grid grid-cols-4 px-4 text-sm font-medium">
                      <div>Subject</div>
                      <div>Average Score</div>
                      <div>Pass Percentage</div>
                      <div>Action</div>
                    </div>
                  </div>
                  <div className="divide-y">
                    <div className="grid grid-cols-4 px-4 py-2 text-sm">
                      <div>Mathematics</div>
                      <div>85.2%</div>
                      <div>95%</div>
                      <div>
                        <Button variant="outline" size="sm">Details</Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 px-4 py-2 text-sm">
                      <div>Science</div>
                      <div>78.6%</div>
                      <div>92%</div>
                      <div>
                        <Button variant="outline" size="sm">Details</Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 px-4 py-2 text-sm">
                      <div>English</div>
                      <div>82.3%</div>
                      <div>98%</div>
                      <div>
                        <Button variant="outline" size="sm">Details</Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 px-4 py-2 text-sm">
                      <div>History</div>
                      <div>72.5%</div>
                      <div>88%</div>
                      <div>
                        <Button variant="outline" size="sm">Details</Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 px-4 py-2 text-sm">
                      <div>Geography</div>
                      <div>65.8%</div>
                      <div>82%</div>
                      <div>
                        <Button variant="outline" size="sm">Details</Button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button variant="outline" className="gap-2">
                    <Download size={16} />
                    Download Complete Report
                  </Button>
                </div>
              </TabsContent>
              
              {/* Fee Report Preview */}
              <TabsContent value="fee" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <Card className="bg-gray-50">
                    <CardContent className="p-4 text-center">
                      <div className="text-3xl font-bold">₹52,50,000</div>
                      <div className="text-sm text-muted-foreground">Total Fees (Term)</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-gray-50">
                    <CardContent className="p-4 text-center">
                      <div className="text-3xl font-bold text-green-600">₹42,15,000</div>
                      <div className="text-sm text-muted-foreground">Collected (80.3%)</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-gray-50">
                    <CardContent className="p-4 text-center">
                      <div className="text-3xl font-bold text-red-600">₹10,35,000</div>
                      <div className="text-sm text-muted-foreground">Outstanding (19.7%)</div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="rounded-md border">
                  <div className="bg-muted py-2">
                    <div className="grid grid-cols-5 px-4 text-sm font-medium">
                      <div>Class</div>
                      <div>Total Students</div>
                      <div>Fees Collected</div>
                      <div>Payment Status</div>
                      <div>Action</div>
                    </div>
                  </div>
                  <div className="divide-y">
                    <div className="grid grid-cols-5 px-4 py-2 text-sm">
                      <div>Class 10</div>
                      <div>42</div>
                      <div>₹8,40,000</div>
                      <div>
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full bg-green-500 rounded-full" style={{width: '85%'}}></div>
                          </div>
                          <span>85%</span>
                        </div>
                      </div>
                      <div>
                        <Button variant="outline" size="sm">Details</Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-5 px-4 py-2 text-sm">
                      <div>Class 9</div>
                      <div>45</div>
                      <div>₹8,10,000</div>
                      <div>
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full bg-green-500 rounded-full" style={{width: '75%'}}></div>
                          </div>
                          <span>75%</span>
                        </div>
                      </div>
                      <div>
                        <Button variant="outline" size="sm">Details</Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-5 px-4 py-2 text-sm">
                      <div>Class 8</div>
                      <div>40</div>
                      <div>₹7,65,000</div>
                      <div>
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full bg-green-500 rounded-full" style={{width: '90%'}}></div>
                          </div>
                          <span>90%</span>
                        </div>
                      </div>
                      <div>
                        <Button variant="outline" size="sm">Details</Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-5 px-4 py-2 text-sm">
                      <div>Class 7</div>
                      <div>38</div>
                      <div>₹6,25,000</div>
                      <div>
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full bg-green-500 rounded-full" style={{width: '78%'}}></div>
                          </div>
                          <span>78%</span>
                        </div>
                      </div>
                      <div>
                        <Button variant="outline" size="sm">Details</Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-5 px-4 py-2 text-sm">
                      <div>Class 6</div>
                      <div>36</div>
                      <div>₹5,75,000</div>
                      <div>
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full bg-green-500 rounded-full" style={{width: '82%'}}></div>
                          </div>
                          <span>82%</span>
                        </div>
                      </div>
                      <div>
                        <Button variant="outline" size="sm">Details</Button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button variant="outline" className="gap-2">
                    <Download size={16} />
                    Download Complete Report
                  </Button>
                </div>
              </TabsContent>
              
              {/* Transport Report Preview */}
              <TabsContent value="transport" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <Card className="bg-gray-50">
                    <CardContent className="p-4 text-center">
                      <div className="text-3xl font-bold">12</div>
                      <div className="text-sm text-muted-foreground">Total Routes</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-gray-50">
                    <CardContent className="p-4 text-center">
                      <div className="text-3xl font-bold">185</div>
                      <div className="text-sm text-muted-foreground">Students Using Transport</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-gray-50">
                    <CardContent className="p-4 text-center">
                      <div className="text-3xl font-bold">₹7,40,000</div>
                      <div className="text-sm text-muted-foreground">Transport Fee Collection</div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="rounded-md border">
                  <div className="bg-muted py-2">
                    <div className="grid grid-cols-5 px-4 text-sm font-medium">
                      <div>Route Number</div>
                      <div>Area Covered</div>
                      <div>Total Students</div>
                      <div>Driver Details</div>
                      <div>Action</div>
                    </div>
                  </div>
                  <div className="divide-y">
                    <div className="grid grid-cols-5 px-4 py-2 text-sm">
                      <div>Route 1</div>
                      <div>North City Area</div>
                      <div>28</div>
                      <div>Rajesh Kumar (9876543210)</div>
                      <div>
                        <Button variant="outline" size="sm">Details</Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-5 px-4 py-2 text-sm">
                      <div>Route 2</div>
                      <div>East City Area</div>
                      <div>32</div>
                      <div>Sunil Singh (9876543211)</div>
                      <div>
                        <Button variant="outline" size="sm">Details</Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-5 px-4 py-2 text-sm">
                      <div>Route 3</div>
                      <div>South City Area</div>
                      <div>26</div>
                      <div>Rahul Sharma (9876543212)</div>
                      <div>
                        <Button variant="outline" size="sm">Details</Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-5 px-4 py-2 text-sm">
                      <div>Route 4</div>
                      <div>West City Area</div>
                      <div>30</div>
                      <div>Prakash Verma (9876543213)</div>
                      <div>
                        <Button variant="outline" size="sm">Details</Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-5 px-4 py-2 text-sm">
                      <div>Route 5</div>
                      <div>Central Area</div>
                      <div>22</div>
                      <div>Vijay Kumar (9876543214)</div>
                      <div>
                        <Button variant="outline" size="sm">Details</Button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button variant="outline" className="gap-2">
                    <Download size={16} />
                    Download Complete Report
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentReports;
