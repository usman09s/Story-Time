import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowDownCircleIcon, Paperclip, SendHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { formatDate, formatShortDuration, shouldShowDate } from "@/lib/utils";
import { MessageBox } from "@/components/MessageBox";
import { useChatStore } from "@/store/socket.store";
import useCurrentChatStore from "@/store/currentChat";
import { uploadMedia } from "@/API/chats.api";

export default function ChatDetails() {
  const { currentChatId, chatMessages } = useChatStore();
  const sendMessage = useChatStore((state) => state.sendMessage);

  const [text, setText] = useState("");
  const [file, setFile] = useState<File | undefined>();
  const [isLoading, setIsLoading] = useState(false);

  const currentChatUser = useCurrentChatStore((state) => state.currentChatUser);

  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    console.log("Text",text);
    
    if (!text) return toast.error("message can't be empty");
    if (!currentChatId) return toast.error("Please select a chat to send message");
    if(file){
      const data = await uploadMedia(file);
      if(data) setFile(data.data[0])
    }
    sendMessage(currentChatId, text, file);
    setText("");
    setFile(undefined);
  };

  useEffect(() => {
    if (!currentChatId) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [currentChatId]);

  return (
    <div className="border-2 border-b w-full">
      {currentChatId && (
        <>
          <div className="flex gap-1 w-full border-b items-center justify-between px-10">
            <div className="text-sm flex items-center py-3 gap-3">
              <Avatar className="w-12 h-12">
                <AvatarImage
                  src={`http://storytime.yameenyousuf.com/${currentChatUser.profileImage}`}
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <p className="font-bold text-md">
                  {currentChatUser.firstname} {currentChatUser.lastname}
                </p>
                <p className="text-md text-[#395E66]">#{currentChatId}</p>
              </div>
            </div>
            <div className="border-2 py-2 px-5 flex justify-between items-center gap-5 cursor-pointer">
              <p className="text-sm">Mark as </p>
              <ArrowDownCircleIcon size={15} />
            </div>
          </div>

          <div className="flex flex-col justify-between w-full">
            <div className="flex flex-col w-full">
              <div className="flex-grow p-4 w-full border-gray-300 max-h-[650px] min-h-[650px] overflow-y-auto">
                <div className="flex flex-col justify-start gap-y-1">
                  {isLoading ? (
                    <div className="text-center">Loading...</div>
                  ) : (
                    (chatMessages[currentChatId]?.data?.data?.length ?? 0) > 0 &&
                    (() => {
                      let lastDisplayedDate = "";
                      return chatMessages[currentChatId]?.data?.data?.map(
                        (msg, index, messages) => {
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
                              day={showDate ? formatDate(msg.createdAt) : ""}
                              createdAt={formatShortDuration(msg.createdAt)}
                            />
                          );
                        }
                      );
                    })()
                  )}
                </div>
              </div>
              <div className="w-full border-1 px-5 border-t-2 mb-2">
                <form
                  onSubmit={handleSendMessage}
                  className="flex items-center gap-2 relative justify-center pt-[10px]"
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
                    className="flex-grow mr-2 border-none px-2"
                    value={text}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
                  />
                  <Button
                    // disabled={isPending}
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
  );
}
