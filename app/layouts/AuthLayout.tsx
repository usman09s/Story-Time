import Image from "next/image";
import React, { FC } from "react";
import backgroundPicture from "@/public/assets/backgroundPicture.png";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subTitle: string;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children, subTitle, title }) => {
  return (
    <div className="relative w-full h-screen ">
      <Image src="/assets/backgroundPicture.png" alt="Background image" fill/>

      <div className="flex">
        <div className="w-1/2 relative z-10 h-screen flex justify-center items-center">
          <div className="flex flex-col gap-3 w-[340px]">
            <h1 className="text-3xl text-primaryCol font-bold">{title}</h1>
            <h6 className="text-primaryCol">{subTitle}</h6>
            {children}
          </div>
        </div>
        <div className="w-1/2 relative z-20 h-screen flex justify-start items-center  ">
          <Image src={"/assets/logo.svg"} alt="" width={500} height={200} />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
