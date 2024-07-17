// components/GuidelinePageComponent.jsx
"use client";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { GuidelinesData } from "@/types/types";
import { Notifications } from "@/components/Notification";
import { GuidelineEditor } from "@/components/GuidelineEditor";
import { GuidelineButton } from "@/components/GuidelineButton";
import DashboardLayout from "@/app/layouts/Dashboard";
import { getGuideline } from "@/API/guideline.api";
import GuidelineTabs from "@/app/layouts/GuidelineTabs";

export default function GuidelinePageComponent({ type, title, tabPath, children }: {
    type: string;
    title: string;
    tabPath: string;
    children?: React.ReactNode;
}) {
    const [value, setValue] = useState("");

    // Fetching content
    const { data, isLoading, isError } = useQuery<GuidelinesData>({
        queryKey: [type],
        queryFn: () => getGuideline(type),
    });

    useEffect(() => {
        if (data?.response?.guidelines?.length ?? 0 > 0) {
            setValue(data?.response.guidelines[0].content || "");
        }

    }, [data]);

    if (isLoading) return <div>Loading...</div>;
    // if (isError || !data || !data.response || !data.response.guidelines) return <div>Error loading data...</div>;

    return (
        <DashboardLayout active={5} title={title}>
            <div className="px-10 pb-10">
                <GuidelineTabs path={tabPath} />
                <div className="flex gap-4 mt-5">
                    <div className="flex flex-col gap-10 w-[80%] justify-between">
                        <GuidelineEditor setValue={setValue} value={value} />
                        <div className="flex justify-center mt-5">
                            <GuidelineButton value={value} type={type} title={title} />
                        </div>
                    </div>
                    <div className="w-[25%]">
                        <Notifications />
                    </div>
                </div>
                {children}
            </div>
        </DashboardLayout>
    );
}
