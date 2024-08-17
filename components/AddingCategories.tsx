"use client";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Image from "next/image";
import { Label } from "./ui/label";
import { Pencil, X } from "lucide-react";
import { convertImage } from "@/lib/convertImage";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createCategory, fetchSingleCategory, updateCategory } from "@/API/categories.api";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { S3_URL } from "@/lib/utils";

export default function AddingCategories({
  text,
  id,
}: {
  text: string;
  id?: string;
}) {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const updateId = searchParams.get("id");

  const [image, setImage] = useState<string>("");
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | undefined>(undefined);

  const router = useRouter();

  const handleFileChange = async (file: any) => {
    try {
      setFile(file);
      const base64Image = await convertImage(file);
      setImage(base64Image);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleImageDelete = () => {
    setFile(undefined);
    setImage("");
  };


  const { mutateAsync, isPending } = useMutation({
    mutationFn: (formData: FormData) => (updateId ? updateCategory(formData, updateId) : createCategory(formData)),
    onSuccess: () => {
      const queryKey = id ? ["sub-categories"] : ["categories"];
      queryClient.invalidateQueries({ queryKey: queryKey });
    },
  });


  const { data } = useQuery({
    queryKey: ["single-categories", updateId],
    queryFn: () => fetchSingleCategory(updateId!),
    staleTime: 0, 
    enabled: !!updateId, 
  });

  useEffect(() => {
    if (data) {
      setTitle(data.response.name);
      setImage(`${S3_URL}/${data.response.image}`);
    }
  }, [data]);

  useEffect(() => {
    if (!updateId) {
      setTitle("");
      setImage("");
      setFile(undefined);
    }
  }, [updateId]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!title) return toast.error("Category name is required");
    if (!file && !updateId) return toast.error("Picture is required");

    const formData = new FormData();
    formData.append("name", title);
    if (file) {
      formData.append("image", file);
    }
    id && formData.append("parent", id);

    const { success, response } = await mutateAsync(formData);
    if (!success) return toast.error(response);
    toast.success(updateId ? "Category updated" : "Category added");
    router.push("/categories");
  };

  const handleDelete = () => {
    console.log("Delete");
    setImage("");
    setTitle("");
    setFile(undefined);
  };

  return (
    <div className="mx-10">
      <section className="flex justify-end mt-7 h-10 items-center">
        <Button
          onClick={handleSubmit}
          disabled={isPending}
          className={"bg-primaryCol hover:bg-[#395e66d7] px-7 py-6"}
        >
          Save
        </Button>
      </section>
      <div className="flex w-full">
        <div className="bg-[#F3F3F3] flex-grow h-80 p-4 mt-10 rounded-md">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <div className="flex items-center justify-start gap-1">
            <Label htmlFor="Title">Title</Label>
          <Image
            src={'/assets/world.svg'}
            alt="World Icon"
            width={15}
            height={15}
          />
            </div>
            <Input
              type="text"
              id="Title"
              className="border-[#AAAAAA] rounded-lg p-3  px-2 focus-visible:ring-transparent focus:border-[#252525]"
              placeholder="Placeholder"
              value={title}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setTitle(e.target.value)
              }
            />
          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5 mt-5">
            <Label htmlFor="IMAGE">IMAGE</Label>
            <div
              className={`relative w-full h-[178px] rounded-md border-[#AAAAAA] border p-3 `}
            >
              <label
                htmlFor="fileInput"
                className="absolute inset-0 cursor-pointer"
              >
                {!image &&  
                <div className="flex-col flex items-center justify-center h-full bg-white rounded-md">
                  <Image
                    className="text-gray-500"
                    src="/assets/upload.png"
                    width={50}
                    height={50}
                    alt="upload-icon"
                  />
                  <p className="text-[#AAAAAA] text-sm text-center mt-1">
                    Click to select an asset or drag and drop in <br /> this
                    area
                  </p>
                </div>
                }
              </label>
              <Input
                id="fileInput"
                type="file"
                className="hidden border-[#AAAAAA] rounded-lg p-3 "
                accept="image/jpeg, image/png"
                onChange={(e) => handleFileChange(e.target.files?.[0])}
              />
              {image && (
                <div className="relative w-full h-full cursor-pointer">
                  <div
                    className="bg-red-500 rounded-full p-2 absolute bottom-[89%] left-[95%] cursor-pointer z-20"
                    onClick={handleImageDelete}
                  >
                    <X />
                  </div>
                  <Image
                    fill
                    src={image}
                    alt="Preview"
                    className=""
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="mt-10 flex flex-col justify-start ml-5">
          <Button
            variant={"outline"}
            className="border-[#AAAAAA] py-7 flex gap-2 items-center"
          >
            <Pencil
              className="text-primaryCol"
              fill="#395E66"
              stroke="#fff"
              strokeWidth={1}
            />
            Editing Draft Version
          </Button>
          <Button
            className="mt-3 border-[#AAAAAA] text-red-600 flex gap-1 items-center"
            variant={"outline"}
            onClick={handleDelete}
          >
            <Image src={"/assets/icon.png"} alt="" width={18} height={10} />{" "}
            Delete this entry
          </Button>
        </div>
      </div>
    </div>
  );
}
