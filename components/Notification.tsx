import { formatDate } from "@/lib/utils";

export const Notifications = () => {
  const today = new Date();
  const formattedDate = today.toDateString();
  
  return (
    <div className="bg-white p-10 w-full mt-2 border-l-2 border-dashed border-[#E4E4E4] rounded-lg max-h-[650px]">
      <p className="mb-5 font-bold text-3xl text-[#18243C]">Update Logs</p>
     <p>{formattedDate}</p>
      <div className="bg-white rounded-lg mt-4 p-5">
        <div className="relative">
          <div className="absolute h-full border-2 border-opacity-20 border-secondary top-1"></div>
          <div className="flex  w-full my-6 -ml-[7px] gap-3">
            <div className="w-1/12 z-10">
              <div className="w-5 h-5 bg-[#18243C] rounded-full"></div>
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-sm">09/12/2021</p>
              <p className="text-xs text-gray-500">Term & Conditions - Updated!</p>
            </div>
          </div>
          <div className="flex w-full my-6 -ml-[7px] gap-3">
            <div className="w-1/12 z-10">
              <div className="w-5 h-5 bg-[#18243C] rounded-full"></div>
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-sm">09/12/2021</p>
              <p className="text-xs text-gray-500">Term & Conditions - Updated!</p>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}