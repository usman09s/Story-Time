"use client";
import DashboardLayout from "../layouts/Dashboard";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowDownCircleIcon, Paperclip, Search, SendHorizontal } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getChatMessages, getChatsList, sendMessage } from "@/API/chats.api";
import {
  ChatTypes,
  ChatsListType,
  SupportChatOverview,
} from "@/types/types";
import { ChatListSkeleton } from "@/components/skeletons/ChatListSkeleton";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChatMessageSkeleton } from "@/components/skeletons/ChatMessageSkeleton";
import { toast } from "sonner";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { formatDate, formatShortDuration, shouldShowDate, truncateText } from "@/lib/utils";
import useCurrentChatStore from "@/store/currentChat";

interface Params {
  searchParams: {
    page: number;
    limit: number;
    chatId: string;
    userId: string;
  };
}

export default function Support({ searchParams }: Params) {
  const queryClient = useQueryClient();
  const { page, limit, chatId  } = searchParams;
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | undefined>();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Fetching all chats
  const { data, isLoading } = useQuery<ChatsListType>({
    queryKey: ["chats-list"],
    queryFn: () => getChatsList({ page, limit }),
  });


  // Fetching single chats
  const { data: chat, isLoading: isChatLoading } = useQuery<ChatTypes>({
    queryKey: ["chat", chatId],
    queryFn: () => getChatMessages({ page, limit, id: chatId }),
    enabled: !!chatId,
  });

  // Send message
  const { mutateAsync, isPending } = useMutation({
    mutationFn: sendMessage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chat"] });
      queryClient.invalidateQueries({ queryKey: ["chats-list"] });
    },
  });
  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (!text) return toast.error("message can't be empty");
    if (!chatId) return toast.error("Please select a chat to send message");
    const formData = new FormData();
    formData.append("text", text);
    formData.append("chat", chatId);
    file && formData.append("media", file);

    const { success, response } = await mutateAsync(formData);
    if (!success) return toast.error(response);
    setText("");
    setFile(undefined);
  };
  const currentChatUser = useCurrentChatStore((state) => state.currentChatUser);
  
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat]);

  return (
    <DashboardLayout active={4} title="Support">
      <section className="px-10 mb-20">
        <div className=" border-2 border-borderCol mt-10 h-[800px] flex">
          <div className="max-w-80 overflow-x-hidden w-full flex flex-col border-2 border-borderCol h-[800px] overflow-y-auto">
            <div className="relative border-b-2 border-borderCol">
              <Input
                placeholder="Search Message"
                className="px-16 mt-2 py-9 border-none placeholder:text-lg placeholder:opacity-30"
              />
              <Search className="size-9 text-primaryCol absolute top-7 left-3" />
            </div>
            {isLoading ? (
              <ChatListSkeleton />
            ) : (
              data &&
              data.success &&
              data.response &&
              data?.response?.data &&
              data.response?.data?.length > 0 &&
              data.response.data.map((chat) => (
                <UserMessageList key={chat._id} chat={chat} activeChatId={chatId} />
              ))
            )}
          </div>
          <div className="border-2 border-b w-full">
            {chatId && chat && chat.success && chat.response && (
              <>
                <div className=" flex gap-1 w-full border-b  items-center justify-between px-10">
                  <div className="text-sm flex items-center py-3 gap-3">
                    <Avatar
                      className="w-12 h-12">
                      <AvatarImage
                        src={`http://storytime.yameenyousuf.com/${currentChatUser.profileImage}`}
                        alt="@shadcn"
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col ">
                      <p className="font-bold text-md">
                        {currentChatUser.firstname} {currentChatUser.lastname}
                      </p>
                      <p className="text-md text-[#395E66]">#{chat.response.data[0].chat}</p>
                    </div>
                  </div>
                  <div className="border-2 py-2 px-5 flex justify-between items-center gap-5 cursor-pointer">
                    <p className="text-sm">Mark as </p>
                    <ArrowDownCircleIcon size={15} />
                  </div>
                </div>

                <div className="flex flex-col justify-between w-full">
                  <div className="flex flex-col w-full">
                    <div className="flex-grow p-4 w-full border-gray-300 max-h-[650px] min-h-[650px] overflow-y-auto" >
                      {/* Admin Messages on the left */}
                      <div className="flex flex-col justify-start gap-y-1" >
                        {isChatLoading ? (
                          <ChatMessageSkeleton />
                        ) : (
                          chat.response.data.length > 0 && (() => {
                            let lastDisplayedDate = '';
                            return chat.response.data.map((msg, index, messages) => {
                              const showDate = shouldShowDate(index, messages, lastDisplayedDate);
                              const messageDate = new Date(msg.createdAt).toDateString();
                              if (showDate) {
                                lastDisplayedDate = messageDate;
                              }
                              return (
                                <MessageBox
                                  key={msg._id}
                                  id={msg._id}
                                  content={msg.text}
                                  media={msg.media}
                                  isAdmin={msg.isAdmin}
                                  day={showDate ? formatDate(msg.createdAt) : ''}
                                  createdAt={formatShortDuration(msg.createdAt)} />
                              );
                            });
                          })()
                        )}
                      </div>
                    </div>
                    {/* Admin Input Field at the bottom */}
                    <div className="w-full border-1 px-5 border-t-2 mb-2 " >
                      <form
                        onSubmit={handleSendMessage}
                        className="flex items-center gap-2 relative justify-center pt-[10px] "
                      >
                        <div className="flex items-center gap-2">
                          <label htmlFor="link">
                            <Paperclip className="cursor-pointer text-gray-500" />
                          </label>

                          <label htmlFor="picture">
                            <Image
                              src={"/assets/Picture.png"}
                              alt="Picture Icon"
                              width={30}
                              height={30}
                              className="cursor-pointer"
                            />
                          </label>
                          <input
                            type="file"
                            id="picture"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => setFile(e.target.files?.[0])}
                          />
                        </div>
                        <Input
                          type="text"
                          id="link"
                          placeholder="Write your message here"
                          className=" flex-grow mr-2 border-none px-2"
                          value={text}
                          onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setText(e.target.value)
                          }
                        />
                        <Button
                          disabled={isPending}
                          type="submit"
                          className="size-12 bg-primaryCol hover:bg-primaryCol rounded-full"
                        >
                          <SendHorizontal className="size-16 text-white" />
                        </Button>
                      </form>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </DashboardLayout>
  );
}
const MessageBox = ({
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
                  src={`http://storytime.yameenyousuf.com/${currentChatUser.profileImage}`}
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
                    src={`http://storytime.yameenyousuf.com/${img}`}
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

function UserMessageList({ chat, activeChatId }: { chat: SupportChatOverview, activeChatId: string }) {
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
          <AvatarImage src={`http://storytime.yameenyousuf.com/${chat.user.profileImage}`} alt={chat.user.username} />
          <AvatarFallback>CN</AvatarFallback>
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