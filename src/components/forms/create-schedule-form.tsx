"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "@tanstack/react-form";
import { cn } from "cn";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import React from "react";
import { format } from "date-fns";
import { useCreateSchedule } from "@/hooks/schedule.hook";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";
import { useState } from "react";

export function CreateScheduleFroms({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [open, setOpen] = useState(false);

  const { mutate: createSchedule, isError, isPending } = useCreateSchedule();

  const form = useForm({
    defaultValues: {
      date: "",
      startDateTime: "",
      endDateTime: "",
      meetLink: "",
    },
    onSubmit: ({ value }) => {
      const data = {
        startDateTime:
          value.startDateTime &&
          new Date(`${value.date}T${value.startDateTime}`).toISOString(),
        endDateTime:
          value.endDateTime &&
          new Date(`${value.date}T${value.endDateTime}`).toISOString(),
        meetLink: value.meetLink,
      };

      // console.log(data)

      createSchedule(data, {
        onSuccess: (res) => {
          toast.success(res.message);
          setOpen(false);
        },
        onError: (err) => {
          toast.error(err.message);
        },
      });
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form
        id="create-schedule-form"
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className={cn("flex flex-col gap-6", className)}
        {...props}
      >
        <DialogTrigger
          render={<Button variant="default">Create Schedule</Button>}
        />
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Create Schedule</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>

          <FieldGroup>
            <form.Field name="date">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                const seleted = field.state.value
                  ? new Date(field.state.value)
                  : undefined;

                // console.log(seleted?.toDateString())
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor="date">Date & Time</FieldLabel>
                    <Popover>
                      <PopoverTrigger
                        render={
                          <Button variant="outline" className="w-fit">
                            {seleted ? seleted.toDateString() : "Select Date"}
                          </Button>
                        }
                      />
                      <PopoverContent className="w-auto p-0" align="center">
                        <Calendar
                          mode="single"
                          selected={seleted}
                          onSelect={(e) => {
                            if (e) {
                              field.handleChange(format(e, "yyyy-MM-dd"));
                              field.handleBlur();
                            }
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>
          </FieldGroup>

          <div className="flex items-center gap-2 justify-between">
            <FieldGroup className="flex-1">
              <form.Field name="startDateTime">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      {/* <FieldLabel htmlFor="startDateTime">Start Time</FieldLabel> */}
                      <Input
                        id={field.name}
                        name={field.name}
                        type="time"
                        value={field.state.value}
                        onChange={(e) => {
                          field.handleChange(e.target.value);
                        }}
                        onBlur={field.handleBlur}
                        className="appearance-none bg-background [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>
            </FieldGroup>
            <FieldGroup className="flex-1">
              <form.Field name="endDateTime">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      {/* <FieldLabel htmlFor="startDateTime">Start Time</FieldLabel> */}
                      <Input
                        id={field.name}
                        name={field.name}
                        type="time"
                        value={field.state.value}
                        onChange={(e) => {
                          field.handleChange(e.target.value);
                        }}
                        onBlur={field.handleBlur}
                        className="appearance-none bg-background [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>
            </FieldGroup>
          </div>

          <form.Field name="meetLink">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor="meetLink">Meet Link</FieldLabel>
                  <Input
                    id={field.name}
                    type="text"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    autoComplete="off"
                    placeholder="https://meetlink.com"
                    required
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          <DialogFooter className="flex">
            <DialogClose
              className={"flex-1"}
              render={<Button variant="outline">Cancel</Button>}
            />

            <Button
              className={"flex-1"}
              type="submit"
              form="create-schedule-form"
            >
              {isPending ? (
                <>
                  <Spinner /> Creating
                </>
              ) : (
                "Create"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
