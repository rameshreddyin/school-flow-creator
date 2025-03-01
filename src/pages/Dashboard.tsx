
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { getAccessibleModules, getIconByName } from "@/lib/auth";
import { motion } from "framer-motion";

const Dashboard = () => {
  const { user, logout } = useAuth();
  
  if (!user) {
    return null; // Protected route should handle this
  }
  
  const modules = getAccessibleModules(user.role);
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold">SchoolManager</h1>
              </div>
            </div>
            <div className="flex items-center">
              <div className="flex items-center gap-3">
                <div className="text-sm text-gray-600">
                  <span className="hidden md:inline">Welcome, </span>
                  <span className="font-medium">{user.name}</span>
                  <span className="text-xs ml-2 px-2 py-0.5 bg-gray-100 rounded-full">
                    {user.role.replace('_', ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
                  </span>
                </div>
                <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-medium">
                  {user.name.charAt(0)}
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={logout}
                  className="text-gray-500 hover:text-gray-700"
                >
                  Log out
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Dashboard Header */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="mt-1 text-sm text-gray-500">
              Welcome to your school management system dashboard
            </p>
          </motion.div>

          {/* School Info */}
          <motion.div
            className="bg-white shadow rounded-lg p-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="text-lg font-medium mb-4">School Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="text-sm text-gray-500">School Code</p>
                <p className="font-medium">{user.schoolCode || 'SCH001'}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{user.email}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="text-sm text-gray-500">Your Role</p>
                <p className="font-medium">
                  {user.role.replace('_', ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Modules */}
          <h2 className="text-xl font-semibold mb-4">Available Modules</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {modules.map((module, index) => {
              const IconComponent = getIconByName(module.icon);
              
              return (
                <motion.div
                  key={module.id}
                  className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 + index * 0.05 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-gray-100 p-3 rounded-md">
                        <IconComponent className="h-6 w-6 text-gray-600" />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-gray-900">{module.name}</h3>
                        <p className="text-sm text-gray-500">{module.description}</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-5 py-3">
                    <Button 
                      variant="ghost" 
                      className="text-gray-700 hover:text-black text-sm w-full justify-start px-0"
                    >
                      Access Module →
                    </Button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
