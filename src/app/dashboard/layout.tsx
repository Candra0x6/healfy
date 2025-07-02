import NavbarDashboardMobile from "@/src/components/elements/NavbarDashboardMobile";
import Sidebar from "@/src/components/elements/Sidebar";
import React from "react";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-screen-xl mx-auto w-full flex gap-x-10 overflow-hidden">
      <aside className="md:w-[20%] md:flex md:flex-col hidden h-full ">
        <Sidebar />
      </aside>

      <div className="md:hidden fixed bottom-0 z-50 w-full">
        <NavbarDashboardMobile />
      </div>
      <main className="w-full md:px-0 px-4 md:mb-0 pb-10">{children}</main>
    </div>
  );
}
