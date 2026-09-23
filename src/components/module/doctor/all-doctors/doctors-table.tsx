"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { Doctor } from "@/types";
import { Badge } from "@/components/ui/badge";
import Paginations from "@/constants/pagination";
import { useSearchParams } from "next/navigation";
import { useSuspenseGetAllDoctors } from "@/hooks";

const DoctorsTable = () => {
  const searchParams = useSearchParams();
  const params = Object.fromEntries(searchParams.entries());
  const { data } = useSuspenseGetAllDoctors(params);

  const allDoctors = data.data || [];
  console.log(allDoctors);

  if (!data?.success || !data.meta || data.data.length === 0) {
    return <p className="text-center text-red-600">no doctor found</p>;
  }

  return (
    <div className="space-y-4">
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="">No</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Specialization</TableHead>
              <TableHead>Licence No.</TableHead>
              <TableHead>Exprericne (Y)</TableHead>
              <TableHead>Education</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allDoctors.map((doctor, idx: number) => {
              return (
                <TableRow key={idx}>
                  <TableCell className="font-medium">{idx + 1}</TableCell>
                  <TableCell>{doctor.name}</TableCell>
                  <TableCell>{doctor.email}</TableCell>
                  <TableCell>{doctor.specialization}</TableCell>
                  <TableCell>{doctor.licenceNumber}</TableCell>
                  <TableCell>{doctor.experienceYears}</TableCell>
                  <TableCell>{doctor.qualifications}</TableCell>
                  <TableCell>
                    <Badge variant={"secondary"}>
                      {doctor.verificationStatus}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant={"outline"} size={"sm"}>
                      action
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
      <Paginations meta={data.meta} />
    </div>
  );
};

export default DoctorsTable;
