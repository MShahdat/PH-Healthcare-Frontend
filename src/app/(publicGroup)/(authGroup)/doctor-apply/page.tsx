import Logo from "@/assets/logo";
import { DoctorApplyForm } from "@/components/forms/doctor-apply-form";
import { LoginForm } from "@/components/forms/login-form";
import Link from "next/link";

export default function doctorApplyPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-5">
      <div className="bg-red-00 flex flex-col  gap-4 p-6 md:p-10 col-span-3">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/" className="flex items-center gap-2 font-medium">
            <Logo />
            PH Healthcare
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-md">
            <DoctorApplyForm />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block col-span-2">
        <img
          src={"/login.jpg"}
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
