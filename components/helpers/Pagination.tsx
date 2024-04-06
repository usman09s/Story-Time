"use client";
import { PaginationTypes } from "@/types/types";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Pagination({ data }: { data: PaginationTypes }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { currentPage, hasNextPage, hasPrevPage } = data;

  const handlePageChange = (pageNumber: number) => {
    const queryParams = new URLSearchParams(searchParams);
    queryParams.set("page", pageNumber.toString());

    const queryString = queryParams.toString();
    router.push(`${pathname}?${queryString}`, { scroll: false });
  };

  return (
    <div className="flex justify-end items-center pb-10 pr-10">
      <div className="flex items-center gap-1">
        <button
          disabled={!hasPrevPage}
          className="disabled:bg-gray-300 disabled:cursor-not-allowed text-black px-4 py-2 rounded flex items-center border"
          onClick={() => handlePageChange(currentPage - 1)}
        >
          <ChevronLeft className="size-3" />
          <span className="ml-1">Previous</span>
        </button>
        {hasPrevPage && (
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            className="bg-bg text-black px-4 py-2 rounded border"
          >
            {currentPage - 1}
          </button>
        )}
        <button className="bg-primaryCol border text-white px-4 py-2 rounded ">
          {currentPage}
        </button>
        {hasNextPage && (
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className="bg-bg text-black px-4 py-2 rounded border"
          >
            {currentPage + 1}
          </button>
        )}
        <button
          disabled={!hasNextPage}
          className=" disabled:bg-gray-300 disabled:cursor-not-allowed text-black px-4 py-2 rounded flex items-center border"
          onClick={() => handlePageChange(currentPage + 1)}
        >
          <span className="mr-1">Next</span>
          <ChevronRight className="size-3" />
        </button>
      </div>
    </div>
  );
}
