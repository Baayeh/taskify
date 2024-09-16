import { Outlet } from "react-router-dom";
import {
  CreateTask,
  Header,
  Loader,
  LoaderProvider,
  SideBar,
} from "../components";
import { useState } from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";

const DashboardLayout = () => {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <LoaderProvider>
      <section className="relative lg:w-[80%] mx-auto h-screen border-x">
        <nav className="fixed hidden md:block w-[20rem]">
          <SideBar />
        </nav>
        <div className="relative md:ml-[20rem] p-5 sm:px-10 md:px-14 md:pb-0 h-screen">
          <Header setOpen={setOpenMenu} />
          <main className="mt-5">
            <ScrollArea className="relative w-full h-[calc(100vh-15rem)] md:h-[calc(100vh-12rem)]">
              <Outlet />
            </ScrollArea>
          </main>
          <CreateTask />
        </div>

        <Loader />
      </section>

      {openMenu && (
        <Sheet open={openMenu} onOpenChange={setOpenMenu}>
          <SheetContent side="left">
            <SideBar />
          </SheetContent>
        </Sheet>
      )}
    </LoaderProvider>
  );
};

export default DashboardLayout;
