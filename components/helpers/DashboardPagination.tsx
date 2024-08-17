"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import dropdown from "@/public/assets/dropdown.png";
import { PaginationTypes } from "@/types/types";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const DashboardPagination = ({ data: { currentPage, hasNextPage, hasPrevPage, nextPage, perPage, prevPage, totalItems, totalPages } }: { data: PaginationTypes }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const handlePageChange = (pageNumber: number) => {
    const queryParams = new URLSearchParams(searchParams);
    queryParams.set("page", pageNumber.toString());
    const queryString = queryParams.toString();
    router.push(`${pathname}?${queryString}`, { scroll: false });
  };

  const handleLimitChange = (limit: number) => { 
    const queryParams = new URLSearchParams(searchParams);
    queryParams.set("limit", limit.toString());
    const queryString = queryParams.toString();
    router.push(`${pathname}?${queryString}`, { scroll: false });
  }

  const startItem = (currentPage - 1) * perPage + 1;
   const endItem = Math.min(currentPage * perPage, totalItems);

  return (
    <div className="flex justify-end items-center gap-10">
      <div>
        <div className="flex items-center justify-start gap-2">Rows per page: {perPage}
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Image src={dropdown} alt="Drop Down" width={10} height={10} />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="text-center">
              <DropdownMenuLabel className="text-center">Set Rows </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="flex flex-col items-center justify-center">
              <DropdownMenuItem className="cursor-pointer" onClick={()=>handleLimitChange(10)}>10</DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer" onClick={()=>handleLimitChange(20)}>20</DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer" onClick={()=>handleLimitChange(30)}>30</DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div>
      <h1>{startItem}-{endItem} of {totalItems}</h1>
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
