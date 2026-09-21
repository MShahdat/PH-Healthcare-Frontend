import RoleGuard from "@/components/auth/role-guard";
import DashboardShel from "@/components/dashboard/dashboard-shell";
import { ReactNode } from "react";

const AdminLayout = ({ children }: { children: ReactNode }) => {
  return (
    <RoleGuard roles={["ADMIN", "SUPER_ADMIN"]}>
      <DashboardShel role={"ADMIN"}>{children}</DashboardShel>
    </RoleGuard>
  );
};

export default AdminLayout;
