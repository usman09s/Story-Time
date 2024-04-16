import { Skeleton } from "../ui/skeleton";

export const UserSkeleton = () => {
  return (
    <div className="flex flex-col gap-y-2 mb-5">
      {Array.from({ length: 15 }).map((_: any, idx: number) => (
        <Skeleton
          className="w-full h-[50px] bg-neutral-300 rounded-2xl"
          key={idx}
        />
      ))}
    </div>
  );
};
