import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Login from "@/features/pages/auth/Login";
import Register from "@/features/pages/auth/Register";
import { useEffect, useState } from "react";

const APP_NAME = "Taskify";

const Authentication = () => {
  const [value, setValue] = useState("login");

  useEffect(() => {
    const title =
      value === "login" ? `Login | ${APP_NAME}` : `Register | ${APP_NAME}`;
    document.title = title;
  }, [value]);

  return (
    <section className="w-full h-screen flex items-center justify-center">
      <div className="w-full sm:w-[50%] lg:w-1/3 rounded p-4">
        <h1 className="text-3xl font-semibold text-center">{APP_NAME}</h1>

        <div className="mt-5">
          <Tabs defaultValue={value} value={value} onValueChange={setValue}>
            <TabsList className="w-[200px] mx-auto grid grid-cols-2 mb-10">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <Login />
            </TabsContent>
            <TabsContent value="register">
              <Register handleTabChange={setValue} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default Authentication;
