import { Home, SquareKanban, Star, Sun, UserRound } from "lucide-react";
import React, { useCallback } from "react";
import { NavLink } from "react-router-dom";
import { Badge } from "../ui/badge";
import { useAppSelector } from "@/lib/utils";
import {
  selectImportantTasksCount,
  selectMyDayTasksCount,
  selectPlannedTasksCount,
} from "@/features/redux/slices/taskSlice";

interface LinkProp {
  name: string;
  route: string;
  icon: React.ReactNode;
}

const links: LinkProp[] = [
  {
    name: "My Day",
    route: "/my-day",
    icon: <Sun size={20} className="text-gray-500" />,
  },
  {
    name: "Important",
    route: "/tasks/important",
    icon: <Star size={20} className="text-pink-200" />,
  },
  {
    name: "Planned",
    route: "/tasks/planned",
    icon: <SquareKanban size={20} className="text-teal-200" />,
  },
  {
    name: "Assigned to me",
    route: "/tasks/mine",
    icon: <UserRound size={20} className="text-green-400" />,
  },
  {
    name: "Tasks",
    route: "/tasks",
    icon: <Home size={20} className="text-primary" />,
  },
];

const MenuList = () => {
  const importantTasksCount = useAppSelector(selectImportantTasksCount);
  const plannedTasksCount = useAppSelector(selectPlannedTasksCount);
  const myDayTasksCount = useAppSelector(selectMyDayTasksCount);

  const getCount = useCallback(
    (name: string) => {
      switch (name) {
        case "My Day":
          return myDayTasksCount;
        case "Important":
          return importantTasksCount;
        case "Planned":
          return plannedTasksCount;
        default:
          return 0;
      }
    },
    [importantTasksCount]
  );

  return (
    <ul className="my-5 border-b">
      {links.map((link) => (
        <li key={link.name} className="mb-2">
          <NavLink
            to={link.route}
            className="menu-item flex items-center justify-between whitespace-nowrap rounded-md px-3 py-3 text-sm hover:bg-muted transition-colors"
          >
            <div className="flex items-center gap-x-4">
              {link.icon}
              <span>{link.name}</span>
            </div>
            {getCount(link.name) > 0 && (
              <Badge variant="outline" className="rounded-full">
                {getCount(link.name)}
              </Badge>
            )}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default MenuList;
