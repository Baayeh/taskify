import { Outlet } from "react-router-dom";
import { Header } from "../components";

const DashboardLayout = () => {
  return (
    <>
      <div
        id="sidebar"
        className="fixed hidden md:block bg-darkBackground w-[20rem] h-screen
      "
      >
        <h1>This is the sidebar</h1>
      </div>
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
