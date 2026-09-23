"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSuspenseGetAllDoctors } from "@/hooks";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function ApprovalSelector() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const { data } = useSuspenseGetAllDoctors({});

  const allDoctors = data.data || [];
  const uniqueSpecializations = [
    ...new Set(allDoctors.map((doctor) => doctor.specialization)),
  ];

  const items = [
    { label: "Default", value: null },
    ...uniqueSpecializations.map((specialization) => ({
      label: specialization,
      value: specialization,
    })),
  ];

  const handleChange = (val: string | null) => {
    const params = new URLSearchParams(searchParams.toString());

    if (val === "default" || val === null) {
      params.delete("specialization");
    } else {
      params.set("specialization", val);
    }
    params.delete("page");

    const query = params.toString();

    router.replace(query ? `${pathname}?${query}` : pathname);
  };

  return (
    <Select items={items} onValueChange={handleChange}>
      <SelectTrigger className="w-full max-w-48">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Specialization</SelectLabel>
          {items.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
