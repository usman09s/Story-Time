"use client";

import { useMediaQuery } from "@/hooks/useMediaQuery.hook";
import NoMobileAccess from "@/components/NoMobileAccess";

const ResponsiveWrapper = ({ children }: { children: React.ReactNode }) => {
  const isMobileOrTablet = useMediaQuery("(max-width: 1024px)");

  if (isMobileOrTablet) {
    return <NoMobileAccess />;
  }

  return <>{children}</>;
};

export default ResponsiveWrapper;