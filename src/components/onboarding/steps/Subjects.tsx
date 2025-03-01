
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SchoolData } from "../OnboardingFlow";
import { PlusCircle, Trash2, Check, X, BookOpen, Search } from "lucide-react";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";

interface SubjectsProps {
  data: SchoolData;
  updateData: (section: keyof SchoolData, data: any) => void;
  setValidity: (isValid: boolean) => void;
}

const Subjects = ({ data, updateData, setValidity }: SubjectsProps) => {
  const [subjects, setSubjects] = useState(data.subjects);
  const [editingSubject, setEditingSubject] = useState<number | null>(null);
  const [tempSubject, setTempSubject] = useState({
    name: "",
    code: "",
    description: "",
    forClasses: [] as string[],
  });
  const [searchQuery, setSearchQuery] = useState("");
  const classes = data.classStructure.classes.map((cls) => cls.name);

  useEffect(() => {
    const isValid = subjects.length > 0 && subjects.every(
      (subject) => subject.name.trim() !== "" && subject.code.trim() !== ""
    );
    
    setValidity(isValid);
    
    updateData("subjects", subjects);
  }, [subjects, setValidity, updateData]);

  const addSubject = () => {
    setEditingSubject(null);
    setTempSubject({
      name: "",
      code: "",
      description: "",
      forClasses: [],
    });
  };

  const editSubject = (index: number) => {
    setEditingSubject(index);
    setTempSubject({ ...subjects[index] });
  };

  const saveSubject = () => {
    if (!tempSubject.name.trim() || !tempSubject.code.trim()) {
      toast.error("Subject name and code are required");
      return;
    }

    if (tempSubject.forClasses.length === 0) {
      toast.error("Please select at least one class for this subject");
      return;
    }

    if (editingSubject === null) {
      // Add new subject
      setSubjects([...subjects, tempSubject]);
    } else {
      // Update existing subject
      const updatedSubjects = [...subjects];
      updatedSubjects[editingSubject] = tempSubject;
      setSubjects(updatedSubjects);
    }

    setEditingSubject(null);
    setTempSubject({
      name: "",
      code: "",
      description: "",
      forClasses: [],
    });

    toast.success(editingSubject === null ? "Subject added" : "Subject updated");
  };

  const cancelEdit = () => {
    setEditingSubject(null);
    setTempSubject({
      name: "",
      code: "",
      description: "",
      forClasses: [],
    });
  };

  const deleteSubject = (index: number) => {
    if (subjects.length === 1) {
      toast.error("You need at least one subject");
      return;
    }
    
    const updatedSubjects = [...subjects];
    updatedSubjects.splice(index, 1);
    setSubjects(updatedSubjects);
    
    if (editingSubject === index) {
      cancelEdit();
    }
    
    toast.success("Subject deleted");
  };

  const toggleClass = (className: string) => {
    if (tempSubject.forClasses.includes(className)) {
      setTempSubject({
        ...tempSubject,
        forClasses: tempSubject.forClasses.filter((c) => c !== className),
      });
    } else {
      setTempSubject({
        ...tempSubject,
        forClasses: [...tempSubject.forClasses, className],
      });
    }
  };

  const filteredSubjects = subjects.filter(
    (subject) =>
      subject.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      subject.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">School Subjects</h2>
        <p className="text-gray-600 mt-2">
          Define the subjects taught in your school and assign them to classes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Subject List Section */}
        <div className="md:col-span-2 bg-gray-50 p-6 rounded-xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold">Subject List</h3>
            <div className="flex space-x-2">
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search subjects..."
                  className="pl-9 h-10 border-gray-200 focus:border-black focus-visible:ring-0 focus-visible:ring-offset-0 w-56"
                />
              </div>
              <Button
                variant="outline"
                onClick={addSubject}
                className="border-gray-300 hover:bg-gray-100"
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Subject
              </Button>
            </div>
          </div>

          {subjects.length === 0 ? (
            <div className="text-center py-10 border border-dashed border-gray-300 rounded-lg">
              <BookOpen className="h-8 w-8 mx-auto text-gray-400 mb-2" />
              <p className="text-gray-500">No subjects added yet</p>
              <Button
                variant="ghost"
                onClick={addSubject}
                className="mt-2 text-gray-600 hover:text-gray-900"
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Add your first subject
              </Button>
            </div>
          ) : (
            <div className="overflow-hidden shadow-sm rounded-lg border border-gray-200">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Code
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Subject
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Classes
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredSubjects.map((subject, index) => (
                    <tr
                      key={index}
                      className={
                        editingSubject === index
                          ? "bg-gray-50"
                          : "hover:bg-gray-50"
                      }
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {subject.code}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {subject.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex flex-wrap gap-1">
                          {subject.forClasses.length > 0 ? (
                            subject.forClasses.map((cls) => (
                              <span
                                key={cls}
                                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                              >
                                {cls}
                              </span>
                            ))
                          ) : (
                            <span className="text-gray-400">No classes assigned</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                        <div className="flex justify-end space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => editSubject(index)}
                            className="text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                          >
                            Edit
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteSubject(index)}
                            className="text-gray-600 hover:text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Add/Edit Subject Form */}
        <div className={`bg-white p-6 rounded-xl border border-gray-200 shadow-sm ${editingSubject !== null || subjects.length === 0 ? "" : "hidden md:block"}`}>
          <h3 className="text-lg font-semibold mb-6">
            {editingSubject !== null ? "Edit Subject" : "Add New Subject"}
          </h3>

          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="subjectName" className="text-sm font-medium">
                Subject Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="subjectName"
                value={tempSubject.name}
                onChange={(e) =>
                  setTempSubject({ ...tempSubject, name: e.target.value })
                }
                placeholder="e.g. Mathematics"
                className="h-10 border-gray-200 focus:border-black focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subjectCode" className="text-sm font-medium">
                Subject Code <span className="text-red-500">*</span>
              </Label>
              <Input
                id="subjectCode"
                value={tempSubject.code}
                onChange={(e) =>
                  setTempSubject({ ...tempSubject, code: e.target.value })
                }
                placeholder="e.g. MATH"
                className="h-10 border-gray-200 focus:border-black focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subjectDescription" className="text-sm font-medium">
                Description
              </Label>
              <Textarea
                id="subjectDescription"
                value={tempSubject.description}
                onChange={(e) =>
                  setTempSubject({ ...tempSubject, description: e.target.value })
                }
                placeholder="Brief description of the subject"
                className="min-h-[80px] border-gray-200 focus:border-black focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>

            <div className="space-y-3">
              <Label className="text-sm font-medium">
                Assign Classes <span className="text-red-500">*</span>
              </Label>
              {classes.length === 0 ? (
                <p className="text-sm text-gray-500">
                  No classes defined. Please add classes first.
                </p>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  {classes.map((className) => (
                    <div
                      key={className}
                      className="flex items-center space-x-2 rounded-lg p-2 hover:bg-gray-50"
                    >
                      <Checkbox
                        id={`class-${className}`}
                        checked={tempSubject.forClasses.includes(className)}
                        onCheckedChange={() => toggleClass(className)}
                      />
                      <Label
                        htmlFor={`class-${className}`}
                        className="text-sm cursor-pointer flex-1"
                      >
                        {className}
                      </Label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-between mt-8 pt-4 border-t border-gray-100">
            <Button
              variant="ghost"
              onClick={cancelEdit}
              className="text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
            <Button
              onClick={saveSubject}
              className="bg-black text-white hover:bg-gray-800"
            >
              <Check className="mr-2 h-4 w-4" />
              {editingSubject !== null ? "Update Subject" : "Add Subject"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subjects;
