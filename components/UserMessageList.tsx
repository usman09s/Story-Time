import useCurrentChatStore from "@/store/currentChat";
import { SupportChatOverview } from "@/types/types";
import { usePathname, useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import picture from "@/public/assets/dummy-user.webp";
import { formatShortDuration, S3_URL, truncateText } from "@/lib/utils";
import Image from "next/image";

export function UserMessageList({ chat, activeChatId }: { chat: SupportChatOverview, activeChatId: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const setCurrentChatUser = useCurrentChatStore((state) => state.setCurrentChatUser);
  const openChat = () => {
    setCurrentChatUser({
      firstname: chat.user.firstName,
      lastname: chat.user.lastName,
      profileImage: chat.user.profileImage,
      username: chat.user.username,
    })
    router.push(`${pathname}?chatId=${chat._id}&userId=${chat.user._id}`);
  };

  return (
    <div
      onClick={openChat}
      className={`relative py-8 px-5  bg-opacity-10 cursor-pointer ${chat._id === activeChatId ? 'bg-primaryCol' : 'bg-white'}`}
    >
      <div className="flex gap-2 w-full">
        <Avatar className="w-14 h-14">
          <AvatarImage
            src={`${S3_URL}/${chat.user.profileImage}`}
            alt={chat.user.username} />
          <AvatarFallback><Image src={picture} width={52} height={44} alt="User-Profile" className="rounded-full"/></AvatarFallback>
        </Avatar>
        <div className="flex flex-col  gap-1 w-full">
          <p className="font-bold text-md">
            {chat.user.firstName + " " + chat.user.lastName}
          </p>
          <div className="flex items-end justify-between w-full">
            <p className="text-xs text-[#09110e80]">
              {chat.chat.lastMessage && truncateText(chat.chat.lastMessage, 3)}
            </p>
            <p className="text-xs mr-5 text-[#09110e80]">
              {formatShortDuration(new Date(chat.chat.updatedAt || chat.chat.createdAt),)}
            </p>
          </div>
        </div>
        <div className="mt-6 pl-2"></div>
        {chat.unreadMessages > 0 && (
          <p className="absolute right-2 bg-primaryCol rounded-full text-xs w-6 pt-1 h-6 text-center text-white mt-4 ml-5">
            {chat.unreadMessages}
          </p>
        )}
      </div>
    </div>
  );
}