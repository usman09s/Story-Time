"use client";
import { deleteCategory } from "@/API/categories.api";
import { Button } from "./ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash } from "lucide-react";
import { FormEvent } from "react";
import { toast } from "sonner";

export default function DeleteCategories({
  id,
  setOpen,
}: {
  id: string;
  setOpen: any;
}) {
  const queryClient = useQueryClient();

  // Delete category
  const { mutateAsync, isPending } = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories", "sub-categories"],
      });
    },
  });

  // Delete handler
  const handleDelete = async (e: FormEvent) => {
    e.preventDefault();
    if (!id) return toast.error("Category Id is required");

    const { success, response } = await mutateAsync(id);
    if (!success) return toast.error(response);
    else toast.success("Category deleted");
    setOpen(false);
  };

  return (
    <div className="relative bg-white shadow-2xl">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button className="absolute top-0  right-0 bg-white text-black hover:bg-white shadow-xl  items-center p-3 flex gap-3 z-40">
            <Trash className="bg-red-500 px-1 rounded-lg size-7 text-white" />
            Delete Design
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center text-xl">
              Are you sure you want to delete this category?
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter className="sm:justify-center mt-10">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              disabled={isPending}
              onClick={handleDelete}
              className="bg-primaryCol hover:bg-primaryCol"
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
