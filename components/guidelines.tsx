import Link from "next/link";
import { Button } from "./ui/button";

export default function Guideline({title}:{title:string}) {
    return (<div className="px-10">
      <h1 className="text-5xl text-[#093732] font-bold">{title}</h1>

      <div className="flex gap-20 my-14">
        <h4 className="font-bold  border-b-4 border-[#093732]">
          Terms & Condition
        </h4>
        <h4 className="opacity-80"><Link href={'/about-us'}>About us</Link></h4>
        <h4 className="opacity-80"><Link href={'faqs'}>FAQs</Link></h4>
        <h4 className="opacity-80"><Link href={'faqs'}>Privacy Policy</Link></h4>
      </div>
      <div className="flex gap-4">
        <div className="w-3/4">
          <div className=" border-2 border-[#E4E4E4] min-h-[730px] p-16">
            <p className="font-bold text-md">
              To all our valued Users,
              <br />
              <br />
              <br />
              Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et.
              Sunt qui esse pariatur duis deserunt mollit dolore cillum minim
              tempor enim. Elit aute irure tempor cupidatat incididunt sint
              deserunt ut voluptate aute id deserunt nisi. Aliqua id fugiat
              nostrud irure ex duis ea quis id quis ad et. Sunt qui esse
              pariatur duis deserunt mollit dolore cillum minim tempor enim.
              Elit aute irure tempor cupidatat incididunt sint deserunt ut
              voluptate aute id deserunt nisi.
              <br />
              <br />
              <br />
              Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et.
              Sunt qui esse pariatur duis deserunt mollit dolore cillum minim
              tempor enim. Elit aute irure tempor cupidatat incididunt sint
              deserunt ut voluptate aute id deserunt nisi. Aliqua id fugiat
              nostrud irure ex duis ea quis id quis ad et. Sunt qui esse
              pariatur duis deserunt mollit dolore cillum minim tempor enim.
              Elit aute irure tempor cupidatat incididunt sint deserunt ut
              voluptate aute id deserunt nisi.
              <br />
              <br />
              <br />
              Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et.
              Sunt qui esse pariatur duis deserunt mollit dolore cillum minim
              tempor enim. Elit aute irure tempor cupidatat incididunt sint
              deserunt ut voluptate aute id deserunt nisi. Aliqua id fugiat
              nostrud irure ex duis ea quis id quis ad et. Sunt qui esse
              pariatur duis deserunt mollit dolore cillum minim tempor enim.
              Elit aute irure tempor cupidatat incididunt sint deserunt ut
              voluptate aute id deserunt nisi.
            </p>
          </div>
        <div className="flex justify-center mt-5">
      <Button className="bg-[#395E66] px-24 py-6 hover:bg-[#395e66b9]">
Save
      </Button>
    </div>
        </div>
        
      <div className="w-2/5   bg-white mx-2 p-10 mt-2 border-l-2 border-dashed border-[#E4E4E4] rounded-lg">
        <p className="mb-5  font-bold text-3xl">Update Logs</p>
        <p className="text-md">April 23, 2023</p>
        <div className="p-4 ">

        </div>
        <div className="flex flex-col space-y-2  p-3">
            <p className="text-md font-semibold ">10/19/2022</p>
            <p className="text-sm ">
              Notification was sent
            </p>
            <p className="text-md font-semibold">10/19/2022</p>
            <p className="text-sm ">
              Notification was sent
              </p>
        </div>
      </div>
      </div>
    </div>);
  }
