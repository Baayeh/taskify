import { Outlet } from "react-router-dom";
import { Header, SideBar } from "../components";

const DashboardLayout = () => {
  return (
    <>
      <SideBar />
      <div className="md:ml-[20rem] p-5 md:p-10">
        <Header />
        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default DashboardLayout;
