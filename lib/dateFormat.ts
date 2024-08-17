import { formatDate } from "date-fns";

export const dateFormat = (date: Date) => {
  return formatDate(new Date(date), "MM/dd/yyyy");
};
