import {
  Sheet,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ProfileSlider } from "@/app/ProfileSlider";

export const AdminProfile = ({}) => {
  return (
    <Sheet >
      <SheetTrigger>
        <Avatar className="cursor-pointer">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </SheetTrigger>
      <ProfileSlider />
    </Sheet>
  );
};
