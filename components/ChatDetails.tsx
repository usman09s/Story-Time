import { useState, useEffect, ChangeEvent, FormEvent, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowDownCircleIcon, Loader2, Paperclip, SendHorizontal, XCircle, XCircleIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { formatDate, formatShortDuration, S3_URL, shouldShowDate } from "@/lib/utils";
import { MessageBox } from "@/components/MessageBox";
import { useChatStore } from "@/store/socket.store";
import useCurrentChatStore from "@/store/currentChat";
import { uploadMedia } from "@/API/chats.api";
import picture from "@/public/assets/dummy-user.webp";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function ChatDetails() {
  const { currentChatId, chatMessages, loader, sendMessage, closeChat } = useChatStore();

  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null); // New state for image preview
  const [file, setFile] = useState<File | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const currentChatUser = useCurrentChatStore((state) => state.currentChatUser);

  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    console.log("Text", text);

    if (!text && !file) return toast.error("Please enter a message to send");
    if (!currentChatId) return toast.error("Please select a chat to send message");

    let image = '';
    if (file) {
      const data = await uploadMedia(file);
      image = data.data[0];
    }

    sendMessage(currentChatId, text, image ? image : undefined);
    setText("");
    setFile(undefined);
    setImagePreview(null); // Reset the image preview after sending the message
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages, currentChatId]);

  const handleChatClose = (chat: string) => {
    closeChat(chat);
    console.log("Chat Closed");
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setImagePreview(URL.createObjectURL(selectedFile)); // Set the image preview URL
    }
  };

  const handleCancelPreview = () => {
    setImagePreview(null);
    setFile(undefined); // Reset the file input
  };

  return (
    <div className="border border-b w-full">
      {currentChatId && (
        <>
          <div className="flex gap-1 w-full border-b items-center justify-between px-10">
            <div className="text-sm flex items-center py-3 gap-3">
              <Avatar className="w-12 h-12">
                <AvatarImage
                  src={`${S3_URL}/${currentChatUser.profileImage}`}
                  alt="@shadcn"
                />
                <AvatarFallback><Image src={picture} width={52} height={44} alt="User-Profile" className="rounded-full" /></AvatarFallback>

              </Avatar>
              <div className="flex flex-col">
                <p className="font-bold text-md">
                  {currentChatUser.firstname} {currentChatUser.lastname}
                </p>
                <p className="text-md text-[#395E66]">#{currentChatId}</p>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <div className="border-2 py-2 px-5 flex justify-between items-center gap-5 cursor-pointer">
                  <p className="text-sm">Mark as </p>
                  <ArrowDownCircleIcon size={15} />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem className="cursor-pointer" onClick={() => handleChatClose(currentChatId)}>Completed</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          {loader ?
            <div className="flex justify-center items-center">
              <Loader2 className="animate-spin" />
            </div> :
            <div className="flex flex-col justify-between w-full">
              <div className="flex flex-col w-full">
                <div
                  ref={chatContainerRef}
                  className="flex-grow p-4 w-full border-gray-300 max-h-[650px] min-h-[650px] overflow-y-auto"
                >
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
                                isFirstMessage={index === 0}
                                key={msg._id}
                                id={msg._id}
                                content={msg.text}
                                media={msg.media}
                                isAdmin={msg.isAdmin}
                                day={showDate ? formatDate(msg.createdAt) : ""}
                                createdAt={formatShortDuration(msg.createdAt)}
                                supportTicket={currentChatId}
                              />
                            );
                          }
                        );
                      })()
                    )}
                    {imagePreview && (
                      <div className="flex justify-end pr-5 w-full relative">
                        <button
                          type="button"
                          onClick={handleCancelPreview}
                          className="absolute -top-2 right-1 p-1  text-white bg-red-600 rounded-full"
                        >
                          <XCircleIcon size={24} className="text-white" />
                        </button>
                        <Image
                          src={imagePreview}
                          alt="Preview"
                          width={400}
                          height={400}
                          className="object-cover rounded-lg size-60 mt-1"
                        />
                      </div>
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
                        onChange={(e) => handleImageChange(e)}
                      />
                    </div>
                    <Input
                      type="text"
                      id="link"
                      placeholder="Write your message here"
                      className="flex-grow mr-2 border-none px-2 focus-visible:ring-transparent"
                      value={text}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
                    />
                    <Button
                      type="submit"
                      className="size-12 bg-primaryCol hover:bg-primaryCol rounded-full"
                    >
                      <SendHorizontal className="size-16 text-white" />
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          }
        </>
      )}
    </div>
  );
}
