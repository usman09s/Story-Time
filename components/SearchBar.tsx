import Image from "next/image";
import { Input } from "./ui/input";

export default function SearchBar() {
  return (
    <div className="w-96 relative">
      <Input
        placeholder="Search User"
        className="px-10 border-black placeholder:text-black placeholder:font-semibold focus:border-none placeholder:opacity-70"
      />
      <Image
        src={"/assets/Search.svg"}
        alt="Icon"
        width={17}
        height={12}
        className="top-3 left-4 absolute"
      />
    </div>
  );
}
