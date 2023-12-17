import { setAccessToken } from "@/common/helpers/HttpKit";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";

export default function AuthGuardHoc({ children }) {
  const router = useRouter();
  const { data: session, status } = useSession();
  console.log({ session, status });

  if (status === "loading") {
    return "Loading...";
  }

  if (status === "unauthenticated") {
    redirect("/login");
    return null; // Add return null to prevent rendering children when redirecting
  }

  if (status === "authenticated") {
    console.log("called auth");
    setAccessToken(session.accessToken);
  }

  return children;
}
