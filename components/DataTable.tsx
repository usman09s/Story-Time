'use client'

import { FC, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
import { AvatarFallback, AvatarImage,Avatar } from "./ui/avatar";
import Image from "next/image";

  interface User{
    name:string,
    email:string,
    videos:number
    texts:number
    username:string
    accountStatus:string
  }
  interface DataTableProps{
    TableHeading: string[];
    TableData: User[];
  }
export const  DataTable:FC<DataTableProps> =({TableData,TableHeading}) => {

    const [selectAll, setSelectAll] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);

    const handleCheckboxChange = (index: number) => {
        if (selectAll) {
          setSelectedRows([]);
          setSelectAll(false);
        } else {
          const updatedSelectedRows = [...selectedRows];
          if (updatedSelectedRows.includes(index as never)) {
            updatedSelectedRows.splice(
              updatedSelectedRows.indexOf(index as never),
              1
            );
          } else {
            updatedSelectedRows.push(index as never);
          }
          setSelectedRows(updatedSelectedRows);
        }
      };


  return (
    <div>
<Table className="mt-3">
        <TableHeader>
          <TableRow className="bg-[#395E66]  hover:bg-[#395e66e2] w-full rounded-sm h-5">
            <TableHead className="   w-96">
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
    <TableHead key={index} className="font-bold text-white text-center">
      {heading}
    </TableHead>
   
  ))}
  <TableHead>

  </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
        {TableData.map((row, index) => (
    <TableRow key={index} className="text-center">
      <TableCell className="w-52">
        <div className="flex items-center gap-6">
          <input
            type="checkbox"
            checked={selectAll || selectedRows.includes(index as never)}
            onChange={() => handleCheckboxChange(index)}
            className="h-4 w-4 rounded-3xl shadow checked:bg-[#439A86] focus:ring-0 checked:text-[#439A86]"
          />
          <div className="flex gap-2 items-center">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-1">
            <p className="font-bold text-start">{row.name}</p>
            <p>{row.email}</p>
            </div>
          </div>
        </div>
      </TableCell>
      <TableCell className="w-60">
        <div className=" inline-block text-center space-y-2">
              <p className="py-1 rounded-full bg-[#F2F0F9] inline text-center font-bold px-1">{row.videos} video</p>
              <p className="py-1 rounded-full bg-[#F2F0F9] px-2 text-center font-bold ">{row.texts} voice to text</p>
        </div>
      </TableCell>
      <TableCell>
        {row.username}
      </TableCell>
      <TableCell>
        <p className={`${row.accountStatus == "active" ? 'text-green-500' : 'text-red-600'} font-semibold`}>
        {row.accountStatus}
        </p>
      </TableCell>
      <TableCell>
            <Image src={'/assets/More.png'} alt="Icon"  width={6} height={10} className="cursor-pointer"/>
      </TableCell>
    </TableRow>
  ))}
  
  
        </TableBody>
      </Table>
    </div>
  )
}
