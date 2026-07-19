import Navbar from "@/components/layout/navbar";
import { useIsFetching } from "@tanstack/react-query";
import { ReactNode } from "react";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-slate-900">
      <Navbar />
      {children}
    </div>
  );
}
