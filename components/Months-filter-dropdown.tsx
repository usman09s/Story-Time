import React, { useCallback, useState } from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from './ui/button';
import Image from 'next/image';
import dropDownIcon from '@/public/assets/down.png';
import { months } from '@/lib/utils';
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function MonthFilterDropdown() {
    const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
    
    const router = useRouter();
    const pathname = usePathname();
    const urlSearchParams = useSearchParams();

    const handleMonthSelect = (month: { month: string; value: number }) => {
        setSelectedMonth(month.month);
        router.push(`${pathname}?${createQueryString("month", month.value.toString())}`);
    };

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(urlSearchParams.toString());
            params.set(name, value); 
            return params.toString();
        },
        [urlSearchParams] 
    );

    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant={"outline"}
                        className="border-[#395E66] flex w-32 justify-between items-center text-[#395E66]"
                    >
                        {selectedMonth || "Months"} 
                        <Image
                            src={dropDownIcon}
                            alt='down'
                            width={10}
                            height={10}
                        />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>Months</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {months.map((month) => (
                        <DropdownMenuItem 
                            key={month.month} 
                            onClick={() => handleMonthSelect(month)}
                        >
                            {month.month}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
