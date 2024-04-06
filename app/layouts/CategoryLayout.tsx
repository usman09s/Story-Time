import SearchBar from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function CategoryLayout({
  children,
  buttonText,
  title,
  isCategory,
  id,
}: {
  children: React.ReactNode;
  title: string;
  buttonText: string;
  isCategory: boolean;
  id?: string;
}) {
  return (
    <div className="px-10">
      <section>
        <h1 className="text-4xl font-bold text-[#093732]">{title}</h1>
      </section>

      <div className="flex justify-between my-10">
        <SearchBar initialValue=""/>
        <Link href={isCategory ? "/categories/add" : `/categories/add/${id}`}>
          <Button className={"bg-[#395E66] hover:bg-[#395e66d7]"}>
            {buttonText}
          </Button>
        </Link>
      </div>
      <div className="flex flex-wrap gap-4 pb-10">{children}</div>
    </div>
  );
}
