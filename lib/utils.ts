import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { differenceInDays, endOfYear, format } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatDate = (date: Date | undefined): string => {
  if (!date) return 'Date not available'; // Return a placeholder if the date is undefined
  return `Uploaded last ${format(date, 'dd MMM yyyy')}`; // Format as "Uploaded last 28 Aug 2023"
};