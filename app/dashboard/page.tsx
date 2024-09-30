"use client";
import DashboardLayout from "../layouts/Dashboard";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/DataTable";
import { CategoryHeading, Heading } from "@/types/data";
import SearchBar from "@/components/SearchBar";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "@/API/dashboard.api";
import { Download } from "lucide-react";
import { DashboardPagination } from "@/components/helpers/DashboardPagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { UserSkeleton } from "@/components/skeletons/UserSkeleton";
import { MostLikedCategories, MostLikedPosts } from "@/types/types";
import { CSVLink } from "react-csv";
import { categoryHeaders, headers } from "@/lib/utils";
import Count from "@/components/Count";
import MonthFilterDropdown from "@/components/Months-filter-dropdown";
import { mostLikedCategories } from "@/API/categories.api";

interface Params {
  searchParams: {
    page: number;
    limit: number;
    search: string;
    status: "active" | "inactive" | "category" | undefined;
    month: string;
    sort:string
  };
}

export default function Dashboard({ searchParams }: Params) {
  const { page, limit, search, status = "", month,sort } = searchParams;

  const { data, isLoading } = useQuery<MostLikedPosts>({
    queryKey: ["users", page, limit, search, status, month],
    queryFn: () => getUsers({ page, limit, search, status: status || "", month }),
    enabled: status !== "category",
  });

  const { data: category, isLoading: categoryLoading } = useQuery<MostLikedCategories>({
    queryKey: ["category-most-liked", page, limit, search, month,sort],
    queryFn: () => mostLikedCategories({ page, limit, search, month,sort }),
    enabled: status == "category",
  });

  const pathname = usePathname();
  const urlSearchParams = useSearchParams();
  const router = useRouter();

  // Create a query string for navigation
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(urlSearchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [urlSearchParams]
  );

  // Handle status button click
  const handleStatusClick = (newStatus: string) => {
    router.push(`${pathname}?${createQueryString("status", newStatus)}`);
  };

  const statuses = [
    { label: "All", value: "" },
    { label: "Active", value: "active" },
    { label: "Inactive", value: "inactive" },
    { label: "Most Selected Categories", value: "category" },
  ];

  const csvData = status === 'category' ? category?.response?.data || [] : data?.response?.stories || [];
  const csvHeader = status === 'category' ? categoryHeaders : headers;

  return (
    <DashboardLayout active={1} title="Dashboard & Users">
      <div className="flex flex-col min-h-screen">
        <div className="flex-1 overflow-y-auto">
          <div className="pl-10">
            <section>
              <Count />
              <div className="flex gap-10 border-b-2 text-center border-[#E44173] pb-4 relative">
                {statuses.map(({ label, value }) => (
                  <button
                    key={value}
                    className={`${status === value ? "font-bold text-primaryCol" : "opacity-50"} text-center cursor-pointer`}
                    onClick={() => handleStatusClick(value)}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </section>
          </div>

          <div className="flex justify-between px-10 mt-5 my-2">
            <SearchBar initialValue={search || ""} placeHolder="Search users" />
            <div className="flex justify-center gap-5 items-center">
              {csvData.length > 0 && (
                <Button
                  variant="outline"
                  className="border-[#395E66] flex gap-2 items-center text-[#395E66]"
                >
                  <CSVLink
                    data={csvData}
                    headers={csvHeader}
                    className="flex gap-2 items-center"
                  >
                    Export CSV <Download className="size-5" target="_blank" />
                  </CSVLink>
                </Button>
              )}
              <MonthFilterDropdown />
            </div>

          </div>

          <div className="mx-10">
            {isLoading || categoryLoading ? (
              <UserSkeleton />
            ) : (
              <>
                {/* Check if status is 'category' */}
                {status === 'category' ? (
                  <>
                    {category?.success && category?.response?.data?.length > 0 ? (
                      <DataTable
                        TableData={category.response.data || []}
                        TableHeading={CategoryHeading}
                        status={status}
                      />
                    ) : (
                      <h2 className="text-black text-4xl font-bold mt-2">No category results</h2>
                    )}
                  </>
                ) : (
                  <>
                    {data?.success && data.response?.stories?.length > 0 ? (
                      <DataTable
                        TableData={data.response.stories || []}
                        TableHeading={Heading}
                        status={status}
                      />
                    ) : (
                      <h2 className="text-black text-4xl font-bold mt-2">No stories found</h2>
                    )}
                  </>
                )}
              </>
            )}
          </div>

        </div>

        <footer className="bg-[#395E66] text-white text-center py-4 w-full mx-10">
          {(status === 'category' ? category?.response?.pagination : data?.response?.pagination) && (
            <DashboardPagination
              data={status === 'category'
                ? category?.response?.pagination || {}
                : data?.response?.pagination || {}}
            />
          )}
        </footer>
      </div>
    </DashboardLayout>
  );
}
