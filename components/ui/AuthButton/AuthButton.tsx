import { FC, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Image from "next/image";
import { Loader2Icon } from "lucide-react";

interface AuthButtonProps {
  isPending?: boolean;
  success?: boolean;
  buttonTitle: string;
  isModal?: boolean;
  onClick?: () => void;
  disable?: boolean;
  isSubmitting?: boolean;
  isSubmitted?: boolean;
  
}

const AuthButton: FC<AuthButtonProps> = ({
  buttonTitle,
  isModal,
  onClick,
  disable = true,
  isPending = false,
  isSubmitted,
  isSubmitting,
  success
}) => {

 const [closeModal, setCloseModal] = useState<boolean>(false);
  return (
    <>
      {isModal ? (
        <AlertDialog open={success && !closeModal}>
          <AlertDialogTrigger asChild>
          <Button
          className="mt-7 py-7 text-white bg-primaryCol rounded-md text-md w-full hover:bg-[#395e66be]"
          type="submit"
          disabled={isPending}
        >
          {isPending ? (
            <div className="flex justify-center items-center gap-2">
              <p>{buttonTitle}</p>
              <p className="animate-spin"><Loader2Icon/></p>
            </div>
          ) : (
            'Reset Password'
          )}        </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="flex justify-end">
                {" "}
                <AlertDialogCancel onClick={()=>setCloseModal(true)}>
                  <Image
                    src={"/assets/cancel.svg"}
                    alt="Cancel Button"
                    width={10}
                    height={10}
                  />
                </AlertDialogCancel>
              </AlertDialogTitle>
              <AlertDialogDescription className="flex flex-col gap-3 items-center justify-center">
                <Image
                  src={"/assets/email.png"}
                  alt="EmailPicture"
                  width={150}
                  height={50}
                />
                <span className="font-semibold text-3xl text-center text-[#393939]">
                  Your reset password link has been sent to your email.
                </span>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter></AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      ) : (
        <Button
          className="mt-7 py-7 text-white bg-[#395E66] rounded-md text-md w-full hover:bg-[#395e66be]"
          type="submit"
        >
          {buttonTitle}
        </Button>
      )}
    </>
  );
};

export default AuthButton;
