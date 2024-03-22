"use client";
import Image from "next/image";
import { FC, useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import DeleteCategories from "./DeleteCategories";

interface card {
  image: string;
  title: string;
  status: string;
  navigation: boolean;
  id?: string;
}
export const Card: FC<card> = ({ image, status, title, navigation, id }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="w-64 border-2 border-[#DBDBDB] h-[270px] p-3 rounded-2xl flex flex-col justify-between">
      <div className="flex justify-end">
        <Image
          src={`/assets/More.png`}
          alt="3 Dot"
          width={6}
          height={5}
          className="cursor-pointer"
          onClick={() => setOpen(!open)}
        />
      </div>
      {open ? <DeleteCategories /> : null}
      <div className="flex flex-col justify-between items-center">
        <Link href={navigation ? `/categories/${id}` : ""}>
          <Image
            alt="Category Picture"
            src={`/assets/${image}.png`}
            width={152}
            height={132}
          />
        </Link>
        <div className="text-center mt-4">
          <p className="font-bold text-black text-lg">{title}</p>
          <p className="text-black opacity-35 text-sm">{status}</p>
        </div>
      </div>
    </div>
  );
};
