
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { SchoolData } from "../OnboardingFlow";
import { PlusCircle, X, ChevronDown, ChevronUp } from "lucide-react";
import { toast } from "sonner";

interface ClassStructureProps {
  data: SchoolData;
  updateData: (section: keyof SchoolData, data: any) => void;
  setValidity: (isValid: boolean) => void;
}

const ClassStructure = ({ data, updateData, setValidity }: ClassStructureProps) => {
  const [classes, setClasses] = useState(
    data.classStructure.classes.length > 0
      ? data.classStructure.classes
      : [{ name: "", sections: [""] }]
  );
  const [expandedClass, setExpandedClass] = useState<number | null>(0);

  useEffect(() => {
    const isValid =
      classes.length > 0 &&
      classes.every(
        (cls) =>
          cls.name.trim() !== "" &&
          cls.sections.length > 0 &&
          cls.sections.every((section) => section.trim() !== "")
      );
    
    setValidity(isValid);
    
    updateData("classStructure", { classes });
  }, [classes, setValidity, updateData]);

  const addClass = () => {
    setClasses([...classes, { name: "", sections: [""] }]);
    setExpandedClass(classes.length);
  };

  const removeClass = (index: number) => {
    if (classes.length === 1) {
      toast.error("You need at least one class");
      return;
    }
    
    const newClasses = [...classes];
    newClasses.splice(index, 1);
    setClasses(newClasses);
    
    if (expandedClass === index) {
      setExpandedClass(null);
    } else if (expandedClass !== null && expandedClass > index) {
      setExpandedClass(expandedClass - 1);
    }
  };

  const updateClassName = (index: number, name: string) => {
    const newClasses = [...classes];
    newClasses[index].name = name;
    setClasses(newClasses);
  };

  const addSection = (classIndex: number) => {
    const newClasses = [...classes];
    newClasses[classIndex].sections.push("");
    setClasses(newClasses);
  };

  const removeSection = (classIndex: number, sectionIndex: number) => {
    if (classes[classIndex].sections.length === 1) {
      toast.error("You need at least one section");
      return;
    }
    
    const newClasses = [...classes];
    newClasses[classIndex].sections.splice(sectionIndex, 1);
    setClasses(newClasses);
  };

  const updateSection = (classIndex: number, sectionIndex: number, value: string) => {
    const newClasses = [...classes];
    newClasses[classIndex].sections[sectionIndex] = value;
    setClasses(newClasses);
  };

  const toggleExpand = (index: number) => {
    setExpandedClass(expandedClass === index ? null : index);
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Class Structure</h2>
        <p className="text-gray-600 mt-2">
          Define the classes and sections available in your school.
        </p>
      </div>

      <div className="space-y-6">
        {classes.map((cls, classIndex) => (
          <div
            key={classIndex}
            className="border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <div
              className="flex items-center justify-between p-4 bg-gray-50 cursor-pointer"
              onClick={() => toggleExpand(classIndex)}
            >
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-black text-white font-semibold text-sm">
                  {classIndex + 1}
                </div>
                <Input
                  value={cls.name}
                  onChange={(e) => updateClassName(classIndex, e.target.value)}
                  placeholder="Enter class name"
                  className="max-w-md h-12 border-gray-200 focus:border-black focus-visible:ring-0 focus-visible:ring-offset-0"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
              
              <div className="flex items-center space-x-3">
                <span className="text-gray-600 text-sm">{cls.sections.length} section(s)</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeClass(classIndex);
                  }}
                  className="text-gray-500 hover:text-red-500 hover:bg-red-50"
                >
                  <X className="h-5 w-5" />
                </Button>
                {expandedClass === classIndex ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </div>
            </div>

            {expandedClass === classIndex && (
              <div className="p-6 bg-white border-t border-gray-200 animate-accordion-down">
                <Label className="mb-3 block text-sm font-medium">
                  Sections for {cls.name || "this class"}
                </Label>
                <div className="space-y-3">
                  {cls.sections.map((section, sectionIndex) => (
                    <div key={sectionIndex} className="flex items-center space-x-2">
                      <Input
                        value={section}
                        onChange={(e) =>
                          updateSection(classIndex, sectionIndex, e.target.value)
                        }
                        placeholder="Section name (e.g., A, B, C)"
                        className="h-12 border-gray-200 focus:border-black focus-visible:ring-0 focus-visible:ring-offset-0"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeSection(classIndex, sectionIndex)}
                        className="text-gray-500 hover:text-red-500 hover:bg-red-50"
                      >
                        <X className="h-5 w-5" />
                      </Button>
                    </div>
                  ))}
                </div>
                <Button
                  variant="outline"
                  onClick={() => addSection(classIndex)}
                  className="mt-4 text-sm hover:bg-gray-50 border-dashed"
                >
                  <PlusCircle className="mr-2 h-4 w-4" /> Add Section
                </Button>
              </div>
            )}
          </div>
        ))}

        <Button
          variant="outline"
          onClick={addClass}
          className="w-full py-6 border-dashed border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-colors"
        >
          <PlusCircle className="mr-2 h-5 w-5" />
          Add Another Class
        </Button>
      </div>
    </div>
  );
};

export default ClassStructure;
