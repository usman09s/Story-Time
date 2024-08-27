import React, { useState } from "react";
import { Bell, X, ArrowRight, Info } from "lucide-react"; // Added Info icon for no data
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "./ui/badge";
import { getNotifications } from "@/API/notiifications";
import { Notification, NotificationResponse } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import { formatShortDuration } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function NotificationMessageSheet() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  // Use the useQuery hook to fetch data
  const { data, isLoading, isError } = useQuery<NotificationResponse>({
    queryKey: ["notifications-events"],
    queryFn: () => getNotifications("SUPPORT_MESSAGE"),
    enabled: open,
  });

  const handleRidirect = (userId: string, chatId: string) => {
    router.push(`/support?chatId=${chatId}&userId=${userId}`);
    setOpen(false);
  };

  console.log(data);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Image
          src={"/assets/bell.png"}
          alt="Notification Icon"
          width={30}
          height={10}
          className="cursor-pointer"
        />
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader className="border-b pb-4 mb-4">
          <SheetTitle className="text-left text-2xl font-bold">
            Notifications
          </SheetTitle>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4"
            onClick={() => setOpen(false)}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </SheetHeader>
        <div className="flex items-center mb-4">
          <h3 className="text-sm font-medium text-muted-foreground">
            Recent Messages
          </h3>
        </div>
        <ScrollArea className="h-[calc(100vh-10rem)] pr-4">
          {isLoading ? (
            <div className="flex justify-center items-center h-full">
              <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent"></div>
            </div>
          ) : isError ? (
            <div className="flex justify-center items-center h-full">
              {/* Error state if fetching fails */}
              <div className="text-center text-red-500">
                <Info className="mx-auto mb-2" />
                <p>Failed to load notifications.</p>
              </div>
            </div>
          ) : data && data.response && data.response.data?.length === 0 ? (
            <div className="flex justify-center items-center h-full">
              {/* No data available */}
              <div className="flex flex-col items-center justify-center h-full w-full text-center text-muted-foreground">
                <Info className="mx-auto mb-2" />
                <p>No notifications available.</p>
              </div>
            </div>
          ) : (
            data?.response?.data?.map((message: Notification) => (
              <div
                key={message._id}
                className={`mb-4 flex items-start space-x-4 rounded-lg p-4 transition-all hover:bg-accent cursor-pointer ${
                  message.isRead ? "bg-accent/50" : ""
                }`}
                onClick={() => handleRidirect(message.sender._id, "xxx-xx")}
              >
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={message?.sender?.profilePicture}
                    alt={"Profile Picture"}
                  />
                  <AvatarFallback>
                    {message?.sender?.firstName[0] +
                      message?.sender?.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {message.sender.firstName} {message.sender.lastName}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {message.body}
                  </p>
                  <div className="flex items-center pt-1">
                    <p className="text-xs text-muted-foreground">
                      {formatShortDuration(message.createdAt)}
                    </p>
                    {!message.isRead && (
                      <Badge variant="secondary" className="ml-2 text-[10px]">
                        New
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
