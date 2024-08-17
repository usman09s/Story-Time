"use client";
import {
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/store/AuthProvider";
import { MoveLeft } from "lucide-react";

export const ProfileSlider = ({}) => {
  const { user } = useAuth();
  return (
    <SheetContent className="flex flex-col justify-between">
      <SheetHeader>
        <SheetTitle className="">
          <div className="flex justify-start items-center gap-20">
            <SheetClose asChild>
              <MoveLeft
                className="size-6 cursor-pointer"
              />
            </SheetClose>
            Profile Information
          </div>
        </SheetTitle>
        <div className="flex flex-col items-center justify-center">
          <div className="mt-16">
            <Image
              src={"/assets/dummy-user.webp"}
              alt="Profile Picture"
              width={120}
              height={100}
              className="rounded-full"
            />
          </div>
            <div className="flex flex-col gap-6 mt-20 w-64">
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="firstname">First Name</Label>
                <p className="font-medium text-xl">{user?.firstName}</p>
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="firstname">Last Name</Label>
                <p className="font-medium text-xl">{user?.lastName}</p>
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="firstname">Username</Label>
                <p className="font-medium text-xl">{user?.username}</p>
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="firstname">Email</Label>
                <p className="font-medium text-xl">{user?.email}</p>
              </div>
            </div>
        </div>
      </SheetHeader>
    </SheetContent>
  );
};
