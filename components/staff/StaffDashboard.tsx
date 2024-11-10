"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";
import { toast } from "sonner";
import StaffStats from "./StaffStats";
import TaskList from "./TaskList";
import AttendanceHistory from "./AttendanceHistory";
import LoadingIndicator from "@/components/ui/LoadingIndicator";

interface StaffMember {
  id: string;
  name: string;
  avatar: string;
  role: string;
}

export default function StaffDashboard() {
  const [currentStaff, setCurrentStaff] = useState<StaffMember | null>(null);
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState<Date | null>(null);

  useEffect(() => {
    // Simulating fetching current staff data
    setTimeout(() => {
      setCurrentStaff({
        id: "1",
        name: "John Doe",
        avatar: "/avatars/john-doe.png",
        role: "Software Engineer",
      });
    }, 2000); // Simulate a 2-second loading time
  }, []);

  const handleCheckInOut = () => {
    if (isCheckedIn) {
      // Handle check-out logic here
      setIsCheckedIn(false);
      setCheckInTime(null);
      toast.success("You have successfully checked out.", {
        description: "Have a great day!",
      });
    } else {
      // Handle check-in logic here
      setIsCheckedIn(true);
      const now = new Date();
      setCheckInTime(now);
      toast.success("You have successfully checked in.", {
        description: `Check-in time: ${now.toLocaleTimeString()}`,
      });
    }
  };

  if (!currentStaff) return <LoadingIndicator />;

  return (
    <div className="mx-auto space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"></CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{currentStaff.role}</p>
          <div className="mt-4 flex items-center space-x-4">
            <Button
              onClick={handleCheckInOut}
              className={`flex items-center space-x-2 ${
                isCheckedIn ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
              } text-white py-2 px-4 rounded`}
            >
              <Clock className="h-4 w-4" />
              <span>{isCheckedIn ? "Check Out" : "Check In"}</span>
            </Button>
            {isCheckedIn && checkInTime && (
              <p className="text-sm text-muted-foreground">
                Checked in at: {checkInTime.toLocaleTimeString()}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      <StaffStats />
      <div className="grid gap-6 md:grid-cols-2">
        <TaskList />
        <AttendanceHistory />
      </div>
    </div>
  );
}