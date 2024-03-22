import React from "react";
import DashboardLayout from "../layouts/Dashboard";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Support() {
  return (
    <DashboardLayout active={4}>
      <div className="px-10">
        <section>
          <h1 className="text-4xl text-[#093732] font-bold">Support</h1>
        </section>

        <div className=" border-2 border-[#E4E4E4] mt-10  min-h-[800px] flex">
          <div className="min-w-80 flex flex-col border-2 border-[#E4E4E4] min-h-[800px]">
            <div className="relative border-b-2 border-[#EAEAEA] ">
              <Input
                placeholder="Search here"
                className=" px-16 mt-10 border-none placeholder:text-lg placeholder:opacity-30"
              />
              <Image
                alt="Icon"
                src={"/assets/Search.svg"}
                className="absolute top-12 left-5"
                width={24}
                height={10}
              />
            </div>
            <UserMssageList />
            <UserMssageList />

            <UserMssageList />
          </div>
          <div className=" border-2 border-b  flex-grow">
            <div className="p-5 flex gap-1 w-full border-b">
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                  sizes="30"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-1">
                <p className="font-bold text-md">Marcus Curtis</p>
                <p className="text-xs">#0e973975397375sfwf</p>
              </div>
            </div>
            <div className="flex flex-col min-h-full justify-between">
              <div className="flex flex-col  w-full ">
                <div className="flex-grow p-4  border-gray-300 max-h-[650px] min-h-[650px]  overflow-y-auto">
                  {/* Admin Messages on the left */}
                  <p className="flex justify-center text-xs mb-5">8:00 AM</p>
                  <div className="flex items-end mb-4 justify-end">
                    <div className="w-[55%]">
                      <p className="bg-[#395E66] text-white p-4  text-sm rounded-xl">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry&apos;s standard Lorem Ipsum is simply dummy
                        text of the printing and typesetting industry. Lorem
                        Ipsum has been the industry&apos;s standard
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start mb-4  w-[50%]">
                    <div className="">
                      <p className="bg-[#F1F3F6] text-[#808191] rounded-xl p-4  text-sm flex flex-wrap">
                        Aliqua id fugiat nostrud irure ex duis ea quis id quis
                        ad et. Sunt qui esse pariatur duis deserunt mollit
                        dolore cillum minim temporsadads
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start mb-4  w-[50%]">
                    <div className="">
                      <p className="bg-[#F1F3F6] text-[#808191] rounded-xl p-4  text-sm flex flex-wrap">
                        Aliqua id fugiat nostrud irure ex duis ea quis id quis
                        ad et. Sunt qui esse pariatur duis deserunt mollit
                        dolore cillum minim temporsadads
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start mb-4  w-[50%]">
                    <div className="">
                      <p className="bg-[#F1F3F6] text-[#808191] rounded-xl p-4  text-sm flex flex-wrap">
                        Aliqua id fugiat nostrud irure ex duis ea quis id quis
                        ad et. Sunt qui esse pariatur duis deserunt mollit
                        dolore cillum minim temporsadads
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start mb-4  w-[50%]">
                    <Avatar>
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                        sizes="10"
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="">
                      <p className="bg-[#F1F3F6] text-[#808191] rounded-xl p-4  text-sm flex flex-wrap">
                        Aliqua id fugiat nostrud irure ex duis ea quis id quis
                        ad et. Sunt qui esse pariatur duis deserunt mollit
                        dolore cillum minim temporsadads
                      </p>
                    </div>
                  </div>
                  {/* User Messages on the right (placeholder) */}
                </div>

                {/* Admin Input Field at the bottom */}
                <div className="border-4 border-[#F1F3F6] w-full p-2">
                  {" "}
                  {/* Set a fixed height for the message bar */}
                  <div className="flex items-center relative">
                    <label htmlFor="picture">
                      <Image
                        src={"/assets/Picture.png"}
                        alt="Picture Icon"
                        width={30}
                        height={30}
                        className=" left-10 top-2 absolute cursor-pointer"
                      />
                    </label>
                    <input
                      type="file"
                      id="picture"
                      accept="image/*"
                      style={{ display: "none" }}
                    />

                    <label htmlFor="link">
                      <Image
                        src={"/assets/Link.jpg"}
                        alt="Link Icon"
                        width={30}
                        height={30}
                        className="top-2  absolute cursor-pointer"
                      />
                    </label>
                    <input
                      type="text"
                      id="link"
                      placeholder="Type a message..."
                      className="bg-backGroundColor rounded-md  flex-grow mr-2 border-none px-20 p-10"
                    />

                    <Image
                      src={"/assets/send.png"}
                      alt="Send Icon"
                      width={45}
                      height={30}
                      className="right-5 absolute cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function UserMssageList({}) {
  return (
    <div className="p-5 bg-[#395E66] bg-opacity-10">
      <div className="flex gap-1 w-full ">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <p className="font-bold text-md">Marcus Curtis</p>
          <p className="text-xs">Lorem IPSUM DOLOR...</p>
        </div>
        <div className="mt-6  pl-2">
          <p className="text-xs">5 min</p>
        </div>
        <p className="bg-[#395E66] rounded-full text-xs w-6 pt-1 h-6 text-center text-white mt-4 ml-5">
          2
        </p>
      </div>
    </div>
  );
}
