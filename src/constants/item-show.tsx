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
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const items = [
  { label: "Default", value: null },
  { label: "2", value: "2" },
  { label: "4", value: "4" },
  { label: "6", value: "6" },
];

export function ItemShow() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === "default" || value === null) {
      params.delete("limit");
    } else {
      params.set("limit", value);
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
          <SelectLabel>Item Show</SelectLabel>
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
