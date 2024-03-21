import Image from "next/image";
import { Input } from "./ui/input";
import { ChangeEvent, useState } from "react";

export default function SearchBar() {
  const [value, setValue] = useState("");

  return (
    <div className="w-96 relative">
      <Input
        placeholder="Search User"
        className="px-10 border-black placeholder:text-black placeholder:font-semibold focus:border-none placeholder:opacity-70"
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setValue(e.target.value)
        }
      />
      <Image
        src="/assets/Search.svg"
        alt="Search"
        width={17}
        height={12}
        className="top-3 left-4 absolute"
      />
    </div>
  );
}
