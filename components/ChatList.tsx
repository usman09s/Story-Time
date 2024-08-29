import { memo, useEffect, useState } from "react";
import { useChatStore } from "@/store/socket.store";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import UserMessageList from "@/components/UserMessageList";
import { ChatListSkeleton } from "@/components/skeletons/ChatListSkeleton";
import { SupportChatOverview } from "@/types/types";

const ChatList = memo(function ChatList() {
  const { chatList, currentChatId, fetchChatList, isChatListLoading } =
    useChatStore();
  const [search, setSearch] = useState("");
  useEffect(() => {
    fetchChatList(search);
  }, [currentChatId, search]);

  return (
    <div className="max-w-80 w-full flex flex-col border border-borderCol h-[800px] overflow-y-hidden">
      <div className="relative border-b border-borderCol">
        <Input
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Messages"
          className="px-16 mt-2 py-7 mb-2 placeholder:text-lg placeholder:opacity-30 border-none   focus-visible:ring-transparent"
        />
        <Search className="size-9 text-primaryCol absolute top-6 left-5" />
      </div>
      <div>
        {isChatListLoading ? (
          <ChatListSkeleton />
        ) : (
          chatList?.length > 0 &&
          chatList.map((chatItem: SupportChatOverview) => (
            <UserMessageList
              key={chatItem.chat._id + chatItem.chat.createdAt}
              chat={chatItem}
              activeChatId={currentChatId!}
            />
          ))
        )}
      </div>
    </div>
  );
});

export default ChatList;
