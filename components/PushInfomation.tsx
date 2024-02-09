"use client";

import { DatePicker } from "./DatePicker";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export default function PushInfomation({}) {
  return (
    <>
      <div>
        <div className="p-7">
          <div className="flex items-center justify-between space-x-10 ">
<div className="flex gap-10">

            <div className="flex items-center space-x-2">
              <input type="checkbox" id="terms" className="" />
              <Label htmlFor="terms" className="text-md">All users</Label>
            </div>

            <div className="flex items-center space-x-2">
              <input type="checkbox" id="terms" className="" />
              <Label htmlFor="terms" className="text-md">All Active users</Label>
            </div>
            </div>

          <DatePicker />

          </div>
        </div>
      </div>
      <div className="mt-6 ">
        <div className="relative mt-3 px-6 ">
          <p className="absolute  text-xm text-PrimaryColor px-3 mt-2">Title</p>
          <div className="flex">
            <Input
              type="text"
              placeholder="Title here"
              className="h-16 rounded-lg bg-InputFieldColor pt-7 text-gray-400 bg-[#EFEFEF]"
            />
            <div className="absolute"></div>
          </div>
        </div>
       
      </div>
    </>
  );
}
