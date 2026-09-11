"use client";

import React from "react";
import QueryProvider from "./query.provider";
import GoogleAuthProvider from "./google-auth.provider";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <GoogleAuthProvider>
      <QueryProvider>{children}</QueryProvider>
    </GoogleAuthProvider>
  );
};

export default Providers;
