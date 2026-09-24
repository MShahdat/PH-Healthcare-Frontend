"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const items = [
  { label: "All", value: "ALL" },
  { label: "Published", value: "PUBLISHED" },
  { label: "Draft", value: "DRAFT" },
];

export function ScheduleStatusTabs() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const activeTab = searchParams.get("status") || "ALL";

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    // console.log(value)
    if (value === "ALL") {
      params.delete("status");
    } else {
      params.set("status", value);
    }
    params.delete("page");
    const query = params.toString();

    router.replace(query ? `${pathname}?${query}` : pathname);
  };

  return (
    <Tabs value={activeTab} onValueChange={handleChange}>
      <TabsList>
        {items.map((item) => (
          <TabsTrigger key={item.value} value={item.value}>
            {item.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
