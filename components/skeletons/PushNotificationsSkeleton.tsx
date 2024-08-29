import { Skeleton } from "../ui/skeleton";

export const PushNotificationsSkeleton = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="w-full">
        <Skeleton className="h-10 m-4" />
        <Skeleton className="h-10 m-4" />
        <Skeleton className="h-10 m-4" />
        <Skeleton className="h-10 m-4" />
        <Skeleton className="h-10 m-4" />
        <Skeleton className="h-10 m-4" />
        <Skeleton className="h-10 m-4" />
        <Skeleton className="h-10 m-4" />
        <Skeleton className="h-10 m-4" />
      </div>
    </div>
  );
};
