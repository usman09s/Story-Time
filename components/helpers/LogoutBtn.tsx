"use client"
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const LogoutBtn = () => {
  const router = useRouter();

  const handleLogout = async () => {
    localStorage.removeItem("token");
    // Cookies.remove("session");
    toast.success("Logged out successfully");
    // router.push("/");
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
