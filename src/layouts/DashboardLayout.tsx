import { Outlet } from "react-router-dom";
import { Header, SideBar } from "../components";

const DashboardLayout = () => {
  return (
    <section className="lg:w-[90%] mx-auto min-h-screen">
      <SideBar />
      <div className="md:ml-[20rem] p-5 md:p-10">
        <Header />
        <main>
          <Outlet />
        </main>
      </div>
    </section>
  );
};

export default DashboardLayout;
