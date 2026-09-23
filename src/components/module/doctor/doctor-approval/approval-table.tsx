"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAllDoctors, useSuspenseGetAllDoctors } from "@/hooks";
import { QueryParams } from "@/types";
import { ApprovalModal } from "./approval-modal";
import GenericTableSkeleton from "@/loading/table.loading";

const DoctorApprovalTable = ({ params }: { params: QueryParams }) => {
  // const { data } = useSuspenseGetAllDoctors(params);

  const { data, isError, isPending } = useAllDoctors(params);

  const allDoctors = data?.data || [];
  // console.log('all', allDoctors)

  if (isPending) {
    return <GenericTableSkeleton columnCount={8} rowCount={6} />;
  }

  if (allDoctors.length === 0) {
    return <p className="text-center text-red-600">no pending doctor found</p>;
  }

  return (
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
            {/* <TableHead>Status</TableHead> */}
            <TableHead className="text-right">Review</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allDoctors.map((doctor, idx: number) => {
            const status = doctor.verificationStatus.toLowerCase();
            return (
              <TableRow key={idx}>
                <TableCell className="font-medium">{idx + 1}</TableCell>
                <TableCell>{doctor.name}</TableCell>
                <TableCell>{doctor.email}</TableCell>
                <TableCell>{doctor.specialization}</TableCell>
                <TableCell>{doctor.licenceNumber}</TableCell>
                <TableCell>{doctor.experienceYears}</TableCell>
                <TableCell>{doctor.qualifications}</TableCell>
                <TableCell className="text-right">
                  <ApprovalModal doctor={doctor} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default DoctorApprovalTable;
