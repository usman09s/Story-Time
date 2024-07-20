"use client";
import {
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useAuth } from "@/store/AuthProvider";
import { MoveLeft } from "lucide-react";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile } from "@/API/auth.api";

export const ProfileSlider = ({}) => {
  const queryClient = useQueryClient();
  const [EditMode, setEditMode] = useState(false);
  const { user } = useAuth();

  const [info, setInfo] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    username: user?.username || "",
    email: user?.email || "",
    password: user?.decryptedPassword || "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (user) {
      setInfo({
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
        password: user.decryptedPassword,
      });
    }
  }, [user]);

  // Update Profile
  const { mutateAsync, isPending } = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["current-user"] });
    },
  });

  const handleProfileUpdate = async (e: FormEvent) => {
    e.preventDefault();
    if (
      !info.firstName ||
      !info.lastName ||
      !info.username ||
      !info.email ||
      !info.password
    )
      return toast.error("All fields are required");
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(info.email))
      return toast.error("Invalid Email address");

    const { success, response } = await mutateAsync(info);
    if (!success) return toast.error(response);
    setEditMode(false);
    toast.success("Profile updated");
  };

  return (
    <SheetContent className="flex flex-col justify-between">
      <SheetHeader>
        <SheetTitle className="">
          <div className="flex justify-start items-center gap-20">
            <SheetClose asChild>
              <MoveLeft
                className="size-6 cursor-pointer"
                onClick={() => setEditMode(false)}
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
          {!EditMode ? (
            <div className="flex flex-col gap-6 mt-20 w-64">
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="firstname">First Name</Label>
                <p className="font-bold text-xl">{user?.firstName}</p>
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="firstname">Last Name</Label>
                <p className="font-bold text-xl">{user?.lastName}</p>
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="firstname">Username</Label>
                <p className="font-bold text-xl">{user?.username}</p>
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="firstname">Email</Label>
                <p className="font-bold text-xl">{user?.email}</p>
              </div>
            </div>
          ) : (
            <div>
              <form
                onSubmit={handleProfileUpdate}
                className="flex flex-col gap-4 mt-20 w-64"
              >
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="firstname">First Name</Label>
                  <Input
                    type="text"
                    id="firstname"
                    placeholder="First Name"
                    className=""
                    name="firstName"
                    value={info.firstName}
                    onChange={handleChange}
                  />
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="lastname">Last Name</Label>
                  <Input
                    type="text"
                    id="lastname"
                    placeholder="Last Name"
                    name="lastName"
                    value={info.lastName}
                    onChange={handleChange}
                  />
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    type="text"
                    id="username"
                    placeholder="Username"
                    name="username"
                    value={info.username}
                    onChange={handleChange}
                  />
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    type="email"
                    id="email"
                    placeholder="Email"
                    name="email"
                    value={info.email}
                    onChange={handleChange}
                  />
                </div>
              </form>
            </div>
          )}
        </div>
      </SheetHeader>
      {EditMode ? (
        <Button
          disabled={isPending}
          onClick={handleProfileUpdate}
          className="bg-primaryCol hover:bg-[#395e66df] py-7 text-lg"
        >
          Save Details
        </Button>
      ) : (
        <Button
          className="bg-primaryCol hover:bg-[#395e66df] py-7 text-lg"
          onClick={() => setEditMode(true)}
        >
          Edit Details
        </Button>
      )}
    </SheetContent>
  );
};
