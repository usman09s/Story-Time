import { Skeleton } from "../ui/skeleton";

export const CardSkeleton = () => {
  return (
    <div className="flex flex-wrap gap-4">
      {Array.from({ length: 10 }).map((_: any, idx: number) => (
        <Skeleton
          className="w-64 h-[270px] bg-neutral-300 rounded-2xl"
          key={idx}
        />
      ))}
    </div>
  );
};
