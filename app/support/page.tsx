'use client'
import ChatList from "@/components/ChatList";
import ChatDetails from "@/components/ChatDetails";
import { useChatStore } from "@/store/socket.store";
import { useEffect } from "react";
import DashboardLayout from "../layouts/Dashboard";
import socketServcies from "@/socket/socket";
interface Params {
  searchParams: {
    chatId: string;
  };
}

export default function Support({ searchParams }: Params) {
  const { chatId: initialChatId } = searchParams;
  const { setCurrentChatId } = useChatStore();

  useEffect(() => {
    const token = localStorage.getItem("access-token");
    if (!token) return;

    socketServcies.initializeSocket(token);

    socketServcies.on("connect", () => {
      console.log("Socket connected");
    });
    setCurrentChatId(initialChatId);

    // socketServcies.on(`send-message-669a77fef4655307868f35f1`,(data:any)=>{
    //   console.log("Connected send message");
    //   console.log(data);
    // })

    
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
