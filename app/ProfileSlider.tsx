"use client";

import {
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTrigger,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";

export const ProfileSlider = ({}) => {
  const [EditMode, setEditMode] = useState(false);
  return (
    <SheetContent className="flex flex-col justify-between">
      <SheetHeader>
        <SheetTitle className="">
          <div className="flex justify-start items-center gap-24">
            <SheetClose asChild>
              <Image
                src={"/assets/ArrowSlider.png"}
                alt="Arrow Icon"
                width={19}
                height={10}
                className="cursor-pointer"
                onClick={() => setEditMode(false)}
              />
            </SheetClose>
            Edit Details
          </div>
        </SheetTitle>
        <SheetDescription className="flex flex-col items-center justify-center ">
          <div className="mt-16">
            <Image
              src={"/assets/user.png"}
              alt="Profile Picture"
              width={120}
              height={100}
              className="rounded-full"
            />
          </div>
          {!EditMode ? (
            <div className="flex flex-col gap-6 mt-20 w-64">
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="firstname">First Name</Label>
                <p className="font-bold text-xl">Jason</p>
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="firstname">Last Name</Label>
                <p className="font-bold text-xl">Griffin</p>
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="firstname">Username</Label>
                <p className="font-bold text-xl">jaxongriff101</p>
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="firstname">Email</Label>
                <p className="font-bold text-xl">jasongriffin@admin.com</p>
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="firstname">Password</Label>
                <p className="font-bold text-xl">****************</p>
              </div>
            </div>
          ) : (
            <form className="flex flex-col gap-4 mt-20 w-64">
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="firstname">First Name</Label>
                <Input
                  type="text"
                  id="firstname"
                  placeholder="First Name"
                  className=""
                  value={"Jason"}
                />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="lastname">Last Name</Label>
                <Input
                  type="text"
                  id="lastname"
                  placeholder="Last Name"
                  value={"Griffin"}
                />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="username">Username</Label>
                <Input
                  type="text"
                  id="username"
                  placeholder="Username"
                  value={"jaxongriff101"}
                />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  placeholder="Email"
                  value={"jasongriffin@admin.com"}
                />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  id="password"
                  placeholder="Password"
                  value={"****************"}
                />
              </div>
            </form>
          )}
        </SheetDescription>
      </SheetHeader>
      {EditMode ? (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button className="bg-[#395E66] hover:bg-[#395e66df] py-7 text-lg">
              Save Details
            </Button>
          </AlertDialogTrigger>
          <ConfirmModal
            text="Are you sure you want to discard 
your edits?"
            title="Discard Edits"
          />
        </AlertDialog>
      ) : (
        <Button
          className="bg-[#395E66] hover:bg-[#395e66df] py-7 text-lg"
          onClick={() => setEditMode(true)}
        >
          Edit Details
        </Button>
      )}
    </SheetContent>
  );
};

export function ConfirmModal({ text, title }: { text: string; title: string }) {
  const ButtonRef = useRef<HTMLButtonElement>(null);

  const CloseDialog = () => {
    ButtonRef.current?.click();
  };

  const [open, setOpen] = useState(true);

  const func = () => {
    setOpen(false);
  };
  return (
    <AlertDialogContent
      className={`h-[35%] w-[25%] ${open ? null : "hidden"} `}
    >
      <AlertDialogHeader>
        <AlertDialogDescription className="flex flex-col  gap-3 items-center mt-5 justify-center">
          <h1 className="text-3xl text-[#093732] font-bold">Save Edit</h1>
          <p className="text-center mt-5 font-extrabold text-xl opacity-70 text-black">
            {text}
          </p>
          <AlertDialog>
            <AlertDialogTrigger asChild onClick={func}>
              <Button className=" rounded-2xl bg-[#395E66] hover:bg-[#395e66ce]  px-24 py-7 text-lg">
                Confirm
              </Button>
            </AlertDialogTrigger>
            <DoneModal CloseFunction={CloseDialog} />
          </AlertDialog>
          <AlertDialogCancel className="text-black" ref={ButtonRef}>
            Cancel
          </AlertDialogCancel>
        </AlertDialogDescription>
      </AlertDialogHeader>
    </AlertDialogContent>
  );
}

export function DoneModal({ CloseFunction }: { CloseFunction: () => void }) {
  return (
    <AlertDialogContent className="h-[18%] w-[20%]  ">
      <AlertDialogHeader>
        <AlertDialogDescription className="flex flex-col  gap-3 items-center mt-5 justify-center">
          <h1 className="text-2xl text-[#093732] font-bold">
            Successfully Saved
          </h1>

          <AlertDialogCancel>
            <Button
              className=" rounded-2xl bg-[#395E66] hover:bg-[#395e66ce]  px-24 py-7 text-lg"
              onClick={CloseFunction}
            >
              Back
            </Button>
          </AlertDialogCancel>
        </AlertDialogDescription>
      </AlertDialogHeader>
    </AlertDialogContent>
  );
}
