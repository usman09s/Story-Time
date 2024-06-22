import { formatDate } from "date-fns";

export const dateFormat = (date: Date) => {
  return formatDate(new Date(date), "yyyy-MM-dd");
};
