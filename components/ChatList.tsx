import { useEffect } from "react";
import { useChatStore } from "@/store/socket.store";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { UserMessageList } from "@/components/UserMessageList";
import { ChatListSkeleton } from "@/components/skeletons/ChatListSkeleton";
import socketServcies from "@/socket/socket";
import { SupportChatOverview } from "@/types/types";

export default function ChatList() {
  const { chatList,currentChatId,fetchChatList } = useChatStore();

  useEffect(() => {
    fetchChatList();
 
  }, [currentChatId]);

  
  return (
    <div className="max-w-80 w-full flex flex-col border-2 border-borderCol h-[800px] ">
      <div className="relative border-b-2 border-borderCol">
        <Input
          placeholder="Search Message"
          className="px-16 mt-2 py-8 border-none placeholder:text-lg placeholder:opacity-30"
        />
        <Search className="size-9 text-primaryCol absolute top-7 left-3" />
      </div>
      {!chatList ? (
        <ChatListSkeleton />
      ) : (
        chatList?.length > 0 &&
        chatList.map((chatItem:SupportChatOverview) => (
          <UserMessageList
            key={chatItem.chat._id + chatItem.chat.createdAt}
            chat={chatItem}
            
            activeChatId={currentChatId!}
          />
        ))
      )}
    </div>
  );
}
