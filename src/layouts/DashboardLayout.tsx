import { Outlet } from "react-router-dom";
import {
  CreateTask,
  Header,
  Loader,
  ProtectedRoute,
  SideBar,
} from "../components";
import { useEffect, useRef, useState } from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import TaskDetails from "@/components/task-details/TaskDetails";
import { useScreenSize } from "@/hooks/useScreenSize";
import useCheckPathname from "@/hooks/useCheckPathname";
import { useAuth } from "@/hooks/useAuth";
import AlertDialogComp from "@/components/alert-dialog/AlertDialogComp";

const DashboardLayout = () => {
  const [open, setOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const { showDetails, setShowDetails, isSmallScreen, openMenu, setOpenMenu } =
    useScreenSize();
  const { isPathnameMyDay } = useCheckPathname();

  const { openLogoutModal, setOpenLogoutModal, logout } = useAuth();

  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
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
    <ProtectedRoute>
      <section className="relative h-screen border-x">
        <nav
          className={`fixed w-[20rem] ${isSmallScreen ? "hidden" : "block"}`}
        >
          <SideBar />
        </nav>
        <div
          className={`${showDetails && !isSmallScreen ? "grid grid-cols-4" : ""}`}
        >
          <div
            className={`col-span-3 relative h-screen ${isPathnameMyDay ? "relative bg-my-day" : ""} ${!isSmallScreen ? "ml-[20rem] px-14" : "pt-3 px-5 sm:px-8"}`}
          >
            <Header />
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

      {openLogoutModal && (
        <AlertDialogComp
          open={openLogoutModal}
          setOpen={setOpenLogoutModal}
          title="Confirm Logout"
          description="Are you sure you want to logout?"
          action={() => {
            logout();
          }}
          actionLabel="Yes, logout"
        />
      )}
    </ProtectedRoute>
  );
};

export default DashboardLayout;
