import { formatDate } from "date-fns";

export const dateFormat = (date: string) => {
  return formatDate(new Date(date), "yyyy-MM-dd");
};
