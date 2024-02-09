import Image from "next/image";
import { Button } from "./ui/button";
import { ConfirmModal } from "@/app/ProfileSlider";
import { AlertDialog, AlertDialogTrigger } from "@radix-ui/react-alert-dialog";

export default function DeleteCategories({}) {
  return (
    <div className="relative bg-white shadow-2xl">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button className="absolute top-0  right-0 bg-white text-black hover:bg-white shadow-xl  items-center p-3 flex gap-3 z-40">
            <Image
              src="/assets/DeleteCategory.png"
              alt="Icon"
              width={50}
              height={4}
            />
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
