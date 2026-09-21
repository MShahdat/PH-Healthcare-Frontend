"use client";

import { cn } from "cn";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useForm } from "@tanstack/react-form";
import { registerZodSchema } from "@/validation/auth.schema";
import { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";
import GoogleAuth from "../module/googleAuth/googleAuth";
import { useRegister } from "@/hooks";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import { Spinner } from "../ui/spinner";

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [showPass, setShowPass] = useState(false);
  const { mutate, isPending } = useRegister();

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "@Pa123456",
      confirmPassword: "@Pa123456",
    },
    validators: {
      onSubmit: registerZodSchema,
    },
    onSubmit: ({ value }) => {
      // console.log(value);
      const data = {
        name: value.name,
        email: value.email,
        password: value.password,
      };

      mutate(data, {
        onSuccess: (res) => {
          toast.success(res.message);
          const params = new URLSearchParams({ email: value.email });
          redirect(`/register/email-verify?${params.toString()}`);
        },
        onError: (err) => {
          console.log(err);
          toast.error(err.message);
        },
      });
    },
  });

  return (
    <>
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
            <h1 className="text-2xl font-bold">Create your account</h1>
            <p className="text-sm text-balance text-muted-foreground">
              Fill in the form below to create your account
            </p>
          </div>
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
                    placeholder="John Doe"
                    required
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
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
                    required
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>
          <form.Field name="password">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <div className="flex items-center">
                    <FieldLabel htmlFor="password">
                      Password<span className="text-red-500">*</span>
                    </FieldLabel>
                  </div>
                  <div>
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setShowPass(!showPass)}
                        className="absolute top-1/2 right-4 -translate-y-1/2"
                      >
                        {!showPass ? (
                          <EyeClosed className="size-4" />
                        ) : (
                          <Eye className="size-4" />
                        )}
                      </button>
                      <Input
                        id={field.name}
                        type={!showPass ? "password" : "text"}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        autoComplete="off"
                        required
                      />
                    </div>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </div>
                </Field>
              );
            }}
          </form.Field>
          <form.Field name="confirmPassword">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <div className="flex items-center">
                    <FieldLabel htmlFor="password">
                      Confirm Password<span className="text-red-500">*</span>
                    </FieldLabel>
                  </div>
                  <div>
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setShowPass(!showPass)}
                        className="absolute top-1/2 right-4 -translate-y-1/2"
                      >
                        {!showPass ? (
                          <EyeClosed className="size-4" />
                        ) : (
                          <Eye className="size-4" />
                        )}
                      </button>
                      <Input
                        id={field.name}
                        type={!showPass ? "password" : "text"}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        autoComplete="off"
                        required
                      />
                    </div>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </div>
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
          <FieldSeparator>Or continue with</FieldSeparator>
          <GoogleAuth />
          <Field>
            <FieldDescription className="">
              Already have an account?{" "}
              <Link href="/login" className="font-semibold">
                Sign in
              </Link>{" "}
              Apply as a doctor?{" "}
              <Link
                href="/doctor-apply"
                className="underline font-semibold underline-offset-4"
              >
                Apply here
              </Link>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </form>
    </>
  );
}
