
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, UserCheck, Users, Trash2, ShieldCheck, ShieldAlert } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { UserRole } from "@/types/auth";
import { availableModules, getAccessibleModules } from "@/lib/auth";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";

interface StaffMember {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface CreateStaffAccountsProps {
  data: any;
  updateData: (section: any, data: any) => void;
  setValidity: (isValid: boolean) => void;
  onStart?: () => void; // Add this to match other step props
}

const roleDescriptions: Record<UserRole, { description: string, icon: any }> = {
  super_admin: {
    description: "Full access to all modules and system settings. Can manage other admins.",
    icon: ShieldAlert
  },
  admin: {
    description: "Access to most modules and can manage school settings.",
    icon: ShieldCheck
  },
  teacher: {
    description: "Access to student information, classes, and teaching resources.",
    icon: UserCheck
  },
  staff: {
    description: "Limited access to basic school functions and reports.",
    icon: Users
  }
};

const CreateStaffAccounts = ({ setValidity }: CreateStaffAccountsProps) => {
  const { createStaffAccount, user } = useAuth();
  const [staffMembers, setStaffMembers] = useState<StaffMember[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [newStaff, setNewStaff] = useState<StaffMember>({
    id: "",
    name: "",
    email: "",
    role: "admin"
  });
  const [createdAccounts, setCreatedAccounts] = useState<StaffMember[]>([]);
  const [showRoleHelp, setShowRoleHelp] = useState(false);

  // Always set validity to true for this step
  useState(() => {
    setValidity(true);
  });

  const handleAddStaff = () => {
    if (!newStaff.name || !newStaff.email) {
      toast.error("Please fill in all required fields");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newStaff.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    const newStaffMember: StaffMember = {
      ...newStaff,
      id: `staff-${Date.now()}`
    };

    setStaffMembers([...staffMembers, newStaffMember]);
    setNewStaff({
      id: "",
      name: "",
      email: "",
      role: "admin"
    });
  };

  const handleRemoveStaff = (id: string) => {
    setStaffMembers(staffMembers.filter(staff => staff.id !== id));
  };

  const handleCreateAccounts = async () => {
    if (staffMembers.length === 0) {
      toast.error("Add at least one staff member to create accounts");
      return;
    }

    setIsCreating(true);

    try {
      const createdStaff: StaffMember[] = [];

      // Create accounts one by one
      for (const staff of staffMembers) {
        // In a real app, this would send invitations to each user
        const success = await createStaffAccount(staff.email, staff.name, staff.role);
        if (success) {
          createdStaff.push(staff);
        }
      }

      if (createdStaff.length > 0) {
        setCreatedAccounts([...createdAccounts, ...createdStaff]);
        setStaffMembers([]);
        toast.success(`Successfully created ${createdStaff.length} staff accounts`);
      }
    } finally {
      setIsCreating(false);
    }
  };

  // Show modules accessible by role
  const getModulesByRole = (role: UserRole) => {
    return getAccessibleModules(role);
  };

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Create Staff Accounts</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Add staff members to your school management system. They will receive an email invitation to set up their account.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Add Staff Form */}
        <motion.div 
          className="md:col-span-1 bg-gray-50 p-6 rounded-xl border border-gray-200"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="font-bold text-xl mb-4">Add Staff Member</h3>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="staffName">Full Name</Label>
              <Input 
                id="staffName" 
                placeholder="John Doe" 
                value={newStaff.name}
                onChange={(e) => setNewStaff({...newStaff, name: e.target.value})}
              />
            </div>
            
            <div>
              <Label htmlFor="staffEmail">Email Address</Label>
              <Input 
                id="staffEmail" 
                type="email" 
                placeholder="john.doe@school.com" 
                value={newStaff.email}
                onChange={(e) => setNewStaff({...newStaff, email: e.target.value})}
              />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1">
                <Label htmlFor="staffRole">Role</Label>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-xs text-gray-500"
                  onClick={() => setShowRoleHelp(!showRoleHelp)}
                >
                  {showRoleHelp ? "Hide Info" : "What's this?"}
                </Button>
              </div>
              
              <Select 
                value={newStaff.role} 
                onValueChange={(value) => setNewStaff({...newStaff, role: value as UserRole})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  {user?.role === "super_admin" && (
                    <SelectItem value="super_admin">Super Admin</SelectItem>
                  )}
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="teacher">Teacher</SelectItem>
                  <SelectItem value="staff">Staff</SelectItem>
                </SelectContent>
              </Select>
              
              {showRoleHelp && (
                <div className="mt-3 p-3 bg-gray-100 rounded-lg text-sm">
                  <h4 className="font-medium text-gray-900 mb-2">Role Access Levels</h4>
                  {Object.entries(roleDescriptions).map(([role, { description, icon: Icon }]) => (
                    <div key={role} className="mb-2 flex gap-2">
                      <Icon className="h-4 w-4 mt-0.5 flex-shrink-0 text-gray-700" />
                      <div>
                        <span className="font-medium capitalize">{role.replace('_', ' ')}: </span>
                        <span className="text-gray-600">{description}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="mt-2">
              <h4 className="text-sm font-medium mb-2">Module Access Preview</h4>
              <div className="bg-white p-3 rounded-lg border border-gray-200 max-h-28 overflow-y-auto">
                <div className="flex flex-wrap gap-1">
                  {getModulesByRole(newStaff.role).map((module) => (
                    <span 
                      key={module.id} 
                      className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-200 text-gray-800"
                    >
                      {module.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <Button 
              onClick={handleAddStaff} 
              className="w-full flex items-center gap-2"
            >
              <Plus size={16} />
              Add to List
            </Button>
          </div>
        </motion.div>

        {/* Staff List */}
        <motion.div 
          className="md:col-span-2 bg-white p-6 rounded-xl border border-gray-200"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-xl">Staff to Add ({staffMembers.length})</h3>
            {staffMembers.length > 0 && (
              <Button 
                onClick={handleCreateAccounts} 
                disabled={isCreating}
                className="bg-black text-white hover:bg-gray-800"
              >
                {isCreating ? "Creating..." : "Create Accounts"}
              </Button>
            )}
          </div>
          
          {staffMembers.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Users className="h-12 w-12 mx-auto mb-3 text-gray-300" />
              <p>No staff members added yet</p>
              <p className="text-sm mt-1">Add staff members using the form on the left</p>
            </div>
          ) : (
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {staffMembers.map((staff) => (
                <div 
                  key={staff.id} 
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                      {staff.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="font-medium">{staff.name}</h4>
                      <p className="text-sm text-gray-600">{staff.email} · <span className="capitalize">{staff.role.replace('_', ' ')}</span></p>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleRemoveStaff(staff.id)}
                    className="text-gray-500 hover:text-red-500"
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              ))}
            </div>
          )}
          
          {/* Created Accounts */}
          {createdAccounts.length > 0 && (
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex items-center gap-2 mb-4">
                <UserCheck className="text-green-600" />
                <h3 className="font-bold text-lg">Created Accounts ({createdAccounts.length})</h3>
              </div>
              
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {createdAccounts.map((staff) => (
                  <div 
                    key={staff.id} 
                    className="flex items-center p-3 bg-green-50 border border-green-100 rounded-lg"
                  >
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3 text-green-800">
                      {staff.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="font-medium">{staff.name}</h4>
                      <p className="text-sm text-gray-600">{staff.email} · <span className="capitalize">{staff.role.replace('_', ' ')}</span></p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
      
      {/* Module Access Section */}
      <div className="mt-10 bg-white p-6 rounded-xl border border-gray-200">
        <h3 className="font-bold text-xl mb-4">Role-Based Module Access</h3>
        <p className="text-gray-600 mb-6">
          Each role has access to different modules in the system. Here's a breakdown of what each role can access:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(roleDescriptions).map(([role, { description, icon: Icon }]) => (
            <div key={role} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Icon className="h-5 w-5 text-gray-800" />
                <h4 className="font-bold capitalize">{role.replace('_', ' ')}</h4>
              </div>
              <p className="text-sm text-gray-600 mb-3">{description}</p>
              
              <Separator className="my-3" />
              
              <h5 className="text-sm font-medium mb-2">Module Access:</h5>
              <div className="flex flex-wrap gap-1">
                {getModulesByRole(role as UserRole).map((module) => (
                  <span 
                    key={module.id} 
                    className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-200 text-gray-800 mb-1"
                  >
                    {module.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <p className="text-gray-600 text-sm">
          Staff members will receive email invitations to set up their accounts.
          <br />
          In the meantime, you can proceed to the dashboard to start using your school management system.
        </p>
      </div>
    </div>
  );
};

export default CreateStaffAccounts;
