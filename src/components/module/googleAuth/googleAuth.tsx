import { useGoogle } from "@/hooks";
import { GoogleLogin } from "@react-oauth/google";
import { redirect } from "next/navigation";
import { toast } from "sonner";

const GoogleAuth = () => {
  const { mutate: google } = useGoogle();

  const handleGoogleSuccess = (credentialResponse: { credential?: string }) => {
    const idToken = credentialResponse.credential;
    if (!idToken) {
      toast.error("Goole OAuth Failed!");
      return;
    }
    google(
      { idToken },
      {
        onSuccess: () => {
          toast.success("Google OAuth Successfully");
          redirect("/");
        },
        onError: (err) => {
          toast.error(err.message || "Google OAuth Failed");
        },
      },
    );
  };

  const handleGoogleError = () => {
    toast.error("Google OAuth Failed!");
  };

  return (
    <GoogleLogin
      shape="pill"
      text="continue_with"
      size="medium"
      onSuccess={handleGoogleSuccess}
      onError={handleGoogleError}
    ></GoogleLogin>
  );
};

export default GoogleAuth;
