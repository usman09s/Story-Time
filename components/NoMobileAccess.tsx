import React from "react";
import SmartphoneIcon from "./ui/SmartPhoneIcon";

const NoMobileAccess = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center text-muted-foreground">
        <SmartphoneIcon className="w-16 h-16 mb-4" />
        <h2 className="text-2xl font-bold">This app is not available on mobile or tablet devices.</h2>
        <p className="mt-2">Please use a desktop or laptop computer to access the Story Time Panel</p>
      </div>
  );
};

export default NoMobileAccess;

