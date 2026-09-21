import * as React from "react";
import { ChevronRight } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Logo from "@/assets/logo";
import Link from "next/link";
import { SidebarRoutes, UserRole } from "@/types";
import { adminRoute } from "@/route/admin.route";
import { doctorRoute } from "@/route/doctor.route";
import { patientRoute } from "@/route/patient.route";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: `#`,
      items: [
        {
          title: "Overview",
          url: `#`,
          isActive: true,
        },
      ],
    },
    {
      title: "Doctor",
      url: "#",
      items: [
        {
          title: "Doctor Aproval",
          url: "#",
        },
        {
          title: "Dotors",
          url: "#",
        },
      ],
    },
    {
      title: "Patient",
      url: "#",
      items: [
        {
          title: "Patients",
          url: "#",
        },
      ],
    },
  ],
};

const sidebarRoutes: Partial<Record<UserRole, SidebarRoutes>> = {
  SUPER_ADMIN: adminRoute,
  ADMIN: adminRoute,
  DOCTOR: doctorRoute,
  PATIENT: patientRoute,
};

export function DashboardSidebar({ role }: { role: UserRole }) {
  const routes: SidebarRoutes = sidebarRoutes[role] || [];

  return (
    <Sidebar>
      <SidebarHeader>
        <Link href="/" className="flex items-center gap-2 font-medium">
          <Logo />
          PH Healthcare
        </Link>
      </SidebarHeader>
      <SidebarContent className="gap-0">
        {routes?.map((item) => (
          <Collapsible
            key={item.title}
            title={item.title}
            defaultOpen
            className="group/collapsible"
          >
            <SidebarGroup>
              <SidebarGroupLabel className="p-0 text-sm text-sidebar-foreground">
                <CollapsibleTrigger className="flex w-full items-center rounded-md px-2 py-1.5 text-left outline-none transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 focus-visible:ring-sidebar-ring">
                  <span>{item.title}</span>
                  <ChevronRight
                    aria-hidden="true"
                    className="ml-auto size-4 shrink-0 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
                  />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {item.items?.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton>
                          <Link href={item.url}>{item.title}</Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
