"use client";

import { FC, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AvatarFallback, AvatarImage, Avatar } from "./ui/avatar";
import Image from "next/image";
import { DashboardUser } from "@/types/types";
import { toggleUserBlock } from "@/API/dashboard.api";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { S3_URL } from "@/lib/utils";

interface DataTableProps {
  TableHeading: string[];
  TableData: DashboardUser[];
}
export const DataTable: FC<DataTableProps> = ({ TableData, TableHeading }) => {
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [showModalRowIndex, setShowModalRowIndex] = useState<number | null>(null);
  const queryClient = useQueryClient()
  const handleCheckboxChange = (index: number) => {
    if (selectAll) {
      setSelectedRows([]);
      setSelectAll(false);
    } else {
      const updatedSelectedRows = [...selectedRows];
      if (updatedSelectedRows.includes(index)) {
        updatedSelectedRows.splice(updatedSelectedRows.indexOf(index), 1);
      } else {
        updatedSelectedRows.push(index);
      }
      setSelectedRows(updatedSelectedRows);
    }
  };

  const toggleUser = async (id: string) => {
    const {success, response} = await toggleUserBlock(id);
    if(!success) return toast.error(response);
    if(success)  toast.success(response);
    queryClient.invalidateQueries({ queryKey: ['users'] })
  }
  return (
    <div>
      <Table className="mt-3">
        <TableHeader>
          <TableRow className="bg-[#395E66]  hover:bg-[#395e66e2] w-full rounded-sm h-5">
            <TableHead className="w-96">
              <div className="flex items-center gap-6">
                <input
                  type="checkbox"
                  id="name"
                  checked={selectAll}
                  className="cursor-pointer h-4 w-4 rounded-3xl shadow checked:bg-[#439A86]  focus:ring-0 checked:text-[#439A86]"
                  onChange={() => setSelectAll(!selectAll)}
                />
                <label htmlFor="name" className="font-bold text-white">
                  Profile
                </label>
              </div>
            </TableHead>
            {TableHeading.map((heading, index) => (
              <TableHead
                key={`${heading}-${index}`}
                className="font-bold text-white text-center"
              >
                {heading}
              </TableHead>
            ))}
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {TableData.map((row, index) => (
            <TableRow key={row._id} className="text-center relative">
              <TableCell className="w-52">
                <div className="flex items-center gap-6">
                  <input
                    type="checkbox"
                    checked={selectAll || selectedRows.includes(index)}
                    onChange={() => handleCheckboxChange(index)}
                    className="h-4 w-4 rounded-3xl shadow checked:bg-[#439A86] focus:ring-0 checked:text-[#439A86]"
                  />
                  <div className="flex gap-2 items-center">
                    <Avatar>
                      <AvatarImage
                        src={`${S3_URL}/${row.profileImage}`}
                        alt="@shadcn"
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-1">
                      <p className="font-bold text-start">{row.firstName}</p>
                      <p>{row.email}</p>
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="w-60">
                <div className="inline-block text-center space-y-2">
                  <p className="py-1 rounded-full bg-[#F2F0F9] inline text-center font-bold px-1">
                    {row.videoStoriesCount} video stories
                  </p>
                  <p className="py-1 rounded-full bg-[#F2F0F9] px-2 text-center font-bold">
                    {row.textStoriesCount} text stories
                  </p>
                </div>
              </TableCell>
              <TableCell>{row.username}</TableCell>
              <TableCell>
                <p
                  className={`${
                    row.isActive ? "text-green-500" : "text-red-600"
                  } font-semibold`}
                >
                  {row.isActive ? "Active" : "Inactive"}
                </p>
              </TableCell>
              <TableCell>
                <Image
                  onClick={() =>
                    setShowModalRowIndex(
                      showModalRowIndex === index ? null : index
                    )
                  }
                  src={"/assets/More.png"}
                  alt="Icon"
                  width={6}
                  height={10}
                  className="cursor-pointer"
                />
              </TableCell>
              {showModalRowIndex === index && (
                <div className="absolute z-50 right-20 mt-2 w-36 bg-white shadow-lg p-4">
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-2 cursor-pointer" onClick={()=>toggleUser(row._id)}>
                      <Image src={'/assets/Disable.png'} alt="Disable Button Picture" width={20} height={20}/>
                      <p className="text-xs ">Disable User</p>
                      </div>
                      <div className="flex gap-2 cursor-pointer" onClick={()=>toggleUser(row._id)}>
                      <Image src={'/assets/Enable.png'} alt="Disable Button Picture" width={20} height={20}/>
                      <p className="text-xs ">Enable User</p>
                      </div>
                  </div>
                </div>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
