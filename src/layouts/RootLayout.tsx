import { AuthProvider } from "@/context";
import ToasterProvider from "@/lib/ToasterProvider";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <AuthProvider>
      <Outlet />
      <ToasterProvider />
    </AuthProvider>
  );
};

export default RootLayout;
