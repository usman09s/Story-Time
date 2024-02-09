import Image from "next/image";
import { FC } from "react";

interface StatesProps {
    iconPath: string;
    total: string;
    title: string;
  }
  export const States: FC<StatesProps> = ({ iconPath, title, total }) => {
    return (
      <div className="flex gap-4">
        <Image
          src={`/assets/${iconPath}.png`}
          alt="Icon"
          width={55}
          height={60}
        />
        <div className="flex flex-col">
          <p className="font-bold text-2xl">{total}</p>
          <p>{title}</p>
        </div>
      </div>
    );
  };

  export default States
  