export const Notifications = () => {
    return (
      <div className="w-2/5 bg-white p-10 mt-2 border-l-2 border-dashed border-[#E4E4E4] rounded-lg h-screen">
        <p className="mb-5 font-bold text-3xl">Update Logs</p>
        <div className="flex flex-col space-y-2">
          <div>
            <p className="text-md">April 23, 2023</p>
            <p className="p-4"></p>
            <p className="text-md font-semibold">10/19/2022</p>
            <p className="text-sm">Notification was sent</p>
            <p className="text-md font-semibold">10/19/2022</p>
            <p className="text-sm">Notification was sent</p>
          </div>
        </div>
      </div>
    );
  }