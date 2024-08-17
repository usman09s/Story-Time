import useCurrentChatStore from "@/store/currentChat";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Image from "next/image";
import { S3_URL } from "@/lib/utils";
import picture from "@/public/assets/dummy-user.webp";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Download } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";


export const MessageBox = ({
  content,
  day,
  media,
  isAdmin,
  id,
  createdAt,
  isFirstMessage,
  supportTicket
}: {
  day: string;
  content: string;
  media: string[];
  isAdmin: boolean;
  id: string;
  createdAt: string;
  isFirstMessage: boolean,
  supportTicket: string;
}) => {
  const currentChatUser = useCurrentChatStore((state) => state.currentChatUser);

  const downloadImage = async (url: string) => {
    try {
      const encodedUrl = encodeURI(url);
      const response = await axios.get(encodedUrl, {
        responseType: 'blob', 
      });

      console.log("response",response);
      
      const blob = new Blob([response.data]);
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = url.split('/').pop() || "download"; // Sets the filename for download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href); // Clean up the object URL
    } catch (error) {
      toast.error("Download failed");
      console.error("Download failed", error);
    }
  };

  return (
    <>
      {day && (
        <div className="flex items-center my-5">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-2 text-xs text-gray-500">{day}</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
      )}
      <div
        className={
          isAdmin === true ? "self-end max-w-[60%]" : "self-start max-w-[60%]"
        }
      >
        <div className="px-7 mb-2">
          <div className="flex gap-3">
            {isAdmin === false && (
              <Avatar className="w-8 flex justify-end h-full">
                <AvatarImage
                  src={`${S3_URL}/${currentChatUser.profileImage}`}
                  alt="@shadcn"
                />
                <AvatarFallback><Image src={picture} width={52} height={44} alt="User-Profile" className="rounded-full" /></AvatarFallback>
              </Avatar>
            )}
            <div
              className={`${isAdmin === false
                ? "text-[#808191] bg-[#F1F3F6]"
                : "bg-primaryCol text-white"
                } p-4 text-sm rounded-xl`}
            >
              {isFirstMessage && (
                <p className="mb-4 text-[#082748]">
                  Open a Support Ticket <span className="font-bold">#{supportTicket}</span>
                </p>
              )}
              {content}
              {media && media.length > 0 && (
                <div className="mt-2 flex items-center justify-start gap-2">
                  <Dialog >
                    <DialogTrigger>
                      <Image
                        key={`${id}-image-`}
                        src={`${S3_URL}/${media[0]}`}
                        alt="image"
                        width={250}
                        height={200}
                        className=" rounded-lg  mt-1"
                      />
                    </DialogTrigger>
                    <DialogContent className="">
                      <Image
                        key={`${id}-image-`}
                        src={`${S3_URL}/${media[0]}`}
                        alt="image"
                        width={1100}
                        height={1100}
                        className="rounded-lg"
                      />
                    </DialogContent>
                  </Dialog>
                  {
                    isAdmin === false && (
                      <Download className="text-black cursor-pointer" onClick={() => downloadImage(`${S3_URL}/${media[0]}`)}/>
                    )}
                </div>
              )}
            </div>
          </div>
          <p className={`text-xs py-2 text-black ${isAdmin === true ? 'text-end' : 'px-16'}`}>
            {createdAt}
          </p>
        </div>
      </div>
    </>
  );
};
