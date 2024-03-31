"use client";
import Image from "next/image";
import Link from "next/link";
import { AdminProfile } from "@/components/AdminProfile";
import { navLinks } from "@/types/data";
import { LogoutBtn } from "@/components/helpers/LogoutBtn";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "@/API/auth.api";
import { useEffect } from "react";
import { useAuth } from "@/store/AuthProvider";

export default function DashboardLayout({
  active,
  children,
}: {
  children?: React.ReactNode;
  active?: number;
}) {
  const { user, setUser } = useAuth();
  // Fetching current User
  const { data, isLoading } = useQuery({
    queryKey: ["current-user"],
    queryFn: () => getCurrentUser(),
    initialData: user ? { success: true, response: user } : undefined,
  });

  useEffect(() => {
    if (!isLoading && data && data.success && data.response) {
      setUser(data.response);
    }
  }, [data]);

  return (
    <>
      <aside className="fixed min-h-screen w-64 flex-col overflow-y-auto  py-8 z-10 bg-[#395E66] ">
        <div className="flex items-center space-x-2 px-5">
          <Image
            src="/assets/logo2.svg"
            alt="Story Time"
            width={200}
            height={20}
          />
        </div>

        <div className="mt-6 flex flex-1 flex-col justify-between ">
          <nav className="space-y-6">
            {navLinks.map((item) => (
              <div className="space-y-3 " key={item.id}>
                <Link
                  className={`py-3 flex transform items-center r px-3 ml-4 rounded-l-3xl text-white transition-colors duration-300  ${
                    active == item.id ? "bg-[#427682]" : null
                  }`}
                  href={item.path}
                >
                  <Image
                    src={item.Logo}
                    alt="Icon"
                    width={20}
                    height={20}
                    className="fill-red-700"
                    style={{ fill: "red", color: "red" }}
                  />{" "}
                  <span className={`mx-2 text-lg font-medium`}>
                    {item.category}
                  </span>
                </Link>
              </div>
            ))}
            <LogoutBtn />
          </nav>
        </div>
      </aside>

      {/* Add the main content here */}
      <div className=" overflow-x-hidden overflow-y-auto ">
        {/* Your main content goes here */}
        <nav className="relative  items-center flex justify-end  gap-7 px-9 pt-9  mr-1 pb-2">
          <Image src={"/assets/bell.png"} alt="Icon" width={30} height={20} />

          <AdminProfile />
        </nav>
        <div className="flex-1 overflow-x-hidden overflow-y-auto ml-64 bg-backGroundColor  ">
          {children}
        </div>
      </div>
    </>
  );
}
