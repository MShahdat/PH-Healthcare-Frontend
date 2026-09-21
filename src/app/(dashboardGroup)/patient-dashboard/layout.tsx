import RoleGuard from "@/components/auth/role-guard";
import DashboardShel from "@/components/dashboard/dashboard-shell";
import { ReactNode } from "react";

const PatientLayout = ({ children }: { children: ReactNode }) => {
  return (
    <RoleGuard roles={["PATIENT"]}>
      <DashboardShel role={"PATIENT"}>{children}</DashboardShel>
    </RoleGuard>
  );
};

export default PatientLayout;
