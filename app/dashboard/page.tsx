import React, { FC } from "react";
import DashboardLayout from "../layouts/Dashboard";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/DataTable";
import { DummyData, Heading } from "@/types/data";
import SearchBar from "@/components/SearchBar";
import States from "@/components/states";

export default function Dashboard() {
  return (
    <DashboardLayout active={1}>
      <div className="flex flex-col min-h-screen">
        <div className="flex-1 overflow-y-auto">
          <div className="pl-10">
            <section>
              <h1 className="text-4xl font-bold text-[#093732]">
                Dashboard & Users
              </h1>
              <div className="flex w-full items-center gap-10 my-6">
                <States iconPath="done" title="total Download" total="1.4k" />
                <States iconPath="mark2" title="Guests" total="350" />
                <States iconPath="star2" title="Premium Users" total="1.4k" />
              </div>
              <div className="flex gap-10 border-b-2 text-center border-[#E44173] pb-4 relative">
                <div className="px-3">
                  <h3 className="font-bold text-center">All</h3>
                </div>
                <div>
                  <h3 className="text-center font-bold text-black opacity-50">
                    Active
                  </h3>
                </div>
                <div>
                  <h3 className="text-center font-bold opacity-50 text-black">
                    Inactive
                  </h3>
                </div>
                <div className="border-[#395E66] border-b-4 absolute bottom-0 w-9 -z-20" />
              </div>
            </section>
          </div>
          <div className="flex justify-between px-10 mt-5 my-2">
            <SearchBar />
            <div>
              <Button
                variant={"outline"}
                className="border-[#395E66] flex gap-2 items-center text-[#395E66]"
              >
                Export CSV{" "}
                <Image
                  src={"/assets/Download.png"}
                  alt="Icon"
                  width={20}
                  height={10}
                />
              </Button>
            </div>
          </div>
          <div className="mx-10">
            <DataTable TableData={DummyData} TableHeading={Heading} />
          </div>
        </div>
        <footer className="bg-[#395E66] text-white text-center py-4 w-full mx-10">
          <div className="flex justify-end items-center gap-10">
            <div>
              <h1>Rows per page 10</h1>
            </div>
            <div>
              <h1>1-10 of 276</h1>
            </div>
            <div className="flex gap-6 mr-16">
              <Image
                src={"/assets/arrowLeft.png"}
                alt="Icon"
                width={6}
                height={4}
              />
              <Image
                src={"/assets/arrowRight.png"}
                alt="Icon"
                width={6}
                height={4}
              />
            </div>
          </div>
        </footer>
      </div>
    </DashboardLayout>
  );
}
