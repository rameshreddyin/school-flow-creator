
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload, UploadCloud } from "lucide-react";
import { SchoolData } from "../OnboardingFlow";

interface SchoolDetailsProps {
  data: SchoolData;
  updateData: (section: keyof SchoolData, data: any) => void;
  setValidity: (isValid: boolean) => void;
}

const SchoolDetails = ({ data, updateData, setValidity }: SchoolDetailsProps) => {
  const [formData, setFormData] = useState(data.schoolDetails);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    // Check form validity
    const requiredFields = ["name", "address", "email", "phone"];
    const isValid = requiredFields.every(field => 
      formData[field as keyof typeof formData]?.trim()
    );
    
    setValidity(isValid);
  }, [formData, setValidity]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Basic validation
    if (!value.trim() && ["name", "address", "email", "phone"].includes(name)) {
      setErrors((prev) => ({ ...prev, [name]: "This field is required" }));
    } else if (name === "email" && value && !/\S+@\S+\.\S+/.test(value)) {
      setErrors((prev) => ({ ...prev, [name]: "Invalid email format" }));
    } else if (name === "phone" && value && !/^\+?[0-9\s-]{10,15}$/.test(value)) {
      setErrors((prev) => ({ ...prev, [name]: "Invalid phone number" }));
    } else {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    
    updateData("schoolDetails", { ...formData, [name]: value });
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newFormData = { ...formData, logo: reader.result as string };
        setFormData(newFormData);
        updateData("schoolDetails", newFormData);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">School Details</h2>
        <p className="text-gray-600 mt-2">
          Let's start by setting up your school's basic information.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-8">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">
              School Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`h-12 rounded-xl border ${
                errors.name ? "border-red-300" : "border-gray-200"
              } focus:border-black focus-visible:ring-0 focus-visible:ring-offset-0`}
              placeholder="Enter school name"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="address" className="text-sm font-medium">
              Address <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className={`min-h-[80px] rounded-xl border ${
                errors.address ? "border-red-300" : "border-gray-200"
              } focus:border-black focus-visible:ring-0 focus-visible:ring-offset-0`}
              placeholder="Enter school address"
            />
            {errors.address && (
              <p className="text-red-500 text-xs mt-1">{errors.address}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className={`h-12 rounded-xl border ${
                  errors.email ? "border-red-300" : "border-gray-200"
                } focus:border-black focus-visible:ring-0 focus-visible:ring-offset-0`}
                placeholder="school@example.com"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-medium">
                Phone <span className="text-red-500">*</span>
              </Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`h-12 rounded-xl border ${
                  errors.phone ? "border-red-300" : "border-gray-200"
                } focus:border-black focus-visible:ring-0 focus-visible:ring-offset-0`}
                placeholder="+1 (123) 456-7890"
              />
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="space-y-2">
            <Label htmlFor="logo" className="text-sm font-medium block">
              School Logo
            </Label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-200 border-dashed rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
              <div className="space-y-2 text-center">
                {formData.logo ? (
                  <div className="flex flex-col items-center gap-4">
                    <img
                      src={formData.logo}
                      alt="School logo preview"
                      className="w-24 h-24 object-contain"
                    />
                    <span className="text-sm text-gray-600">
                      Logo uploaded successfully
                    </span>
                  </div>
                ) : (
                  <>
                    <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md font-medium text-gray-900 hover:text-gray-700 focus-within:outline-none"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          accept="image/*"
                          onChange={handleLogoChange}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="principal" className="text-sm font-medium">
                Principal Name
              </Label>
              <Input
                id="principal"
                name="principal"
                value={formData.principal}
                onChange={handleChange}
                className="h-12 rounded-xl border border-gray-200 focus:border-black focus-visible:ring-0 focus-visible:ring-offset-0"
                placeholder="Principal name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="established" className="text-sm font-medium">
                Established Year
              </Label>
              <Input
                id="established"
                name="established"
                value={formData.established}
                onChange={handleChange}
                className="h-12 rounded-xl border border-gray-200 focus:border-black focus-visible:ring-0 focus-visible:ring-offset-0"
                placeholder="e.g. 1995"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="website" className="text-sm font-medium">
              School Website
            </Label>
            <Input
              id="website"
              name="website"
              value={formData.website}
              onChange={handleChange}
              className="h-12 rounded-xl border border-gray-200 focus:border-black focus-visible:ring-0 focus-visible:ring-offset-0"
              placeholder="https://yourschool.edu"
            />
          </div>
        </div>
      </div>

      <div className="mt-6 text-sm text-gray-500">
        <p>Fields marked with * are required</p>
      </div>
    </div>
  );
};

export default SchoolDetails;
