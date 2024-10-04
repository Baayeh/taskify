import { Outlet } from "react-router-dom";
import { CreateTask, Header, Loader, SideBar } from "../components";
import { useEffect, useRef, useState } from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import TaskDetails from "@/components/task-details/TaskDetails";
import { LoaderProvider } from "@/context";
import { useScreenSize } from "@/hooks/useScreenSize";

const DashboardLayout = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [open, setOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const { showDetails, setShowDetails, isSmallScreen } = useScreenSize();

  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      console.log("first");
      setOpen(false);
    }
  };

  useEffect(() => {
    if (open && !taskTitle) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, taskTitle]);

  return (
    <LoaderProvider>
      <section className="relative h-screen border-x">
        <nav className="fixed hidden md:block w-[20rem]">
          <SideBar />
        </nav>
        <div
          className={`${showDetails && !isSmallScreen ? "grid grid-cols-4" : ""}`}
        >
          <div className="col-span-3 relative pl-5 md:ml-[20rem] md:pt-6 md:pl-14 h-screen">
            <Header setOpen={setOpenMenu} />
            <main className="mt-5">
              <Outlet />
            </main>
            <CreateTask
              divRef={ref}
              open={open}
              setOpen={setOpen}
              title={taskTitle}
              setTitle={setTaskTitle}
            />
          </div>
          {showDetails && !isSmallScreen && (
            <section className="col-span-1 border-l p-5">
              <TaskDetails />
            </section>
          )}
          {showDetails && isSmallScreen && (
            <Sheet open={showDetails} onOpenChange={setShowDetails}>
              <SheetContent side="right" className="w-full">
                <TaskDetails />
              </SheetContent>
            </Sheet>
          )}
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
