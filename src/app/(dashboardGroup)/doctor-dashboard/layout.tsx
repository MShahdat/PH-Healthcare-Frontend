import RoleGuard from "@/components/auth/role-guard";
import DashboardShel from "@/components/dashboard/dashboard-shell";
import { ReactNode } from "react";

const DoctorLayout = ({ children }: { children: ReactNode }) => {
  return (
    <RoleGuard roles={["DOCTOR"]}>
      <DashboardShel role={"DOCTOR"}>{children}</DashboardShel>
    </RoleGuard>
  );
};

export default DoctorLayout;
