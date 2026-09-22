"use client";

import { ApprovalSelector } from "@/components/module/doctor/doctor-approval/approval-selector";
import DoctorApprovalTable from "@/components/module/doctor/doctor-approval/approval-table";
import { Card } from "@/components/ui/card";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ItemShow } from "@/constants";
import GenericTableSkeleton from "@/loading/table.loading";
import { SearchIcon } from "lucide-react";
import { Suspense } from "react";
import { useEffect, useState } from "react";

const DoctorApprovalPage = () => {
  const [specialization, setSpecialization] = useState<string | null>(null);
  const [limit, setLimit] = useState<string | null>(null);
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDebouncedSearch(search);
    }, 1000);

    return () => window.clearTimeout(timeoutId);
  }, [search]);

  const params = {
    ...(specialization ? { specialization } : {}),
    ...(limit ? { limit } : {}),
    ...(debouncedSearch ? { search: debouncedSearch } : {}),
    verificationStatus: "PENDING",
  };

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
            <div className="relative max-w-sm">
              <SearchIcon className="pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Field>
                <Input
                  className="pl-8"
                  type="text"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                  placeholder="Searching...."
                />
              </Field>
            </div>
          </div>
          <div className="flex items-center md:gap-4 gap-8">
            <div className="flex items-center gap-1">
              <p>Show</p>
              <ItemShow value={limit} onChange={setLimit} />
            </div>
            <div className="flex items-center gap-1">
              <p>Filter</p>
              <ApprovalSelector
                value={specialization}
                onChange={setSpecialization}
              />
            </div>
          </div>
        </div>
      </Card>

      <div className="-mt-4">
        <Suspense
          fallback={<GenericTableSkeleton columnCount={8} rowCount={8} />}
        >
          <DoctorApprovalTable params={params} />
        </Suspense>
      </div>
    </section>
  );
};

export default DoctorApprovalPage;
