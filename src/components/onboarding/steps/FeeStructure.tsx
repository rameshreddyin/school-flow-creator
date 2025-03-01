
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { SchoolData } from "../OnboardingFlow";
import { Plus, MinusCircle, PlusCircle, Calculator } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { toast } from "sonner";

interface FeeStructureProps {
  data: SchoolData;
  updateData: (section: keyof SchoolData, data: any) => void;
  setValidity: (isValid: boolean) => void;
}

const FeeStructure = ({
  data,
  updateData,
  setValidity,
}: FeeStructureProps) => {
  const [terms, setTerms] = useState(data.feeStructure.terms);
  const [feeTypes, setFeeTypes] = useState(data.feeStructure.feeTypes);
  const [classFees, setClassFees] = useState(data.feeStructure.classFees);
  const [activeTab, setActiveTab] = useState("terms");
  const classes = data.classStructure.classes.map((cls) => cls.name);

  useEffect(() => {
    // Initialize class fees for any new classes that don't have fees yet
    const existingClassNames = classFees.map((cf) => cf.className);
    const newClassFees = [...classFees];
    
    classes.forEach((className) => {
      if (!existingClassNames.includes(className)) {
        newClassFees.push({
          className,
          fees: feeTypes.map((type) => ({
            type: type.name,
            amount: type.amount,
          })),
        });
      }
    });
    
    setClassFees(newClassFees);
  }, [data.classStructure.classes]);

  useEffect(() => {
    const isValid =
      terms.length > 0 &&
      terms.every((term) => term.trim() !== "") &&
      feeTypes.length > 0 &&
      feeTypes.every((type) => 
        type.name.trim() !== "" && type.amount >= 0
      );
    
    setValidity(isValid);
    
    updateData("feeStructure", { terms, feeTypes, classFees });
  }, [terms, feeTypes, classFees, setValidity, updateData]);

  // Term Management
  const addTerm = () => {
    setTerms([...terms, `Term ${terms.length + 1}`]);
  };

  const removeTerm = (index: number) => {
    if (terms.length === 1) {
      toast.error("You need at least one term");
      return;
    }
    const newTerms = [...terms];
    newTerms.splice(index, 1);
    setTerms(newTerms);
  };

  const updateTerm = (index: number, value: string) => {
    const newTerms = [...terms];
    newTerms[index] = value;
    setTerms(newTerms);
  };

  // Fee Type Management
  const addFeeType = () => {
    const newFeeType = {
      name: "",
      amount: 0,
      termBased: true,
    };
    setFeeTypes([...feeTypes, newFeeType]);
    
    // Add this fee type to all classes
    const newClassFees = classFees.map((cf) => ({
      ...cf,
      fees: [...cf.fees, { type: newFeeType.name, amount: newFeeType.amount }],
    }));
    setClassFees(newClassFees);
  };

  const removeFeeType = (index: number) => {
    if (feeTypes.length === 1) {
      toast.error("You need at least one fee type");
      return;
    }
    
    const feeTypeToRemove = feeTypes[index].name;
    
    const newFeeTypes = [...feeTypes];
    newFeeTypes.splice(index, 1);
    setFeeTypes(newFeeTypes);
    
    // Remove this fee type from all classes
    const newClassFees = classFees.map((cf) => ({
      ...cf,
      fees: cf.fees.filter((fee) => fee.type !== feeTypeToRemove),
    }));
    setClassFees(newClassFees);
  };

  const updateFeeType = (index: number, field: string, value: any) => {
    const oldName = feeTypes[index].name;
    
    const newFeeTypes = [...feeTypes];
    newFeeTypes[index] = { ...newFeeTypes[index], [field]: value };
    setFeeTypes(newFeeTypes);
    
    // If name changed, update in all class fees
    if (field === "name" && oldName) {
      const newClassFees = classFees.map((cf) => ({
        ...cf,
        fees: cf.fees.map((fee) => 
          fee.type === oldName ? { ...fee, type: value } : fee
        ),
      }));
      setClassFees(newClassFees);
    }
  };

  // Class Fee Management
  const updateClassFee = (className: string, feeType: string, amount: number) => {
    const newClassFees = classFees.map((cf) => {
      if (cf.className === className) {
        return {
          ...cf,
          fees: cf.fees.map((fee) => 
            fee.type === feeType ? { ...fee, amount } : fee
          ),
        };
      }
      return cf;
    });
    setClassFees(newClassFees);
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Fee Structure</h2>
        <p className="text-gray-600 mt-2">
          Define your school's fee structure including terms and fee types.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full grid grid-cols-3 mb-8">
          <TabsTrigger
            value="terms"
            className="data-[state=active]:bg-black data-[state=active]:text-white"
          >
            Academic Terms
          </TabsTrigger>
          <TabsTrigger
            value="types"
            className="data-[state=active]:bg-black data-[state=active]:text-white"
          >
            Fee Types
          </TabsTrigger>
          <TabsTrigger
            value="class"
            className="data-[state=active]:bg-black data-[state=active]:text-white"
          >
            Class-wise Fees
          </TabsTrigger>
        </TabsList>

        {/* Terms Tab */}
        <TabsContent value="terms" className="space-y-6">
          <div className="bg-gray-50 p-6 rounded-xl">
            <h3 className="text-lg font-semibold mb-4">Academic Terms</h3>
            <p className="text-sm text-gray-600 mb-6">
              Define the academic terms or semesters for your school year.
            </p>

            {terms.map((term, index) => (
              <div key={index} className="flex items-center space-x-3 mb-4">
                <Input
                  value={term}
                  onChange={(e) => updateTerm(index, e.target.value)}
                  placeholder="Term name"
                  className="h-12 border-gray-200 focus:border-black focus-visible:ring-0 focus-visible:ring-offset-0"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeTerm(index)}
                  className="text-gray-500 hover:text-red-500 hover:bg-red-50"
                >
                  <MinusCircle className="h-5 w-5" />
                </Button>
              </div>
            ))}

            <Button
              variant="outline"
              onClick={addTerm}
              className="mt-2 border-dashed hover:bg-gray-100"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Term
            </Button>
          </div>

          <div className="flex justify-end">
            <Button
              onClick={() => setActiveTab("types")}
              className="bg-black text-white hover:bg-gray-800"
            >
              Next: Define Fee Types
            </Button>
          </div>
        </TabsContent>

        {/* Fee Types Tab */}
        <TabsContent value="types" className="space-y-6">
          <div className="bg-gray-50 p-6 rounded-xl">
            <h3 className="text-lg font-semibold mb-4">Fee Types</h3>
            <p className="text-sm text-gray-600 mb-6">
              Create different types of fees that apply to your school (e.g., Tuition, Library, Sports).
            </p>

            <div className="space-y-4">
              {feeTypes.map((feeType, index) => (
                <div
                  key={index}
                  className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm"
                >
                  <div className="flex justify-between items-start">
                    <div className="space-y-4 flex-1">
                      <div className="flex space-x-4">
                        <div className="flex-1">
                          <Label
                            htmlFor={`feeName-${index}`}
                            className="text-xs font-medium text-gray-500 mb-1 block"
                          >
                            Fee Name
                          </Label>
                          <Input
                            id={`feeName-${index}`}
                            value={feeType.name}
                            onChange={(e) =>
                              updateFeeType(index, "name", e.target.value)
                            }
                            placeholder="e.g. Tuition Fee"
                            className="h-10 border-gray-200 focus:border-black focus-visible:ring-0 focus-visible:ring-offset-0"
                          />
                        </div>
                        <div className="w-1/3">
                          <Label
                            htmlFor={`feeAmount-${index}`}
                            className="text-xs font-medium text-gray-500 mb-1 block"
                          >
                            Default Amount
                          </Label>
                          <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                              $
                            </span>
                            <Input
                              id={`feeAmount-${index}`}
                              type="number"
                              value={feeType.amount}
                              onChange={(e) =>
                                updateFeeType(
                                  index,
                                  "amount",
                                  parseFloat(e.target.value) || 0
                                )
                              }
                              className="h-10 pl-8 border-gray-200 focus:border-black focus-visible:ring-0 focus-visible:ring-offset-0"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Switch
                          id={`termBased-${index}`}
                          checked={feeType.termBased}
                          onCheckedChange={(checked) =>
                            updateFeeType(index, "termBased", checked)
                          }
                        />
                        <Label
                          htmlFor={`termBased-${index}`}
                          className="text-sm text-gray-600"
                        >
                          This fee is charged every term
                        </Label>
                      </div>
                    </div>

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFeeType(index)}
                      className="text-gray-500 hover:text-red-500 hover:bg-red-50 h-8 w-8"
                    >
                      <MinusCircle className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <Button
              variant="outline"
              onClick={addFeeType}
              className="mt-4 border-dashed hover:bg-gray-100"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Fee Type
            </Button>
          </div>

          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => setActiveTab("terms")}
              className="border-gray-200 hover:bg-gray-50"
            >
              Back to Terms
            </Button>
            <Button
              onClick={() => setActiveTab("class")}
              className="bg-black text-white hover:bg-gray-800"
            >
              Next: Class-wise Fees
            </Button>
          </div>
        </TabsContent>

        {/* Class Fees Tab */}
        <TabsContent value="class" className="space-y-6">
          <div className="bg-gray-50 p-6 rounded-xl">
            <h3 className="text-lg font-semibold mb-4">Class-wise Fee Structure</h3>
            <p className="text-sm text-gray-600 mb-6">
              Customize fees for each class. You can set different amounts based on the class level.
            </p>

            {classes.length === 0 ? (
              <div className="text-center py-10 border border-dashed border-gray-300 rounded-lg">
                <p className="text-gray-500">Please define classes first</p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex space-x-2 mb-2">
                  <Select
                    value={classFees.length > 0 ? classFees[0].className : ""}
                    onValueChange={(value) => {
                      const selectedClassFees = classFees.find(
                        (cf) => cf.className === value
                      );
                      if (selectedClassFees) {
                        // Update UI to show this class's fees
                      }
                    }}
                  >
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Select class" />
                    </SelectTrigger>
                    <SelectContent>
                      {classes.map((className) => (
                        <SelectItem key={className} value={className}>
                          {className}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <div className="flex-1"></div>

                  <Button variant="ghost" className="flex items-center gap-1 text-gray-600 text-sm hover:text-gray-900">
                    <Calculator className="h-4 w-4" />
                    Calculate Total
                  </Button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="text-left p-3 border-y border-gray-200">Fee Type</th>
                        <th className="text-left p-3 border-y border-gray-200">Term Based</th>
                        {classes.map((className) => (
                          <th
                            key={className}
                            className="text-left p-3 border-y border-gray-200 min-w-[150px]"
                          >
                            {className}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {feeTypes.map((feeType, index) => (
                        <tr key={index} className="border-b border-gray-200">
                          <td className="p-3 font-medium">{feeType.name}</td>
                          <td className="p-3">
                            {feeType.termBased ? "Yes" : "No"}
                          </td>
                          {classes.map((className) => {
                            const classFee = classFees.find(
                              (cf) => cf.className === className
                            );
                            const fee = classFee?.fees.find(
                              (f) => f.type === feeType.name
                            );
                            
                            return (
                              <td key={className} className="p-3">
                                <div className="relative">
                                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                                    $
                                  </span>
                                  <Input
                                    type="number"
                                    value={fee?.amount || 0}
                                    onChange={(e) =>
                                      updateClassFee(
                                        className,
                                        feeType.name,
                                        parseFloat(e.target.value) || 0
                                      )
                                    }
                                    className="pl-8 h-10 border-gray-200 focus:border-black focus-visible:ring-0 focus-visible:ring-offset-0"
                                  />
                                </div>
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => setActiveTab("types")}
              className="border-gray-200 hover:bg-gray-50"
            >
              Back to Fee Types
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FeeStructure;
