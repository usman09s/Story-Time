import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { differenceInDays, differenceInMinutes, format } from "date-fns";
import {  differenceInHours, differenceInMonths } from 'date-fns';
import { SupportMessage } from "@/types/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatDate = (date: Date | undefined): string => {
  if (!date) return 'Date not available'; // Return a placeholder if the date is undefined
  return `${format(date, 'dd MMM yyyy')}`; // Format as "Uploaded last 28 Aug 2023"
};

export const truncateText = (text: string, maxLength: number = 15) => {
  const minDisplayLength = 10;

  if (text.length <= maxLength) {
    return text;
  }

  const truncationLength = Math.max(minDisplayLength, maxLength);
  return text.slice(0, truncationLength) + '...';
};


export const formatShortDuration = (date: string | Date) => {
  const now = new Date();
  const messageDate = new Date(date);

  const minutesDifference = differenceInMinutes(now, messageDate);
  const hoursDifference = differenceInHours(now, messageDate);
  const daysDifference = differenceInDays(now, messageDate);
  const monthsDifference = differenceInMonths(now, messageDate);

  if (minutesDifference < 1) {
    return 'now';
  } else if (minutesDifference < 60) {
    return `${minutesDifference}m ago`;
  } else if (hoursDifference < 24) {
    return `${hoursDifference}h ago`;
  } else if (daysDifference < 30) {
    return `${daysDifference}d ago`;
  } else {
    return `${monthsDifference}mo ago`;
  }
};

export const headers = [
  { label: "First Name", key: "firstName" },
  { label: "Last Name", key: "lastName" },
  { label: "Email", key: "email" },
  { label: "Phone", key: "phone" },
  { label: "city", key: "city" },
  { label: "Status", key: "isActive" }
  
];
export const shouldShowDate = (currentIndex: number, messages: SupportMessage[], lastDisplayedDate: string) => {
  if (currentIndex === 0) {
    return true;
  }

  const currentMessageDate = new Date(messages[currentIndex].createdAt).toDateString();
  return currentMessageDate !== lastDisplayedDate;
};

export const S3_URL = 'https://mod-storytime-bucket.s3.amazonaws.com/';