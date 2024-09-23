import { Home, SquareKanban, Star, Sun, UserRound } from "lucide-react";
import React from "react";
import { NavLink } from "react-router-dom";

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
  return (
    <ul className="my-5 border-b">
      {links.map((link) => (
        <li key={link.name} className="mb-2">
          <NavLink
            to={link.route}
            className="menu-item flex items-center gap-x-4 whitespace-nowrap rounded-md px-3 py-3 text-sm hover:bg-muted transition-colors"
          >
            {link.icon}
            <span>{link.name}</span>
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default MenuList;
