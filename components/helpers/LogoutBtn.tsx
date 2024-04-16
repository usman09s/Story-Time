"use client";
import { useAuth } from "@/store/AuthProvider";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Cookies from "js-cookie";

export const LogoutBtn = () => {
  const router = useRouter();
  const { setUser } = useAuth();
  const handleLogout = async () => {

    setUser(undefined);
    localStorage.removeItem("access-token");
    Cookies.remove("session");
    toast.success("Logged out successfully");
    router.push("/dashboard");
  };
  return (
    <div className="space-y-3">
      <button
        onClick={handleLogout}
        className="py-3 flex transform items-center r px-3 ml-4 rounded-l-3xl text-white transition-colors duration-300 "
      >
        <LogOut className="size-6 " />
        <span className={`mx-2 text-lg text-white font-medium`}>Logout</span>
      </button>
    </div>
  );
};
