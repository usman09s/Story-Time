import { Skeleton } from "../ui/skeleton";

export const MessagesSkeleton = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="w-full p-4">
        <Skeleton className="h-12 m-4" />
        <Skeleton className="h-12 m-4" />
        <Skeleton className="h-12 m-4" />
        <Skeleton className="h-12 m-4" />
        <Skeleton className="h-12 m-4" />
        <Skeleton className="h-12 m-4" />
      </div>
    </div>
  );
};
