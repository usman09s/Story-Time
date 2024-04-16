import { formatDistanceToNowStrict } from "date-fns";

export const dateFormat = (date: string) => {
  return formatDistanceToNowStrict(new Date(date));
};
