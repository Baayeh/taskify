import { Outlet } from "react-router-dom";
import {
  CreateTask,
  Header,
  Loader,
  LoaderProvider,
  SideBar,
} from "../components";
import { useEffect, useRef, useState } from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";

const DashboardLayout = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(false);
  const [task, setTask] = useState("");

  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      console.log("first");
      setOpen(false);
    }
  };

  useEffect(() => {
    if (open && !task) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, task]);

  return (
    <LoaderProvider>
      <section className="relative lg:w-[80%] mx-auto h-screen border-x">
        <nav className="fixed hidden md:block w-[20rem]">
          <SideBar />
        </nav>
        <div className="relative md:ml-[20rem] p-5 sm:px-10 md:px-14 md:pb-0 h-screen">
          <Header setOpen={setOpenMenu} />
          <main className="mt-5">
            <Outlet />
          </main>
          <CreateTask
            divRef={ref}
            open={open}
            setOpen={setOpen}
            task={task}
            setTask={setTask}
          />
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
