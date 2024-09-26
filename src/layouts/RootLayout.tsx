import ToasterProvider from "@/lib/ToasterProvider";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <>
      <Outlet />
      <ToasterProvider />
    </>
  );
};

export default RootLayout;
