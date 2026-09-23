"use client";

import { ApprovalSelector } from "@/components/module/doctor/doctor-approval/approval-selector";
import DoctorApprovalTable from "@/components/module/doctor/doctor-approval/approval-table";
import { Card } from "@/components/ui/card";
import { ItemShow } from "@/constants";

import { useSuspenseGetAllDoctors } from "@/hooks";
import GenericTableSkeleton from "@/loading/table.loading";
import { Suspense, useState } from "react";
import Paginations from "@/constants/pagination";
import SearchBar from "@/constants/search-bar";
import { useSearchParams } from "next/navigation";

const DoctorApprovalPage = () => {
  return (
    <section className="p-4 space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold">Doctor approval</h2>
        <p className="max-w-4xl text-center mx-auto">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur
          consequuntur neque cum quibusdam animi obcaecati rerum unde dolor
          impedit doloribus?
        </p>
      </div>

      <Card>
        <div className="px-4 md:flex items-center justify-between space-y-4">
          <div className=" flex items-center gap-2 md:gap-3">
            <h1 className="text-lg md:text-xl lg:text-2xl font-semibold">
              Pending Doctors
            </h1>
            <SearchBar />
          </div>
          <div className="flex items-center md:gap-4 gap-8">
            <div className="flex items-center gap-1">
              <p>Show</p>
              <ItemShow />
            </div>
            <div className="flex items-center gap-1">
              <p>Filter</p>
              <ApprovalSelector />
            </div>
          </div>
        </div>
      </Card>

      <div className="-mt-4">
        <Suspense
          fallback={<GenericTableSkeleton columnCount={8} rowCount={8} />}
        >
          <DoctorApprovalTable />
        </Suspense>
      </div>
    </section>
  );
};

export default DoctorApprovalPage;
