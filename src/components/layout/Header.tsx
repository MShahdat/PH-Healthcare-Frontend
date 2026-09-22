"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import Logo from "@/assets/logo";
import { useGetMe, useLogout } from "@/hooks";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import type { UserRole } from "@/types";

const Header = () => {
  const { data, isError, isPending } = useGetMe();
  // console.log({
  //   data,
  //   isError,
  //   isLoading
  // })

  const role = data?.data.role as UserRole | undefined;
  const dashboardUrl = role
    ? {
        SUPER_ADMIN: "/admin-dashboard",
        ADMIN: "/admin-dashboard",
        DOCTOR: "/doctor-dashboard",
        PATIENT: "/patient-dashboard",
      }[role]
    : undefined;

  const route = [
    { name: "Home", url: "/" },
    { name: "About Us", url: "/about-us" },
    ...(dashboardUrl ? [{ name: "Dashboard", url: dashboardUrl }] : []),
    { name: "Contact", url: "/contact" },
  ];

  const { mutate } = useLogout();
  const queryClient = useQueryClient();

  const handleLogout = () => {
    mutate(undefined, {
      onSuccess: (res) => {
        toast.success(res.message);
        queryClient.removeQueries({
          queryKey: ["user"],
        });
        redirect("/login");
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });
  };

  if (isPending) {
    return <p className="h-16 text-center ">loading...</p>;
  }

  return (
    <header className="w-full px-4 border h-16">
      <div className="flex items-center justify-between h-full max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <Logo />
          <div>PH Healthcare</div>
        </div>

        <div className="flex items-center gap-6">
          {route.map((item) => (
            <Link key={item.url} href={item.url}>
              {" "}
              {item.name}
            </Link>
          ))}
        </div>
        <div>
          {!isPending && data && (
            <Button onClick={() => handleLogout()} variant={"destructive"}>
              Logout
            </Button>
          )}
          {!isPending && !data && (
            <Button
              variant={"outline"}
              render={<Link href={"/login"}>Login</Link>}
              nativeButton={false}
            >
              Login
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
