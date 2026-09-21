import { LoaderIcon } from "lucide-react";

const AuthLoading = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="flex gap-2 items-center">
        <LoaderIcon className="size-6 animate-spin" />
        <p>loading...</p>
      </div>
    </div>
  );
};

export default AuthLoading;
