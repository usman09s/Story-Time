import Image from "next/image";
import { Button } from "./ui/button";
import { ConfirmModal } from "@/app/ProfileSlider";
import { AlertDialog, AlertDialogTrigger } from "@radix-ui/react-alert-dialog";
import { Trash } from "lucide-react";

export default function DeleteCategories({}) {
  return (
    <div className="relative bg-white shadow-2xl">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button className="absolute top-0  right-0 bg-white text-black hover:bg-white shadow-xl  items-center p-3 flex gap-3 z-40">
            <Trash className="bg-red-500 px-1 rounded-lg size-7 text-white" />
            Delete Design
          </Button>
        </AlertDialogTrigger>

        <ConfirmModal
          text="Are you sure you want to permanently delete 
this Category?"
          title="Delete Category"
        />
      </AlertDialog>
    </div>
  );
}
