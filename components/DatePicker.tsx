"use client";

import * as React from "react";

import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";

interface Props {
  date: Date | undefined;
  setDate: any
}

export function DatePicker({ date, setDate }: Props) {
  return (
    <Popover >
      <PopoverTrigger asChild>
        <Image
          className="cursor-pointer mr-2 "
          src={"/assets/Date.png"}
          alt=""
          width={45}
          height={45}
        />
      </PopoverTrigger>
      <PopoverContent className=" p-0">
        <Calendar
        
        modifiersStyles={{
          selected: { borderRadius: "100px" },
          today: { borderRadius: "100px" },
        }}
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
