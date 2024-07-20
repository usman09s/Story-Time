"use client";
import { Input } from "./ui/input";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "@uidotdev/usehooks";

export default function SearchBar({ initialValue,placeHolder }: { initialValue: string,placeHolder?:string }) {
  const [value, setValue] = useState(initialValue);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const query = useDebounce(value, 700);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);
      params.delete("page");
      return params.toString();
    },
    [searchParams]
  );

  useEffect(() => {
    const currentQuery = searchParams.get("search") || "";

    // Reset page to 1 only when the search query changes
    if (query !== currentQuery) {
      router.push(`${pathname}?${createQueryString("search", query)}`);
    }
  }, [query, router, pathname, searchParams, createQueryString]);

  return (
    <div className="w-96 relative">
      <Input
        placeholder={`${placeHolder || "Search"}`}
        className="px-10 border-black placeholder:text-black placeholder:font-semibold focus:border-none placeholder:opacity-70"
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setValue(e.target.value)
        }
      />
      <Search className="size-5 text-primaryCol top-2.5 left-4 absolute" />
    </div>
  );
}
