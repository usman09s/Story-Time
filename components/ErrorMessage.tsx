import Image from "next/image";

export default function ErrorMessage({ text }: { text: string }) {
    return (
      <div className="  justify-start gap-2 items-center py-2 mt-2 rounded-lg flex  bg-[#EB0000] text-white">
        <Image
          alt="Icon"
          width={25}
          height={10}
          src={"/assets/danger.svg"}
          className="mx-3"
        />
        <p className="text-xs font-semibold">{text}</p>
      </div>
    );
  }
  