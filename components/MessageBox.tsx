import useCurrentChatStore from "@/store/currentChat";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Image from "next/image";
import { getFileType, S3_URL } from "@/lib/utils";
import picture from "@/public/assets/dummy-user.webp";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Download } from "lucide-react";
import { downloadImage } from "@/API/chats.api";

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
  isFirstMessage: boolean;
  supportTicket: string;
}) => {
  const currentChatUser = useCurrentChatStore((state) => state.currentChatUser);

 
  
  const renderMedia = (file: string) => {
    const fileType = getFileType(file);

    if (fileType === 'image') {
      return (
        <div className="flex gap-2 items-center">
        <Dialog>
          <DialogTrigger>
            <Image
              key={`${file}-thumbnail`}
              src={`${S3_URL}/${file}`}
              alt="image"
              width={250}
              height={200}
              className="rounded-lg mt-1 cursor-pointer"
            />
          </DialogTrigger>
          <DialogContent>
            <Image
              key={`${file}-fullsize`}
              src={`${S3_URL}/${file}`}
              alt="image"
              width={1100}
              height={1100}
              className="rounded-lg"
            />
          </DialogContent>
        </Dialog>
        {!isAdmin && 
        <Download className="text-black cursor-pointer" onClick={()=>downloadImage(media[0])}/>
        }
        </div>
      );
    } else if (fileType === 'pdf') {
      return (
        <Dialog>
          <DialogTrigger>
            <div className="pdf-icon-container">
              <img
                src="/assets/pdf-icon.png" // Replace with the path to your PDF icon
                alt="PDF icon"
                width={250}
                height={200}
                className="rounded-lg mt-1 cursor-pointer"
              />
            </div>
          </DialogTrigger>
          <DialogContent>
            <iframe
              src={`${S3_URL}/${file}`}
              width="100%"
              height="800px"
              title="PDF Viewer"
            />
          </DialogContent>
        </Dialog>
      );
    } else {
      return <div>Unsupported media type</div>;
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
          isAdmin ? "self-end max-w-[60%]" : "self-start max-w-[60%]"
        }
      >
        <div className="px-7 mb-2">
          <div className="flex gap-3">
            {!isAdmin && (
              <Avatar className="w-8 flex justify-end h-full">
                <AvatarImage
                  src={`${S3_URL}/${currentChatUser.profileImage}`}
                  alt="@shadcn"
                />
                <AvatarFallback>
                  <Image src={picture} width={52} height={44} alt="User-Profile" className="rounded-full" />
                </AvatarFallback>
              </Avatar>
            )}
            <div
              className={`${!isAdmin
                ? "text-[#808191] bg-[#F1F3F6]"
                : "bg-primaryCol text-white"
                } p-4 text-sm rounded-xl`}
            >
              {isFirstMessage && (
                <p className="mb-4 text-[#082748]">
                  Open a Support Ticket <span className="font-bold">#{supportTicket}</span>
                </p>
              )}
              <p>{content}</p>
              {media && media.length > 0 && (
                media.map((file, index) => (
                  <div key={index}>
                    {renderMedia(file)}
                  </div>
                ))
              )}
            </div>
          </div>
          <p className={`text-xs py-2 text-black ${isAdmin ? 'text-end' : 'px-16'}`}>
            {createdAt}
          </p>
        </div>
      </div>
    </>
  );
};
