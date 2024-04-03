"use client";
import { Input } from "./ui/input";
import { ChangeEvent, useCallback, useState } from "react";
import { Search } from "lucide-react";
import debounce from "lodash.debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function SearchBar() {
  const [value, setValue] = useState("");
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(
    searchParams.get("page") ? parseInt(searchParams.get("page") as string) : 1
  );

  // const onChangeSearch = () => performSearch();
  // const debouncedSubmit = debounce(onChangeSearch, 500);
  // const _debouncedSubmmit = useCallback(debouncedSubmit, []);

  const search = (query: string) => {
    setValue(query);
    performSearch(query);
  };

  function performSearch(query: string) {
    const params = new URLSearchParams(searchParams);
    if (!query) {
      params.delete("search");
    } else {
      params.set("search", query);
    }
    if (currentPage > 1) {
      params.set("page", currentPage.toString());
    } else {
      params.delete("page");
    }
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="w-96 relative">
      <Input
        placeholder="Search"
        className="px-10 border-black placeholder:text-black placeholder:font-semibold focus:border-none placeholder:opacity-70"
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) => search(e.target.value)}
      />
      <Search className="size-5 text-primaryCol top-2.5 left-4 absolute" />
    </div>
  );
}
