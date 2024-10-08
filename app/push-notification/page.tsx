"use client";
import React, { useState } from "react";
import DashboardLayout from "../layouts/Dashboard";
import PushInfomation from "@/components/PushInfomation";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getNotifications, pushNotification } from "@/API/notiifications";
import { dateFormat } from "@/lib/dateFormat";
import { NotificationType } from "@/types/types";
import { BellOff, Loader2 } from "lucide-react";
import { PushNotificationsSkeleton } from "@/components/skeletons/PushNotificationsSkeleton";

export default function NotificationPage() {
  const queryClient = useQueryClient();
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [sendToAll, setSendToAll] = useState(false);
  const [date, setDate] = useState<Date | undefined>();

  // Fetching all notifications
  const { data, isLoading } = useQuery<NotificationType>({
    queryKey: ["notifications-events"],
    queryFn: () => getNotifications("ADMIN_NOTIFICATION"),
  });

  // Pushing Notification
  const { mutateAsync, isPending } = useMutation({
    mutationFn: pushNotification,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["notifications-events"] }),
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
      <div className="flex border-[#E4E4E4] rounded-lg border mx-10 mt-5 mb-16 p-2 gap-2">
        <div className="flex-grow rounded-lg flex-col border-[#E4E4E4] w-[75%]">
          <div className="bg-white pb-6 rounded-md border">
            <PushInfomation
              date={date}
              sendToAll={sendToAll}
              setDate={setDate}
              setSendToAll={setSendToAll}
              setTitle={setTitle}
              title={title}
            />
          </div>
          <div className="mt-2 rounded-md bg-white border">
            <div className="border-[#E4E4E4]">
              <textarea
                name=""
                id=""
                onChange={(e) => setValue(e.target.value)}
                value={value}
                className="!border-none w-full px-7 pt-5" // Adjusted to w-full for full width
                rows={21}
                cols={140}
                placeholder="Write Notification text"
              />
            </div>
          </div>
          <div className="flex justify-center my-3">
            <Button
              onClick={handleSubmit}
              disabled={isPending}
              className="bg-primaryCol px-20 py-6 hover:bg-[#395e66b9] flex items-center justify-center"
            >
              {isPending ? "Sending..." : "Push Notification"}
              {isPending && <Loader2 className="animate-spin mr-2" />}
            </Button>
          </div>
        </div>

        {/* Conditional rendering of the history section */}
        <div className="w-96 h-[739px] bg-white p-10 border border-[#E4E4E4] rounded-lg">
          {isLoading ? (
            <PushNotificationsSkeleton />
          ) : data &&
            data.response &&
            data?.response?.data?.length > 0 ? (
            <>
              <p className="mb-3 text-lg font-medium text-[#50555C] mx-5">
                History
              </p>
              <div className="flex flex-col space-y-4 border-l-2 border-[#D9D9D9] border-dashed px-2 pb-2">
                {data?.response?.data.map((notif) => (
                  <div key={notif._id} className="flex items-center gap-3 pl-3">
                    <p className="text-sm text-[#979797]">
                      {dateFormat(notif.createdAt)}
                    </p>
                    <p className="text-sm text-[#979797]">
                      Notification was sent
                    </p>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <BellOff className="text-[#50555C] mb-3" size={32} />
              <p className="text-md font-medium text-[#50555C]">
                Notification not found
              </p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
