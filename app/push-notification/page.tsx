import React from "react";
import DashboardLayout from "../layouts/Dashboard";
import PushInfomation from "@/components/PushInfomation";
import { Button } from "@/components/ui/button";
import Editor from "@/components/Editor";
import { DatePicker } from "@/components/DatePicker";
import QuillToolbar from "@/components/Toolbar";
import { notificationData } from "@/types/data";

export default function NotificationPage() {
  return (
    <DashboardLayout active={3}>
      <div className="  p-7 flex justify-between ">
        <h1 className="text-4xl  text-[#093732] font-bold">Push Notification</h1>
      </div>
      <div className="flex border-[#E4E4E4] rounded-lg border-2 m-5">
        <div className="mt-2 w-full ml-2 rounded-lg   flex-col border-[#E4E4E4] border">
          <div className="bg-white  pb-6 rounded-md ">
            <PushInfomation />
          </div>

          <div className="p-5 mt-6 bg-white  ">
            <div className="min-h-[530px]  border-2 border-[#E4E4E4]">
              <QuillToolbar />

              <Editor value={notificationData as string} />
            </div>
          </div>

          <div className="flex justify-center mt-5">
            <Button className="bg-[#395E66]  px-20 hover:bg-[#395e66b9]">
              Push Now
            </Button>
          </div>
        </div>

        <div className="w-2/5 h-screen  bg-white mx-2 p-10 mt-2 border-2 border-[#E4E4E4] rounded-lg">
          <p className="mb-5 text-lg font-semibold">History</p>
          <div className="flex flex-col space-y-4 border-l-2 border-dashed p-3">
            <div className="flex items-center gap-4 px-3">
              <p className="text-xs  ">10/19/2022</p>
              <p className="text-xs text-subTitleSecondaryColor">
                Notification was sent
              </p>
            </div>
            <div className="flex items-center gap-4 px-3">
              <p className="text-xs">10/19/2022</p>
              <p className="text-xs text-subTitleSecondaryColor">
                Notification was sent
              </p>
            </div>
            <div className="flex items-center gap-4 px-3">
              <p className="text-xs">10/19/2022</p>
              <p className="text-xs text-subTitleSecondaryColor">
                Notification was sent
              </p>
            </div>
            <div className="flex items-center gap-4 px-3">
              <p className="text-xs">10/19/2022</p>
              <p className="text-xs text-subTitleSecondaryColor">
                Notification was sent
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
