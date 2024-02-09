import Image from "next/image";
import Logo1 from "@/public/assets/logo2.svg";

import Link from "next/link";
import { AdminProfile } from "@/components/AdminProfile";

export default function DashboardLayout({
    active,
  children,
}: {
  children?: React.ReactNode;
  active?:number
}) {
    const AllLinks = [
        {
          Logo: "/assets/dashboard.svg",
          category: "Dashboard  &  Users",
          id: 1,
          path: "/dashboard",
        },
        {
          Logo: '/assets/Star.svg',
          category: "Categories",
          id: 2,
          path: "/categories",
        },
        {
          Logo: "/assets/notification.svg",
          category: "Push Notification",
          id: 3,
          path: "/push-notification",
        },
        {
          Logo: '/assets/mail.svg',
          category: "Support",
          id: 4,
          path: "/support",
        },
        {
          Logo: '/assets/questionMark.svg',
          category: "Guideline",
          id: 5,
          path: "/guideline",
        },
        {
          Logo: '/assets/logout.svg',
          category: "Logout",
          id: 6,
          path: "/",
        },
      ];
  return (
    <>
      <aside className="fixed min-h-screen w-64 flex-col overflow-y-auto  py-8 z-10 bg-[#395E66] ">
        <div className="flex items-center space-x-2 px-5">
          <Image src={Logo1} alt="" width={200} height={20} />
        </div>

        <div className="mt-6 flex flex-1 flex-col justify-between ">
          <nav className="space-y-6">
            {AllLinks.map((item) => (
              <div className="space-y-3 " key={item.id}>
                <Link
                  className={` py-3 flex transform items-center r px-3 ml-4 rounded-l-3xl py-2 text-white transition-colors duration-300  ${active == item.id ? 'bg-[#427682]' : null}`}
                  href={item.path}
                >
                  <Image
                    src={item.Logo}
                    alt="Icon"
                    width={20}
                    height={20}
                    className="fill-red-700"
                    style={{ fill: 'red', color: 'red' }}
                  />{" "}
                  <span className={`mx-2 text-lg font-medium`}>
                    {item.category}
                  </span>
                </Link>
              </div>
            ))}
          </nav>
        </div>
      </aside>

      {/* Add the main content here */}
      <div className=" overflow-x-hidden overflow-y-auto ">
        {/* Your main content goes here */}
        <nav className="relative  items-center flex justify-end  gap-7 px-9 pt-9  mr-1 pb-2">
            <Image src={'/assets/bell.png'} alt="Icon" width={30} height={20}/>
            
          <AdminProfile     />
        </nav>
        <div className="flex-1 overflow-x-hidden overflow-y-auto ml-64 bg-backGroundColor  ">
            {children}
        </div>
   
      </div>
      
     
    </>
  );

            }