"use client";

import { useGetMe } from "@/hooks";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import AuthLoading from "./auth-loading";

const AuthGuard = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  const { data, isError, isPending } = useGetMe();
  console.log(data);

  const user = data?.data;
  useEffect(() => {
    if (isPending) {
      return;
    }
    if (isError || !user) {
      router.replace("/login");
    }
  }, [data, isPending, isError]);

  if (isPending) {
    return <AuthLoading />;
  }

  return <>{children}</>;
};

export default AuthGuard;
