import { Skeleton } from "../ui/skeleton";

export const ChatListSkeleton = () => {
  return (
    <div className="flex flex-col gap-y-2 mb-5 mt-2">
      {Array.from({ length: 10 }).map((_: any, idx: number) => (
        <Skeleton
          className="flex-grow h-[70px] bg-neutral-300 rounded-lg box-border mx-2"
          key={idx}
        />
      ))}
    </div>
  );
};
