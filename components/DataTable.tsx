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
import picture from "@/public/assets/dummy-user.webp";
import { CategoryType, Story } from "@/types/types";
import { toggleUserBlock } from "@/API/dashboard.api";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { S3_URL } from "@/lib/utils";
import CategoryBox from "./category-box";
import { stat } from "fs";

interface DataTableProps {
  TableHeading: string[];
  TableData: (Story | CategoryType)[]; // Allow both types
  status: string
}

export const DataTable: FC<DataTableProps> = ({ TableData, TableHeading, status }) => {
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [showModalRowIndex, setShowModalRowIndex] = useState<number | null>(null);
  const queryClient = useQueryClient();

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
    const { success, response } = await toggleUserBlock(id);
    if (!success) return toast.error(response);
    if (success) toast.success(response);
    queryClient.invalidateQueries({ queryKey: ['users'] });
  };

  console.log("~ TableData", TableData);
  
  return (
    <div>
      <Table className="mt-3">
        <TableHeader>
          <TableRow className="bg-[#395E66] hover:bg-[#395e66e2] w-full rounded-sm h-5">
         
            <TableHead className="w-96">
              <div className="flex items-center gap-6">
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={() => setSelectAll(!selectAll)}
                  className="cursor-pointer h-4 w-4 shadow border-[#E8E8E8] checked:bg-[#439A86] focus:ring-0 checked:text-[#439A86]"
                />
                <label htmlFor="name" className="font-bold text-white">{status == 'category' ? 'NAMES' : 'PROFILE'}</label>
              </div>
            </TableHead>
            {TableHeading.map((heading, index) => (
              <TableHead key={`${heading}-${index}`} className={`font-semibold text-white text-center ${status == 'category' ? 'flex justify-end pt-3' : null}`}>
                {heading.toUpperCase()}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>

          {status != 'category' && TableData.map((row, index) => (
            <TableRow key={row._id} className="text-center relative">
              {status !== 'category' && 
              <TableCell className="w-52">
                <div className="flex items-center gap-6">
                  <input
                    type="checkbox"
                    checked={selectAll || selectedRows.includes(index)}
                    onChange={() => handleCheckboxChange(index)}
                    className="h-4 w-4 border-[#E8E8E8] shadow checked:bg-[#439A86] focus:ring-0 checked:text-[#439A86]"
                  />
                  <div className="flex gap-2 items-center">
                      <>
                        {/* Assuming row is of type Story in this case */}
                        <Avatar>
                          <AvatarImage
                            src={`${S3_URL}/${(row as Story).creator?.profileImage || ""}`}
                            alt="@shadcn"
                          />
                          <AvatarFallback>
                            <Image src={picture} width={52} height={44} alt="User-Profile" className="rounded-full" />
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col gap-1">
                          <p className="font-bold text-start">{(row as Story).creator?.firstName || "N/A"}</p> {/* User Name */}
                          <p>{(row as Story).creator?.email || "No email"}</p> {/* User Email */}
                        </div>
                      </>
                  </div>
                </div>
              </TableCell>
                }
              <TableCell className="w-60">
                <div className="inline-block text-center space-y-2">
                    <CategoryBox category={(row as Story).category} image={(row as Story).categoryImage} type={(row as Story).type} />
                </div>
              </TableCell>
              <TableCell className="w-60">
                <div className="inline-block text-center space-y-2">
                  {(row as Story).likesCount || 0} {/* Type assertion here */}
                </div>
              </TableCell>
              <TableCell>{(row as Story).creator?.username || "Unknown User"}</TableCell> {/* Type assertion here */}
              <TableCell>
                <p className={`${(row as Story).creator?.isActive ? "text-green-500" : "text-red-600"} font-semibold`}>
                  {(row as Story).creator?.isActive ? "Active" : "Inactive"} {/* Type assertion here */}
                </p>
              </TableCell>
              <TableCell>
                <Image
                  onClick={() => setShowModalRowIndex(showModalRowIndex === index ? null : index)}
                  src="/assets/More.png"
                  alt="Icon"
                  width={6}
                  height={10}
                  className="cursor-pointer"
                />
              </TableCell>
              {showModalRowIndex === index && (
                <div className="absolute z-50 right-20 mt-2 w-36 bg-white shadow-lg p-4">
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-2 cursor-pointer" onClick={() => toggleUser(row._id)}>
                      <Image src="/assets/Disable.png" alt="Disable User" width={20} height={20} />
                      <p className="text-xs">Disable User</p>
                    </div>
                    <div className="flex gap-2 cursor-pointer" onClick={() => toggleUser(row._id)}>
                      <Image src="/assets/Enable.png" alt="Enable User" width={20} height={20} />
                      <p className="text-xs">Enable User</p>
                    </div>
                  </div>
                </div>
              )}
            </TableRow>
          ))}

          {status == 'category' && TableData.map((row, index) => (
            <TableRow key={row._id} className="">
 <TableCell className="w-52">
                <div className="flex items-center gap-6">
                  <input
                    type="checkbox"
                    checked={selectAll || selectedRows.includes(index)}
                    onChange={() => handleCheckboxChange(index)}
                    className="h-4 w-4 border-[#E8E8E8] shadow checked:bg-[#439A86] focus:ring-0 checked:text-[#439A86]"
                  />
                  <div className="flex gap-2 items-center">
                      <>
                        {/* Assuming row is of type Story in this case */}
                        <Avatar>
                          <AvatarImage
                            src={`${S3_URL}/${(row as CategoryType).image || ""}`}
                            alt="@shadcn"
                          />
                          <AvatarFallback>
                            <Image src={picture} width={52} height={44} alt="User-Profile" className="rounded-full" />
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col gap-1">
                          <p className="font-bold text-start">{(row as CategoryType).name || "N/A"}</p> {/* User Name */}
                          {/* <p>{(row as Story).creator?.email || "No email"}</p> User Email */}
                        </div>
                      </>
                  </div>
                </div>
              </TableCell>
              <TableCell className="flex justify-end px-14">
                <div className="inline-block text-center space-y-2 items-center">
                  {(row as CategoryType).totalLikes || 0}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
