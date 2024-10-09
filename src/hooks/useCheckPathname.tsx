import { useMemo } from "react";
import { useLocation } from "react-router-dom";

const useCheckPathname = () => {
  const { pathname } = useLocation();

  const isPathnameDefault = useMemo(() => pathname === "/tasks", [pathname]);

  const isPathnameMyDay = useMemo(
    () => pathname === "/tasks/my-day",
    [pathname]
  );

  const isPathnameImportant = useMemo(
    () => pathname === "/tasks/important",
    [pathname]
  );

  const isPathnamePlanned = useMemo(
    () => pathname === "/tasks/planned",
    [pathname]
  );

  return {
    isPathnameDefault,
    isPathnameMyDay,
    isPathnameImportant,
    isPathnamePlanned,
  };
};

export default useCheckPathname;
