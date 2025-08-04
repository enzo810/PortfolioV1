"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";

const ConditionalHeader = () => {
  const pathname = usePathname();

  const excludedPaths = ["/signin", "/signup"];

  const shouldHideHeader = excludedPaths.includes(pathname);

  if (shouldHideHeader) {
    return null;
  }

  return <Header />;
};

export default ConditionalHeader;
