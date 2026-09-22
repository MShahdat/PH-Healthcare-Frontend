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

export function ApprovalSelector({
  value,
  onChange,
}: {
  value: string | null;
  onChange: (value: string | null) => void;
}) {
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

  return (
    <Select items={items} value={value} onValueChange={onChange}>
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
