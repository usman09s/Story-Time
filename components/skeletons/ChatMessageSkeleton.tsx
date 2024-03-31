import { Skeleton } from "../ui/skeleton";

export const ChatMessageSkeleton = () => {
  return (
    <div className="flex flex-col gap-y-1 mb-5">
      {Array.from({ length: 5 }).map((_: any, idx: number) => (
        <Skeleton
          className={
            `w-[60%] h-[70px] bg-neutral-300 rounded-lg ${(idx + 1) % 3 === 0 ? 'self-start' : 'self-end'}`
          }
          key={idx}
        />
      ))}
    </div>
  );
};
