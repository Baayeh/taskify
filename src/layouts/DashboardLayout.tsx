import { Outlet } from "react-router-dom";
import { Header, SideBar } from "../components";
import { useState } from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";

const DashboardLayout = () => {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <>
      <section className="lg:w-[90%] mx-auto min-h-screen">
        <nav id="sidebar" className="fixed hidden md:block w-[20rem] h-screen">
          <SideBar />
        </nav>
        <div className="md:ml-[20rem] p-5 md:p-10">
          <Header setOpen={setOpenMenu} />
          <main>
            <Outlet />
          </main>
        </div>
      </section>

      {openMenu && (
        <Sheet open={openMenu} onOpenChange={setOpenMenu}>
          <SheetContent side="left">
            <SideBar />
          </SheetContent>
        </Sheet>
      )}
    </>
  );
};

export default DashboardLayout;
