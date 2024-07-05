import useCurrentChatStore from "@/store/currentChat";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Image from "next/image";

export const MessageBox = ({
    content,
    day,
    media,
    isAdmin,
    id,
    createdAt
  }: {
    day: string
    content: string;
    media: string[];
    isAdmin: boolean;
    id: string;
    createdAt: string
  }) => {
    const currentChatUser = useCurrentChatStore((state) => state.currentChatUser);
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
            <div className="flex gap-3 ">
              {isAdmin === false &&
                <Avatar
                  className="w-8 flex justify-end h-full">
                  <AvatarImage
                    src={`https://storytime-mod-bucket.s3.us-east-2.amazonaws.com/${currentChatUser.profileImage}`}
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>}
              <div
                className={`${isAdmin === false
                  ? " text-[#808191] bg-[#F1F3F6]"
                  : "bg-primaryCol text-white"
                  } p-4 text-sm rounded-xl`}
              >
                {content}
                {media &&
                  media.length > 0 &&
                  media.map((img, idx) => (
                    <Image
                      key={`${id}-image-${idx}-${img}`}
                      src={`https://storytime-mod-bucket.s3.us-east-2.amazonaws.com/${img}`}
                      alt="image"
                      width={400}
                      height={400}
                      className="object-cover rounded-lg size-60 mt-1"
                    />
                  ))}
              </div>
            </div>
            <p className={`text-xs py-2 text-black  ${isAdmin === true ? 'text-end' : 'px-16'}`}>
              {createdAt}
            </p>
          </div>
        </div>
      </>
    );
  };