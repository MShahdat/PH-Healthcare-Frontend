"use client";

import { cn } from "cn";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";
import { Textarea } from "../ui/textarea";
import { FileUp, X } from "lucide-react";
import {
  applyDoctorZodSchema,
  isAcceptedFile,
  isAcceptedFileType,
  MAX_ADDITIONAL_FILES,
  MAX_BIO_LENGTH,
  MAX_FILE_SIZE,
} from "@/validation/doctor-validation";
import { formatFileSize } from "@/utils/file-size-format";
import { useDoctorApply } from "@/hooks/doctor.hook";
import { redirect } from "next/dist/client/components/navigation";

export function DoctorApplyForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const { mutate, isPending } = useDoctorApply();

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      specialization: "",
      licenceNumber: "",
      qualifications: "",
      experienceYears: 0,
      consultationFee: 0,
      bio: "",
      resume: null as File | null,
      additionalFiles: [] as File[],
    },
    validators: {
      onSubmit: applyDoctorZodSchema,
    },
    onSubmit: ({ value }) => {
      const data = {
        user: {
          name: value.name.trim(),
          email: value.email.trim(),
        },
        doctor: {
          bio: value.bio.trim(),
          specialization: value.specialization.trim(),
          licenceNumber: value.licenceNumber.trim(),
          qualifications: value.qualifications.trim(),
          experienceYears: Number(value.experienceYears),
          consultationFee: Number(value.consultationFee),
        },
      };
      console.log("data", data);
      mutate(
        {
          data,
          resume: value.resume as File,
          additionalFiles: value.additionalFiles as File[],
        },
        {
          onSuccess: (res) => {
            toast.success(res.message);
            const params = new URLSearchParams({ email: value.email });
            redirect(`/doctor-apply/email-verify?${params.toString()}`);
          },
          onError: (err) => {
            toast.error(err.message);
          },
        },
      );
    },
  });

  return (
    <div className="lg:w-lg">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className={cn("flex flex-col gap-6", className)}
        {...props}
      >
        <FieldGroup>
          <div className="flex flex-col items-center gap-1 text-center">
            <h1 className="text-2xl font-bold">Apply to join PH Healthcare</h1>
            <p className="text-sm text-balance text-muted-foreground">
              Fill in the form below to apply as a doctor
            </p>
          </div>
          <div className="flex items-center justify-between gap-4">
            <form.Field name="name">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor="name">
                      Full Name<span className="text-red-500">*</span>
                    </FieldLabel>
                    <Input
                      id={field.name}
                      type="text"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      autoComplete="off"
                      placeholder={`Dr. John Doe`}
                      // required
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            <form.Field name="email">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor="email">
                      Email<span className="text-red-500">*</span>
                    </FieldLabel>
                    <Input
                      id={field.name}
                      type="email"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      autoComplete="off"
                      placeholder="m@example.com"
                      // required
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>
          </div>

          <div className="flex items-center justify-between gap-4">
            <form.Field name="specialization">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor="specialization">
                      Specialization<span className="text-red-500">*</span>
                    </FieldLabel>
                    <Input
                      id={field.name}
                      type="text"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      autoComplete="off"
                      placeholder="Cardiology (MD)"
                      // required
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            <form.Field name="licenceNumber">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor="licenceNumber">
                      Licence Number<span className="text-red-500">*</span>
                    </FieldLabel>
                    <Input
                      id={field.name}
                      type="text"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      autoComplete="off"
                      placeholder="LSN-10002-BD"
                      // required
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>
          </div>

          <div className="flex items-center justify-between gap-4">
            <form.Field name="consultationFee">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor="consultationFee">
                      Consultation Fee<span className="text-red-500">*</span>
                    </FieldLabel>
                    <Input
                      id={field.name}
                      type="number"
                      min={0}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) =>
                        field.handleChange(Number(e.target.value))
                      }
                      autoComplete="off"
                      placeholder="800"
                      // required
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            <form.Field name="experienceYears">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor="experienceYears">
                      Experience Year
                    </FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="number"
                      min={0}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) =>
                        field.handleChange(Number(e.target.value))
                      }
                      aria-invalid={isInvalid}
                      autoComplete="off"
                      placeholder="8"
                      // required
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>
          </div>

          <div className="flex items-center justify-between gap-4">
            <form.Field name="qualifications">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor="qualifications">
                      Qualification<span className="text-red-500">*</span>
                    </FieldLabel>
                    <Input
                      id={field.name}
                      type="text"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      autoComplete="off"
                      placeholder="MBBS BCS (Health)- DMC"
                      // required
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>
          </div>

          <form.Field name="bio">
            {(field) => {
              return (
                <Field>
                  <FieldLabel htmlFor="bio">Bio</FieldLabel>
                  <Textarea
                    id={field.name}
                    name={field.name}
                    rows={4}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    autoComplete="off"
                    placeholder="Enter your bio"
                  />
                  <span className="text-right text-neutral-500 text-sm">
                    {field.state.value.length}/{MAX_BIO_LENGTH}
                  </span>
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              );
            }}
          </form.Field>

          <form.Field name="resume">
            {(field) => {
              const file = field.state.value;
              return (
                <Field>
                  <FieldLabel htmlFor="resume-field">
                    Resume<span className="text-red-500">*</span>
                  </FieldLabel>
                  <div>
                    <Button
                      variant={"outline"}
                      size={"sm"}
                      render={<label htmlFor="resume-field" />}
                      nativeButton={false}
                    >
                      <FileUp size={4} />
                      Upload resume
                    </Button>
                    {file && (
                      <span className="ml-0 inline-flex items-center gap-2 bg-gray-100 px-2 py-0.5 rounded-md">
                        <span className="text-xs">{file.name}</span>
                        <span className="text-xs">
                          ({formatFileSize(file.size)})
                        </span>
                        <X
                          size={16}
                          className="cursor-pointer text-red-500"
                          onClick={() => field.handleChange(null)}
                        />
                      </span>
                    )}
                    {!file && (
                      <span className="text-xs ml-1.5">
                        PDF, DOC, DOCX, IMAGE Up to {MAX_FILE_SIZE} MB
                      </span>
                    )}
                    <input
                      type="file"
                      id="resume-field"
                      name={field.name}
                      accept=".doc,.docx,.jpg,.jpeg,.png,.pdf"
                      onChange={(e) => {
                        const file = e.target.files?.[0] ?? null;
                        field.handleChange(file);
                        field.handleBlur();
                        e.target.value = "";
                      }}
                      className="sr-only"
                    />
                  </div>
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              );
            }}
          </form.Field>

          <form.Field name="additionalFiles">
            {(field) => {
              const files = field.state.value;
              return (
                <Field>
                  <FieldLabel htmlFor="additional-file-field">
                    Additional Files
                  </FieldLabel>
                  <div>
                    <Button
                      variant={"outline"}
                      size={"sm"}
                      render={<label htmlFor="additional-file-field" />}
                      nativeButton={false}
                    >
                      <FileUp size={4} />
                      Additional Files
                    </Button>
                    {files.length === 0 && (
                      <span className="text-xs ml-1.5">
                        PDF, DOC, DOCX, IMAGE Up to {MAX_FILE_SIZE} MB
                      </span>
                    )}

                    {files.length > 0 && (
                      <span className="text-xs ml-1.5">
                        {files.length} of {MAX_ADDITIONAL_FILES} files
                      </span>
                    )}
                    <input
                      type="file"
                      id="additional-file-field"
                      name={field.name}
                      multiple
                      accept=".doc,.docx,.jpg,.jpeg,.png,.pdf"
                      onChange={(e) => {
                        const incomming = Array.from(e.target.files ?? []);
                        console.log("files", [...files, ...incomming]);

                        if (incomming.length === 0) return;

                        const totalFiles = [...files, ...incomming];
                        if (totalFiles.length > MAX_ADDITIONAL_FILES) {
                          field.handleBlur();
                          return;
                        }

                        field.handleChange(totalFiles);
                        e.target.value = "";
                      }}
                      className="sr-only"
                    />
                  </div>
                  {files && files.length > 0 && (
                    <ul className=" space-y-1">
                      {files.map((file: File, index: number) => (
                        <li key={index} className="flex items-center gap-2">
                          <span className="ml-0 inline-flex items-center gap-2 bg-gray-100 px-2 py-0.5 rounded-md">
                            <span className="text-xs">{file.name}</span>
                            <span className="text-xs">
                              ({formatFileSize(file.size)})
                            </span>
                            <X
                              size={16}
                              className="cursor-pointer text-red-500"
                              onClick={() =>
                                field.handleChange(
                                  files.filter((_, i) => i !== index),
                                )
                              }
                            />
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              );
            }}
          </form.Field>
          <Field>
            <Button disabled={isPending ? true : false} type="submit">
              {isPending ? (
                <>
                  <Spinner /> Creating
                </>
              ) : (
                "Create Account"
              )}
            </Button>
          </Field>

          <Field>
            <FieldDescription className="px-6 text-center">
              Already have an account?{" "}
              <Link href="/login" className="font-semibold">
                Sign in
              </Link>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
}
