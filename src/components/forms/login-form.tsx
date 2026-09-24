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
import { useForm } from "@tanstack/react-form";
import { loginZodSchema } from "@/validation/auth.schema";
import { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";
import Link from "next/link";
import { useLogin } from "@/hooks";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";
import { redirect } from "next/navigation";
import GoogleAuth from "../module/googleAuth/googleAuth";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [showPass, setShowPass] = useState(false);

  const { mutate, isPending } = useLogin();

  const form = useForm({
    defaultValues: {
      // email: "testeradmin@gmail.com",
      // password: "@testerAdmin123",
      email: "shahddat@gmail.com",
      password: "cC3&RdlmbN",
    },
    validators: {
      onSubmit: loginZodSchema,
    },
    onSubmit: ({ value }) => {
      console.log(value);
      const loginData = {
        email: value.email,
        password: value.password,
      };

      mutate(loginData, {
        onSuccess: (res) => {
          // console.log(res)
          toast.success(res.message);
          redirect("/");
        },
        onError: (err) => {
          console.log(err);
          toast.error(err.message);
        },
      });
    },
  });

  return (
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
          <h1 className="text-2xl font-bold">Login to your account</h1>
          <p className="text-sm text-balance text-muted-foreground">
            Enter your email below to login to your account
          </p>
        </div>
        <form.Field name="email">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor="email">Email</FieldLabel>
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
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
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
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </div>
              </Field>
            );
          }}
        </form.Field>
        <Field>
          <Button disabled={isPending ? true : false} type="submit">
            {isPending ? (
              <>
                <Spinner /> Login
              </>
            ) : (
              "Login"
            )}
          </Button>
        </Field>
        <FieldSeparator>Or continue with</FieldSeparator>

        <GoogleAuth />

        <Field>
          <FieldDescription className="">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="underline font-semibold underline-offset-4"
            >
              Sign up
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
  );
}
