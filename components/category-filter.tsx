import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  
import Image from "next/image"
import filter from '@/public/assets/filterIcon.png'
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
export default function CategoryFilter() {

  
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
  const handleFilter = (sort:string) => {
    router.push(`${pathname}?${createQueryString("sort", sort)}`);
  }

  return (
    <DropdownMenu>
    <DropdownMenuTrigger className="text-xs border px-4 py-2 font-normal flex gap-2 items-center">
        High to Low
        <Image src={filter} alt="Icon" width={7} height={7} />
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuLabel>Filter</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem onClick={()=>handleFilter('1')}>Low to High</DropdownMenuItem>
      <DropdownMenuItem onClick={()=>handleFilter('-1')}>High to Low</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
  )
}
