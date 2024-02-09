"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Image from "next/image";
import { Label } from "./ui/label";
import { X } from "lucide-react";

export default function AddingCategories({ title }: { title: string }) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  // const [image, setImage] = useState<File | undefined>(undefined);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    //   setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleImageDelete = () => {
    setImagePreview(null);
  };
  return (
    <div className="mx-10">
      <section className="flex justify-between mt-7 h-10  items-center">
        <h1 className="text-4xl font-bold text-[#093732]">{title}</h1>
        <Button className={"bg-[#395E66] hover:bg-[#395e66d7] px-7 py-6"}>
          Save
        </Button>
      </section>
      <div className="flex w-full">
        <div className="bg-[#F3F3F3] flex-grow h-80 p-4 mt-10 rounded-md">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="Title">Title</Label>
            <Input type="email" id="Title" placeholder="Placeholder" />
          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5 mt-5">
            <Label htmlFor="IMAGE">IMAGE</Label>
            <div
              className={`relative w-full h-[178px] rounded-lg  border-[3px] border-spacing-32`}
            >
              <label
                htmlFor="fileInput"
                className="absolute inset-0 cursor-pointer"
              >
                <div className="flex-col flex items-center justify-center h-full  bg-white">
                  <Image
                    className="text-gray-500"
                    src="/assets/upload.png"
                    width={50}
                    height={50}
                    alt=""
                  />
                  <p className="text-[#AAAAAA] text-sm text-center mt-1">
                    Click to select an asset or drag and drop in <br /> this
                    area
                  </p>
                </div>
              </label>
              <Input
                id="fileInput"
                type="file"
                className="hidden"
                onChange={handleImageChange}
              />
              {imagePreview && (
                <div className="relative w-full h-full">
                  <div
                    className="bg-red-500 rounded-full p-2 absolute bottom-[89%] left-[95%] cursor-pointer z-20"
                    onClick={handleImageDelete}
                  >
                    <X />
                  </div>
                  <Image fill src={imagePreview} alt="Preview" />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="mt-10 flex flex-col justify-start ml-5">
          <Button
            variant={"outline"}
            className="border-[#AAAAAA] py-7  flex gap-2 items-center"
          >
            <Image src={"/assets/Pencil.png"} alt="" width={18} height={10} />{" "}
            Editing Draft Version
          </Button>
          <Button
            className="mt-3 border-[#AAAAAA] text-red-600 flex gap-1 items-center"
            variant={"outline"}
          >
            <Image src={"/assets/icon.png"} alt="" width={18} height={10} />{" "}
            Delete this entry
          </Button>
        </div>
      </div>
    </div>
  );
}
