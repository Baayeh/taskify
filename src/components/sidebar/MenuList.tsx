import { Home, SquareKanban, Star, Sun, UserRound } from "lucide-react";
import React, { useCallback } from "react";
import { NavLink } from "react-router-dom";
import { Badge } from "../ui/badge";
import { useAppDispatch, useAppSelector } from "@/lib/utils";
import {
  selectImportantTasksCount,
  selectMyDayTasksCount,
  selectPlannedTasksCount,
  selectUncompletedTasks,
  setTask,
} from "@/features/redux/slices/taskSlice";
import { useScreenSize } from "@/hooks/useScreenSize";
import { Task } from "@/types/tasks";

interface LinkProp {
  name: string;
  route: string;
  icon: React.ReactNode;
}

const links: LinkProp[] = [
  {
    name: "My Day",
    route: "/tasks/my-day",
    icon: <Sun size={20} className="text-yellow-500" />,
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
  const unCompletedTasksCount = useAppSelector(selectUncompletedTasks);
  const importantTasksCount = useAppSelector(selectImportantTasksCount);
  const plannedTasksCount = useAppSelector(selectPlannedTasksCount);
  const myDayTasksCount = useAppSelector(selectMyDayTasksCount);

  const { setOpenMenu, setShowDetails } = useScreenSize();
  const dispatch = useAppDispatch();

  const getCount = useCallback(
    (name: string) => {
      switch (name) {
        case "My Day":
          return myDayTasksCount;
        case "Important":
          return importantTasksCount;
        case "Planned":
          return plannedTasksCount;
        case "Tasks":
          return unCompletedTasksCount;
        default:
          return 0;
      }
    },
    [
      importantTasksCount,
      myDayTasksCount,
      plannedTasksCount,
      unCompletedTasksCount,
    ]
  );

  return (
    <ul className="my-5 border-b">
      {links.map((link) => (
        <li key={link.name} className="mb-2">
          <NavLink
            to={link.route}
            className="menu-item flex items-center justify-between whitespace-nowrap rounded-md px-3 py-3 text-sm hover:bg-muted transition-colors"
            onClick={() => {
              setOpenMenu(false);
              setShowDetails(false);
              dispatch(setTask({} as Task));
            }}
            end
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
