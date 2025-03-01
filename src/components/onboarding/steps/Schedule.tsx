
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { SchoolData } from "../OnboardingFlow";
import { Clock, Plus, MinusCircle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface ScheduleProps {
  data: SchoolData;
  updateData: (section: keyof SchoolData, data: any) => void;
  setValidity: (isValid: boolean) => void;
}

const Schedule = ({ data, updateData, setValidity }: ScheduleProps) => {
  const [schedule, setSchedule] = useState(data.schedule);
  const classes = data.classStructure.classes.map((cls) => cls.name);

  useEffect(() => {
    const isValid = 
      schedule.startTime.trim() !== "" &&
      schedule.endTime.trim() !== "" &&
      schedule.classDuration > 0;
    
    setValidity(isValid);
    
    updateData("schedule", schedule);
  }, [schedule, setValidity, updateData]);

  const handleChange = (field: string, value: string | number) => {
    setSchedule((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const addCustomSchedule = () => {
    if (classes.length === 0) return;
    
    const existingClasses = schedule.customSchedules.map((cs) => cs.className);
    const availableClasses = classes.filter(
      (className) => !existingClasses.includes(className)
    );
    
    if (availableClasses.length === 0) return;
    
    setSchedule((prev) => ({
      ...prev,
      customSchedules: [
        ...prev.customSchedules,
        {
          className: availableClasses[0],
          schedule: {
            startTime: prev.startTime,
            endTime: prev.endTime,
          },
        },
      ],
    }));
  };

  const removeCustomSchedule = (index: number) => {
    setSchedule((prev) => ({
      ...prev,
      customSchedules: prev.customSchedules.filter((_, i) => i !== index),
    }));
  };

  const updateCustomSchedule = (
    index: number,
    field: string,
    value: string
  ) => {
    setSchedule((prev) => ({
      ...prev,
      customSchedules: prev.customSchedules.map((cs, i) =>
        i === index
          ? {
              ...cs,
              schedule: {
                ...cs.schedule,
                [field]: value,
              },
            }
          : cs
      ),
    }));
  };

  const updateCustomScheduleClass = (index: number, className: string) => {
    setSchedule((prev) => ({
      ...prev,
      customSchedules: prev.customSchedules.map((cs, i) =>
        i === index
          ? {
              ...cs,
              className,
            }
          : cs
      ),
    }));
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">School Schedule</h2>
        <p className="text-gray-600 mt-2">
          Define your school's operating hours and class timings.
        </p>
      </div>

      <div className="space-y-10">
        {/* Main School Timings */}
        <div className="bg-gray-50 p-6 rounded-xl">
          <h3 className="text-lg font-semibold mb-6 flex items-center">
            <Clock className="mr-2 h-5 w-5 text-gray-700" />
            School Hours
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="startTime" className="text-sm font-medium">
                School Start Time
              </Label>
              <Input
                id="startTime"
                type="time"
                value={schedule.startTime}
                onChange={(e) => handleChange("startTime", e.target.value)}
                className="h-12 border-gray-200 focus:border-black focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="endTime" className="text-sm font-medium">
                School End Time
              </Label>
              <Input
                id="endTime"
                type="time"
                value={schedule.endTime}
                onChange={(e) => handleChange("endTime", e.target.value)}
                className="h-12 border-gray-200 focus:border-black focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="classDuration"
                className="text-sm font-medium"
              >
                Default Class Duration (minutes)
              </Label>
              <Input
                id="classDuration"
                type="number"
                min="1"
                value={schedule.classDuration}
                onChange={(e) =>
                  handleChange("classDuration", parseInt(e.target.value) || 30)
                }
                className="h-12 border-gray-200 focus:border-black focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>
          </div>
        </div>

        {/* Breaks */}
        <div className="bg-gray-50 p-6 rounded-xl">
          <h3 className="text-lg font-semibold mb-6">Breaks & Recess</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="breakTime" className="text-sm font-medium">
                Morning Break Time
              </Label>
              <Input
                id="breakTime"
                type="time"
                value={schedule.breakTime}
                onChange={(e) => handleChange("breakTime", e.target.value)}
                className="h-12 border-gray-200 focus:border-black focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="breakDuration"
                className="text-sm font-medium"
              >
                Break Duration (minutes)
              </Label>
              <Input
                id="breakDuration"
                type="number"
                min="0"
                value={schedule.breakDuration}
                onChange={(e) =>
                  handleChange("breakDuration", e.target.value)
                }
                className="h-12 border-gray-200 focus:border-black focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lunchTime" className="text-sm font-medium">
                Lunch Time
              </Label>
              <Input
                id="lunchTime"
                type="time"
                value={schedule.lunchTime}
                onChange={(e) => handleChange("lunchTime", e.target.value)}
                className="h-12 border-gray-200 focus:border-black focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="lunchDuration"
                className="text-sm font-medium"
              >
                Lunch Duration (minutes)
              </Label>
              <Input
                id="lunchDuration"
                type="number"
                min="0"
                value={schedule.lunchDuration}
                onChange={(e) =>
                  handleChange("lunchDuration", e.target.value)
                }
                className="h-12 border-gray-200 focus:border-black focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>
          </div>
        </div>

        {/* Custom Class Schedules */}
        <div className="bg-gray-50 p-6 rounded-xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold">Custom Class Schedules</h3>
            <Button
              variant="outline"
              onClick={addCustomSchedule}
              disabled={
                classes.length === 0 ||
                schedule.customSchedules.length >= classes.length
              }
              className="text-sm border-gray-300 hover:bg-gray-100"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Custom Schedule
            </Button>
          </div>

          {schedule.customSchedules.length === 0 ? (
            <div className="text-center py-10 border border-dashed border-gray-300 rounded-lg">
              <p className="text-gray-500">
                No custom schedules defined. Add a custom schedule for specific classes.
              </p>
            </div>
          ) : (
            <Accordion type="single" collapsible className="space-y-4">
              {schedule.customSchedules.map((customSchedule, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border border-gray-200 rounded-lg overflow-hidden shadow-sm bg-white"
                >
                  <AccordionTrigger className="px-5 py-3 text-left hover:no-underline text-gray-900 hover:bg-gray-50">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">
                        {customSchedule.className || "Select a class"}
                      </span>
                      <span className="text-xs text-gray-500">
                        ({customSchedule.schedule.startTime} - {customSchedule.schedule.endTime})
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-5 py-4 border-t border-gray-100">
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label className="text-sm font-medium">Class</Label>
                          <Select
                            value={customSchedule.className}
                            onValueChange={(value) =>
                              updateCustomScheduleClass(index, value)
                            }
                          >
                            <SelectTrigger className="h-10 border-gray-200 focus:border-black focus-visible:ring-0 focus-visible:ring-offset-0">
                              <SelectValue placeholder="Select class" />
                            </SelectTrigger>
                            <SelectContent>
                              {classes.map((className) => (
                                <SelectItem
                                  key={className}
                                  value={className}
                                  disabled={schedule.customSchedules
                                    .filter((_, i) => i !== index)
                                    .some((cs) => cs.className === className)}
                                >
                                  {className}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label className="text-sm font-medium">
                            Start Time
                          </Label>
                          <Input
                            type="time"
                            value={customSchedule.schedule.startTime}
                            onChange={(e) =>
                              updateCustomSchedule(
                                index,
                                "startTime",
                                e.target.value
                              )
                            }
                            className="h-10 border-gray-200 focus:border-black focus-visible:ring-0 focus-visible:ring-offset-0"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label className="text-sm font-medium">
                            End Time
                          </Label>
                          <Input
                            type="time"
                            value={customSchedule.schedule.endTime}
                            onChange={(e) =>
                              updateCustomSchedule(
                                index,
                                "endTime",
                                e.target.value
                              )
                            }
                            className="h-10 border-gray-200 focus:border-black focus-visible:ring-0 focus-visible:ring-offset-0"
                          />
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeCustomSchedule(index)}
                          className="text-gray-500 hover:text-red-500 hover:bg-red-50"
                        >
                          <MinusCircle className="mr-2 h-4 w-4" />
                          Remove
                        </Button>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </div>
      </div>
    </div>
  );
};

export default Schedule;
