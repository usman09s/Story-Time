"use client";
import React, { useEffect, useState } from "react";
import DashboardLayout from "../layouts/Dashboard";
import PushInfomation from "@/components/PushInfomation";
import { Button } from "@/components/ui/button";
// import Editor from "@/components/Editor";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getNotifications, pushNotification } from "@/API/notiifications";
import { dateFormat } from "@/lib/dateFormat";
import { NotificationType } from "@/types/types";
import Editor from "@/components/Editor";
import QuillToolbar from "@/components/toolbar";
import { Loader2 } from "lucide-react";

export default function NotificationPage() {
  const queryClient = useQueryClient();
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [sendToAll, setSendToAll] = useState(false);
  const [date, setDate] = useState<Date | undefined>();

  // Fetching all notifications
  const { data, isLoading } = useQuery<NotificationType>({
    queryKey: ["notifications"],
    queryFn: () => getNotifications(),
  });

  // Pushing Notification
  const { mutateAsync, isPending } = useMutation({
    mutationFn: pushNotification,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["notifications"] }),
  });

  const handleSubmit = async () => {
    if (!value) return toast.error("Content is required");
    if (!title) return toast.error("Title is required");
    console.log(value);
    
    const { success, response } = await mutateAsync({
      title,
      message: value,
      sendToAll,
    });
    if (!success) return toast.error(response);
    toast.success("Notification sent");
  };

  return (
    <DashboardLayout active={3} title="Push Notification">
  <div className="flex border-[#E4E4E4] rounded-lg border-2 mx-10 mt-5 mb-16">
    <div className="mt-1 flex-grow ml-1 rounded-lg flex-col border-[#E4E4E4]">
      <div className="bg-white pb-6 rounded-md border-2">
        <PushInfomation
          date={date}
          sendToAll={sendToAll}
          setDate={setDate}
          setSendToAll={setSendToAll}
          setTitle={setTitle}
          title={title}
        />
      </div>
      <div className="mt-2 rounded-md bg-white border-2">
        <div className="border-[#E4E4E4]">
          <textarea
            name=""
            id=""
            onChange={(e) => setValue(e.target.value)}
            value={value}
            className="!border-none"
            rows={21}
            cols={140}
            placeholder="Write Notification text"
          ></textarea>
        </div>
      </div>
      <div className="flex justify-center my-3">
        <Button
          onClick={handleSubmit}
          disabled={isPending}
          className="bg-primaryCol px-20 py-6 hover:bg-[#395e66b9] flex items-center justify-center"
        >
          {isPending ? "Sending..." : "Push Now"}
          {isPending && <Loader2 className="animate-spin mr-2" />}
        </Button>
      </div>
    </div>
    <div className="w-96 h-[735px] bg-white mx-2 p-10 mt-1 border-2 border-[#E4E4E4] rounded-lg">
      <p className="mb-5 text-lg font-semibold">History</p>
      <div className="flex flex-col space-y-4 border-l-2 border-dashed p-3">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          data &&
          data.success &&
          data.response &&
          data.response.notifications.length > 0 &&
          data.response.notifications.map((notif) => (
            <div key={notif._id} className="flex items-center gap-4 px-3">
              <p className="text-sm text-[#979797]">{dateFormat(notif.createdAt)}</p>
              <p className="text-sm text-[#979797]">Notification was sent</p>
            </div>
          ))
        )}
      </div>
    </div>
  </div>
</DashboardLayout>
  );
}
