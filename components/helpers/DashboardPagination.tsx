"use client";

import { PaginationTypes } from "@/types/types";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const DashboardPagination = ({ data }: { data: PaginationTypes }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const {
    currentPage,
    hasNextPage,
    hasPrevPage,
    perPage,
    totalItems,
  } = data;

  const handlePageChange = (pageNumber: number) => {
    const queryParams = new URLSearchParams(searchParams);
    queryParams.set("page", pageNumber.toString());

    const queryString = queryParams.toString();
    router.push(`${pathname}?${queryString}`, { scroll: false });
  };

  return (
    <div className="flex justify-end items-center gap-10">
      <div>
        <h1>Rows per page: {perPage}</h1>
      </div>
      <div>
        <h1>1-10 of {totalItems}</h1>
      </div>
      <div className="flex gap-6 mr-16">
        <button
          disabled={!hasPrevPage}
          className="cursor-pointer disabled:opacity-60"
          onClick={() => handlePageChange(currentPage - 1)}
        >
          <ChevronLeft className="size-5" />
        </button>
        <button
          disabled={!hasNextPage}
          className="disabled:opacity-60 cursor-pointer"
          onClick={() => handlePageChange(currentPage + 1)}
        >
          <ChevronRight className="size-5" />
        </button>
      </div>
    </div>
  );
};
