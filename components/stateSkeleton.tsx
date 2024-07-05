import { Skeleton } from "@/components/ui/skeleton";
  export const StatesSkeleton = () => {
    return (
      <Skeleton className="flex gap-4 rounded-full w-16 h-16">
       <Skeleton className="w-32">
       </Skeleton>
      </Skeleton>
    );
  };

  export default StatesSkeleton
  