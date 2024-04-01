import { Skeleton } from "../ui/skeleton";

export const ChatListSkeleton = () => {
  return (
    <div className="flex flex-col gap-y-1 mb-5">
      {Array.from({ length: 10 }).map((_: any, idx: number) => (
        <Skeleton
          className="w-full h-[70px] bg-neutral-300 rounded-lg"
          key={idx}
        />
      ))}
    </div>
  );
};
