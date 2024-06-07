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
import { FormEvent, useState } from "react";
import { toast } from "sonner";

export default function DeleteCategories({
  id,
  setOpen,
}: {
  id: string;
  setOpen: any;
}) {
  const queryClient = useQueryClient();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);

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
    if (!success) {
      toast.error(response);
    } else {
      toast.success("Category deleted");
      setIsDeleteDialogOpen(false);
      setIsSuccessDialogOpen(true);
    }
  };

  return (
    <div className="relative bg-white shadow-2xl">
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogTrigger asChild>
          <Button className="absolute top-0 right-0 bg-white text-black hover:bg-white shadow-xl items-center p-2 flex gap-3 z-40">
            <Trash className="bg-red-500 px-1 rounded-lg size-7 text-white" />
            Delete Design
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="w-96 h-56">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center text-xl">
              Delete Category
            </AlertDialogTitle>
          </AlertDialogHeader>
          <div className="flex items-center justify-center flex-col gap-2">
            <p className="flex justify-center text-center">
              Are you sure you want to permanently delete this Category?
            </p>
            <AlertDialogAction
              disabled={isPending}
              onClick={handleDelete}
              className="bg-primaryCol hover:bg-primaryCol w-52"
            >
              {isPending ? "Deleting..." : "Confirm"}
            </AlertDialogAction>
            <AlertDialogCancel
              onClick={() => setIsDeleteDialogOpen(false)}
              className="w-52"
            >
              Cancel
            </AlertDialogCancel>
          </div>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={isSuccessDialogOpen} onOpenChange={setIsSuccessDialogOpen}>
        <AlertDialogTrigger asChild>
          {/* This button is hidden, only used to open the dialog programmatically */}
          <div></div>
        </AlertDialogTrigger>
        <AlertDialogContent className="w-64 h-32">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center text-xl">
            Successfully Deleted
            </AlertDialogTitle>
          </AlertDialogHeader>
          <div className="flex items-center justify-center flex-col gap-2">
            <AlertDialogAction
              onClick={() => setIsSuccessDialogOpen(false)}
              className="bg-primaryCol hover:bg-primaryCol w-52"
            >
              Back
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
