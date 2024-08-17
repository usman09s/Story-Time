import React from 'react'
import StatesSkeleton from './stateSkeleton'
import States from './states'
import { useQuery } from '@tanstack/react-query';
import { userCount } from '@/API/dashboard.api';

export default function Count() {
    const { data: count, isLoading: loading } = useQuery({
        queryKey: ["user-count"],
        queryFn: userCount
    });

    return (
        <div className="flex w-full items-center gap-10 my-6">
            {
                loading ?
                    <>
                        <StatesSkeleton />
                        <StatesSkeleton />
                        <StatesSkeleton />
                    </>
                    : (
                        <>
                            <States iconPath="done" title="Total Downloads" total="1.4k" />
                            <States iconPath="mark2" title="Guests" total={`${count?.response.guestCount}`} />
                            <States iconPath="star2" title="Premium Users" total={`${count?.response.premiumUsersCount}`} />
                        </>
                    )
            }

        </div>
    )
}
