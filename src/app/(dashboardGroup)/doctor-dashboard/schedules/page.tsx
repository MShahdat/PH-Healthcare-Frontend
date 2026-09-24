import ScheduleLists from "@/components/module/doctor/schedules/schedule-lists";
import { Suspense } from "react";

const SchedulePage = () => {
  return (
    <div className="p-4 space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold">My Schedules</h1>
        <p>Create Schedules, publush them for booking or delete drafts</p>
      </div>

      <ScheduleLists />
    </div>
  );
};

export default SchedulePage;
