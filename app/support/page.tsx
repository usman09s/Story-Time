'use client'
import ChatList from "@/components/ChatList";
import ChatDetails from "@/components/ChatDetails";
import { useChatStore } from "@/store/socket.store";
import { useEffect } from "react";
import DashboardLayout from "../layouts/Dashboard";

interface Params {
  searchParams: {
    chatId: string;
  };
}

export default function Support({ searchParams }: Params) {
  const { chatId: initialChatId } = searchParams;
  const { setCurrentChatId } = useChatStore();

  useEffect(() => {
    setCurrentChatId(initialChatId);
  }, [initialChatId, setCurrentChatId]);

  return (
    <DashboardLayout active={4} title="Support">
      <section className="px-10 mb-20">
        <div className="border-2 border-borderCol mt-10 h-[800px] flex">
          <ChatList />
          <ChatDetails />
        </div>
      </section>
    </DashboardLayout>
  );
}
