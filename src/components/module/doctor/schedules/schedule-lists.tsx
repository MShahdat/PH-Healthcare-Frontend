"use client";

import { Card } from "@/components/ui/card";
import { ScheduleStatusTabs } from "./status-tabs";
import { Button } from "@/components/ui/button";
import { useGetMySchedules } from "@/hooks/schedule.hook";
import { QueryParams } from "@/types";
import { useSearchParams } from "next/navigation";
import SearchBar from "@/constants/search-bar";
import { ItemShow } from "@/constants";
import { CreateScheduleFroms } from "@/components/forms/create-schedule-form";

const ScheduleLists = () => {
  const searchParams = useSearchParams();

  const params = Object.fromEntries(searchParams.entries());

  // console.log(params)
  const { data } = useGetMySchedules(params);

  const schedules = data.data || [];

  // console.log('my schedules', data)

  return (
    <>
      <Card>
        <div className=" px-4 flex flex-col md:flex-row justify-between items-center space-y-3">
          <div className="flex flex-wrap gap-4">
            <ScheduleStatusTabs />
            <SearchBar />
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-1.5">
              Show
              <ItemShow />
            </div>
            <CreateScheduleFroms />
          </div>
        </div>
      </Card>
      <div>
        {schedules.length > 0 ? (
          <>
            {schedules.map((item: any, idx: number) => (
              <p key={idx}>{item.status}</p>
            ))}
          </>
        ) : (
          <p>not found</p>
        )}
      </div>
    </>
  );
};

export default ScheduleLists;
