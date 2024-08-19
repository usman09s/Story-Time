import { useRouter } from "next/navigation";
import { useAuth } from "@/store/AuthProvider";
import { LogOut } from "lucide-react";
import { toast } from "sonner";
import Cookies from "js-cookie";

export const LogoutBtn = () => {
  const router = useRouter();
  const { setUser } = useAuth();

  const handleLogout = async () => {
    setUser(undefined); // Clear the user from context or state management
    localStorage.removeItem("access-token"); // Remove access token from local storage
    Cookies.remove("session"); // Remove session cookie
    toast.success("Logged out successfully");
    router.refresh()
  };

  return (
    <div className="space-y-3">
      <button
        onClick={handleLogout}
        className="py-3 flex transform items-center px-3 ml-4 rounded-l-3xl text-white transition-colors duration-300"
      >
        <LogOut className="size-6" />
        <span className={`mx-2 text-lg text-white font-medium`}>Logout</span>
      </button>
    </div>
  );
};
