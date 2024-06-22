"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import {  useQuery  } from "@tanstack/react-query";
import { GuidelinesData } from "@/types/types";
import { Notifications } from "@/components/Notification";
import { GuidelineEditor } from "@/components/GuidelineEditor";
import { GuidelineButton } from "@/components/GuidelineButton";
import DashboardLayout from "@/app/layouts/Dashboard";
import { getGuideline } from "@/API/guideline.api";
import GuidelineTabs from "@/app/layouts/GuidelineTabs";

export default function GuidelinePage() {
  const [value, setValue] = useState("");

  // Fetching content
  const { data, isLoading } = useQuery<GuidelinesData>({
    queryKey: ["privacy"],
    queryFn: () => getGuideline("PrivacyPolicy"),
  });

  useEffect(() => {
  setValue(data?.response.guidelines[0].content || ""); 
  }, [data])
  
  console.log(data);
  
  return (
    <DashboardLayout active={5} title="Guidelines">
      <div className="px-10 pb-10">
      <GuidelineTabs path="/guideline/privacy"/>
        <div className="flex gap-4 mt-5">
          <div className="flex flex-col gap-10 w-3/4 justify-between">
            <GuidelineEditor setValue={setValue} value={value} />
            <div className="flex justify-center mt-5">
            <GuidelineButton value={value} type="PrivacyPolicy" title="Privacy Policy"/>
            </div>
          </div>
          <Notifications />
        </div>
      </div>
    </DashboardLayout>
  );
}




