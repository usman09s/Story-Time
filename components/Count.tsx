import React from 'react';
import StatesSkeleton from './stateSkeleton';
import States from './states';
import { useQuery } from '@tanstack/react-query';
import { totalDownloads, userCount } from '@/API/dashboard.api';

export default function Count() {

    const {
        data: countData,
        isLoading: isLoadingCount,
        isError: isErrorCount,
    } = useQuery({queryKey:["user-count"],queryFn:userCount});

    const {
        data: totalDownloadData,
        isLoading: isLoadingDownloads,
        isError: isErrorDownloads,
    } = useQuery({queryKey:["total-download-count"], queryFn:totalDownloads});

    const isLoading = isLoadingCount || isLoadingDownloads;
    const hasError = isErrorCount || isErrorDownloads;

    const statesData = [
        {
            iconPath: "done",
            title: "Total Downloads",
            total: totalDownloadData?.response.keyEvents || "N/A"
        },
        {
            iconPath: "mark2",
            title: "Guests",
            total: countData?.response.guestCount || "N/A"
        },
        {
            iconPath: "star2",
            title: "Premium Users",
            total: countData?.response.premiumUsersCount || "N/A"
        },
        {
            iconPath: "star2",
            title: "Non-Premium Users",
            total: countData?.response.nonPremiumUsersCount || "N/A"
        }
    ];

    if (isLoading) {
        return (
            <div className="flex w-full items-center gap-10 my-6">
                <StatesSkeleton />
                <StatesSkeleton />
                <StatesSkeleton />
                <StatesSkeleton />
            </div>
        );
    }

    if (hasError) {
        return (
            <div className="flex w-full items-center justify-center my-6">
                <p>Error loading data. Please try again later.</p>
            </div>
        );
    }

    return (
        <div className="flex w-full items-center gap-10 my-6">
            {statesData.map((state, index) => (
                <States key={index+state.title} iconPath={state.iconPath} title={state.title} total={`${state.total}`} />
            ))}
        </div>
    );
}
