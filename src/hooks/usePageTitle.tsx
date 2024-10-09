import { useLocation } from "react-router-dom";
import { Sun, Star, SquareKanban, UserRound, Home } from "lucide-react";

interface TitleProps {
  title: string;
  icon: React.ReactNode;
  color: string;
}

export const usePageTitle = () => {
  const { pathname } = useLocation();

  const titles: Record<string, TitleProps> = {
    "/tasks/my-day": {
      title: "My Day",
      icon: <Sun size={30} />,
      color: "text-yellow-500",
    },
    "/tasks/important": {
      title: "Important",
      icon: <Star size={30} />,
      color: "text-pink-200",
    },
    "/tasks/planned": {
      title: "Planned",
      icon: <SquareKanban size={30} />,
      color: "text-teal-200",
    },
    "/tasks/mine": {
      title: "Assigned to me",
      icon: <UserRound size={30} />,
      color: "text-green-400",
    },
    "/tasks": {
      title: "Tasks",
      icon: <Home size={30} />,
      color: "text-primary",
    },
  };

  return titles[pathname] || { title: "Dashboard", color: "text-primary" };
};
