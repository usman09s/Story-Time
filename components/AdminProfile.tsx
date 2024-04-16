import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ProfileSlider } from "@/app/ProfileSlider";

export const AdminProfile = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <Avatar className="cursor-pointer">
          <AvatarImage src="/assets/dummy-user.webp" alt="admin" />
          <AvatarFallback>AD</AvatarFallback>
        </Avatar>
      </SheetTrigger>
      <ProfileSlider />
    </Sheet>
  );
};
