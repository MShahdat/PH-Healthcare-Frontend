"use client";

import DoctorsTable from "@/components/module/doctor/all-doctors/doctors-table";
import { Card } from "@/components/ui/card";
import { ItemShow, Sort } from "@/constants";
import Paginations from "@/constants/pagination";
import SearchBar from "@/constants/search-bar";
import GenericTableSkeleton from "@/loading/table.loading";
import { Suspense } from "react";
import { DoctorsFilter } from "./doctor-filters";

const AllDoctorsPage = () => {
  return (
    <section className="p-4 space-y-4">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold">Verified Doctors Lists</h2>
        <p className="max-w-4xl text-center mx-auto">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur
          consequuntur neque cum quibusdam animi obcaecati rerum unde dolor
          impedit doloribus?
        </p>
      </div>
      <Card>
        <div className="px-4 sm:flex items-center justify-between space-y-4">
          <div className="">
            <SearchBar />
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <DoctorsFilter />
            </div>
            <div className="flex items-center gap-1">
              <p>Show</p>
              <ItemShow />
            </div>
          </div>
        </div>
      </Card>
      <Suspense
        fallback={<GenericTableSkeleton columnCount={8} rowCount={8} />}
      >
        <DoctorsTable />
      </Suspense>
    </section>
  );
};

export default AllDoctorsPage;
